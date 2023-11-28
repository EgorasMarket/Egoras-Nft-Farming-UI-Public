import React, { useState, useEffect } from "react";
import { Line, Circle } from "rc-progress";
import "./governanceDetails.css";
import { Link } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StaticData from "../../../../Static/ListedCoins";
import ScaleLoader from "react-spinners/ScaleLoader";
import UpdatedErrorModal from "../UpdatedAppPages/UpdatedSuccessErrorModals/UpdatedErrorModal";
import UpdatedSuccessModal from "../UpdatedAppPages/UpdatedSuccessErrorModals/UpdatedSuccessModal";
import { parseEther, formatEther } from "@ethersproject/units";
import Blockies from "react-blockies";
import { voteYes, voteNo } from "../../../../web3/index2";
import axios from "axios";
import { config } from "../../../../actions/Config";
import { API_URL } from "../../../../actions/types";
import Nodata from "../nodataComponent/Nodata";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";

const DashBoardGovernanceDetails = ({ match }) => {
  const context = useWeb3React();
  const { library, account } = context;

  const [payload, setPayload] = useState([]);
  const [checkedYes, setCheckedYes] = useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [checkedNo, setCheckedNo] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [yesVotesPercent, setYesVotesPercent] = useState(0);
  const [noVotesPercent, setNoVotesPercent] = useState(0);
  const [route, setRoute] = useState("");
  console.log("====================================");
  console.log(match.params.id);
  console.log("====================================");

  const fetchData = async () => {
    try {
      const data = await axios.get(
        API_URL + "/web3/Votes/1/10000000000000",
        null,
        config
      );
      console.log(data.data.data.products);
      // Loop through the array
      data.data.data.products.forEach((obj) => {
        // Check if the object's id matches the value of match
        if (obj.index_id === match.params.id) {
          setPayload(obj);
          console.log(obj.Votes);
          console.log(account);

          if (obj.Votes.length > 0) {
            const yesVotes = obj.Votes.filter(
              (vote) => vote.typeOfVote === "Yes"
            ).length;
            const noVotes = obj.Votes.filter(
              (vote) => vote.typeOfVote === "No"
            ).length;
            // Calculate percentages
            const totalVotes = obj.Votes.length;
            const yesPercentage = (yesVotes / totalVotes) * 100;
            const noPercentage = (noVotes / totalVotes) * 100;
            console.log(yesPercentage);
            console.log(noPercentage);
            // setYesVotesPercent(yesPercentage);
            // setNoVotesPercent(noPercentage);
            obj.Votes.forEach((data) => {
              console.log(data);
              console.log(data.voter);
              if (data.voter.includes(account)) {
                console.log(data);
                console.log("ok");
                setAlreadyVoted(true);
                if (data.type === "Yes") {
                  setCheckedYes(true);
                  setCheckedNo(false);
                  return;
                }
                if (data.type === "No") {
                  setCheckedYes(false);
                  setCheckedNo(true);
                  return;
                }

                return;
              }
            });
            return;
          }
        }
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(async () => {
    fetchData();
  }, []);

  console.log(payload);
  const checkedYesBox = () => {
    setCheckedYes(true);
    setCheckedNo(false);
  };
  const checkedNoBox = () => {
    setCheckedYes(false);
    setCheckedNo(true);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    if (checkedNo == false && checkedYes == false) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [checkedNo, checkedYes]);
  console.log(payload.Votes);

  const voteYesFunc = async () => {
    const res = await voteYes(payload.index_id, library.getSigner());
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");
    if (res.status == true) {
      setIsLoading(false);
      setSubmitDisabled(false);
      setSuccessModal(true);
      setRoute("#");
      setSuccessMessage("You've successfully voted yes for " + payload.title);
    } else {
      setErrorModal(true);
      setErrorMessage(res.message);
      setIsLoading(false);
      setSubmitDisabled(false);
    }
  };
  const voteNoFunc = async () => {
    const res = await voteNo(payload.index_id, library.getSigner());
    console.log(res, "somto8uhhhg");
    console.log(res.status, "somto8uhhhg");
    if (res.status == true) {
      setIsLoading(false);
      setSubmitDisabled(false);
      setSuccessModal(true);
      setRoute("#");
      setSuccessMessage("You've successfully voted no for " + payload.title);
    } else {
      setErrorModal(true);
      setErrorMessage(res.message);
      setIsLoading(false);
      setSubmitDisabled(false);
    }
  };
  const CloseErrorModal = () => {
    setErrorModal(false);
  };
  return (
    <div className="other2 asset_other2">
      {payload.length <= 0 ? null : (
        <section className="collateral-assets-section no-bg no_pad">
          <div className="container">
            <div className="governance_details_cont_area">
              <Link to="/app/governance" className="back_prev">
                <div className="back_prev_icon_div">
                  <ArrowBackIosIcon className="back_prev_icon" />
                </div>
                <span className="back_prev_span1">Governance</span> /
                <span className="back_prev_span2">Proposal</span>
              </Link>
              <div className="governance_details_area_1">
                <div className="governance_details_area_1_cont1">
                  <div className="governance_details_area_1_title_area">
                    <div className="governance_details_area_1_title_area_title">
                      {payload.product_name}
                    </div>
                    <div className="governance_details_area_1_title_area_div">
                      <span className="governance_details_area_1_title_area_div_span">
                        Published By:
                      </span>
                      <Blockies
                        seed={payload.creator}
                        size={8}
                        scale={4}
                        className="blockies_icon2"
                      />{" "}
                      {`${payload.creator.slice(
                        0,
                        6
                      )}...${payload.creator.slice(37, 42)}`}
                    </div>
                  </div>
                  <div className="governance_details_area_1_status_area">
                    <div className="governance_details_area_1_status_area_1">
                      <div className="governance_details_area_1_status_area_1_cont1">
                        Status
                      </div>
                      <div className="governance_details_area_1_status_area_1_cont2">
                        <button
                          className="governance_details_area_1_status_area_1_cont2_btn"
                          style={{
                            background:
                              payload.status === "PENDING"
                                ? "#d69d16"
                                : payload.status === "Approved"
                                ? "#3e9a3e"
                                : payload.status === "Terminated"
                                ? "#eb3d3d"
                                : "#55555d",
                          }}
                        >
                          {payload.status === "PENDING"
                            ? "Active"
                            : payload.status}
                        </button>
                      </div>
                    </div>
                    <div className="governance_details_area_1_status_area_2">
                      Ends On {payload.createdAt}
                    </div>
                  </div>
                </div>
              </div>
              {/* ============================ */}
              {/* ============================ */}
              {/* ============================ */}
              {/* ============================ */}
              {/* ============================ */}
              {/* ============================ */}
              {/* ============================ */}
              <div className="governance_details_area_2">
                <div className="governance_details_area_2_cont1">
                  <div className="governance_details_area_2_cont1_div1">
                    {payload.status === "PENDING" ? (
                      <div className="governance_details_area_2_cont1_div1_cont1a">
                        <div className="governance_details_area_2_cont1_div1_cont1_title">
                          Cast your vote
                        </div>
                        <div className="governance_details_area_2_cont1_div1_cont1_body">
                          <div
                            className={
                              checkedYes == true
                                ? "governance_details_area_2_cont1_div1_cont1_body_1_active"
                                : "governance_details_area_2_cont1_div1_cont1_body_1"
                            }
                            onClick={alreadyVoted ? null : checkedYesBox}
                          >
                            <div className="governance_details_area_2_cont1_div1_cont1_body_1_cont1">
                              <div className="governance_details_area_2_cont1_div1_cont1_body_1_cont1_div1">
                                Yes
                              </div>
                              <div className="governance_details_area_2_cont1_div1_cont1_body_1_cont1_div2">
                                Your choice will be counted for yes
                              </div>
                            </div>
                            <div className="governance_details_area_2_cont1_div1_cont1_body_1_cont2">
                              <input
                                type="radio"
                                id="radio-1"
                                name="radio"
                                checked={checkedYes}
                                onChange={alreadyVoted ? null : checkedYesBox}
                              />
                              <label
                                className="payment_method_area1_cont1_label"
                                for="radio-1"
                              ></label>
                            </div>
                          </div>
                          <div
                            className={
                              checkedNo == true
                                ? "governance_details_area_2_cont1_div1_cont1_body_1_active"
                                : "governance_details_area_2_cont1_div1_cont1_body_1"
                            }
                            onClick={alreadyVoted ? null : checkedNoBox}
                          >
                            <div className="governance_details_area_2_cont1_div1_cont1_body_1_cont1">
                              <div className="governance_details_area_2_cont1_div1_cont1_body_1_cont1_div1">
                                No
                              </div>
                              <div className="governance_details_area_2_cont1_div1_cont1_body_1_cont1_div2">
                                Your choice will be counted for no
                              </div>
                            </div>
                            <div className="governance_details_area_2_cont1_div1_cont1_body_1_cont2">
                              <input
                                type="radio"
                                id="radio-1"
                                name="radio"
                                checked={checkedNo}
                                onChange={alreadyVoted ? null : checkedNoBox}
                              />
                              <label
                                className="payment_method_area1_cont1_label"
                                for="radio-1"
                              ></label>
                            </div>
                          </div>
                          <div className="governance_details_area_2_cont1_div1_cont1_body_btn_div">
                            {!account ? (
                              <button
                                className="governance_details_area_2_cont1_div1_cont1_body_btn"
                                disabled
                              >
                                Connect wallet
                              </button>
                            ) : (
                              <>
                                {" "}
                                {alreadyVoted ? (
                                  <>
                                    {" "}
                                    <button
                                      className="governance_details_area_2_cont1_div1_cont1_body_btn"
                                      disabled
                                    >
                                      Already voted
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    {checkedYes ? (
                                      <button
                                        className="governance_details_area_2_cont1_div1_cont1_body_btn"
                                        disabled={submitDisabled}
                                        onClick={voteYesFunc}
                                      >
                                        {isLoading ? (
                                          <ScaleLoader
                                            color="#375746"
                                            size={10}
                                            height={20}
                                          />
                                        ) : (
                                          <> Submit vote Yes</>
                                        )}
                                      </button>
                                    ) : checkedNo ? (
                                      <button
                                        className="governance_details_area_2_cont1_div1_cont1_body_btn"
                                        disabled={submitDisabled}
                                        onClick={voteNoFunc}
                                      >
                                        {isLoading ? (
                                          <ScaleLoader
                                            color="#375746"
                                            size={10}
                                            height={20}
                                          />
                                        ) : (
                                          <> Submit vote No</>
                                        )}
                                      </button>
                                    ) : (
                                      <button
                                        className="governance_details_area_2_cont1_div1_cont1_body_btn"
                                        disabled
                                      >
                                        Select an option
                                      </button>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {/* ========== */}
                    {/* ========== */}
                    {/* ========== */}
                    {/* ========== */}
                    <div
                      className={
                        payload.status === "PENDING"
                          ? "governance_details_area_2_cont1_div1_cont1"
                          : "governance_details_area_2_cont1_div1_cont1a"
                      }
                    >
                      <div className="governance_details_area_2_cont1_div1_title">
                        Voting Results
                      </div>
                      <div className="governance_details_area_2_cont1_div1_body1">
                        <div className="governance_details_area_2_cont1_div1_body1_progress1">
                          <div className="governance_details_area_2_cont1_div1_body1_progrees1_cont1">
                            <div className="governance_details_area_2_cont1_div1_body1_progrees1_cont1_txt">
                              Yes
                            </div>
                            <div className="governance_details_area_2_cont1_div1_body1_progrees1_cont1_txt">
                              {yesVotesPercent.toFixed(2)}%
                            </div>
                          </div>
                          <div className="governance_details_area_2_cont1_div1_body1_progrees1_cont2">
                            <Line
                              strokeWidth={2}
                              percent={yesVotesPercent}
                              strokeColor="#239e54"
                              trailWidth={2}
                            />
                          </div>
                        </div>
                        <div className="governance_details_area_2_cont1_div1_body1_progress1">
                          <div className="governance_details_area_2_cont1_div1_body1_progrees1_cont1">
                            <div className="governance_details_area_2_cont1_div1_body1_progrees1_cont1_txt">
                              No
                            </div>
                            <div className="governance_details_area_2_cont1_div1_body1_progrees1_cont1_txt">
                              {noVotesPercent.toFixed(2)}%
                            </div>
                          </div>
                          <div className="governance_details_area_2_cont1_div1_body1_progrees1_cont2">
                            <Line
                              strokeWidth={2}
                              percent={noVotesPercent}
                              strokeColor="#239e54"
                              trailWidth={2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="governance_details_area_2_cont1_div2">
                    <div className="governance_details_area_2_cont1_div2_title">
                      Information
                    </div>
                    <div className="governance_details_area_2_cont1_div2_body">
                      <div className="governance_details_area_2_cont1_div2_body_1">
                        <div className="governance_details_area_2_cont1_div2_body_1_title">
                          Published By{" "}
                        </div>
                        <div className="governance_details_area_2_cont1_div2_body_1_content">
                          <Blockies
                            seed={payload.creator}
                            size={8}
                            scale={4}
                            className="blockies_icon2"
                          />{" "}
                          {`${payload.creator.slice(
                            0,
                            6
                          )}...${payload.creator.slice(37, 42)}`}
                        </div>
                      </div>
                      <div className="governance_details_area_2_cont1_div2_body_1">
                        <div className="governance_details_area_2_cont1_div2_body_1_title">
                          Start date
                        </div>
                        <div className="governance_details_area_2_cont1_div2_body_1_content">
                          {payload.createdAt}
                        </div>
                      </div>
                      <div className="governance_details_area_2_cont1_div2_body_1">
                        <div className="governance_details_area_2_cont1_div2_body_1_title">
                          End date
                        </div>
                        <div className="governance_details_area_2_cont1_div2_body_1_content">
                          {payload.createdAt}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ============= */}
                {/* ============= */}
                {/* ============= */}
                {/* ============= */}
                {/* ============= */}
                {/* ============= */}
                <div className="governance_details_area_2_cont2">
                  <div className="governance_details_area_2_cont2_title">
                    Votes
                  </div>
                  <div className="governance_details_area_2_cont2_body">
                    <div className="governance_details_area_2_cont2_body_1">
                      <SearchIcon className="governance_details_area_2_cont2_body_1_icon" />
                      <input
                        type="search"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="address"
                        className="governance_details_area_2_cont2_body_1_Input"
                      />
                    </div>
                    {/* {payload.Votes.length <= 0 ? (
                      <div className="governance_details_area_2_cont2_body_2">
                        No data
                      </div>
                    ) : ( */}
                    <div className="governance_details_area_2_cont2_body_2">
                      {payload.Votes.filter((data) =>
                        data.voter
                          .toLowerCase()
                          .includes(searchTerm.toLocaleLowerCase())
                      ).length <= 0 || payload.Votes.length <= 0 ? (
                        <div className="governance_details_area_2_cont2_body_2_nodata_div">
                          <Nodata />
                          <div className="governance_details_area_2_cont2_body_2_nodata_div_txt">
                            No vote found
                          </div>
                        </div>
                      ) : (
                        <>
                          {payload.Votes.filter((data) =>
                            data.voter
                              .toLowerCase()
                              .includes(searchTerm.toLocaleLowerCase())
                          ).map((data) => {
                            return (
                              <div
                                className="governance_details_area_2_cont2_body_2_cont1"
                                id={data.id}
                              >
                                <div className="governance_details_area_2_cont2_body_2_cont1_div1">
                                  <Blockies
                                    seed={data.voter}
                                    size={8}
                                    scale={4}
                                    className="blockies_icon2"
                                  />{" "}
                                  {`${data.voter.slice(
                                    0,
                                    6
                                  )}...${data.voter.slice(37, 42)}`}
                                </div>
                                <div className="governance_details_area_2_cont2_body_2_cont1_div2">
                                  <button
                                    className="governance_details_area_2_cont2_body_2_cont1_div2_btn"
                                    style={{
                                      background:
                                        data.type === "Yes"
                                          ? "#3e9a3e"
                                          : data.type === "No"
                                          ? "#eb3d3d"
                                          : "#55555d",
                                    }}
                                  >
                                    {data.type}
                                  </button>
                                  <ArrowOutwardIcon className="governance_details_area_2_cont2_body_2_cont1_div2_icon" />
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>
                    {/* // )} */}
                  </div>
                </div>
              </div>
              {/* ============================ */}
              {/* ============================ */}
              {/* ============================ */}
              {/* ============================ */}
              {/* ============================ */}
              {/* ============================ */}
              {/* ============================ */}
              {/* <div className="governance_details_area_3">
                <div
                  className="governance_details_area_3_title_div
              "
                >
                  <div className="governance_details_area_3_title">
                    Proposal Actions
                  </div>
                  <div className="governance_details_area_3_para">
                    These actions can be executed only when the governance
                    parameters are met.
                  </div>
                </div>
                <div className="governance_details_area_3_body">
                  <div className="governance_details_area_3_body_1">
                    <div className="governance_details_area_3_body_1_cont1">
                      <div className="governance_details_area_3_body_1_cont1_div1">
                        <div className="governance_details_area_3_body_1_cont1_div1_txt">
                          Nft Id:
                        </div>{" "}
                        #1
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div2">
                        Production of 10 E.V sedans
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div3">
                        Txn hash:0xd5673grd....
                      </div>
                    </div>
                    <div className="governance_details_area_3_body_1_cont2">
                      <div className="governance_details_area_3_body_1_cont2_txt">
                        Status
                      </div>
                      <div className="governance_details_area_3_body_1_cont2_status">
                        Manufacture
                      </div>
                    </div>
                  </div>
                  <div className="governance_details_area_3_body_1">
                    <div className="governance_details_area_3_body_1_cont1">
                      <div className="governance_details_area_3_body_1_cont1_div1">
                        <div className="governance_details_area_3_body_1_cont1_div1_txt">
                          Nft Id:
                        </div>{" "}
                        #1
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div2">
                        Production of 10 E.V sedans
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div3">
                        Txn hash:0xd5673grd....
                      </div>
                    </div>
                    <div className="governance_details_area_3_body_1_cont2">
                      <div className="governance_details_area_3_body_1_cont2_txt">
                        Status
                      </div>
                      <div className="governance_details_area_3_body_1_cont2_status">
                        Manufacture
                      </div>
                    </div>
                  </div>
                  <div className="governance_details_area_3_body_1">
                    <div className="governance_details_area_3_body_1_cont1">
                      <div className="governance_details_area_3_body_1_cont1_div1">
                        <div className="governance_details_area_3_body_1_cont1_div1_txt">
                          Nft Id:
                        </div>{" "}
                        #1
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div2">
                        Production of 10 E.V sedans
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div3">
                        Txn hash:0xd5673grd....
                      </div>
                    </div>
                    <div className="governance_details_area_3_body_1_cont2">
                      <div className="governance_details_area_3_body_1_cont2_txt">
                        Status
                      </div>
                      <div className="governance_details_area_3_body_1_cont2_status">
                        Manufacture
                      </div>
                    </div>
                  </div>
                  <div className="governance_details_area_3_body_1">
                    <div className="governance_details_area_3_body_1_cont1">
                      <div className="governance_details_area_3_body_1_cont1_div1">
                        <div className="governance_details_area_3_body_1_cont1_div1_txt">
                          Nft Id:
                        </div>{" "}
                        #1
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div2">
                        Production of 10 E.V sedans
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div3">
                        Txn hash:0xd5673grd....
                      </div>
                    </div>
                    <div className="governance_details_area_3_body_1_cont2">
                      <div className="governance_details_area_3_body_1_cont2_txt">
                        Status
                      </div>
                      <div className="governance_details_area_3_body_1_cont2_status">
                        Manufacture
                      </div>
                    </div>
                  </div>
                  <div className="governance_details_area_3_body_1">
                    <div className="governance_details_area_3_body_1_cont1">
                      <div className="governance_details_area_3_body_1_cont1_div1">
                        <div className="governance_details_area_3_body_1_cont1_div1_txt">
                          Nft Id:
                        </div>{" "}
                        #1
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div2">
                        Production of 10 E.V sedans
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div3">
                        Txn hash:0xd5673grd....
                      </div>
                    </div>
                    <div className="governance_details_area_3_body_1_cont2">
                      <div className="governance_details_area_3_body_1_cont2_txt">
                        Status
                      </div>
                      <div className="governance_details_area_3_body_1_cont2_status">
                        Manufacture
                      </div>
                    </div>
                  </div>
                  <div className="governance_details_area_3_body_1">
                    <div className="governance_details_area_3_body_1_cont1">
                      <div className="governance_details_area_3_body_1_cont1_div1">
                        <div className="governance_details_area_3_body_1_cont1_div1_txt">
                          Nft Id:
                        </div>{" "}
                        #1
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div2">
                        Production of 10 E.V sedans
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div3">
                        Txn hash:0xd5673grd....
                      </div>
                    </div>
                    <div className="governance_details_area_3_body_1_cont2">
                      <div className="governance_details_area_3_body_1_cont2_txt">
                        Status
                      </div>
                      <div className="governance_details_area_3_body_1_cont2_status">
                        Manufacture
                      </div>
                    </div>
                  </div>
                  <div className="governance_details_area_3_body_1">
                    <div className="governance_details_area_3_body_1_cont1">
                      <div className="governance_details_area_3_body_1_cont1_div1">
                        <div className="governance_details_area_3_body_1_cont1_div1_txt">
                          Nft Id:
                        </div>{" "}
                        #1
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div2">
                        Production of 10 E.V sedans
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div3">
                        Txn hash:0xd5673grd....
                      </div>
                    </div>
                    <div className="governance_details_area_3_body_1_cont2">
                      <div className="governance_details_area_3_body_1_cont2_txt">
                        Status
                      </div>
                      <div className="governance_details_area_3_body_1_cont2_status">
                        Manufacture
                      </div>
                    </div>
                  </div>
                  <div className="governance_details_area_3_body_1">
                    <div className="governance_details_area_3_body_1_cont1">
                      <div className="governance_details_area_3_body_1_cont1_div1">
                        <div className="governance_details_area_3_body_1_cont1_div1_txt">
                          Nft Id:
                        </div>{" "}
                        #1
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div2">
                        Production of 10 E.V sedans
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div3">
                        Txn hash:0xd5673grd....
                      </div>
                    </div>
                    <div className="governance_details_area_3_body_1_cont2">
                      <div className="governance_details_area_3_body_1_cont2_txt">
                        Status
                      </div>
                      <div className="governance_details_area_3_body_1_cont2_status">
                        Manufacture
                      </div>
                    </div>
                  </div>
                  <div className="governance_details_area_3_body_1">
                    <div className="governance_details_area_3_body_1_cont1">
                      <div className="governance_details_area_3_body_1_cont1_div1">
                        <div className="governance_details_area_3_body_1_cont1_div1_txt">
                          Nft Id:
                        </div>{" "}
                        #1
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div2">
                        Production of 10 E.V sedans
                      </div>
                      <div className="governance_details_area_3_body_1_cont1_div3">
                        Txn hash:0xd5673grd....
                      </div>
                    </div>
                    <div className="governance_details_area_3_body_1_cont2">
                      <div className="governance_details_area_3_body_1_cont2_txt">
                        Status
                      </div>
                      <div className="governance_details_area_3_body_1_cont2_status">
                        Manufacture
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      )}

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
          route={route}
        />
      ) : null}
    </div>
  );
};

export default DashBoardGovernanceDetails;
