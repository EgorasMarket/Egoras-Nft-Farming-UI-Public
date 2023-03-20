import { Contract } from "@ethersproject/contracts";
import MembershipFacet from "./contracts/V3/MembershipFacet.json";
import V3ContractAddress from "./contracts/V3/V3ContractAddress.json";
const contractMembershipFacetInstance = async (signer) => {
  return new Contract(
    V3ContractAddress.address,
    MembershipFacet.abi,
    signer
  );
  
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
//  let res = await instance.configurePlan("5000000000000000000","10000000000000000000","15000000000000000000",
//       "0x133e87c6fe93301c3c4285727a6f2c73f50b9c19",
//       "0x58f66d0183615797940360a43c333a44215830ba",
//     );
    let res = await instance.membershipMonthlyPlan();
    
    //   monthlyPlan;
    // instance.Contract.monthlyPlan();
    // console.log(instance, "instance");
    // console.log(instance.monthlyPlan(), "instance.monthlyPlan");
    let result;
    //result = await instance.methods.getNextSpill();

    console.log(res, "the result ");
    // console.log(typeof instance, "typeOf instance");
  } catch (error) {
    console.log(error);
  }
};

export { monthlyPlanSubScribe };
