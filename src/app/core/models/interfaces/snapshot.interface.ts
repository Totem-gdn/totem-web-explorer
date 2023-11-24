import { ProposalType } from '@snapshot-labs/snapshot.js/dist/sign/types';

export interface SnapshotSpace {
  id: string;
  name: string;
  about: string;
  network: string;
  symbol: string;
  strategies: SpaceStrategy[];
  admins: string[];
  moderators: string[];
  members: string[];
  validation: {
    name: string;
    params: {
      minScore: number;
    };
  };
}

export interface SnapshotVotes {
  id: string;
  voter: string;
  vp: number;
  vp_by_strategy: [number, number];
  vp_state: string;
  created: number;
  proposal: {
    id: string;
    __typename: string;
  };
  choice: number;
  space: {
    id: string;
    __typename: string;
  };
  __typename: string;
}

export interface SnapshotFollows {
  follower: string;
  space: {
    id: string;
  };
}

export interface SnapshotVotingPowerResponse {
  vp: SnapshotVotingPower;
}
export interface SnapshotVotingPower {
  vp: number;
  vp_by_strategy: number[];
  vp_state: string;
}

export interface SnapshotProposal {
  id: string;
  title: string;
  type: ProposalType;
  body: string;
  choices: string[];
  options: ProposalOption[];
  start: number;
  end: number;
  snapshot: string;
  state: string;
  author: string;
  space: SnapshotSpace;
  __typename: string;
}

export interface ProposalOption {
  id: number;
  selected: boolean;
  value: string;
}

export interface SpaceStrategy {
  name: string;
  network: string;
  params: {
    symbol: string;
    address: string;
    decimals: number;
  };
  __typename: string;
}

export interface SnapshotApiData<T> {
  proposals?: T[];
  spaces?: T[];
  votes?: T[];
  follows?: T[];
}
export interface SnapshotApiResponse<T> {
  data: SnapshotApiData<T>;
  loading: boolean;
  networkStatus: number;
}
