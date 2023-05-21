import { Contract } from "@ethersproject/contracts";
import MembershipFacet from "./contracts/V3/MembershipFacet.json";
import V3ContractAddress from "./contracts/V3/V3ContractAddress.json";
import PancakeSwapFaucet from "./contracts/V3/PancakeSwapFacet.json";
import DiamondCut from "./contracts/V3/DiamondCut.json";
import Minter from "./contracts/V3/Minter.json";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";
import erc20 from "./contracts/erc20.json";

import { formattedError } from "./FormattedError";
import StakingFacet from "./contracts/V3/StakingFacet.json";
import PriceOracleFacet from "./contracts/V3/PriceOracleFacet.json";
const { REACT_APP_PANCAKE_ROUTER_ADDRESS, REACT_APP_BUSD_ROUTER_ADDRESS } =
  process.env;
const contractMembershipFacetInstance = async (signer) => {
  return new Contract(V3ContractAddress.address, MembershipFacet.abi, signer);
};
const contractPancakeSwapFacetInstance = async (signer) => {
  return new Contract(V3ContractAddress.address, PancakeSwapFaucet.abi, signer);
};
const contractDiamondCutInstance = async (signer) => {
  return new Contract(V3ContractAddress.address, DiamondCut.abi, signer);
};
const contractPriceOracleFacetInstance = async (signer) => {
  return new Contract(V3ContractAddress.address, PriceOracleFacet.abi, signer);
};
const erc20Instance = (address, signer) => {
  return new Contract(address, erc20.abi, signer);
};
const contractStakingFacetInstance = (signer) => {
  return new Contract(V3ContractAddress.address, StakingFacet.abi, signer);
};
const contractAddMinterFacetInstance = async (signer) => {
  return new Contract(
    "0xeeec111dca00461ec4da49c09464953931aa7233",
    Minter.abi,
    signer
  );
};
const routerAddressArray = [
  REACT_APP_PANCAKE_ROUTER_ADDRESS,
  REACT_APP_BUSD_ROUTER_ADDRESS,
];
const monthlyPlanSubScribe = async (account, signer) => {
  console.log(account);
  try {
    const instance = await contractMembershipFacetInstance(signer);
    let result;
    result = await instance.membershipMonthlyPlan(account);
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const monthlyPlanSubScribeRef = async (account, _referral, signer) => {
  try {
    const instance = await contractMembershipFacetInstance(signer);
    let result;
    result = await instance.monthlyPlanWithReferral(account, _referral);
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const semiAnnuallyPlanSubScribe = async (account, signer) => {
  try {
    const instance = await contractMembershipFacetInstance(signer);
    let result;
    result = await instance.membershipSemiAnnuallyPlan(account);
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const semiAnnuallyPlanSubScribeRef = async (account, _referral, signer) => {
  try {
    const instance = await contractMembershipFacetInstance(signer);
    let result;
    result = await instance.semiAnnuallyPlanWithReferral(account, _referral);
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
// const semiAnnuallyPlanSubScribe = async (signer) => {
//   try {
//     const instance = await contractMembershipFacetInstance(signer);
//     let result;
//     result = await instance.membershipSemiAnnuallyPlan();
//     console.log(result, "result, result,result,result,result");
//     return {
//       message: result,
//       status: true,
//     };
//   } catch (error) {
//     return {
//       message: formattedError(error).message,
//       status: formattedError(error).status,
//     };
//   }
// };
const DiamondCutFunc = async (code, signer) => {
  console.log(JSON.parse(code));
  try {
    const instance = await contractDiamondCutInstance(signer);
    let result;
    result = await instance.diamondCut(
      JSON.parse(code),
      "0x0000000000000000000000000000000000000000",
      "0x"
    );
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const annuallyPlanSubScribe = async (account, signer) => {
  try {
    const instance = await contractMembershipFacetInstance(signer);
    let result;
    result = await instance.membershipAnnually(account);
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const annuallyPlanSubScribeRef = async (account, _referral, signer) => {
  try {
    const instance = await contractMembershipFacetInstance(signer);
    let result;
    result = await instance.annuallyWithReferral(account, _referral);
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const getRefStats = async (user, signer) => {
  try {
    const instance = await contractMembershipFacetInstance(signer);
    let result;
    result = await instance.referralStats(user);
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const SwapRouterAddress = async (
  _pancakeRouterAddress,
  _busdPancakeAddress,
  signer
) => {
  console.log(_pancakeRouterAddress, _busdPancakeAddress);
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.setRouterAddress(
      _pancakeRouterAddress,
      _busdPancakeAddress
    );
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const getBNBAddress = async (signer) => {
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.getWethAddress();
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const swapEusdForToken = async (signer) => {
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);

    const result = await instance.swapExactEUSDForTokens(
      "1825000000000000000",
      "229784542853142607",
      [
        "0xeeec111dca00461ec4da49c09464953931aa7233",
        "0xd68e5C52F7563486CC1A15D00eFA12C8644a907e",
      ],
      routerAddressArray
    );
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
// const swapEusdForToken = async (amountIn, amountOutMin, path, signer) => {
//   try {
//     const instance = await contractPancakeSwapFacetInstance(signer);
//     let result;
//     result = await instance.swapExactEUSDForTokens(
//       amountIn,
//       amountOutMin,
//       path,
//       routerAddressArray
//     );
//     console.log(result, "result, result,result,result,result");
//     return {
//       message: result,
//       status: true,
//     };
//   } catch (error) {
//     return {
//       message: formattedError(error).message,
//       status: formattedError(error).status,
//     };
//   }
// };
const swapTokenForEusd = async (signer) => {
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.swapExactTokensForEUSD(
      "342922356416837100",
      "2737500000000000000",
      [
        "0xd68e5C52F7563486CC1A15D00eFA12C8644a907e",
        "0xeeec111dca00461ec4da49c09464953931aa7233",
      ],
      routerAddressArray
    );
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
// const swapTokenForEusd = async (amountIn, amountOutMin, path, signer) => {
//   try {
//     const instance = await contractPancakeSwapFacetInstance(signer);
//     let result;
//     result = await instance.swapExactTokensForEUSD(
//       amountIn,
//       amountOutMin,
//       path,
//       routerAddressArray
//     );
//     console.log(result, "result, result,result,result,result");
//     return {
//       message: result,
//       status: true,
//     };
//   } catch (error) {
//     return {
//       message: formattedError(error).message,
//       status: formattedError(error).status,
//     };
//   }
// };
const swapEusdForBnb = async (token, amountIn, amountOutMin, signer) => {
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.swapExactEUSDforBNB(
      token,
      amountIn,
      amountOutMin,
      routerAddressArray
    );
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const swapBnbForEusd = async (value, amountOutMin, tokenOut, signer) => {
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.swapExactBNBForEUSD(
      amountOutMin,
      tokenOut,
      routerAddressArray,
      {
        value,
      }
    );

    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const getAmountsOut = async (amountIn, path, signer) => {
  console.log(amountIn, path, signer, "get amount out");
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.getAmountsOut(amountIn, path, routerAddressArray);
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const getAmountsIn = async (amountOut, path, signer) => {
  console.log(amountOut, path);
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.getAmountsIn(amountOut, path, routerAddressArray);
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const adminAddMinter = async (account, signer) => {
  console.log(account);
  try {
    const instance = await contractAddMinterFacetInstance(signer);
    let result;
    result = await instance.addMinter(account);
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const checkAllowanceSwap = async (coinAddress, owner, amount, signer) => {
  try {
    const instance = erc20Instance(coinAddress, signer);
    let result = await instance.allowance(owner, V3ContractAddress.address);

    if (parseFloat(result.toString()) >= parseFloat(amount.toString())) {
      return {
        status: true,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const unlockSwapToken = async (amount, signer) => {
  try {
    const instance = erc20Instance(
      "0x58f66d0183615797940360a43c333a44215830ba",
      signer
    );
    let result = await instance.approve(V3ContractAddress.address, amount);
    return {
      message: result.hash,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const setPriceOracle = async (_prices, _tickers, signer) => {
  try {
    const instance = await contractPriceOracleFacetInstance(signer);
    let result = await instance.updateTickerPrices(_prices, _tickers);
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};

const setPythia = async (_pythia, signer) => {
  try {
    const instance = await contractPriceOracleFacetInstance(signer);
    let result = await instance.setPythia(_pythia);
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};

const suspendPythia = async (_pythia, signer) => {
  try {
    const instance = await contractPriceOracleFacetInstance(signer);
    let result = await instance.suspendPythia(_pythia);
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};

const setEGCUSDTicker = async (_ticker, signer) => {
  try {
    const instance = await contractPriceOracleFacetInstance(signer);
    let result = await instance.setEGCUSDTicker(_ticker);
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const getEGCEUSDTICKERPRICE = async (_ticker, signer) => {
  try {
    const instance = await contractPriceOracleFacetInstance(signer);
    let result = await instance.price(_ticker);
    console.log(result.toString(), "result");

    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const getRoyaltyStats = async (user, signer) => {
  try {
    const instance = await contractStakingFacetInstance(signer);
    let result = await instance.royaltyStats(user);
    console.log(result.toString(), "result");

    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const stakeConfig = async (signer) => {
  try {
    const instance = await contractStakingFacetInstance(signer);
    let result = await instance.stakeConfig();
    console.log(result, "result");

    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const resetStakeTime = async (user, signer) => {
  try {
    const instance = await contractStakingFacetInstance(signer);
    let result = await instance.resetTakeRoyaltyTime(user);
    console.log(result, "result");

    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const getCalculatedRoyalty = async (user, signer) => {
  console.log(user, signer, "getcalculatedRoyalty");
  try {
    const instance = contractStakingFacetInstance(signer);
    let result = await instance.calculateRoyalty(user);
    console.log(result, "result");

    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const IncreaseRoyaltyTime = async (user, signer) => {
  try {
    const instance = await contractStakingFacetInstance(signer);
    let result = await instance.increaseTakeRoyaltyTime(user);
    console.log(result, "result");

    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const UnlockLockedStake = async (signer) => {
  try {
    const instance = await contractStakingFacetInstance(signer);
    let result = await instance.unstake();
    console.log(result, "result");

    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const unlockStakeEgcToken = async (amount, signer) => {
  try {
    const instance = erc20Instance(
      "0x133e87c6fe93301c3c4285727a6f2c73f50b9c19",
      signer
    );
    let result = await instance.approve(V3ContractAddress.address, amount);
    return {
      message: result.hash,
      status: true,
    };
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};

const checkAllowanceStake = async (owner, amount, signer) => {
  try {
    const instance = erc20Instance(
      "0x133e87c6fe93301c3c4285727a6f2c73f50b9c19",
      signer
    );
    let result = await instance.allowance(owner, V3ContractAddress.address);

    if (parseFloat(result.toString()) >= parseFloat(amount.toString())) {
      return {
        status: true,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};

export {
  monthlyPlanSubScribe,
  semiAnnuallyPlanSubScribe,
  annuallyPlanSubScribe,
  SwapRouterAddress,
  getBNBAddress,
  getAmountsOut,
  getAmountsIn,
  swapEusdForBnb,
  swapEusdForToken,
  swapTokenForEusd,
  adminAddMinter,
  swapBnbForEusd,
  checkAllowanceSwap,
  unlockSwapToken,
  setPythia,
  suspendPythia,
  setPriceOracle,
  setEGCUSDTicker,
  getEGCEUSDTICKERPRICE,
  getRoyaltyStats,
  stakeConfig,
  resetStakeTime,
  getCalculatedRoyalty,
  IncreaseRoyaltyTime,
  UnlockLockedStake,
  unlockStakeEgcToken,
  checkAllowanceStake,
  getRefStats,
  monthlyPlanSubScribeRef,
  semiAnnuallyPlanSubScribeRef,
  annuallyPlanSubScribeRef,
  DiamondCutFunc,
};
