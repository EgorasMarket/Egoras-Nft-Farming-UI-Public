import { getParsedEthersError } from "@enzoferey/ethers-error-parser";

const formattedError = (error) => {
  console.log(error);
  const parsedEthersError = getParsedEthersError(error);
  console.log(parsedEthersError);
  if (parsedEthersError.errorCode == "REJECTED_TRANSACTION") {
    return {
      message: parsedEthersError.errorCode,
      status: false,
    };
  } else {
    return {
      message: parsedEthersError.context,
      status: false,
    };
  }
};
export { formattedError };
