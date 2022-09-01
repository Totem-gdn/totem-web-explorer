import { Component, OnInit } from '@angular/core';
import { Web3Service } from '@app/core/services/crypto/web3auth/web3auth.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  constructor(private web3Service: Web3Service) { }

  ngOnInit(): void {
  }

  async onClickButton() {
    const res = await this.web3Service.contractsInteraction()
    console.log(res);
  }

}
