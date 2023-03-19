import { Contract } from "@ethersproject/contracts";
import MembershipFacet from "./contracts/V3/MembershipFacet.json";
import V3ContractAddress from "./contracts/V3/V3ContractAddress.json";
const contractMembershipFacetInstance = async (signer) => {
  const contract = await new Contract(
    V3ContractAddress.address,
    MembershipFacet.abi,
    signer
  );
  return contract;
};
const monthlyPlanSubScribe = async (signer) => {
  // try {
  //   instance2 = contractMembershipFacetInstance(signer);
  //   console.log(instance2);
  //   let result;
  //   result = await instance2.monthlyPlan();
  //   console.log(result, "result, result,result,result,result");
  //   return {
  //     message: result,
  //     status: true,
  //   };
  // } catch (error) {
  //   console.log(error);
  //   return {
  //     message: error,
  //     status: false,
  //   };
  // }
  try {
    const instance = await contractMembershipFacetInstance(signer);
    //   monthlyPlan;
    // instance.Contract.monthlyPlan();
    // console.log(instance, "instance");
    // console.log(instance.monthlyPlan(), "instance.monthlyPlan");
    let result;
    result = await instance.monthlyPlan(
      "0x1DEDA7AC812c8D5fe5cd39FcD520B8C8271F4768"
    );
    console.log(result, "the result ");
    // console.log(typeof instance, "typeOf instance");
  } catch (error) {
    console.log(error);
  }
};

export { monthlyPlanSubScribe };
