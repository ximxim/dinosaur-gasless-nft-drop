import { Web3Modal } from './web3modal';
export type { IWalletInfo } from './web3modal';

export let Web3ModalService: Web3Modal;
if (typeof window !== 'undefined') {
  Web3ModalService = new Web3Modal();
}
