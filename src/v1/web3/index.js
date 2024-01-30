import { Contract } from "@ethersproject/contracts";
import erc20 from "./contracts/erc20.json";
import { formattedError } from "./FormattedError";
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
// =============================
// =============================
// =============================
const erc20Instance = (address, signer) => {
  return new Contract(address, erc20.abi, signer);
};

// =======================================================================
// =======================================================================
// =======================================================================
// ===============================convert===============================

// =======================================================================
// =======================================================================
// =======================================================================
// =======================================================================
// ===============================convert===============================
// =======================================================================

// ======================
// ======================
// ======================

// =======================================================================
// =======================================================================
// ===============================Stop V2===============================

const getEgcSmartContractBalnce = async (
  coinAddress,
  contractAddress,
  signer
) => {
  try {
    const instance = erc20Instance(coinAddress, signer);
    let result = await instance.balanceOf(contractAddress);
    return {
      message: result,
      status: true,
    };
  } catch (error) {
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

// ===========================================
// ===========================================
// ===========================================
// =========new V3 Functions==================================
const listProduct = async (
  _title,
  _amount,
  productType,
  productQuantity,
  signer
) => {
  let _isdirect = productType;
  let _qty = productQuantity;
  console.log(_title, _amount, _isdirect, _qty);

  try {
    const instance = contractProductFacetInstance(signer);
    let result;
    console.log("first");
    result = await instance.listProduct(
      _title,
      _amount.toString(),
      _qty,
      _isdirect
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

const monthly = async (amount, signer) => {
  console.log(amount);
  try {
    const instance = await contractStakingFacetInstance(signer);
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
    const instance = await contractStakingFacetInstance(signer);
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
const getConfigurationAmount = async (signer) => {
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

const getReferralBonus = async (account, signer) => {
  // console.log(_monthlyPrice, _semiAnnuallyPlan, _annuallyPlan);
  try {
    const instance = contractMembershipFacetInstance(signer);
    let result;
    result = await instance.takeReferralReward(account);
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

const callGetBurnableAmount = async (signer) => {
  // console.log(_monthlyPrice, _semiAnnuallyPlan, _annuallyPlan);
  try {
    const instance = contractMembershipFacetInstance(signer);
    let result;
    result = await instance.getBurnableAmount();
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error.response);
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};
const callGetBurntAmount = async (signer) => {
  // console.log(_monthlyPrice, _semiAnnuallyPlan, _annuallyPlan);
  try {
    const instance = contractMembershipFacetInstance(signer);
    let result;
    result = await instance.totalBurn();
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error.response);
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};

const burnToken = async (signer) => {
  // console.log(_monthlyPrice, _semiAnnuallyPlan, _annuallyPlan);
  try {
    const instance = contractMembershipFacetInstance(signer);
    let result;
    result = await instance.burn();
    console.log(result, "result, result,result,result,result");
    return {
      message: result,
      status: true,
    };
  } catch (error) {
    console.log(error.response);
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

const BuyIndirectProduct = async (account, _productID, _quantity, signer) => {
  console.log(_productID, _quantity);
  // _productID, qty
  try {
    const instance = contractProductFacetInstance(signer);
    let result;
    result = await instance.buyProduct(account, _productID, _quantity);
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

const BuyDirectProduct = async (account, _productID, _quantity, signer) => {
  console.log(account, _productID, _quantity);
  // _productID, qty
  try {
    const instance = contractProductFacetInstance(signer);
    let result;
    result = await instance.buyDirectProduct(account, _productID, _quantity);
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

const releaseFundsToSeller = async (productId, tradeId, signer) => {
  console.log(productId, tradeId, signer);

  try {
    const instance = contractProductFacetInstance(signer);
    let result;
    console.log("first");
    result = await instance.releaseProductFundToSeller(productId, tradeId);
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

// Approve Product
const approveProduct1 = async (_productID, signer) => {
  console.log(_productID, V3ContractAddress);
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
    console.log(error);
    return {
      message: formattedError(error).message,
      status: formattedError(error).status,
    };
  }
};

// Approve Product approveDirectProduct
const approveProductDirect = async (_productID, signer) => {
  console.log(_productID, V3ContractAddress, "++++++");
  try {
    const instance = contractProductFacetInstance(signer);
    let result;
    result = await instance.approveDirectProduct(_productID);
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
const checkAllowanceV3 = async (coinAddress, owner, amount, signer) => {
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
const unlockTokenV3 = async (coinAddress, amount, signer) => {
  try {
    const instance = erc20Instance(coinAddress, signer);
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

// =========new V3 Functions==================================
// ===========================================
// ===========================================
// ===========================================
// ===========================================
export {
  tokenBalance,
  getEgcSmartContractBalnce,
  listProduct,
  monthly,
  annually,
  takeRoyalty,
  configurePlan,
  getConfigurationAmount,
  getReferralBonus,
  callGetBurnableAmount,
  burnToken,
  placeBid,
  approveProduct1,
  approveProductDirect,
  AcceptBid,
  BuyIndirectProduct,
  BuyDirectProduct,
  releaseFundsToSeller,
  checkAllowanceV3,
  unlockTokenV3,
  callGetBurntAmount,
};
