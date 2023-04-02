import { Contract } from "@ethersproject/contracts";
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";
import ORACLE from "./contracts/Price.json";
import LOAN from "./contracts/Loan.json";
import EX from "./contracts/exchange.json";
import erc20 from "./contracts/erc20.json";
import erc22 from "./contracts/erc22.json";
import { formattedError } from "./FormattedError";
import EgorasLoanV2Facet from "./contracts/V2/EgorasLoanV2Facet.json";
import EgorasLoanV2AdditionalFiles from "./contracts/V2/EgorasLoanV2AdditionalFiles.json";
import EgorasLoanV2ReferralFacet from "./contracts/V2/EgorasLoanV2ReferralFacet.json";
import EgorasPriceOracleFacet from "./contracts/EgorasPriceOracleFacet.json";
import EgorasSwapFacet from "./contracts/EgorasSwapFacet.json";
import COINS from "./contracts/V2/coins.json";
import Contract_Address from "./contracts/Contract_Address.json";

import V3ContractAddress from "./contracts/V3/V3ContractAddress.json";
// ===============
// ===============
// ===============
// ====================new v3 contracts =================
import ProductFacet from "./contracts/V3/ProductFacet.json";
import StakingFacet from "./contracts/V3/StakingFacet.json";
import MembershipFacet from "./contracts/V3/MembershipFacet.json";
// ====================new v3 contracts =================
// =============================
// =============================
// ========new V3 instances =====================
const contractProductFacetInstance = (signer) => {
  return new Contract(V3ContractAddress.address, ProductFacet.abi, signer);
};
const contractStakingFacetInstance = (signer) => {
  return new Contract(V3ContractAddress.address, StakingFacet.abi, signer);
};
const contractMembershipFacetInstance = (signer) => {
  console.log(V3ContractAddress.address, MembershipFacet.abi);
  return new Contract(V3ContractAddress.address, MembershipFacet.abi, signer);
};

// ========new V3 instances =====================
// =============================
// =============================
// =============================
const dynamicInstance = (signer, abi, address) => {
  return new Contract(address, abi, signer);
};
const contractInstance = (signer) => {
  return new Contract(LOAN.address, LOAN.abi, signer);
};
const contractEgorasLoanV2Instance = (signer) => {
  return new Contract(EgorasLoanV2Facet.address, EgorasLoanV2Facet.abi, signer);
};
const contractEgorasLoanV2AdditionalFilesInstance = (signer) => {
  return new Contract(
    EgorasLoanV2AdditionalFiles.address,
    EgorasLoanV2AdditionalFiles.abi,
    signer
  );
};
const contractEgorasLoanV2ReferralFacet = (signer) => {
  return new Contract(
    EgorasLoanV2ReferralFacet.address,
    EgorasLoanV2ReferralFacet.abi,
    signer
  );
};
const initContract = async (baseAddress, tokenAddress, ticker, signer) => {
  try {
    const instance = dynamicInstance(
      signer,
      EgorasSwapFacet.abi,
      Contract_Address.address
    );

    let result = await instance.initContructor(
      Contract_Address.address,
      baseAddress,
      tokenAddress,
      ticker
    );
    return {
      message: result.hash,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message:
        typeof error.data === "undefined" ? error.message : error.data.message,
      status: false,
    };
  }
};
const contractEXInstance = (signer) => {
  return new Contract(EX.address, EX.abi, signer);
};

const contractOracleInstance = (signer) => {
  return new Contract(ORACLE.address, ORACLE.abi, signer);
};

const erc20Instance = (address, signer) => {
  return new Contract(address, erc20.abi, signer);
};
const erc20Instance2 = (signer, coin) => {
  console.log(erc22, coin, "IN");
  let address = "";
  switch (coin) {
    case "egr":
      address = erc22.egr;
      break;
    case "engn":
      address = erc22.engn;
      break;
    case "egc":
      address = erc22.egc;
      break;
    case "eusd":
      address = erc22.eusd;
      break;
    default:
      break;
  }
  console.log(address, "GS");
  return new Contract(address, erc22.abi, signer);
};
const transactReceipt = async (hash, library) => {
  try {
    let result = await library.getTransactionReceipt(hash);

    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: error,
      status: false,
    };
  }
};

const getPrice = async (ticker, signer) => {
  try {
    const instance = contractOracleInstance(signer);
    let result = await instance.price(ticker + "-XX");
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

const repay = async (id, amoumt, isDefault, signer) => {
  console.log(id, amoumt, isDefault, "Payback");
  try {
    const instance = contractInstance(signer);

    let result = await instance.repay(id, amoumt, isDefault, false);

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

const open = async (isDefault, collateral, amoumt, ticker, signer) => {
  console.log(isDefault, collateral, amoumt, ticker, "max man");
  try {
    const instance = contractInstance(signer);
    let result;
    if (isDefault) {
      result = await instance.openDefaultAsset(amoumt, ticker + "-XX", {
        value: collateral,
      });
    } else {
      result = await instance.open(collateral, amoumt, ticker + "-XX");
    }

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
// =======================================================================
// =======================================================================
// =======================================================================
// ===============================convert===============================

const getPriceImpl = async (ticker, signer) => {
  try {
    const instance = dynamicInstance(
      signer,
      EgorasPriceOracleFacet.abi,
      Contract_Address.address
    );
    let result = await instance.price(ticker);
    console.log(result);
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message:
        typeof error.data == "undefined" ? error.message : error.data.message,
      status: false,
    };
  }
};

const swapBase = async (amount, isBase, signer) => {
  try {
    const instance = dynamicInstance(
      signer,
      EgorasSwapFacet.abi,
      Contract_Address.address
    );
    let result = await instance.getToken(amount);
    return {
      message: result.hash,
      status: true,
    };
  } catch (error) {
    return {
      message:
        typeof error.data == "undefined" ? error.message : error.data.message,
      status: false,
    };
  }
};

const swapImpl = async (amount, isBase, signer) => {
  try {
    const instance = dynamicInstance(
      signer,
      EgorasSwapFacet.abi,
      Contract_Address.address
    );
    let result = await instance.swap(amount, isBase);
    return {
      message: result.hash,
      status: true,
    };
  } catch (error) {
    return {
      message:
        typeof error.data == "undefined" ? error.message : error.data.message,
      status: false,
    };
  }
};
// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
// ===============================convert===============================
// =======================================================================

// =======================================================================
// =======================================================================
// =======================================================================
// ===============================Start V2===============================
// =======================================================================

const lendUS = async (branch, amount, loanID, signer) => {
  try {
    const instance = contractEgorasLoanV2Instance(signer);
    let result;
    result = await instance.lendUS(branch, amount, loanID);
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error.message, "errorr message index");
    if (
      error.message ===
      "execution reverted: Already a lender, you can only top up!"
    ) {
      console.log("you have leneded now backup");
      try {
        const instance = contractEgorasLoanV2Instance(signer);
        let result;
        result = await instance.topupLend(loanID, amount);
        return {
          message: result,
          status: true,
        };
      } catch (error) {
        console.log(error.data, "errorr message index");
        return {
          message: error,
          status: false,
        };
      }
    } else {
      return {
        message: error,
        status: false,
      };
    }
  }
};
const takeDividend = async (loanID, signer) => {
  console.log(loanID, "9989i8789768970968578697968574");
  try {
    const instance = contractEgorasLoanV2Instance(signer);
    let result;
    result = await instance.takeDividend(loanID);
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
const takeBackLoan = async (loanID, signer) => {
  try {
    const instance = contractEgorasLoanV2Instance(signer);
    let result;
    result = await instance.takeBackLoan(loanID);
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
const getTotalLended = async (loanID, signer) => {
  try {
    const instance = contractEgorasLoanV2Instance(signer);
    let result;
    result = await instance.getTotalLended(loanID);
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
const getInvestorsDividend = async (loanID, user, signer) => {
  try {
    const instance = contractEgorasLoanV2Instance(signer);
    let result;
    result = await instance.getInvestorsDividend(loanID, user);
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

const userStats = async (loanID, user, signer) => {
  try {
    const instance = contractEgorasLoanV2Instance(signer);
    let result;
    result = await instance.userStats(loanID, user);
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
const system = async (signer) => {
  try {
    const instance = contractEgorasLoanV2Instance(signer);
    let result;
    result = await instance.system();
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
const burnAccumulatedDividend = async (signer) => {
  try {
    const instance = contractEgorasLoanV2Instance(signer);
    let result;
    result = await instance.burnAccumulatedDividend();
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

// ======================
// ======================
// ======================
// ===========Referral system start================

// function lend(uint amount, address branch, uint loanID, bool isWelcomebonus)

const lend = async (amount, branch, loanID, isWelcomebonus, signer) => {
  try {
    const instance = contractEgorasLoanV2ReferralFacet(signer);
    let result;
    result = await instance.lend(amount, branch, loanID, isWelcomebonus);
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error.message, "errorr message index");
    if (
      error.data.message ===
      "execution reverted: Already a lender, you can only top up!"
    ) {
      console.log("you have leneded now backup");
      try {
        //    function topup(uint amount,uint loanID, bool isWelcomebonus)
        const instance = contractEgorasLoanV2ReferralFacet(signer);
        let result;
        result = await instance.topup(amount, loanID, isWelcomebonus);
        return {
          message: result,
          status: true,
        };
      } catch (error) {
        console.log(error.data, "errorr message index");
        return {
          message: error,
          status: false,
        };
      }
    } else {
      return {
        message: error,
        status: false,
      };
    }
  }
};

//  function getMyReferrals(address _upline) external view returns(address[] memory _referrals)

const getReferrals = async (_upline, signer) => {
  try {
    const instance = contractEgorasLoanV2ReferralFacet(signer);
    let result;
    result = await instance.getReferrals(_upline);
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
// getMyReferralsCount(address _upline)
const getMyReferralsCount = async (_upline, signer) => {
  try {
    const instance = contractEgorasLoanV2ReferralFacet(signer);
    let result;
    result = await instance.getMyReferralsCount(_upline);
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
// getUserStats(address _user)
const getUserStats = async (_user, signer) => {
  try {
    const instance = contractEgorasLoanV2ReferralFacet(signer);
    let result;
    result = await instance.getUserStats(_user);
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
const getNextDate = async (_loanID, _user, signer) => {
  try {
    const instance = contractEgorasLoanV2AdditionalFilesInstance(signer);
    let result;
    result = await instance.getNextDate(_loanID, _user);
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
const takeLoanByBranch = async (_loanID, signer) => {
  try {
    const instance = contractEgorasLoanV2AdditionalFilesInstance(signer);
    let result;
    result = await instance.takeLoanByBranch(_loanID);
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
const repayOnlyLoan = async (_loanID, signer) => {
  try {
    const instance = contractEgorasLoanV2Instance(signer);
    let result;
    result = await instance.repayOnlyLoan(_loanID);
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
const repayDividendLoan = async (_loanID, signer) => {
  try {
    const instance = contractEgorasLoanV2Instance(signer);
    let result;
    result = await instance.repayDividendLoan(_loanID);
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
const burnNFT = async (_loanID, signer) => {
  try {
    const instance = contractEgorasLoanV2Instance(signer);
    let result;
    result = await instance.burnNFT(_loanID);
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
// =========================================

// =======================================================================
// =======================================================================
// ===============================Stop V2===============================
const draw = async (id, amount, signer) => {
  try {
    const instance = contractInstance(signer);
    let result;
    result = await instance.draw(id, amount);
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

const topup = async (isDefault, id, ticker, collateral, signer) => {
  console.log(isDefault, id, ticker, collateral);
  try {
    const instance = contractInstance(signer);
    let result;
    if (isDefault) {
      result = await instance.topupDefaultAsset(id, ticker + "-XX", {
        value: collateral,
      });
    } else {
      result = await instance.topup(id, ticker + "-XX", collateral);
    }
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: error,
      status: false,
    };
  }
};

const getLatestLoan = async (user, ticker, signer) => {
  try {
    const instance = contractInstance(signer);

    let result = await instance.___pendingLoan(user, ticker + "-XX");

    if (result == true) {
      let loan = await instance.__getLoanInfo(ticker + "-XX", user);
      return {
        message: result,
        loanDetails: loan,
        status: true,
      };
    } else {
      return {
        message: result,
        status: true,
      };
    }
  } catch (error) {
    return {
      message: error,
      status: false,
    };
  }
};

const getTickerInfo = async (ticker, signer) => {
  try {
    const instance = contractInstance(signer);
    let result = await instance.__tickerInfo(ticker + "-XX");

    return {
      message: result,
      status: true,
    };
  } catch (error) {
    return {
      message: error,
      status: false,
    };
  }
};

const checkAllowance = async (address, owner, amount, signer) => {
  try {
    const instance = erc20Instance(address, signer);
    let result = await instance.allowance(owner, LOAN.address);

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

const checkAllowanceL = async (owner, amount, signer) => {
  try {
    const instance = erc20Instance(COINS.engn, signer);
    let result = await instance.allowance(owner, EgorasLoanV2Facet.address);

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
const getEgcSmartContractBalnce = async (
  coinAddress,
  contractAddress,
  signer
) => {
  try {
    const instance = erc20Instance(coinAddress, signer);
    let result = await instance.balanceOf(contractAddress);
    return {
      message: result.toString(),
      status: true,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};

const unluckToken2 = async (amount, signer) => {
  try {
    const instance = erc20Instance(COINS.engn, signer);
    let result = await instance.approve(EgorasLoanV2Facet.address, amount);
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

const unluckToken = async (address, amount, signer) => {
  console.log();
  try {
    const instance = erc20Instance(address, signer);
    let result = await instance.approve(LOAN.address, amount);
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
const unluckToken3 = async (amount, signer, coin) => {
  console.log(amount, signer, coin);
  try {
    const instance = erc20Instance2(signer, coin);
    let result = await instance.approve(Contract_Address.address, amount);
    return {
      message: result.hash,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message:
        typeof error.data == "undefined" ? error.message : error.data.message,
      status: false,
    };
  }
};
const checkAllowance2 = async (owner, amount, signer, coin) => {
  console.log(
    owner,
    amount,
    coin,
    signer,
    Contract_Address.address,
    "THE alloancw"
  );
  try {
    const instance = erc20Instance2(signer, coin);

    let result = await instance.allowance(owner, Contract_Address.address);
    console.log(result.toString(), "Allowance check!", amount.toString());
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
    console.log(error);
    return {
      status: false,
    };
  }
};
const tokenBalance = async (address, account, signer) => {
  try {
    const instance = erc20Instance(address, signer);
    let result = await instance.balanceOf(account);

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

/////////////////// Exchange ////////////////////////
const exchange = async (ticker, amoumt, isBase, signer) => {
  try {
    const instance = contractEXInstance(signer);

    let result = await instance.exchange(ticker + "-XX", amoumt, isBase);

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

const getDefault = async (ticker, amoumt, signer) => {
  try {
    const instance = contractEXInstance(signer);

    let result = await instance.getDefault(ticker + "-XX", amoumt);

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

const withdrawable = async (ticker, isDefault, _provider, signer) => {
  try {
    const instance = contractEXInstance(signer);

    let result = await instance.withdrawable(
      ticker + "-XX",
      isDefault,
      _provider
    );

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

const removeLiquidity = async (ticker, signer) => {
  try {
    const instance = contractEXInstance(signer);

    let result = await instance.removeLiquidity(ticker + "-XX");

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

const addLiquidity = async (ticker, amoumt, signer) => {
  try {
    const instance = contractEXInstance(signer);

    console.log(amoumt, ticker);
    let result = await instance.addLiquidity(ticker + "-XX", {
      value: amoumt,
    });

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
const exchangeDefault = async (ticker, amoumt, signer) => {
  console.log(ticker, amoumt, "GET THE DEFAULT");
  try {
    const instance = contractEXInstance(signer);

    let result = await instance.exchangeDefault(ticker + "-XX", {
      value: amoumt,
    });

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

const crossexchange = async (from, to, amoumt, signer) => {
  console.log(from, to, amoumt);
  try {
    const instance = contractEXInstance(signer);

    let result = await instance.crossExchange(
      from + "-XX",
      to + "-XX",
      amoumt,
      { value: 0 }
    );

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
// ===========================================
// ===========================================
// ===========================================
// =========new V3 Functions==================================
const listProduct = async (_title, _amount, signer) => {
  console.log(_title, _amount);
  try {
    const instance = contractProductFacetInstance(signer);
    let result;
    result = await instance.listProduct(_title, _amount);
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
const monthly = async (amount, signer) => {
  console.log(amount);
  try {
    const instance = contractStakingFacetInstance(signer);
    let result;
    result = await instance.monthly(amount);
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
const annually = async (amount, signer) => {
  console.log(amount);
  try {
    const instance = contractStakingFacetInstance(signer);
    let result;
    result = await instance.annually(amount);
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
const takeRoyalty = async (signer) => {
  // console.log(amount);
  try {
    const instance = await contractStakingFacetInstance(signer);
    let result;
    result = await instance.takeRoyalty();
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
const configurePlan = async (
  _monthlyPrice,
  _semiAnnuallyPlan,
  _annuallyPlan,
  _egc,
  _eusd,
  signer
) => {
  console.log(_monthlyPrice, _semiAnnuallyPlan, _annuallyPlan, _egc, _eusd);
  try {
    const instance = contractMembershipFacetInstance(signer);
    let result;
    result = await instance.configurePlan(
      _monthlyPrice,
      _semiAnnuallyPlan,
      _annuallyPlan,
      _egc,
      _eusd
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
const getConfiguration = async (signer) => {
  // console.log(_monthlyPrice, _semiAnnuallyPlan, _annuallyPlan);
  try {
    const instance = contractMembershipFacetInstance(signer);
    let result;
    result = await instance.getConfiguration();
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

const AcceptBid = async (_productID, signer) => {
  // console.log(_monthlyPrice, _semiAnnuallyPlan, _annuallyPlan);
  try {
    const instance = contractProductFacetInstance(signer);
    let result;
    result = await instance.acceptBid(_productID);
    console.log(result, "result from newnation");
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

// const monthlyPlan = async (_referral, signer) => {
//   console.log(_referral);
//   try {
//     const instance = contractMembershipFacetInstance(signer);
//     let result;
//     result = await instance.monthlyPlan();
//     console.log(result, "result, result,result,result,result");
//     return {
//       message: result,
//       status: true,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       message: error,
//       status: false,
//     };
//   }
// };

// const semiAnnuallyPlan = async (signer) => {
//   try {
//     const instance = contractMembershipFacetInstance(signer);
//     let result;
//     result = await instance.semiAnnuallyPlan();
//     console.log(result, "result, result,result,result,result");
//     return {
//       message: result,
//       status: true,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       message: error,
//       status: false,
//     };
//   }
// };

// =============== Admin Action =======================
// Bid For Product
const placeBid = async (_productID, _amount, signer) => {
  console.log(_productID, _amount);
  try {
    const instance = contractProductFacetInstance(signer);
    let result;
    result = await instance.bid(_productID, _amount);
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
const unlockMemberShipEgcToken = async (amount, signer) => {
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

// Approve Product
const approveProduct = async (_productID, signer) => {
  console.log(_productID);
  try {
    const instance = contractProductFacetInstance(signer);
    let result;
    result = await instance.approveProduct(_productID);
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
const checkAllowanceMembership = async (owner, amount, signer) => {
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

// =========new V3 Functions==================================
// ===========================================
// ===========================================
// ===========================================
// ===========================================
export {
  getPrice,
  unluckToken,
  unluckToken3,
  checkAllowance,
  transactReceipt,
  getTickerInfo,
  tokenBalance,
  open,
  getLatestLoan,
  repay,
  topup,
  draw,
  checkAllowance2,
  exchange,
  addLiquidity,
  withdrawable,
  removeLiquidity,
  exchangeDefault,
  getDefault,
  crossexchange,
  lendUS,
  takeDividend,
  takeBackLoan,
  getTotalLended,
  getInvestorsDividend,
  userStats,
  system,
  initContract,
  checkAllowanceL,
  unluckToken2,
  burnAccumulatedDividend,
  getPriceImpl,
  swapBase,
  swapImpl,
  getEgcSmartContractBalnce,
  getReferrals,
  getMyReferralsCount,
  getUserStats,
  takeLoanByBranch,
  getNextDate,
  lend,
  repayOnlyLoan,
  repayDividendLoan,
  burnNFT,
  listProduct,
  monthly,
  annually,
  takeRoyalty,
  configurePlan,
  getConfiguration,
  // monthlyPlan,
  // semiAnnuallyPlan,
  placeBid,
  approveProduct,
  AcceptBid,
  unlockMemberShipEgcToken,
  checkAllowanceMembership,
};
