import { Contract } from "@ethersproject/contracts";
import MembershipFacet from "./contracts/V3/MembershipFacet.json";
import V3ContractAddress from "./contracts/V3/V3ContractAddress.json";
import DealersFacet from "./contracts/V3/DealersFacet.json";
import DrawFundsFacet from "./contracts/V3/DrawFundsFacet.json";
import ConvertFacet from "./contracts/V3/ConvertFacet.json";
import PancakeSwapFaucet from "./contracts/V3/PancakeSwapFacet.json";
import DiamondCut from "./contracts/V3/DiamondCut.json";
import Minter from "./contracts/V3/Minter.json";
import erc20 from "./contracts/erc20.json";
import ProductFacet from "./contracts/V3/ProductFacet.json";
import { formattedError } from "./FormattedError";
import StakingFacet from "./contracts/V3/StakingFacet.json";
import PriceOracleFacet from "./contracts/V3/PriceOracleFacet.json";
const { REACT_APP_PANCAKE_ROUTER_ADDRESS, REACT_APP_BUSD_ROUTER_ADDRESS } =
  process.env;
const contractMembershipFacetInstance = async (signer) => {
  return new Contract(V3ContractAddress.address, MembershipFacet.abi, signer);
};
const contractDealersFacetInstance = async (signer) => {
  return new Contract(V3ContractAddress.address, DealersFacet.abi, signer);
};
const contracDrawFundsFacetInstance = async (signer) => {
  return new Contract(V3ContractAddress.address, DrawFundsFacet.abi, signer);
};
const contractPancakeSwapFacetInstance = async (signer) => {
  return new Contract(V3ContractAddress.address, PancakeSwapFaucet.abi, signer);
};
const contractProductFacetInstance = (signer) => {
  return new Contract(V3ContractAddress.address, ProductFacet.abi, signer);
};
const contractConvertFacetInstance = (signer) => {
  return new Contract(V3ContractAddress.address, ConvertFacet.abi, signer);
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
    "0xBDeb3C052bD949B6E38Cb0BC9593793a78c46968",
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

const swapEusdForToken = async (amountIn, amountOutMin, path, signer) => {
  console.log(
    amountIn,
    amountOutMin,
    path,
    routerAddressArray,
    "swapEusdForToken index.js"
  );
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.swapExactEUSDForTokens(
      amountIn,
      amountOutMin,
      path,
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
const approveBusd = async (signer) => {
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.approveBUSD(
      routerAddressArray,
      "1888900999999838399393939393939"
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
const swapTokenForEusd = async (amountIn, amountOutMin, path, signer) => {
  console.log(
    amountIn,
    amountOutMin,
    path,
    routerAddressArray,
    "SwapTokensForEusd index.js"
  );
  try {
    const instance = await contractPancakeSwapFacetInstance(signer);
    let result;
    result = await instance.swapExactTokensForEUSD(
      amountIn,
      amountOutMin,
      path,
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
const adminAddMinter = async (signer) => {
  try {
    const instance = await contractAddMinterFacetInstance(signer);
    let result;
    result = await instance.addMinter(
      "0xF158d25D7D6F4a560E10eAfB1B4f477D8303B69F"
    );
    // result = await instance.addMinter(V3ContractAddress.address);
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

const setPriceOracle = async (_prices, _tickers, signer) => {
  console.log(_prices, _tickers);
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
const getPriceOracle = async (_ticker, signer) => {
  try {
    const instance = await contractPriceOracleFacetInstance(signer);
    let result = await instance.price(_ticker);
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

const setPythiaAddr = async (_pythia, signer) => {
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
const setRoyaltyAddress = async (_eusdAddr, signer) => {
  console.log(_eusdAddr);
  try {
    const instance = await contractStakingFacetInstance(signer);
    let result = await instance.setStakeRoyaltyAddress(_eusdAddr);
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

const getStakeStats = async (signer) => {
  try {
    const instance = await contractStakingFacetInstance(signer);
    let result = await instance.stakeState();
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
const setStakeConfigure = async (_egcAddr, _yearlyInterest, signer) => {
  try {
    const instance = await contractStakingFacetInstance(signer);
    let result = await instance.setStakeConfig(_egcAddr, _yearlyInterest);
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

const convertEusdEgc = async (account, amount, signer) => {
  console.log(account, amount, signer);
  try {
    const instance = await contractConvertFacetInstance(signer);
    let result = await instance.convertEUSDToEGC(account, amount);
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

const convertEgcEusd = async (account, amount, signer) => {
  console.log(account, amount, signer);
  try {
    const instance = await contractConvertFacetInstance(signer);
    let result = await instance.convertEGCToEUSD(account, amount);
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

const setTokenAddress = async (_eusd, _egc, signer) => {
  try {
    const instance = await contractProductFacetInstance(signer);
    let result = await instance.setTokenAddresses(_eusd, _egc);
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

const withdrawFunds = async (tokenAddress, recipient, amount, signer) => {
  console.log(tokenAddress, recipient, amount);
  try {
    const instance = await contracDrawFundsFacetInstance(signer);
    let result = await instance.takeFund(tokenAddress, recipient, amount);
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
const withdrawBase = async (recipient, signer) => {
  console.log(recipient);
  try {
    const instance = await contracDrawFundsFacetInstance(signer);
    let result = await instance.takeBase(recipient);
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

// const withdrawAllEgc = async (amount, signer) => {
//   console.log(amount);
//   try {
//     const instance = await contractRewardFaucetInstance(signer);
//     let result = await instance.drawEGC(
//       amount,
//       "0x4AC4fC5317F95849A1F17e2f4Daf03c32196f0cb"
//     );
//     console.log(result, "result");
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

// const BurnEgc = async (amount, signer) => {
//   try {
//     const instance = await contractMartgptFacetInstance2(signer);
//     let result = await instance.burn(amount);
//     console.log(result, "result");

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

const configureDealerPlan = async (
  _plan_a,
  _plan_b,
  _plan_c,
  _token_addres,
  _dealerSubcriptionCollector,
  signer
) => {
  console.log(
    _plan_a,
    _plan_b,
    _plan_c,
    _token_addres,
    _dealerSubcriptionCollector
  );
  try {
    const instance = await contractDealersFacetInstance(signer);
    let result = await instance.configureDealersPlan(
      _plan_a,
      _plan_b,
      _plan_c,
      _token_addres,
      _dealerSubcriptionCollector
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
const listProcurementProduct = async (
  _title,
  _amount,
  _sellingPrice,
  _qty,
  signer
) => {
  console.log(_title, _amount, _sellingPrice, _qty);
  try {
    const instance = await contractProductFacetInstance(signer);
    let result = await instance.Procurement(
      _title,
      _amount,
      _sellingPrice,
      _qty
    );
    console.log("second");
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
const voteYes = async (_productID, signer) => {
  console.log(_productID);
  try {
    const instance = await contractProductFacetInstance(signer);
    let result = await instance.YesVote(_productID);
    console.log("second");
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
const voteNo = async (_productID, signer) => {
  console.log(_productID);
  try {
    const instance = await contractProductFacetInstance(signer);
    let result = await instance.NoVote(_productID);
    console.log("second");
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
const getProcuureStats = async (_productID, signer) => {
  console.log(_productID);
  try {
    const instance = await contractProductFacetInstance(signer);
    let result = await instance.getProductStats(_productID);
    console.log("second");
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
  setPythiaAddr,
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
  getRefStats,
  monthlyPlanSubScribeRef,
  semiAnnuallyPlanSubScribeRef,
  annuallyPlanSubScribeRef,
  DiamondCutFunc,
  approveBusd,
  configureDealerPlan,
  listProcurementProduct,
  setTokenAddress,
  voteYes,
  voteNo,
  getPriceOracle,
  setStakeConfigure,
  getProcuureStats,
  convertEusdEgc,
  convertEgcEusd,
  setRoyaltyAddress,
  withdrawFunds,
  withdrawBase,
};
