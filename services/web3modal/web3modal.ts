import { ethers } from "ethers";
import Web3ModalLib from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const network = process.env.NEXT_PUBLIC_NETWORK as string;
const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME as string;
const rpcUrl = process.env.NEXT_PUBLIC_NETWORK_RPC_URL as string;
const chainId = process.env.NEXT_PUBLIC_CHAINID as string;
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;

type WalletTypes = 'metamask' | 'walletconnect';

export interface IWalletInfo {
  account: string;
  network?: ethers.providers.Network;
  wallet: [WalletTypes, string];
}

export class Web3Modal {
  public web3Modal;
  public ethers?: ethers.providers.Web3Provider;

  constructor() {
this.web3Modal = new Web3ModalLib({
  network,
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId,
        rpc: { [chainId]: rpcUrl },
      },
    },
  },
});
  }

  public async connect() {
    try {
      const provider = await this.web3Modal.connect();
      this.ethers = new ethers.providers.Web3Provider(provider as any, 'any');
      return true;
    } catch (ex) {
      console.debug(ex);
      return false;
    }
  }

  public async disconnect() {
    try {
      const provider = await this.web3Modal.clearCachedProvider();
      this.ethers = undefined;
    } catch (ex) {
      console.log(ex);
    }
  }

  public async getFirstAccount() {
    try {
      const firstAccount = await this.ethers?.listAccounts();
      return firstAccount?.[0] || "";
    } catch (ex) {
      console.log(ex);
      return "";
    }
  }

  public async checkAndSwitchChain(): Promise<boolean> {
    try {
      await this.ethers?.provider.request?.({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${parseInt(chainId).toString(16)}`,
            chainName,
            rpcUrls: [rpcUrl],
          },
        ],
      });
    } catch (ex) {
      console.log(ex);
    } finally {
      const network = await this.getNetwork();
      return this.checkChain(network?.chainId);
    }
  }

  public checkChain(userChainId: number | string = 0): boolean {
    return (
      (typeof userChainId === "string"
        ? parseInt(userChainId)
        : userChainId) === parseInt(chainId)
    );
  }

  public async getNetwork() {
    return this.ethers?.getNetwork();
  }

  public getWalletProvider(): [WalletTypes, string] {
    if (Object.keys(this.ethers?.provider || {}).includes('wc')) {
      return ['walletconnect', 'Wallet Connect'];
    } else {
      return ['metamask', 'Metamask'];
    }
  }

  public async getWalletInfo(): Promise<IWalletInfo> {
    const network = await this.getNetwork();
    const account = await this.getFirstAccount();
    const wallet = this.getWalletProvider();

    return { network, wallet, account };
  }
}
