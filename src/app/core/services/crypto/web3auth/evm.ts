
import type { SafeEventEmitterProvider } from "@web3auth/base";
import { text } from "stream/consumers";
import Web3 from "web3";
import { contractABI } from "../abi/FactoryERC1155";
import { GetTokens } from "../abi/getTokens";

export default class EthereumRpc {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }
  async getAccounts(): Promise<string[]> {
    try {
      const web3 = new Web3(this.provider as any);
      const accounts = await web3.eth.getAccounts();
      return accounts;
    } catch (error: unknown) {
      return error as string[];
    }
  }

  async getBalance(): Promise<string> {
    try {
      const web3 = new Web3(this.provider as any);
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      return balance;
    } catch (error) {
      return error as string;
    }
  }

  async signMessage() {
    try {
      const web3 = new Web3(this.provider as any);
      const accounts = await web3.eth.getAccounts();
      const message = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";
      (web3.currentProvider as any)?.send(
        {
          method: "eth_sign",
          params: [accounts[0], message],
          from: accounts[0],
        },
        (err: Error, result: any) => {
          if (err) {
            return console.error(err);
          }
          return result;
        }
      );
    } catch (error) {
      return error as string;
    }
    return;
  }

  async signTransaction(): Promise<string> {
    try {
      const web3 = new Web3(this.provider as any);
      const accounts = await web3.eth.getAccounts();
      const txRes = await web3.eth.signTransaction({
        from: accounts[0],
        to: accounts[0],
        value: web3.utils.toWei("0.01"),
      });
      return txRes.raw;
    } catch (error) {
      return error as string;
    }
  }

  async mintNft(): Promise<any> {

    const web3 = new Web3(this.provider as any);
    const accounts = await web3.eth.getAccounts();

    const wallet = accounts[0];
    const contractAddress = '0x2ed437BECc3EAEC833deA9fBe546aC1C03fc913d';
    const ABI = contractABI;

    // console.log(ABI)
    const contract = new web3.eth.Contract(ABI.abi, contractAddress);

    // https://bafybeigrfsyjsgjcapbehtpfttm3z5arfs6amwo2ni4nz2pgcs65fb65di.ipfs.nftstorage.link/1.json
    const tx = await web3.eth.sendTransaction({
      from: wallet,
      to: contractAddress,
      maxPriorityFeePerGas: "1000000000",
      maxFeePerGas: "1000000000",
      data: contract.methods.mintERC1155('Planet Mercury', 1).encodeABI(),
    });

    return tx;
  }

  async deployNft(): Promise<any> {

    const web3 = new Web3(this.provider as any);
    const accounts = await web3.eth.getAccounts();

    const wallet = accounts[0];
    const contractAddress = '0x2ed437BECc3EAEC833deA9fBe546aC1C03fc913d';
    const ABI = contractABI;

    const link = 'https://bafybeigrfsyjsgjcapbehtpfttm3z5arfs6amwo2ni4nz2pgcs65fb65di.ipfs.nftstorage.link/';
    const names = ['Planet Mercury'];
    const ids = [1];


    const contract = new web3.eth.Contract(ABI.abi, contractAddress);

    // https://bafybeigrfsyjsgjcapbehtpfttm3z5arfs6amwo2ni4nz2pgcs65fb65di.ipfs.nftstorage.link/1.json
    const tx = await web3.eth.sendTransaction({
      from: wallet,
      to: contractAddress,
      maxPriorityFeePerGas: "10000000000",
      maxFeePerGas: "10000000000",
      data: contract.methods.deployERC1155('Planet', link, ids, names).encodeABI(),
    }).catch(err => console.log(err));

    

    return tx;
  }

  async signAndSendTransaction(wallet: string, contract: string): Promise<string> {
    try {
      const web3 = new Web3(this.provider as any);
      const accounts = await web3.eth.getAccounts();

      const txRes = await web3.eth.sendTransaction({
        from: wallet,
        to: contract,
        value: web3.utils.toWei("0.01"),
        maxPriorityFeePerGas: "50000000000",
        maxFeePerGas: "6000000000000",
      });
      return txRes.transactionHash;
    } catch (error) {
      return error as string;
    }
  }


  async getTokens() {
    const web3 = new Web3(this.provider as any);
    const accounts = await web3.eth.getAccounts();

    const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b';
    const wallet = accounts[0]
    const tokenContract = GetTokens;
    const contract = new web3.eth.Contract(tokenContract, contractAddress);

    const tx = await contract.methods.claim().send({ 
      from: wallet,
      maxPriorityFeePerGas: "150000000000", // Max priority fee per gas
      maxFeePerGas: "200000000000"
    })
    return tx;
  }

  async checkBalance() {
    const web3 = new Web3(this.provider as any);
    const accounts = await web3.eth.getAccounts();

    const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b';
    const wallet = accounts[0]
    const price = 100;
    const tokenContract = GetTokens;
    const contract = new web3.eth.Contract(tokenContract, contractAddress);

    const tx = await contract.methods.balanceOf(wallet).call()
    return tx;
  }

  async sendTransaction(amount: number) {
    const web3 = new Web3(this.provider as any);
    const accounts = await web3.eth.getAccounts();

    const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b';
    const wallet = accounts[0]
    console.log(wallet);
    const price = 5;
    const tokenContract = GetTokens;
    const contract = new web3.eth.Contract(tokenContract, contractAddress);

    const tx = await contract.methods.transfer(contractAddress, amount).send({ 
      from: wallet,
      maxPriorityFeePerGas: "150000000000", // Max priority fee per gas
      maxFeePerGas: "200000000000"
    })
    return tx;
  }

}