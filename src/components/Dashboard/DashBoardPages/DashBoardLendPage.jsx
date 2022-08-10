import React, { useState, useEffect, useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import '../../../css/dashboardLend.css';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import { loadUser } from '../../../actions/auth';
import { connect } from 'react-redux';
import EastIcon from '@mui/icons-material/East';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_URL as api_url } from '../../../actions/types';
import { config } from '../../../actions/Config';
import { Authenticate } from '../../auth/Authenticate';
import axios from 'axios';
// import
// import { CustomAlert } from "../../static/CustomAlert";
import { CustomAlert } from '../../static/CustomAlert/CustomAlert';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import {
  Stepper,
  Step,
  useStepper,
  StepNumber,
  StepTitle,
  StepStatus,
  StepDescription,
} from 'react-progress-stepper';
// import { Context } from "../../context/Context";
import { UserContext } from '../../context/Context';
import Nodata from './nodataComponent/Nodata';

// import PropTypes from "prop-types";
// import YanProgress from "react-yan-progress";
import { numberWithCommas } from '../../static/static';
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from '@web3-react/core';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { getAuthUserStats } from '../../../actions/token';
const DashBoardLendPage = ({ submitKyc, auth }) => {
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
  const { Branches, BranchDetails } = useContext(UserContext);
  const [categoryBtn, setCategoryBtn] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [onBoardUserDiv, setOnBoardUserDiv] = useState(false);
  const [lockedValue, setLockedValue] = useState(0);
  const [verified, setVerified] = useState(true);
  const [disable, setDisable] = React.useState(false);
  const [disable2, setDisable2] = React.useState(false);
  const [customAlert, setCustomAlert] = useState(false);
  const [stage, setStage] = useState(null);

  const [connected, setConnected] = useState(true);
  const [countryVerified, setCountryVerified] = useState(false);
  const [totalLendingCapacity, setTotalLendingCapacity] = useState(0);
  const [totalLendingCount, setTotalLendingCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [activeBtn, setActivrBtn] = useState('Ongoing');
  const [age, setAge] = React.useState('');
  const [rumuName, setRumuName] = useState('R');
  const [agipName, setAgipName] = useState(false);
  const [address, setAddress] = useState('');
  const [oyName, setOyName] = useState(false);
  const [ref_code, setRef_code] = useState('');
  const [alertTxt, setAlertTxt] = useState('');
  const { step, incrementStep, decrementStep } = useStepper(0, 3);
  const [value, setValue] = React.useState(null);
  const [country, setCountry] = React.useState('');
  const [getRef, setGetRef] = React.useState('');
  const [alertType, setAlertType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [kyc, setKyc] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    // ref_code: "",
  });
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const toggleOnBoardUserDiv = () => {
    setOnBoardUserDiv(() => !onBoardUserDiv);
  };
  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (typeof localStorage.referer != 'undefined') {
      setGetRef(localStorage.getItem('referer'));
    }
    console.log(account, auth);
    if (auth.user == null || auth.user.payload == null) {
      console.log('auth is empty');
      setRef_code('');
    } else {
      console.log('auth is not empty');
      setRef_code(auth.user.payload.ref_code);
    }
  }, [auth]);
  useEffect(() => {
    if (
      email == '' ||
      firstName == '' ||
      lastName == '' ||
      username == ''
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  });
  useEffect(() => {
    if (country == '') {
      setDisable2(true);
    } else {
      setDisable2(false);
    }
  });
  useEffect(
    async (e) => {
      if (account) {
        let response = await getAuthUserStats(account);
        // console.log(response.message.data.payload, "acct acct acct acct ");
        const payload = response.message.data.payload;
        console.log(payload, 'acct acct acct acct ');
        setAddress(account);
        setConnected(() => false);
        if (payload == null) {
          setCountryVerified(() => true);
          setVerified(() => false);
        } else if (payload.stage == 1) {
          setCountryVerified(() => false);
          setVerified(() => true);
        } else if (payload.stage == 2) {
          setCountryVerified(() => false);
          setVerified(() => false);
          setStage(() => payload.stage);
        }
        if (payload == null) {
          setStage(null);
        } else {
          setStage(() => payload.stage);
        }
        if (response.message.data.payload !== null) {
          if (
            response.message.data.payload.email !== null ||
            response.message.data.payload.firstname !== null ||
            response.message.data.payload.lastname !== null ||
            response.message.data.payload.username !== null
          ) {
            setKyc({
              email: response.message.data.payload.email,
              firstName: response.message.data.payload.firstname,
              lastName: response.message.data.payload.lastname,
              username: response.message.data.payload.username,
            });
          } else {
            setKyc({
              email: '',
              firstName: '',
              lastName: '',
              username: '',
            });
          }
          return;
        }
      } else {
        setConnected(() => true);
        setCountryVerified(() => false);
        setVerified(() => false);
      }
    },
    [account, verified, connected, countryVerified]
  );
  // useEffect(
  //   async (e) => {
  //     if (account) {
  //       let response = await getAuthUserStats(account);
  //       console.log(response.message.data);
  //     }
  //   },
  //   [account]
  // );

  //   useEffect(() => {
  //     const results = assets.filter((person) =>
  //       person.PoolName.toString()
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase())
  //     );
  //     setSearchResults(results);
  //   }, [searchTerm]);
  const triggerAll = () => {
    setCategoryBtn('All');
  };

  useEffect(() => {
    if (account) {
      axios
        .get(
          api_url + '/api/kyc/check/country/' + account,
          null,
          config
        )
        .then((data) => {
          console.log(
            data.data.payload.country,
            'dat data data data'
          );
          setCountry(data.data.payload.country);
        })
        .catch((err) => {
          console.log(err); // "oh, no!"
        });
    }
  }, [country, account]);

  const { email, firstName, lastName, username } = kyc;
  useEffect(() => {
    axios
      .get(api_url + '/api/branch/totalpools', null, config)
      .then((data) => {
        console.log(data.data.payload[0].total, 'powerfulpools');
        setLockedValue(data.data.payload[0].total);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
      });
  }, []);

  // getAuthUserStats
  useEffect(async () => {
    if (account) {
      console.log(account, auth, 'res res res res res res ');
    }
  }, [account, auth]);

  useEffect(() => {
    axios
      .get(api_url + '/api/branch/totalbranchvalue', null, config)
      .then((data) => {
        console.log(data.data.payload, 'powerfulpools');
        setTotalLendingCapacity(data.data.payload[0].total);
        setTotalLendingCount(data.data.payload[0].count);
      })
      .catch((err) => {
        console.log(err); // "oh, no!"
        console.log(err.message); // "oh, no!"
      });
  }, []);
  const onChangeKyc = (e) => {
    console.log(e.target.value);
    setKyc({ ...kyc, [e.target.name]: e.target.value });
    // validateInputs(e.target.value);
  };

  const submitKycDetails = async (e) => {
    setIsLoading2(true);
    setDisable2(true);
    let postData;
    let countryData = {
      address: address,
      country,
    };

    if (!account) {
      console.log('Please connect your wallet');
      alert('Please connect your wallet');
      return;
    }

    console.log(typeof localStorage.referer);

    postData = JSON.stringify({
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
      // ref_code: localStorage.getItem('referer'),
      ref_code:
        typeof localStorage.referer != 'undefined'
          ? localStorage.getItem('referer')
          : '',
      username: username,
    });

    console.log('====================================');
    console.log(postData);
    console.log('====================================');
    setIsLoading2(true);
    setDisable2(true);
    try {
      const res = await axios.post(
        api_url + '/api/user/submit/users/country',
        countryData,
        config
      );
      console.log(res.data.success == true);
      if (res.data.success == true) {
        let response = await getAuthUserStats(account);
        const payload = response.message.data.payload;
        console.log(payload, 'check check check check');
        if (payload.stage == 1) {
          setCountryVerified(() => false);
          setVerified(() => true);
        } else if (payload.stage == 2) {
          setCountryVerified(() => false);
          setVerified(() => false);
        }
      }

      setIsLoading2(false);
      setDisable2(false);
    } catch (err) {
      console.log(err.response.data);
      if (err.response.data.statusCode == '303') {
        setAlertTxt(err.response.data.message);
      }
      setIsLoading2(false);
      setDisable2(false);
      setCustomAlert(true);
      setAlertType('danger');
    }
  };

  const validateInputs = (input) => {
    //check firstname
    if (!input) {
      return false;
    }
  };

  const submitKycDetails_bkp = async (e) => {
    setIsLoading(true);
    setDisable(true);
    let postData;
    if (typeof localStorage.referer != 'undefined') {
      // localStorage.getItem("referer");
      // setRef_auth(localStorage.getItem("referer"));
      console.log(typeof localStorage.referer);

      postData = JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
        address: address,
        // ref_code: localStorage.getItem('referer'),
        ref_code:
          typeof localStorage.referer != 'undefined'
            ? localStorage.getItem('referer')
            : '',
        username: username,
      });
    } else {
      postData = JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
        address: address,
        ref_code: getRef,
        username: username,
      });
    }

    console.log('====================================');
    console.log(postData);
    console.log('====================================');
    try {
      const res = await axios.post(
        api_url + '/api/kyc/initialize',
        postData,
        config
      );

      window.location.href = res.data.redirect_url;
      console.log(res.data, '000000000000');
      setIsLoading(false);
      setDisable(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setDisable(false);
    }
  };

  return (
    <div className="other2 asset_other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}
      <section className="collateral-assets-section no-bg no_pad">
        <div className="container">
          {stage == 2 ? null : (
            <div className="onboard_as_user_div">
              <button
                className="onboard_as_user_btn"
                onClick={toggleOnBoardUserDiv}
              >
                Onboard as user
              </button>
            </div>
          )}

          <div className="pool_container">
            <div className="lending_area1">
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Amount Funded(in Pools)
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    {numberWithCommas(
                      parseInt(lockedValue).toFixed(2)
                    )}{' '}
                    <span className="usd_sign">NGN</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                  <div className="helper_txt_div">
                    This is the total Engn funded to all assets in the
                    lending pool.
                  </div>
                </div>
              </div>
              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Amount Funded(in Pools)
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    {numberWithCommas(
                      parseInt(lockedValue / 570).toFixed(2)
                    )}{' '}
                    <span className="usd_sign">USD</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                  <div className="helper_txt_div">
                    This is the total Engn funded to all assets in the
                    lending pool.
                  </div>
                </div>
              </div>

              <div className="lending_area1_cont1">
                <div className="lending_area1_cont1_body_1">
                  <div className="lending_area1_cont1_heading">
                    Total Funding Capacity
                  </div>
                  <div className="lending_area1_cont1_body_txt">
                    {numberWithCommas(
                      parseInt(totalLendingCapacity).toFixed(2)
                    )}{' '}
                    <span className="usd_sign">NGN</span>
                  </div>
                </div>
                <div className="lending_area1_cont1_body_1">
                  <HelpOutlineIcon className="help_outline" />
                  <div className="helper_txt_div">
                    This is the total value of all the assets in the
                    lending pool.
                  </div>
                </div>
              </div>

              <div className="lending_area1_cont1">
                <div className="lending_area1_last_cont1_divs">
                  <span className="lending_area1_last_cont1_divs_cont1">
                    {' '}
                    Est.APY:{' '}
                    <span className="lending_area1_last_cont1_divs_cont_value">
                      {' '}
                      13.0%
                    </span>
                  </span>
                  {/* <span className="lending_area1_last_cont1_divs_cont2">
                    Default Protection:{" "}
                    <span className="lending_area1_last_cont1_divs_cont_value">
                      {" "}
                      2.26M ₦
                    </span>{" "}
                  </span> */}
                  <span className="lending_area1_last_cont1_divs_cont3">
                    {' '}
                    Total Pool Assets:{' '}
                    <span className="lending_area1_last_cont1_divs_cont_value">
                      {' '}
                      {totalLendingCount}
                    </span>{' '}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="assets-cont-head-area"> */}
            {/* <div className="search-input">
                {" "}
                <input
                  type="search"
                  name="search"
                  id="searchCollaterals"
                  className="assets-header3"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                ></input>{" "}
                <SearchIcon className="search-icon" />
              </div> */}
            {/* </div> */}

            <div className="table_body">
              <div className="filter_table_area">
                <div className="filter_table_area_1">
                  All Branches
                </div>
                <div className="filter_table_area_2">
                  <div
                    id="Ongoing"
                    className={
                      activeBtn == 'Ongoing'
                        ? 'filter_table_btn1_active'
                        : 'filter_table_btn1'
                    }
                    onClick={toggleActiveBtn}
                  >
                    Active
                  </div>
                  <div
                    id="All"
                    className={
                      activeBtn == 'All'
                        ? 'filter_table_btn1_active'
                        : 'filter_table_btn1'
                    }
                    onClick={toggleActiveBtn}
                  >
                    All
                  </div>
                  <div
                    id="Closed"
                    className={
                      activeBtn == 'Closed'
                        ? 'filter_table_btn1_active'
                        : 'filter_table_btn1'
                    }
                    onClick={toggleActiveBtn}
                  >
                    Inactive
                  </div>
                </div>
              </div>
              <table className="assets-table">
                <thead className="assets-category-titles">
                  <tr className="assets">
                    <th className="assets-category-titles-heading1">
                      Pool
                    </th>
                    <th className="assets-category-titles-heading1">
                      Funding Capacity
                    </th>
                    <th className="assets-category-titles-heading1 right">
                      Amount Funded
                    </th>
                    <th className="assets-category-titles-heading1 right">
                      Funding Progress
                    </th>
                    <th className="assets-category-titles-heading1 right none_display">
                      Estimated APY
                    </th>
                    <th className="assets-category-titles-heading1 right ">
                      Status
                    </th>
                    <th className="assets-category-titles-heading1 right ">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* <div className="table-body-content">

// =====================
// =====================
// =====================
// =====================
// =====================
// =====================

                
              </div> */}
                {Branches.length <= 0 ? (
                  <div className="no_loans_div">
                    <div className="no_loans_div_cont">
                      <Nodata />
                      No Pools yet.
                    </div>{' '}
                  </div>
                ) : (
                  <tbody
                    className="assets-table-body popular-categories transitionMe"
                    id="popular-categories"
                  >
                    {' '}
                    {/* =============== */}
                    {/* =============== */}
                    {/* =============== */}
                    {activeBtn === 'Ongoing'
                      ? Branches.filter(
                          (person) => person.suspended == 'false'
                        ).map((asset) => {
                          var percentage =
                            (asset.funded / asset.amount) * 100;
                          return (
                            <tr className="assets-category-row  transitionMe">
                              <td className="assets-category-data branch_name_title">
                                <div className="assets-data">
                                  <img
                                    src={
                                      asset.name === 'OYIGBO'
                                        ? '/img/oyigbo_icon.svg'
                                        : asset.name === 'AGIP'
                                        ? '/img/agip_icon.svg'
                                        : asset.name === 'Rumukwrushi'
                                        ? '/img/rumu_icon.svg'
                                        : null
                                    }
                                    alt=""
                                    className="assets-list-icon_pool_icon"
                                  />

                                  <div className="assets-data-pool_name">
                                    {asset.name} Branch
                                    <span className="poolName_txt">
                                      {/* {asset.PoolNameText}
                                       */}
                                      Emerging Markets
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="assets-category-data1 branch_Lending_Capacity">
                                <div className="assets-data-name_pool_invest_capcity">
                                  <div className="investmentcapacity_box">
                                    {' '}
                                    {numberWithCommas(
                                      parseInt(asset.amount).toFixed(
                                        0
                                      )
                                    )}{' '}
                                    Engn
                                  </div>
                                </div>
                              </td>
                              <td className="assets-category-data1b branch_pool_value">
                                <div className="assets-data-name_pool">
                                  {numberWithCommas(
                                    parseInt(asset.funded).toFixed(2)
                                  )}{' '}
                                  <span className="asset_symbol">
                                    {' '}
                                    Engn
                                  </span>
                                </div>
                              </td>
                              <td className="assets-category-data1b branch_pool_value_progress">
                                <div className="assets-data-name_pool">
                                  <div className="asset_amount_progress_div">
                                    <div className="asset_amount_progress_div_txt"></div>
                                    <label for="file">
                                      {parseInt(percentage).toFixed()}
                                      %
                                    </label>
                                    <progress
                                      className={
                                        percentage < 100
                                          ? 'progress_bar progress_bar_progress'
                                          : 'progress_bar'
                                      }
                                      // "progress_bar"
                                      id="file"
                                      aria-valuenow={
                                        asset.amount - asset.funded
                                      }
                                      value={asset.funded}
                                      max={asset.amount}
                                    ></progress>
                                    {/* <div
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  20 %
                                </div> */}
                                    {/* <div className="asset_amount_progress_div_bar">
                                  <div className="asset_amount_progress_div_bar_progress"></div>
                                </div> */}
                                  </div>
                                </div>
                              </td>
                              <td className="assets-category-data1b stable-content branch_apy">
                                <div className="assets-data-name_pool ">
                                  13.0
                                  <span className="asset_symbol">
                                    %
                                  </span>
                                </div>
                              </td>
                              <td className="assets-category-data1b ratio-content branch_loan_status">
                                <div
                                  className="assets-data-name_pool2 "
                                  style={
                                    asset.suspended === 'false'
                                      ? { color: '#1fb73f ' }
                                      : { color: '#e6a538' }
                                  }
                                >
                                  <div className="status_column">
                                    <div className="status_txt">
                                      {asset.suspended === 'false'
                                        ? 'Active'
                                        : 'Inactive'}
                                    </div>

                                    <CircleIcon className="status_circle" />
                                  </div>
                                </div>
                              </td>
                              <td className="assets-category-data-last branch_loan_action">
                                <a
                                  href={`/dashboard/earn/pool/${asset.branchAddress}/detail`}
                                  className="assets-btn"
                                >
                                  See details{' '}
                                  <EastIcon className="see_more_icon" />
                                </a>
                              </td>
                            </tr>
                          );
                        })
                      : activeBtn === 'All'
                      ? Branches.map((asset) => {
                          var percentage =
                            (asset.funded / asset.amount) * 100;
                          return (
                            <tr className="assets-category-row  transitionMe">
                              <td className="assets-category-data branch_name_title">
                                <div className="assets-data">
                                  <img
                                    src={
                                      asset.name === 'OYIGBO'
                                        ? '/img/oyigbo_icon.svg'
                                        : asset.name === 'AGIP'
                                        ? '/img/agip_icon.svg'
                                        : asset.name === 'Rumukwrushi'
                                        ? '/img/rumu_icon.svg'
                                        : null
                                    }
                                    alt=""
                                    className="assets-list-icon_pool_icon"
                                  />

                                  <div className="assets-data-pool_name">
                                    {asset.name} Branch
                                    <span className="poolName_txt">
                                      {/* {asset.PoolNameText}
                                       */}
                                      Emerging Markets
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="assets-category-data1 branch_Lending_Capacity">
                                <div className="assets-data-name_pool_invest_capcity">
                                  <div className="investmentcapacity_box">
                                    {' '}
                                    {numberWithCommas(
                                      parseInt(asset.amount).toFixed(
                                        0
                                      )
                                    )}{' '}
                                    Engn
                                  </div>
                                </div>
                              </td>
                              <td className="assets-category-data1b branch_pool_value">
                                <div className="assets-data-name_pool">
                                  {numberWithCommas(
                                    parseInt(asset.funded).toFixed(2)
                                  )}{' '}
                                  <span className="asset_symbol">
                                    {' '}
                                    Engn
                                  </span>
                                </div>
                              </td>
                              <td className="assets-category-data1b branch_pool_value_progress">
                                <div className="assets-data-name_pool">
                                  <div className="asset_amount_progress_div">
                                    <div className="asset_amount_progress_div_txt"></div>
                                    <label for="file">
                                      {parseInt(percentage).toFixed()}
                                      %
                                    </label>
                                    <progress
                                      className={
                                        percentage < 100
                                          ? 'progress_bar progress_bar_progress'
                                          : 'progress_bar'
                                      }
                                      // "progress_bar"
                                      id="file"
                                      aria-valuenow={
                                        asset.amount - asset.funded
                                      }
                                      value={asset.funded}
                                      max={asset.amount}
                                    ></progress>
                                    {/* <div
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  20 %
                                </div> */}
                                    {/* <div className="asset_amount_progress_div_bar">
                                  <div className="asset_amount_progress_div_bar_progress"></div>
                                </div> */}
                                  </div>
                                </div>
                              </td>
                              <td className="assets-category-data1b stable-content branch_apy">
                                <div className="assets-data-name_pool ">
                                  13.0
                                  <span className="asset_symbol">
                                    %
                                  </span>
                                </div>
                              </td>
                              <td className="assets-category-data1b ratio-content branch_loan_status">
                                <div
                                  className="assets-data-name_pool2 "
                                  style={
                                    asset.suspended === 'false'
                                      ? { color: '#1fb73f' }
                                      : { color: '#e6a538' }
                                  }
                                >
                                  <div className="status_column">
                                    <div className="status_txt">
                                      {asset.suspended === 'false'
                                        ? 'Active'
                                        : 'Inactive'}
                                    </div>
                                    <CircleIcon className="status_circle" />
                                  </div>
                                </div>
                              </td>
                              <td className="assets-category-data-last branch_loan_action">
                                <a
                                  href={`/dashboard/earn/pool/${asset.branchAddress}/detail`}
                                  className="assets-btn"
                                >
                                  See details{' '}
                                  <EastIcon className="see_more_icon" />
                                </a>
                              </td>
                            </tr>
                          );
                        })
                      : activeBtn === 'Closed'
                      ? Branches.filter(
                          (person) => person.suspended == 'true'
                        ).map((asset) => {
                          var percentage =
                            (asset.funded / asset.amount) * 100;
                          return (
                            <tr className="assets-category-row  transitionMe">
                              <td className="assets-category-data branch_name_title">
                                <div className="assets-data">
                                  <img
                                    src={
                                      asset.name === 'OYIGBO'
                                        ? '/img/oyigbo_icon.svg'
                                        : asset.name === 'AGIP'
                                        ? '/img/agip_icon.svg'
                                        : asset.name === 'Rumukwrushi'
                                        ? '/img/rumu_icon.svg'
                                        : null
                                    }
                                    alt=""
                                    className="assets-list-icon_pool_icon"
                                  />

                                  <div className="assets-data-pool_name">
                                    {asset.name} Branch
                                    <span className="poolName_txt">
                                      {/* {asset.PoolNameText}
                                       */}
                                      Emerging Markets
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="assets-category-data1 branch_Lending_Capacity">
                                <div className="assets-data-name_pool_invest_capcity">
                                  <div className="investmentcapacity_box">
                                    {' '}
                                    {numberWithCommas(
                                      parseInt(asset.amount).toFixed(
                                        0
                                      )
                                    )}{' '}
                                    Engn
                                  </div>
                                </div>
                              </td>
                              <td className="assets-category-data1b branch_pool_value">
                                <div className="assets-data-name_pool">
                                  {numberWithCommas(
                                    parseInt(asset.funded).toFixed(2)
                                  )}{' '}
                                  <span className="asset_symbol">
                                    {' '}
                                    Engn
                                  </span>
                                </div>
                              </td>
                              <td className="assets-category-data1b branch_pool_value_progress">
                                <div className="assets-data-name_pool">
                                  <div className="asset_amount_progress_div">
                                    <div className="asset_amount_progress_div_txt"></div>
                                    <label for="file">
                                      {parseInt(percentage).toFixed()}
                                      %
                                    </label>
                                    <progress
                                      className={
                                        percentage < 100
                                          ? 'progress_bar progress_bar_progress'
                                          : 'progress_bar'
                                      }
                                      // "progress_bar"
                                      id="file"
                                      aria-valuenow={
                                        asset.amount - asset.funded
                                      }
                                      value={asset.funded}
                                      max={asset.amount}
                                    ></progress>
                                    {/* <div
                                  role="progressbar"
                                  aria-valuenow="20"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  20 %
                                </div> */}
                                    {/* <div className="asset_amount_progress_div_bar">
                                  <div className="asset_amount_progress_div_bar_progress"></div>
                                </div> */}
                                  </div>
                                </div>
                              </td>
                              <td className="assets-category-data1b stable-content branch_apy">
                                <div className="assets-data-name_pool ">
                                  13.0
                                  <span className="asset_symbol">
                                    %
                                  </span>
                                </div>
                              </td>
                              <td className="assets-category-data1b ratio-content branch_loan_status">
                                <div
                                  className="assets-data-name_pool2 "
                                  style={
                                    asset.suspended === 'false'
                                      ? { color: '#1fb73f' }
                                      : { color: '#e6a538' }
                                  }
                                >
                                  <div className="status_column">
                                    <div className="status_txt">
                                      {asset.suspended === 'false'
                                        ? 'Active'
                                        : 'Inactive'}
                                    </div>
                                    <CircleIcon className="status_circle" />
                                  </div>
                                </div>
                              </td>
                              <td className="assets-category-data-last branch_loan_action">
                                <a
                                  href={`/dashboard/earn/pool/${asset.branchAddress}/detail`}
                                  className="assets-btn"
                                >
                                  See details{' '}
                                  <EastIcon className="see_more_icon" />
                                </a>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                    {/* =================== */}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </section>

      {onBoardUserDiv === true ? (
        <div className="onBoardUserDiv">
          <div className="onBoardUserDiv_head">Onboard as user</div>
          <div className="onBoardUserDiv_body">
            <div className="onBoardUserDiv_body_cont">
              <div className="stepdiv1">
                <span
                  className={
                    connected === false
                      ? 'disabled_color'
                      : 'enabled_color'
                  }
                >
                  {connected === false
                    ? 'Connected'
                    : 'ConnectWallet'}
                </span>
                {connected === true ? (
                  <div className="stepDiv1_sub_content">
                    Connect your meta-mask wallet to access egoras.app
                    <span>
                      <Authenticate isHome="false" />
                    </span>
                  </div>
                ) : null}

                <div
                  className={
                    connected === false
                      ? 'rule_progress disabled_bg'
                      : ' rule_progress enabled_bg'
                  }
                ></div>
              </div>
              {/* ================= */}
              {/* ================= */}
              {/* ================= */}
              {/* ================= */}
              <div className="stepdiv1">
                <span
                  className={
                    countryVerified === false
                      ? 'disabled_color'
                      : 'enabled_color'
                  }
                >
                  {countryVerified === false
                    ? 'Selected'
                    : 'Select Country'}
                </span>
                {countryVerified === true ? (
                  <div className="stepDiv1_sub_content">
                    <div className="subMitDetails_cont">
                      Select your country of origin to continue with
                      the verification
                      <div className="subMitDetails_cont_input_body">
                        <div className="subMitDetails_cont_input_body_cont1">
                          Country
                          <CountryDropdown
                            id="country_id"
                            className="country_select_input"
                            preferredCountries={['gb', 'us']}
                            value={country}
                            handleChange={(e) => {
                              setCountry(e.target.value);
                              console.log(
                                e.target.value
                                  .split('(', 1)
                                  .toString()
                              );
                            }}
                          ></CountryDropdown>
                        </div>
                        <div className="button_comply_cube_div">
                          <button
                            className="proceed_to_cube_btn"
                            onClick={submitKycDetails}
                            disabled={disable2}
                          >
                            {isLoading2 ? (
                              <span>
                                Submitting{' '}
                                <FontAwesomeIcon
                                  className="ml-2"
                                  icon={faSpinner}
                                  spin
                                />
                              </span>
                            ) : (
                              <span> Submit</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div
                  className={
                    countryVerified === false
                      ? 'rule_progress disabled_bg'
                      : ' rule_progress enabled_bg'
                  }
                ></div>
              </div>
              {/* ================= */}
              {/* ================= */}
              {/* ================= */}
              {/* ================= */}
              <div className="stepdiv1">
                <span
                  className={
                    verified === false
                      ? 'disabled_color'
                      : 'enabled_color'
                  }
                >
                  Identity Verification
                </span>
                {verified === true ? (
                  <div className="stepDiv1_sub_content">
                    <div className="subMitDetails_cont">
                      Submit your KYC information through Complycube
                      for verification. This is a one time process to
                      become an eligible user in all Egoras pools.
                      <div className="subMitDetails_cont_input_body">
                        <div className="subMitDetails_cont_input_body_cont1">
                          First Name{' '}
                          <input
                            type="text"
                            className="submitDetails_cont_input_area"
                            name="firstName"
                            value={firstName}
                            onChange={onChangeKyc}
                          />
                        </div>
                        <div className="subMitDetails_cont_input_body_cont1">
                          Last Name{' '}
                          <input
                            type="text"
                            className="submitDetails_cont_input_area"
                            name="lastName"
                            value={lastName}
                            onChange={onChangeKyc}
                          />
                        </div>
                        <div className="subMitDetails_cont_input_body_cont1">
                          Email Address{' '}
                          <input
                            type="email"
                            className="submitDetails_cont_input_area"
                            name="email"
                            value={email}
                            onChange={onChangeKyc}
                          />
                        </div>
                        <div className="subMitDetails_cont_input_body_cont1">
                          UserName{' '}
                          <input
                            type="email"
                            className="submitDetails_cont_input_area"
                            name="username"
                            value={username}
                            onChange={onChangeKyc}
                          />
                        </div>
                        <div className="subMitDetails_cont_input_body_cont1">
                          Referral Code{' '}
                          <input
                            type="email"
                            className="submitDetails_cont_input_area"
                            name="ref_code"
                            value={getRef}
                          />
                        </div>
                        <div className="button_comply_cube_div">
                          <button
                            className="proceed_to_cube_btn"
                            onClick={submitKycDetails_bkp}
                            disabled={disable}
                          >
                            {isLoading ? (
                              <span>
                                Please wait{' '}
                                <FontAwesomeIcon
                                  className="ml-2"
                                  icon={faSpinner}
                                  spin
                                />
                              </span>
                            ) : (
                              <span> Proceed to kyc</span>
                            )}
                          </button>
                          {/* {country === "Nigeria" || country === "nigeria" ? (
                            <button
                              className="proceed_to_cube_btn"
                              onClick={() =>
                                (window.location.href =
                                  "https://kyc.egoras.org")
                              }
                            >
                              Procedd to Local Kyc
                            </button>
                          ) : country !== "Nigeria" || country !== "nigeria" ? (
                            <button
                              className="proceed_to_cube_btn"
                              onClick={submitKycDetails_bkp}
                            >
                              Proceed to complycube
                            </button>
                          ) : null} */}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div
                  className={
                    verified === false
                      ? 'rule_progress disabled_bg'
                      : ' rule_progress enabled_bg'
                  }
                ></div>
              </div>
            </div>

            {/* ================= */}
            {/* ================= */}
            {/* ================= */}
            {/* ================= */}
          </div>
          <div
            className="close_onBoardUserDiv_btn_cont"
            onClick={toggleOnBoardUserDiv}
          >
            <CloseIcon />
            Close
          </div>
        </div>
      ) : null}
      {customAlert === true ? (
        <CustomAlert
          alert={alertTxt}
          alertType={alertType}
          closeAlert={() => setCustomAlert(false)}
        />
      ) : null}
    </div>
  );
};

// export default DashBoardLendPage;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// let  res = await getLogin2(
export default connect(mapStateToProps, {})(DashBoardLendPage);
