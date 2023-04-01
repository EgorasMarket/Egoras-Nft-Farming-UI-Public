import { InjectedConnector } from "@web3-react/injected-connector";
// import { NetworkConnector } from "@web3-react/network-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
// import { InjectedConnector } from "@web3-react/injected-connector";
const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: "https://bsc-dataseed.binance.org/",
  97: "https://data-seed-prebsc-2-s1.binance.org:8545",
};

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 1337],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 56: RPC_URLS[1], 97: RPC_URLS[2] },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});
export const binanceWallet = new InjectedConnector({
  supportedChainIds: [56],
  supportedWallets: ["Binance"],
});

export const coinbaseWallet = new InjectedConnector({
  supportedChainIds: [1],
  supportedWallets: ["Coinbase Wallet"],
});
