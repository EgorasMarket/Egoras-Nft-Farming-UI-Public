import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./UpatedTokenModal.css";
import { AssessmentSharp } from "@material-ui/icons";
import { parseEther, formatEther } from "@ethersproject/units";
import Web3 from "web3";
import { tokenBalance } from "../../../../../../web3";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";

const TokenBalance = ({ id, address, account, library }) => {
  const [balance, setBalance] = useState(0);
  const web3 = new Web3(window.ethereum);
  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (account) {
        let balance = "";

        if (id === "1") {
          const getBalance = await web3.eth.getBalance(account);
          balance = web3.utils.fromWei(getBalance, "ether");
        } else {
          const res = await tokenBalance(address, account, library.getSigner());
          balance = formatEther(res.message._hex);
        }

        setBalance(balance);
      }
    };

    fetchTokenBalance();
  }, [id, address, account, library]);

  return (
    <div className="updatedTokenModal_area_body_area1_cont2">
      {parseFloat(balance).toFixed(4)}
    </div>
  );
};
export const UpdatedTokenModal = ({
  asset,
  toggleTokenModal,
  setAsset,
  tokenModal2,
  setAsset2,
  tokenModal,
  toggleTokenModal2,
  assetId,
  assetId2,
  account,
}) => {
  const context = useWeb3React();
  const { connector, library, chainId, activate, deactivate, active, error } =
    context;
  const [tokenBalances, setTokenBalances] = useState({});
  // const BaseBalance = async (address) => {
  //   if (account) {
  //     let res = await tokenBalance(address, account, library.getSigner());
  //     console.log(res);
  //     console.log(formatEther(res.message._hex));
  //     return parseFloat(formatEther(res.message._hex)).toFixed(2);
  //     // // setBaseBalance(parseFloat(formatEther(res.message._hex)).toFixed(2));
  //   }
  // };

  return (
    <div className="updatedTokenModal">
      <div
        className="updatedTokenModal_closeDiv"
        onClick={
          tokenModal === true
            ? toggleTokenModal
            : tokenModal2 === true
            ? toggleTokenModal2
            : toggleTokenModal
        }
      ></div>
      <div className="updatedTokenModal_area">
        <div className="updatedTokenModal_area1">
          <div className="updatedTokenModal_area1_head">
            <span>Select a token </span>
            <CloseIcon
              className="updatedTokenModal_area1_head_close_icon"
              onClick={
                tokenModal
                  ? toggleTokenModal
                  : tokenModal2
                  ? toggleTokenModal2
                  : toggleTokenModal
              }
            />
          </div>
          <div className="updatedTokenModal_area1_para">
            You can search and select any token on Martgpt swap
          </div>
          <div className="updatedTokenModal_area1_search">
            <input
              type="search"
              name=""
              id=""
              className="updatedTokenModal_area1_search_input"
            />
          </div>
          <div className="updatedTokenModal_area1_favorites">
            {asset
              .filter((data) => data.favorite === "true")
              .map((data) => (
                <button
                  id={data.id}
                  className="updatedFavoriteToken_cont"
                  name={data.address}
                  disabled={data.id === assetId ? true : false}
                  onClick={
                    tokenModal2 === true
                      ? setAsset2
                      : tokenModal === true
                      ? setAsset
                      : setAsset
                  }
                >
                  <img
                    src={data.img}
                    alt=""
                    className="updatedFavoriteToken_cont_img"
                  />
                  <div className="updatedFavoriteToken_cont_title">
                    {data.symbol}
                  </div>
                </button>
              ))}
          </div>
        </div>
        <div className="updatedTokenModal_area_body">
          <div className="updatedTokenModal_area_body_area">
            {asset.map((data) => {
              const getTokenBalance = async () => {
                if (account) {
                  const res = await tokenBalance(
                    data.address,
                    account,
                    library.getSigner()
                  );
                  const balance = formatEther(res.message._hex);
                  setTokenBalances((prevBalances) => ({
                    ...prevBalances,
                    [data.address]: balance,
                  }));
                }
              };
              console.log(
                tokenBalances["0xd68e5C52F7563486CC1A15D00eFA12C8644a907e"]
              );
              return (
                <button
                  disabled={data.id === assetId ? true : false}
                  id={data.id}
                  name={data.address}
                  className="updatedTokenModal_area_body_area1"
                  onClick={
                    tokenModal2 === true
                      ? setAsset2
                      : tokenModal === true
                      ? setAsset
                      : setAsset
                  }
                >
                  <div className="updatedTokenModal_area_body_area1_cont1">
                    <div className="updatedTokenModal_area_body_area1_cont1_div1">
                      <img
                        src={data.img}
                        alt=""
                        className="updatedTokenModal_area_body_area1_cont1_div1_img"
                      />
                    </div>
                    <div className="updatedTokenModal_area_body_area1_cont1_div2">
                      <div className="updatedTokenModal_area_body_area1_cont1_div2_cont1">
                        {data.symbol}
                      </div>
                      <div className="updatedTokenModal_area_body_area1_cont1_div2_cont2">
                        {data.name}
                      </div>
                    </div>
                  </div>
                  <div className="updatedTokenModal_area_body_area1_cont2">
                    <TokenBalance
                      id={data.id}
                      address={data.address}
                      account={account}
                      library={library}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
