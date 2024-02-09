import { Contract } from "@ethersproject/contracts";
import Swap from "./contracts/V3/SwapNewFacet.json";
import V3ContractAddress from "./contracts/V3/V3ContractAddress.json";
import { formattedError } from "./FormattedError";
const { REACT_APP_PANCAKE_ROUTER_ADDRESS, REACT_APP_BUSD_ROUTER_ADDRESS } =
  process.env;

const contractSwapFacetInstance = async (signer) => {
  return new Contract(V3ContractAddress.address, Swap.abi, signer);
};

const ListAsset = async (_ticker, _token_address, _base_address, signer) => {
  console.log(_ticker, _token_address, _base_address);
  try {
    const instance = await contractSwapFacetInstance(signer);
    let result;
    result = await instance.listAssetEx(_ticker, _token_address, _base_address);
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
const setSwapFee = async (_fee, signer) => {
  console.log(_fee);
  try {
    const instance = await contractSwapFacetInstance(signer);
    let result;
    result = await instance.setFee(_fee);
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
const addLiquidity = async (_baseInamount, _tokenInamount, _ticker, signer) => {
  console.log(_baseInamount, _tokenInamount, _ticker);
  try {
    const instance = await contractSwapFacetInstance(signer);
    let result;
    result = await instance.addLiquidity(
      _baseInamount,
      _tokenInamount,
      _ticker
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
const removeLiquidity = async (_ticker, signer) => {
  console.log(_ticker);
  try {
    const instance = await contractSwapFacetInstance(signer);
    let result;
    result = await instance.removeLiquidity(_ticker);
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
const swapBase = async (_amount, _ticker, signer) => {
  console.log(_amount, _ticker);
  try {
    const instance = await contractSwapFacetInstance(signer);
    let result;
    result = await instance.getBaseEx(_amount, _ticker);
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
const swapToken = async (_amount, _ticker, signer) => {
  console.log(_amount, _ticker);
  try {
    const instance = await contractSwapFacetInstance(signer);
    let result;
    result = await instance.getTokenEx(_amount, _ticker);
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
const getUserSwapStats = async (_user, _ticker, signer) => {
  console.log(_user, _ticker);
  try {
    const instance = await contractSwapFacetInstance(signer);
    let result;
    result = await instance.getUserTotalSwap(_user, _ticker);
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

export {
  ListAsset,
  setSwapFee,
  addLiquidity,
  swapBase,
  swapToken,
  getUserSwapStats,
  removeLiquidity,
};
