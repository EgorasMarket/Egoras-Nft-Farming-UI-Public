import { Contract } from "@ethersproject/contracts";
import MembershipFacet from "./contracts/V3/MembershipFacet.json";
import V3ContractAddress from "./contracts/V3/V3ContractAddress.json";
import PancakeSwapFaucet from "./contracts/V3/PancakeSwapFacet.json";
import Minter from "./contracts/V3/Minter.json";
import erc20 from "./contracts/erc20.json";
import StakingFacet from "./contracts/V3/StakingFacet.json";
import PriceOracleFacet from "./contracts/V3/PriceOracleFacet.json";
const contractMembershipFacetInstance = async (signer) => {
  return new Contract(V3ContractAddress.address, MembershipFacet.abi, signer);
};
const contractPancakeSwapFacetInstance = async (signer) => {
  return new Contract(V3ContractAddress.address, PancakeSwapFaucet.abi, signer);
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
    "0x58f66d0183615797940360a43c333a44215830ba",
    Minter.abi,
    signer
  );
};
const monthlyPlanSubScribe = async (signer) => {
  try {
    const instance = await contractMembershipFacetInstance(signer);
    let result;
    result = await instance.membershipMonthlyPlan();
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      status: false,
    };
  }
};
const semiAnnuallyPlanSubScribe = async (signer) => {
  try {
    const instance = await contractMembershipFacetInstance(signer);
    let result;
    result = await instance.membershipSemiAnnuallyPlan();
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      status: false,
    };
  }
};
const annuallyPlanSubScribe = async (signer) => {
  try {
    const instance = await contractMembershipFacetInstance(signer);
    let result;
    result = await instance.membershipAnnually();
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      status: false,
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
    console.log(error);
    return {
      message: error,
      status: false,
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
    console.log(error);
    return {
      message: error,
      status: false,
    };
  }
};
const swapEusdForBnb = async (token, amountIn, amountOutMin, signer) => {
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.swapExactEUSDforBNB(token, amountIn, amountOutMin);
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      status: false,
    };
  }
};
const swapBnbForEusd = async (value, amountOutMin, tokenOut, signer) => {
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.swapExactBNBForEUSD(amountOutMin, tokenOut, {
      value,
    });

    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      status: false,
    };
  }
};
const getAmountsOut = async (amountIn, path, signer) => {
  console.log(amountIn, path, signer, "get amount out");
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.getAmountsOut(amountIn, path);
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      status: false,
    };
  }
};
const getAmountsIn = async (amountOut, path, signer) => {
  console.log(amountOut, path);
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.getAmountsIn(amountOut, path);
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      status: false,
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
    console.log(error);
    return {
      message: error,
      status: false,
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
      status: false,
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
    console.log(error);
    return {
      message: error,
      status: false,
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
    console.log(error);
    return {
      message: error,
      status: false,
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
    console.log(error);
    return {
      message: error,
      status: false,
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
    console.log(error);
    return {
      message: error,
      status: false,
    };
  }
};
const getEGCEUSDTICKERPRICE = async (_ticker, signer) => {
  try {
    const instance = await contractPriceOracleFacetInstance(signer);
    let result = await instance.price(_ticker);
    console.log(result.toString(), "result");

    return {
      message: result.toString(),
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      status: false,
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
    console.log(error);
    return {
      message: error,
      status: false,
    };
  }
};
const stakeConfig = async (signer) => {
  try {
    const instance = await contractStakingFacetInstance(signer);
    let result = await instance.stakeConfig();
    console.log(result, "result");

    return {
      message: result.toString(),
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      status: false,
    };
  }
};
const resetStakeTime = async (user, signer) => {
  try {
    const instance = await contractStakingFacetInstance(signer);
    let result = await instance.resetTakeRoyaltyTime(user);
    console.log(result, "result");

    return {
      message: result.toString(),
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      status: false,
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
  adminAddMinter,
  swapBnbForEusd,
  checkAllowanceSwap,
  unlockSwapToken,
  setPythia,
  setPriceOracle,
  setEGCUSDTicker,
  getEGCEUSDTICKERPRICE,
  getRoyaltyStats,
  stakeConfig,
  resetStakeTime,
};
