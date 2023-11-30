import React, { useState, useEffect, useContext } from "react";
import { API_URL } from "../../../actions/types";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "../../../css/dashBoardReferral.css";
import Web3 from "web3";
import { getAuthUserStats } from "../../../actions/token";
import CryptoJS from "crypto-js";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import UpdatedErrorModal from "./UpdatedAppPages/UpdatedSuccessErrorModals/UpdatedErrorModal";
import UpdatedSuccessModal from "./UpdatedAppPages/UpdatedSuccessErrorModals/UpdatedSuccessModal";
import ScaleLoader from "react-spinners/ScaleLoader";
import Sparkline2 from "../../static/Sparkline2";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TollIcon from "@mui/icons-material/Toll";
import GroupsIcon from "@mui/icons-material/Groups";
import { connect } from "react-redux";
import { getRefStats } from "../../../web3/index2";
import UserDetailsLinks from "./UserDetailsLinks";
// import { UserContext } from "../context/Context";
import Nodata from "./nodataComponent/Nodata";
import { parseEther, formatEther } from "@ethersproject/units";
import { numberWithCommas } from "../../../static";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";

import axios from "axios";
import { config } from "../../../actions/Config";
import { API_URL as api_url } from "../../../actions/types";
import {
  getUserStats,
  getReferrals,
  getMyReferralsCount,
  getReferralBonus,
} from "../../../web3/index";
const DashboardReferral = ({ auth }) => {
  const [activeLink, setActiveLink] = useState("");
  const [comingSoon, setComingSoon] = useState(false);
  const [refEarnings, setRefEarnings] = useState(0.0);
  const [refCount, setRefCount] = useState(0);
  const [welcomeBonus, setWelcomeBonus] = useState(0.0);
  const [copyValue, setCopyValue] = useState("");
  const [address, setAddress] = useState(
    "0x3dE7916840227889UIOC0DA2Bf9A209C3A91d755790FC"
  );
  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");
  const [leaderBoard1, setLeaderBoard] = useState([]);
  const [myReferrals, setMyReferrals] = useState([]);
  const [refLink, setRefLink] = useState("........");
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [txHash, setTxHash] = useState("");
  const context = useWeb3React();

  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  useEffect(() => {
    if (account) {
      setRefLink(`martgpt.org/referal/${account}`);
    }
  }, [account]);

  const secretPass = "XkhZG4fW2t2W";
  const handleEncrypt = () => {
    const encryptedText = CryptoJS.AES.encrypt(
      plaintext,
      secretPass
    ).toString();
    setEncryptedText(encryptedText);
    console.log(encryptedText);
  };

  const handleDecrypt = () => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretPass);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    setDecryptedText(decryptedText);
    console.log(decryptedText);
  };
  useEffect(() => {
    setPlaintext(account);
  }, [plaintext]);
  console.log(plaintext);
  useEffect(() => {
    if (currentPage === "/app/user") {
      setActiveLink("poolDetails");
    } else if (currentPage === "/app/user/referral") {
      setActiveLink("referral");
    }
  });

  // useEffect(() => {
  //   axios
  //     .get(api_url + "/api/user/fetch/top/referals", null, config)
  //     .then((data) => {
  //       setLeaderBoard(data.data.allData);
  //     })
  //     .catch((err) => {
  //       console.log(err); // "oh, no!"
  //     });
  // }, []);
  const web3 = new Web3(window.ethereum);

  // useEffect(() => {
  //   if (account) {
  //     axios
  //       .get(api_url + "/api/user/fetch/my/referals/" + account, null, config)
  //       .then((data) => {
  //         setMyReferrals(data.data.data);
  //         console.log(data.data.data);
  //       })
  //       .catch((err) => {
  //         console.log(err); // "oh, no!"
  //       });
  //   }
  // }, [account]);

  const copyText = () => {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied Code ";
    tooltip.style.display = "block";
  };
  function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
    tooltip.style.display = "none";
  }

  // console.log(library._network.name, "library , library");
  useEffect(
    async (e) => {
      if (account) {
        let response = await getRefStats(account, library.getSigner());
        console.log(response);
        console.log(response.message._amount.toString(), "to string count");
        console.log(response.message._count.toString(), "to string amount");
        if (response.status === true) {
          const resAmnt = parseFloat(
            formatEther(response.message._count.toString())
          );
          const resAmnt2 = response.message._amount.toString();

          setRefEarnings(resAmnt);
          setRefCount(resAmnt2);
          // console.log(response.message._referral);
        }
      }
    },
    [account]
  );

  useEffect(() => {
    if (currentPage === "/app/user") {
      setActiveLink("poolDetails");
      return;
    }
    if (currentPage === "/app/user/referral") {
      setActiveLink("referral");
      return;
    }
    if (currentPage === "/app/user/sales") {
      setActiveLink("sales");
      return;
    }
  });

  useEffect(async () => {
    if (account) {
      await axios
        .get(API_URL + "/referal/count/" + account, null, config)
        .then((data) => {
          console.log(data);
          console.log(data.data.data);
          setMyReferrals(data.data.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, [account]);
  useEffect(async () => {
    if (account) {
      await axios
        .get(API_URL + "/referal/get/referral/leaderboard", null, config)
        .then((data) => {
          console.log(data);
          console.log(data.data.data);
          const myArray = data.data.data;
          myArray.sort((a, b) => b.refCount - a.refCount);
          setLeaderBoard(data.data.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, [account]);

  const withdrawRefBonus = async () => {
    setIsLoading(true);
    setDisable(true);
    let res = await getReferralBonus(account, library.getSigner());
    console.log(res);
    if (res.status === true) {
      setIsLoading(false);
      setDisable(false);
      setSuccessModal(true);
      setTxHash(res.message.hash);
      setSuccessMessage(
        "You've successfully withdrawn " + refEarnings + " egc"
      );
    } else {
      console.log(res);
      setIsLoading(false);
      setDisable(false);
      setErrorModal(true);
      setErrorMessage(res.message);
    }
  };
  const CloseErrorModal = () => {
    setErrorModal(false);
  };
  useEffect(() => {
    if (refEarnings <= 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [refEarnings]);
  return (
    <>
      <div className="other2 asset_other2">
        {/* get started section start */}
        {/* ============================================================ */}
        {/* ============================================================ */}
        {/* ============================================================ */}
        {/* ============================================================ */}
        {/* Tokens Section Start */}
        <section className=" no-bg no_paddd">
          <div className="container relative">
            <div className="pool_deatail_area">
              <UserDetailsLinks activeLink={activeLink} />
              {comingSoon === true ? (
                <div className="comingSoon_div">
                  <div className="comingSoon_div_area">
                    <div className="comingSoon-header">Coming Soon...</div>
                    This Feature is not available yet
                  </div>
                </div>
              ) : (
                <>
                  {/* <div className="referral_banner_bg_div">
                    <img
                      src="/img/referralBanner.png"
                      alt=""
                      className="referral_banner_bg_img"
                    />
                  </div> */}
                  <div className="dashBoard_ref_area1">
                    <div className="dashBoard_ref_area1_cont1">
                      <div className="dashBoard_ref_area1_cont1_icon_div">
                        <TollIcon className="stackedCoin_icon" />
                      </div>
                      <div className="dashBoard_ref_area1_cont1_div1">
                        <div className="dashBoard_ref_area1_cont1_div1_cont1">
                          Referral Earnings
                        </div>
                        <div className="dashBoard_ref_area1_cont1_div1_cont2">
                          {numberWithCommas(parseFloat(refEarnings).toFixed(2))}{" "}
                          <span className="engn_symbol_sign">egc</span>
                        </div>
                      </div>
                      <button
                        className="dashBoard_ref_area1_cont1_div1_cont1_withdraw_btn"
                        onClick={withdrawRefBonus}
                        disabled={Disable}
                      >
                        {isLoading ? (
                          <ScaleLoader color="#353250" size={10} height={20} />
                        ) : (
                          <> Withdraw</>
                        )}
                      </button>
                    </div>
                    <div className="dashBoard_ref_area1_cont2">
                      <div className="dashBoard_ref_area1_cont1_icon_div">
                        <GroupAddIcon className="stackedCoin_icon" />
                      </div>
                      <div className="dashBoard_ref_area1_cont1_div1">
                        <div className="dashBoard_ref_area1_cont1_div1_cont1">
                          Total Referrals
                        </div>
                        <div className="dashBoard_ref_area1_cont1_div1_cont2">
                          {refCount}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dashBoard_ref_area2">
                    <div className="dashBoard_ref_area2_cont1">
                      <div className="dashBoard_ref_area2_cont1_head">
                        <span className="leaderBoard_icon_div">
                          <MilitaryTechIcon className="leaderBoard_icon" />
                        </span>
                        Leader board
                      </div>
                      <span className="table_hr"></span>
                      <div className="dashBoard_ref_area2_cont1_body">
                        <div className="dashBoard_ref_area2_cont1_body_div_head">
                          <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 dashBoard_ref_area2_cont1_body_div_head_cont1_first">
                            Address
                          </div>
                          {/* <div className="dashBoard_ref_area2_cont1_body_div_head_cont1">
                            Address
                          </div> */}
                          {/* <div className="dashBoard_ref_area2_cont1_body_div_head_cont1">
                            Total Referrals
                          </div> */}
                          <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 dashBoard_ref_area2_cont1_body_div_head_cont1_last">
                            Total Referrals
                          </div>
                        </div>
                        {leaderBoard1.length <= 0 ? (
                          <div className="no_loans_div">
                            <div className="no_loans_div_cont">
                              <Nodata />
                              No Data yet.
                            </div>{" "}
                          </div>
                        ) : (
                          leaderBoard1.slice(0, 8).map((data) => (
                            <div className="dashBoard_ref_area2_cont1_body_div1">
                              <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_first">
                                {data.referalId.substring(0, 5) +
                                  "..." +
                                  data.referalId.substring(20, 24)}
                              </div>

                              {/* <div className="dashBoard_ref_area2_cont1_body_div1_cont1">
                                {data.referalId.substring(0, 5) +
                                  "..." +
                                  data.referalId.substring(20, 24)}
                              </div> */}

                              <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_last">
                                {data.refCount}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="show_more_btn_div">
                        <button className="show_more_btn">Show more</button>
                      </div>
                    </div>
                    <div className="dashBoard_ref_area2_cont2">
                      <div className="dashBoard_ref_area2_cont2_div1">
                        <div className="dashBoard_ref_area2_cont1_head">
                          <span className="leaderBoard_icon_div">
                            <GroupsIcon className="leaderBoard_icon" />
                          </span>
                          My Referrals
                        </div>
                        <span className="table_hr"></span>
                        <div className="dashBoard_ref_area2_cont1_body">
                          <div className="dashBoard_ref_area2_cont1_body_div_head">
                            <div className="dashBoard_ref_area2_cont1_body_div_head_cont1_first">
                              Address
                            </div>
                            <div className="dashBoard_ref_area2_cont1_body_div_head_cont1_last">
                              Status
                            </div>
                          </div>
                          {myReferrals.length <= 0 ? (
                            <div className="no_loans_div">
                              <div className="no_loans_div_cont">
                                <Nodata />
                                No Data yet.
                              </div>{" "}
                            </div>
                          ) : (
                            myReferrals.slice(0, 5).map((data) => (
                              <div className="dashBoard_ref_area2_cont1_body_div1">
                                <div className="dashBoard_ref_area2_cont1_body_div1_cont1_first">
                                  {data.userId.substring(0, 5) +
                                    "..." +
                                    data.userId.substring(20, 24)}
                                </div>
                                <div className="dashBoard_ref_area2_cont1_body_div1_cont1_last">
                                  Active
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                        <div className="show_more_btn_div">
                          <button className="show_more_btn">Show more</button>
                        </div>
                      </div>
                      <div className="dashBoard_ref_area2_cont2_div2">
                        <div className="dashBoard_ref_area2_cont2_div2_head">
                          Copy your referral link and invite friends to earn
                          more.
                        </div>
                        <input
                          type="text"
                          value={refLink}
                          className="referral_default_value"
                          id="myInput"
                        />
                        <div className="refferal_copy_btns">
                          <button
                            className="ref_btn"
                            onClick={copyText}
                            onMouseOut={outFunc}
                          >
                            Copy referral code
                            <span className="tooltiptext" id="myTooltip"></span>
                          </button>
                          {/* <button onClick={handleEncrypt}>
                            Encrypt address
                          </button>
                          <button onClick={handleDecrypt}>
                            Decrypt address
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        {errorModal ? (
          <UpdatedErrorModal
            errorMessage={errorMessage}
            closeModal={CloseErrorModal}
          />
        ) : null}
        {successModal ? (
          <UpdatedSuccessModal
            btnRoute={true}
            successMessage={successMessage}
            route=""
            txnHashDiv={true}
            TxnHash={txHash}
          />
        ) : null}
      </div>
    </>
  );
};

// export default DashboardReferral;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// let  res = await getLogin2(
export default connect(mapStateToProps, {})(DashboardReferral);
