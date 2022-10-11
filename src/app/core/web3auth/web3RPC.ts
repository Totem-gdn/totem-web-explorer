import type { SafeEventEmitterProvider } from "@web3auth/base";
import Web3 from "web3";
import { GetTokensABI } from "./abi/getTokens.abi";

export default class EthereumRpc {
  private provider: SafeEventEmitterProvider;

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider;
  }

  async getTokens() {
    const web3 = new Web3(this.provider as any);
    const accounts = await web3.eth.getAccounts();

    const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b';
    const wallet = accounts[0]
    console.log('account', wallet);
    const tokenContract = GetTokensABI;
    const contract = new web3.eth.Contract(tokenContract, contractAddress);

    const tx = await contract.methods.claim().send({ 
      from: wallet,
      maxPriorityFeePerGas: "150000000000", // Max priority fee per gas
      maxFeePerGas: "200000000000"
    })
    return tx;
  }

  async getTokenBalance() {
    const web3 = new Web3(this.provider as any);
    const accounts = await web3.eth.getAccounts();

    const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b';
    const wallet = accounts[0]
    const tokenContract = GetTokensABI;
    const contract = new web3.eth.Contract(tokenContract, contractAddress);

    const tx = await contract.methods.balanceOf(wallet).call()
    return tx;
  }

  async getChainId(): Promise<string> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get the connected Chain's ID
      const chainId = await web3.eth.getChainId();

      return chainId.toString();
    } catch (error) {
      return error as string;
    }
  }

  async getAccounts(): Promise<any> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance(): Promise<string> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      // Get user's balance in ether
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address) // Balance is in wei
      );

      return balance;
    } catch (error) {
      return error as string;
    }
  }

  async sendTransaction(): Promise<any> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];

      const destination = fromAddress;

      const amount = web3.utils.toWei("0.001"); // Convert 1 ether to wei

      // Submit transaction to the blockchain and wait for it to be mined
      const receipt = await web3.eth.sendTransaction({
        from: fromAddress,
        to: destination,
        value: amount,
        maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
        maxFeePerGas: "6000000000000", // Max fee per gas
      });

      return receipt;
    } catch (error) {
      return error as string;
    }
  }

  async signMessage() {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];

      const originalMessage = "YOUR_MESSAGE";

      // Sign the message
      const signedMessage = await web3.eth.personal.sign(
        originalMessage,
        fromAddress,
        "test password!" // configure your own password here.
      );

      return signedMessage;
    } catch (error) {
      return error as string;
    }
  }

  async getPrivateKey(): Promise<any> {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error as string;
    }
  }
}