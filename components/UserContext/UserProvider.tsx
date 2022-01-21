import { useRouter } from "next/router";
import {
  useState,
  useEffect,
  useCallback,
  createContext,
  FunctionComponent,
} from "react";
import { ThirdwebSDK, IAppModule, BundleDropModule, BundleDropMetadata } from '@3rdweb/sdk';
import { getDefaultProvider, BigNumber } from "ethers";
import { EIP1193Provider } from "ethereum-types";

import { Web3ModalService, IWalletInfo } from "../../services";

const transactionRelayerUrl = process.env.NEXT_PUBLIC_OZ_URL as string;
const rpcUrl = process.env.NEXT_PUBLIC_NETWORK_RPC_URL as string;
const moduleAddress = process.env.NEXT_PUBLIC_THIRD_WEB_BUNDLE_MODULE as string;

interface ICurrentUserState {
  claiming: string;
  nfts: BundleDropMetadata[];
  isLoading: boolean;
  app?: IAppModule;
  isConnecting: boolean;
  disconnect: () => void;
  walletInfo?: IWalletInfo;
  thirdWebSdk?: ThirdwebSDK;
  isCorrectNetwork: boolean;
  switchNetwork: () => void;
  getBalance: (nftId: string) => Promise<BigNumber>;
  claim: (nftId: string) => Promise<boolean>;
  connect: (retryCount?: number) => Promise<void>;
}

export const UserContext = createContext<ICurrentUserState>({
  nfts: [],
  claiming: '',
  isLoading: false,
  claim: async () => false,
  connect: async () => {},
  isConnecting: false,
  disconnect: () => {},
  isCorrectNetwork: false,
  switchNetwork: () => {},
  getBalance: async () => BigNumber.from(0),
});

export const UserProvider: FunctionComponent = ({ children }) => {
  const router = useRouter();
  const [walletInfo, setWalletInfo] = useState<IWalletInfo>();
  const [nfts, setNfts] = useState<BundleDropMetadata[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [claiming, setClaiming] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(false);
  const [thirdWebSdk, setThirdWebSdk] = useState<ThirdwebSDK>();

  /* ========== ACTIONS ========== */
  const handleGetWalletInfo = useCallback(async () => {
    const info = await Web3ModalService.getWalletInfo();
    setWalletInfo(info);
    return info;
  }, []);

  const handleDisconnectWallet = useCallback(() => {
    Web3ModalService.disconnect();
    setWalletInfo(undefined);
    router.replace('/');
  }, []);

  const handleSwitchNetwork = useCallback(async () => {
    const chainCheckResult = await Web3ModalService.checkAndSwitchChain();
    setIsCorrectNetwork(chainCheckResult);
  }, []);

  const connect = useCallback(
    async (retryCount: number = 0) => {
      setIsConnecting(true);
      try {
        // 1. Connect to wallet
        const success = await Web3ModalService.connect();
        if (!success || !Web3ModalService.ethers) throw "Unable to conenct";
        const signer = await Web3ModalService.ethers.getSigner();
        setThirdWebSdk(new ThirdwebSDK(signer, { transactionRelayerUrl }));
        // 2. Switch to correct network
        await handleSwitchNetwork();
        // 3. Fetch wallet info to store
        await handleGetWalletInfo();
      } catch (ex) {
        if (retryCount > 0) {
          return handleDisconnectWallet();
        }
        /**
         * adding recurssive call to self in order to retry
         * one more time in case the failure was temporary.
         * Metamask creates a bug after switching the network
         * this recursion solves that issue.
         */
        connect(retryCount + 1);
      } finally {
        setIsConnecting(false);
      }
    },
    [handleDisconnectWallet, handleGetWalletInfo, handleSwitchNetwork]
  );

  const handleClaim = useCallback(async (nftId: string) => {
    try {
      if (!thirdWebSdk || !nftId) throw 'deps not ready';
      setClaiming(nftId);
      const module = thirdWebSdk.getBundleDropModule(moduleAddress);
      await module.claim(nftId, 1);
      return true;
    } catch(ex) {
      console.log(ex);
      return false;
    } finally {
      setClaiming('');
    }
  }, [thirdWebSdk]);

  const getBalance = useCallback(async (nftId: string) => {
    try {
      if (!thirdWebSdk || !nftId) throw 'deps not ready';
      const module = thirdWebSdk.getBundleDropModule(moduleAddress);
      const balance = await module.balance(nftId);
      return balance;
    } catch {
      return BigNumber.from(0);
    }
  }, [thirdWebSdk]);

  /* ========== EFFECTS ========== */
  useEffect(() => {
    const { cachedProvider } = Web3ModalService.web3Modal;
    if (!!cachedProvider) {
      connect();
    }

    (async () => {
      try {
        setIsLoading(true);
        const sdk = new ThirdwebSDK(getDefaultProvider(rpcUrl))
        const module = sdk.getBundleDropModule(moduleAddress);
        const all = await module.getAll();
        setNfts(all);
      } finally {
        setIsLoading(false);
      }
    })();

    const provider = window.ethereum as EIP1193Provider;

    if (!provider) return;

    // Listening to networkChanged event from injected wallets to handle edge cases
    provider.on("networkChanged", (newChainId) => {
      setIsCorrectNetwork(Web3ModalService.checkChain(newChainId));
    });

    // Listening to accountsChanged event from injected wallets to handle edge cases
    provider.on("accountsChanged", (accounts) => {
      if (accounts.length) return;
      handleDisconnectWallet();
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        nfts,
        connect,
        claiming,
        isLoading,
        getBalance,
        walletInfo,
        thirdWebSdk,
        isConnecting,
        isCorrectNetwork,
        claim: handleClaim,
        disconnect: handleDisconnectWallet,
        switchNetwork: handleSwitchNetwork,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
