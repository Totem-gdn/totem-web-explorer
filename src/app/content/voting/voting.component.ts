import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { ProposalOption, SnapshotApiResponse, SnapshotFollows, SnapshotProposal, SnapshotSpace, SnapshotVote, SnapshotVotingPower, SnapshotVotingPowerResponse } from '@app/core/models/interfaces/snapshot.interface';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';
import { UserStateService } from '@app/core/services/auth.service';
import { SnapshotService } from '@app/core/services/snapshot/snapshot.service';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable, Subscription, catchError, combineLatest, delay, map, of, switchMap, tap } from 'rxjs';
import moment from 'moment';
enum OrderDirection {
  ASC="asc",
  DESC="desc"
}

const GET_FOLLOWS = gql`
query MyFollows($first: Int!, $follower: String!, $space: String!) {
  follows(
    first: $first,
    where: {
      follower: $follower
      space: $space
    }
  ) {
    follower
    space {
      id
    }
    created
  }
}
`

const GET_SPACES = gql`
query Spaces ($first: Int!, $skip: Int!, $id: String!, $orderBy: String!, $orderDirection: OrderDirection) {
  spaces(
    first: $first,
    skip: $skip,
    where: {
      id: $id
    }
    orderBy: $orderBy,
    orderDirection: $orderDirection
  ) {
    id
    name
    about
    network
    symbol
    strategies {
      name
      network
      params
    }
    admins
    moderators
    members
    filters {
      minScore
      onlyMembers
    }
    validation {
      name
      params
    }
    plugins
  }
}
`;

type WhereInput = {
  space_in: [String],
  state: String
}

const GET_VOTING_POWER = gql`
query Voting($voter: String!, $space: String!, $proposal: String!) {
    vp (
      voter: $voter
      space: $space
      proposal: $proposal
    ) {
      vp
      vp_by_strategy
      vp_state
    }
  }
`

interface GetProposals {
  first: number,
  skip: number,
  space_in: string[],
  state: string,
  orderBy: string,
  orderDirection: OrderDirection
}

const GET_SPACE_PROPOSALS = gql`
query Proposals($first: Int!, $skip: Int!, $space_in: [String], $state: String, $orderBy: String!, $orderDirection: OrderDirection) {
  proposals(
    first: $first,
    skip: $skip,
    where: {
      space_in: $space_in,
      state: $state
    },
    orderBy: $orderBy,
    orderDirection: $orderDirection
  ) {
    id
    title
    type
    body
    choices
    start
    end
    snapshot
    state
    author
    space {
      id
      name
    }
  }
}
`;

const GET_MY_VOTES = gql`
query Votes($first: Int!, $skip: Int!, $voter: String, $proposal: String, $orderBy: String!, $orderDirection: OrderDirection) {
  votes (
    first: $first
    skip: $skip
    where: {
      voter: $voter
      proposal: $proposal
    }
    orderBy: $orderBy,
    orderDirection: $orderDirection
  ) {
    id
    voter
    vp
    vp_by_strategy
    vp_state
    created
    proposal {
      id
    }
    choice
    space {
      id
    }
  }
}
`;

@Component({
  selector: 'voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
  host: {
    class: 'flex flex-auto w-full h-full min-h-[calc(100%-80px)]'
  }
})
export class VotingComponent implements OnInit, OnDestroy {

  space$: Observable<SnapshotSpace | null> = new Observable();
  proposal$: Observable<SnapshotProposal | null> = new Observable();
  proposals$: BehaviorSubject<SnapshotProposal[]> = new BehaviorSubject<SnapshotProposal[]>([]);
  votingPower$: Observable<any | null> = new Observable();
  subs: Subscription = new Subscription();
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUser$: BehaviorSubject<UserEntity | null> = new BehaviorSubject<UserEntity | null>(null);
  totemSpace: string = 'totemgdn.eth';
  myVotingPower: SnapshotVotingPower = {
    vp: 0,
    vp_by_strategy: [0, 0],
    vp_state: ''
  }
  minPower: number = 0;
  lastProposalVotingState: {
    voted: boolean;
    choice: number;
    created?: number;
  } = {
    voted: false,
    choice: 0,
    created: 0
  }
  currTime: number = Date.now();
  noActiveProposals: boolean = false;

  constructor(
    private snapshotService: SnapshotService,
    private snackNotifierService: SnackNotifierService,
    private userStateService: UserStateService,
    private apollo: Apollo
    ) {}

  async ngOnInit() {
    this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        if (!this.loading$.getValue()) {
          this.loading$.next(value);
        }
      })
    )

    this.subs.add(
      this.userStateService.currentUser.subscribe(async user => {
        if (user) {
          this.currentUser$.next(user);
          this.snapshotService.initWeb3AndSnapshotClient();
          this.getFollows();
        }
      })
    )
  }

  getDate(time: number) {
    return moment(time).fromNow();
  }

  getFollows() {
    this.loading$.next(true);
    this.apollo
      .watchQuery({
        query: GET_FOLLOWS,
        variables: {
          first: 20,
          follower: this.currentUser$.getValue()?.wallet,
          space: this.totemSpace
        }
      })
      .valueChanges.pipe(
        catchError((err: HttpErrorResponse) => {
          this.loading$.next(false);
          return of();
        }),
        tap((res: any) => {
          //console.log(res);
        }
        ),
        map((result: SnapshotApiResponse<SnapshotFollows>) => result.data.follows?.length ? result.data.follows : [])
      ).subscribe((data: SnapshotFollows[]) => {
          console.log(data);
          const isFollowingTotem: boolean = data.some((follow: SnapshotFollows) => follow.space.id === this.totemSpace);
          if (isFollowingTotem) {
            console.log('Follows TOTEM SPACE +');
            //this.getSpaceInfo();
            this.getSpaceProposals('active');
          } else {
            this.joinASpaceAndGetInfo();
          }
      })
  }

  async joinASpaceAndGetInfo() {
    try {
      await this.snapshotService.joinASpace();
    } catch (err) {
      console.log(err);
      this.loading$.next(false);
      this.snackNotifierService.open((err as string));
    }
    //this.getSpaceInfo();
    this.getSpaceProposals('active');
  }

  getSpaceProposals(state: 'active' | 'pending' | 'closed') {
    this.apollo
      .watchQuery<any, GetProposals>({
        query: GET_SPACE_PROPOSALS,
        variables: {
          first: state === 'active' ? 20 : 2,
          skip: 0,
          space_in: [this.totemSpace],
          state: state,
          orderBy: "created",
          orderDirection: OrderDirection.DESC
        }
      })
      .valueChanges.pipe(
        catchError((err: HttpErrorResponse) => {
          this.snackNotifierService.open(err?.error?.message || err?.message);
          this.loading$.next(false);
          return of();
        }),
        switchMap((data: SnapshotApiResponse<SnapshotProposal>) => {
          return this.getMyVotesAndProcessProposals(data);
        }),
        delay(250),
        switchMap((data: SnapshotProposal[]) => {
          return this.getVPForProposalsAndProcess(data);
        }),
        delay(250)
      ).subscribe((data: SnapshotProposal[]) => {
          //console.log(data);
          const currentProposals: SnapshotProposal[] = this.proposals$.getValue();
          this.proposals$.next([...currentProposals, ...data]);
          if (state === 'active') {
            if (!data?.length) {
              this.noActiveProposals = true;
            }
            this.getSpaceProposals('pending');
            return;
          }
          if (state === 'pending') {
            this.getSpaceProposals('closed');
            return;
          }
          this.loading$.next(false);
          //console.log(this.proposals$.getValue());
      });
  }

  getVPForProposalsAndProcess(proposals: SnapshotProposal[]): Observable<SnapshotProposal[]> {
    if (!proposals?.length) return of([]);
    const requests: Observable<SnapshotProposal>[] = proposals.map((proposal: SnapshotProposal) => {
      if (proposal.state === 'pending') {
        return of(proposal);
      }
      return this.getVotingPower(proposal);
    });
    return combineLatest([...requests]).pipe(
      catchError((err: HttpErrorResponse) => {
        this.snackNotifierService.open(err?.error?.message || err?.message);
        return of();
      })
    );
  }

  getMyVotesAndProcessProposals(response: SnapshotApiResponse<SnapshotProposal>): Observable<SnapshotProposal[]> {
    if (!response?.data.proposals?.length) return of([]);
    const proposals: SnapshotProposal[] = response.data.proposals.map((proposal: SnapshotProposal) => {
      return {
        ...proposal,
        loading: false,
        options: proposal.choices.map((choice: string, i: number) => {
          return {
            id: i+1,
            value: choice,
            selected: false
          }
        })
      }
    });
    const requests: Observable<SnapshotProposal>[] = proposals.map((proposal: SnapshotProposal) => {
      if (proposal.state === 'pending') {
        return of(proposal);
      }
      return this.getMyVotes(proposal);
    });
    return combineLatest([...requests]).pipe(
      catchError((err: HttpErrorResponse) => {
        this.snackNotifierService.open(err?.error?.message || err?.message);
        return of();
      })
    );
  }

  getMyVotes(proposal: SnapshotProposal): Observable<SnapshotProposal> {
    return this.apollo
    .watchQuery<any, any>({
      query: GET_MY_VOTES,
      variables: {
        first: 20,
        skip: 0,
        voter: this.currentUser$.getValue()?.wallet,
        space: this.totemSpace,
        proposal: proposal.id,
        orderBy: "created",
        orderDirection: OrderDirection.DESC
      }
    })
    .valueChanges.pipe(
      catchError((err: HttpErrorResponse) => {
        this.snackNotifierService.open(err?.error?.message || err?.message);
        return of();
      }),
      map((result: SnapshotApiResponse<SnapshotVote>) => {
        const votes: SnapshotVote[] = result.data.votes?.length ? result.data.votes : [];
        const voteIsCreated: SnapshotVote | undefined = votes.find((item: SnapshotVote) => item.proposal?.id === proposal.id);
        return {
          ...proposal,
          vote: voteIsCreated,
        } as SnapshotProposal;
      })
    )/* .subscribe((data: SnapshotVote[] | null) => {
      if (!data) return;
      console.log('MY VOTES: ', data);
      const voteIsCreated: SnapshotVote | undefined = data.find((item: SnapshotVote) => item.proposal.id === proposalId);
      if (voteIsCreated) {
        this.lastProposalVotingState = {
          voted: true,
          choice: voteIsCreated.choice,
          created: voteIsCreated.created
        }
        console.log(this.lastProposalVotingState);
      }
    }) */
  }

  getVotingPower(proposal: SnapshotProposal): Observable<SnapshotProposal> {
    return this.apollo
    .watchQuery<any, any>({
      query: GET_VOTING_POWER,
      variables: {
        voter: this.currentUser$.getValue()?.wallet,
        space: this.totemSpace,
        proposal: proposal.id
      }
    })
    .valueChanges.pipe(
      catchError((err: HttpErrorResponse) => {
        this.snackNotifierService.open(err?.error?.message || err?.message);
        return of();
      }),
      map((result: {data: SnapshotVotingPowerResponse}) => {
        return {
          ...proposal,
          votingPower: result?.data?.vp || undefined
        }
      })
    )
  }

  getSpaceInfo() {
    this.space$ = this.apollo
      .watchQuery({
        query: GET_SPACES,
        variables: {
          first: 20,
          skip: 0,
          id: this.totemSpace,
          orderBy: "created",
          orderDirection: "desc"
        }
      })
      .valueChanges.pipe(
        catchError((err: HttpErrorResponse) => {
          //console.log(err);
          return of();
        }),
        tap((res: any) => res),
        map((result: SnapshotApiResponse<SnapshotSpace>) => result.data.spaces?.length ? result.data.spaces[0] : null),
        tap((res: SnapshotSpace | null) => {
          if (res) {
            this.minPower = res.validation.params.minScore;
          }
        }),
      )
  }

  async castVote(proposal: SnapshotProposal) {
    console.log(proposal);
    const option: ProposalOption | undefined = proposal.options.find((option: ProposalOption) => option.selected === true);
    if (!option) {
      this.snackNotifierService.open('Select at least one option to cast a vote');
      return;
    }
    //this.loading$.next(true);
    proposal.loading = true;
    const choice: number = option.id;
    let vote: any;
    try {
      vote = await this.snapshotService.castAVote(proposal, choice);
      proposal.vote = {
        choice: choice,
      }
      this.snackNotifierService.open('You have successfully voted!');
    } catch (err) {
      /* {error: string; error_description: string} */
      //this.loading$.next(false);
      proposal.loading = false;
      console.log(err);
      let errorText: string = (err as {error: string; error_description: string}).error_description || '';
      if ((err as {error: string; error_description: string}).error_description === 'failed vote validation') {
        errorText = `You do not meet the minimum balance requirement to vote`;
      }
      this.snackNotifierService.open(errorText);
    }
    console.log(vote);
    //this.loading$.next(false);
    proposal.loading = false;
  }

  selectOption(option: ProposalOption, options: ProposalOption[]) {
    console.log(option, options);

    const index: number = options.findIndex((item: ProposalOption) => item.id === option.id);
    options.map((item: ProposalOption) => item.selected = false);
    options[index].selected = true;
  }

  slice(str: string) {
    return str.slice(0, 7) + '...' + str?.slice(-4);
  }

  copied() {
    this.snackNotifierService.open('Copied to the clipboard');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
