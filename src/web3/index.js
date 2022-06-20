import { Contract } from "@ethersproject/contracts";
import ORACLE from "./contracts/Price.json";
import LOAN from "./contracts/Loan.json";
import EX from "./contracts/exchange.json";
import erc20 from "./contracts/erc20.json";

const contractInstance = (signer) => {
  return new Contract(LOAN.address, LOAN.abi, signer);
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
    let result = await instance.price(ticker);
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

    let result = await instance.repay(id, amoumt, isDefault);

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
      result = await instance.openDefaultAsset(amoumt, ticker, {
        value: collateral,
      });
    } else {
      result = await instance.open(collateral, amoumt, ticker);
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
  try {
    const instance = contractInstance(signer);
    let result;
    if (isDefault) {
      result = await instance.topupDefaultAsset(id, ticker, {
        value: collateral,
      });
    } else {
      result = await instance.topup(id, ticker, collateral);
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

    let result = await instance.___pendingLoan(user, ticker);

    if (result == true) {
      let loan = await instance.__getLoanInfo(ticker, user);
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
    let result = await instance.__tickerInfo(ticker);

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

    let result = await instance.exchange(ticker, amoumt, isBase);

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

    let result = await instance.getDefault(ticker, amoumt);

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

    let result = await instance.withdrawable(ticker, isDefault, _provider);

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

    let result = await instance.removeLiquidity(ticker);

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

const addLiquidity = async (ticker, amount, signer) => {
  try {
    const instance = contractEXInstance(signer);

    let result = await instance.addLiquidity(ticker, { value: amount });

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
  try {
    const instance = contractEXInstance(signer);

    let result = await instance.exchangeDefault(ticker, { value: amoumt });

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

    let result = await instance.crossExchange(from, to, amoumt, { value: 0 });

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

export {
  getPrice,
  unluckToken,
  checkAllowance,
  transactReceipt,
  getTickerInfo,
  tokenBalance,
  open,
  getLatestLoan,
  repay,
  topup,
  draw,
  exchange,
  addLiquidity,
  withdrawable,
  removeLiquidity,
  exchangeDefault,
  getDefault,
  crossexchange,
};
