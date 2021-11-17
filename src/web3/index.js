import { Contract } from '@ethersproject/contracts'
import ORACLE  from "./contracts/Price.json";
import LOAN  from "./contracts/Loan.json";
import erc20  from "./contracts/erc20.json";


  const contractInstance = (signer) => {
    return new Contract(LOAN.address, LOAN.abi, signer);
  };

 const contractOracleInstance = (signer) => {
    return new Contract(ORACLE.address, ORACLE.abi, signer);
  };
  
  const erc20Instance = (address, signer) => {
    return new Contract(address, erc20.abi, signer);
  };












const transactReceipt = async (hash, library) =>{
  try {
    let result = await library.getTransactionReceipt(hash);
    console.log(result , "The receipt");
    return {
      message: result,
    status: true,
    }
  } catch (error) {
    return {
      message: error,
      status: false,
    };
  }
  
}




  const getPrice = async (ticker, signer) => {
    try {
      const instance = contractOracleInstance(signer);
      let result = await instance.price(ticker);
      return {
        message: result,
        status: true,
      }
     } catch (error) {
      return {
        message: error,
        status: false,
      };
     }
  }
 const open = async (collateral, amoumt, ticker, signer) =>{
    try {
      const instance = contractInstance(signer);
      let result = await instance.open(collateral, amoumt, ticker);
     
      return {
        message: result,
        status: true,
      }
     } catch (error) {
       console.log(error);
      return {
        message: error,
        status: false,
      };
     }
 }
 const getTickerInfo = async (ticker, signer) => {
  
    try {
      const instance = contractInstance(signer);
      let result = await instance.__tickerInfo(ticker);
      
      return {
        message: result,
        status: true,
      }
     } catch (error) {
       console.log(error);
      return {
        message: error,
        status: false,
      };
     }
  }

  const checkAllowance = async (address, owner, amount, signer) =>{
    try {
      const instance = erc20Instance(address, signer);
      let result = await instance.allowance(owner, LOAN.address);
  
      if (parseFloat(result.toString()) >= parseFloat(amount.toString())) {
        return {
        status: true,
        }
      }else{
        return {
          status: false,
          }
      }
     
    } catch (error) {
      return {
        status: false,
        }
    }
  }
  const unluckToken = async(address, amount, signer) => {
    try {
      const instance = erc20Instance(address, signer);
      let result = await instance.approve(LOAN.address, amount);
      return {
        message: result.hash,
        status: true,
      }
    } catch (error) {
      console.log(error);
      return {
        message: error,
        status: false,
      };
    }
  }


   const tokenBalance = async(address, account, signer) => {
    try {
      const instance = erc20Instance(address, signer);
      let result = await instance.balanceOf(account);
     
      return {
        message: result,
        status: true,
      }
    } catch (error) {
      console.log(error);
      return {
        message: error,
        status: false,
      };
    }
  }

 
   
  

     

   export {
    getPrice,
    unluckToken,
    checkAllowance,
    transactReceipt,
    getTickerInfo,
    tokenBalance,
    open
   
    
   };