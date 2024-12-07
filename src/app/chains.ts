import {
  arbitrum,
  base,
  bsc,
  mainnet,
  optimism,
  polygon,
  zksync,
} from 'viem/chains';
import { polynomial } from '../utils/custom-chains';

export const supportedChains: {
  [chainId: number]: {
    id: number;
    name: string;
    currency: {
      name: string;
      symbol: string;
      decimals: number;
      address: string;
      chainId: number;
      logoURI: string;
      chainLogoURI: string;
    };
    gasLimitForFeeCalculation: number;
    gasLimitForSendingTx: number;
    minAmountForSingleTx: number;
    maxRefuelLimitInUsd: number;
  };
} = {
  [optimism.id]: {
    id: optimism.id,
    name: optimism.name,
    currency: {
      name: optimism.nativeCurrency.name,
      symbol: optimism.nativeCurrency.symbol,
      decimals: optimism.nativeCurrency.decimals,
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      chainId: optimism.id,
      logoURI: 'https://refuel.sfo3.cdn.digitaloceanspaces.com/tokens/ETH.png',
      chainLogoURI:
        'https://refuel.sfo3.cdn.digitaloceanspaces.com/chains/OP.png',
    },
    gasLimitForFeeCalculation: 100_000,
    gasLimitForSendingTx: 100_000,
    minAmountForSingleTx: 0.0001,
    maxRefuelLimitInUsd: 10,
  },
  [bsc.id]: {
    id: bsc.id,
    name: bsc.name,
    currency: {
      name: bsc.nativeCurrency.name,
      symbol: bsc.nativeCurrency.symbol,
      decimals: bsc.nativeCurrency.decimals,
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      chainId: bsc.id,
      logoURI: 'https://refuel.sfo3.cdn.digitaloceanspaces.com/tokens/BNB.png',
      chainLogoURI:
        'https://refuel.sfo3.cdn.digitaloceanspaces.com/chains/BSC.png',
    },
    gasLimitForFeeCalculation: 60_000,
    gasLimitForSendingTx: 100_000,
    minAmountForSingleTx: 0.001,
    maxRefuelLimitInUsd: 10,
  },
  [base.id]: {
    id: base.id,
    name: base.name,
    currency: {
      name: base.nativeCurrency.name,
      symbol: base.nativeCurrency.symbol,
      decimals: base.nativeCurrency.decimals,
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      chainId: base.id,
      logoURI: 'https://refuel.sfo3.cdn.digitaloceanspaces.com/tokens/ETH.png',
      chainLogoURI:
        'https://refuel.sfo3.cdn.digitaloceanspaces.com/chains/Base.png',
    },
    gasLimitForFeeCalculation: 100_000,
    gasLimitForSendingTx: 100_000,
    minAmountForSingleTx: 0.0001,
    maxRefuelLimitInUsd: 10,
  },
  [mainnet.id]: {
    id: mainnet.id,
    name: mainnet.name,
    currency: {
      name: mainnet.nativeCurrency.name,
      symbol: mainnet.nativeCurrency.symbol,
      decimals: mainnet.nativeCurrency.decimals,
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      chainId: mainnet.id,
      logoURI: 'https://refuel.sfo3.cdn.digitaloceanspaces.com/tokens/ETH.png',
      chainLogoURI:
        'https://refuel.sfo3.cdn.digitaloceanspaces.com/chains/Ethereum.png',
    },
    gasLimitForFeeCalculation: 30_000,
    gasLimitForSendingTx: 100_000,
    minAmountForSingleTx: 0.0001,
    maxRefuelLimitInUsd: 30,
  },
  [polygon.id]: {
    id: polygon.id,
    name: polygon.name,
    currency: {
      name: polygon.nativeCurrency.name,
      symbol: polygon.nativeCurrency.symbol,
      decimals: polygon.nativeCurrency.decimals,
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      chainId: polygon.id,
      logoURI: 'https://refuel.sfo3.cdn.digitaloceanspaces.com/tokens/POL.png',
      chainLogoURI:
        'https://refuel.sfo3.cdn.digitaloceanspaces.com/chains/Polygon.png',
    },
    gasLimitForFeeCalculation: 100_000,
    gasLimitForSendingTx: 100_000,
    minAmountForSingleTx: 0.4,
    maxRefuelLimitInUsd: 10,
  },
  [arbitrum.id]: {
    id: arbitrum.id,
    name: arbitrum.name,
    currency: {
      name: arbitrum.nativeCurrency.name,
      symbol: arbitrum.nativeCurrency.symbol,
      decimals: arbitrum.nativeCurrency.decimals,
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      chainId: arbitrum.id,
      logoURI: 'https://refuel.sfo3.cdn.digitaloceanspaces.com/tokens/ETH.png',
      chainLogoURI:
        'https://refuel.sfo3.cdn.digitaloceanspaces.com/chains/Arbitrum.png',
    },
    gasLimitForFeeCalculation: 500_000,
    gasLimitForSendingTx: 500_000,
    minAmountForSingleTx: 0.0001,
    maxRefuelLimitInUsd: 10,
  },
  [zksync.id]: {
    id: zksync.id,
    name: zksync.name,
    currency: {
      name: zksync.nativeCurrency.name,
      symbol: zksync.nativeCurrency.symbol,
      decimals: zksync.nativeCurrency.decimals,
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      chainId: zksync.id,
      logoURI: 'https://refuel.sfo3.cdn.digitaloceanspaces.com/tokens/ETH.png',
      chainLogoURI:
        'https://refuel.sfo3.cdn.digitaloceanspaces.com/chains/ZkSync.png',
    },
    gasLimitForFeeCalculation: 300_000,
    gasLimitForSendingTx: 500_000,
    minAmountForSingleTx: 0.0001,
    maxRefuelLimitInUsd: 10,
  },
  [polynomial.id]: {
    id: polynomial.id,
    name: polynomial.name,
    currency: {
      name: polynomial.nativeCurrency.name,
      symbol: polynomial.nativeCurrency.symbol,
      decimals: polynomial.nativeCurrency.decimals,
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      chainId: polynomial.id,
      logoURI: 'https://refuel.sfo3.cdn.digitaloceanspaces.com/tokens/ETH.png',
      chainLogoURI:
        'https://refuel.sfo3.cdn.digitaloceanspaces.com/chains/Polynomial.png',
    },
    gasLimitForFeeCalculation: 100_000,
    gasLimitForSendingTx: 100_000,
    minAmountForSingleTx: 0.0001,
    maxRefuelLimitInUsd: 10,
  },
};

export const opChains = [optimism, base, polynomial];
