import React, { useState, useEffect } from "react";
import "../../../css/file.css";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Modal,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import {
  faCheckCircle,
  faCircleNotch,
  faChevronRight,
  faArrowRight,
  faLock,
  faWindowClose,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Authenticate } from "../../auth/Authenticate";
import {
  checkAllowance,
  unluckToken,
  transactReceipt,
  getPrice,
  getTickerInfo,
  tokenBalance,
  exchangeDefault,
  getDefault,
  crossexchange,
} from "../../../web3/index";
import { parseEther, formatEther } from "@ethersproject/units";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
const sweet = [{ img: "/img/bnb-icon.svg", bar: "BNB", bar1: "Binance" }];
const sweet1 = [{ img: "/img/bnb-icon.svg", bar: "BNB", bar1: "Binance" }];
const sweet101 = [
  { imgs: "/img/bnb-icon.svg", nase: "BNB" },
  { imgs: "/egoras-favicon.svg", nase: "EGR" },
  { imgs: "/img/egc-icon.svg", nase: "EGC" },
  { imgs: "/img/kodi.png", nase: "KODI" },
];
const sweet102 = [
  { imgs: "/img/bnb-icon.svg", nase: "BNB" },
  { imgs: "/egoras-favicon.svg", nase: "EGR" },
  { imgs: "/img/egc-icon.svg", nase: "EGC" },
  { imgs: "/img/kodi.png", nase: "KODI" },
];

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  // Get the modal
  var modal = document.getElementById("farm");
  var modal1 = document.getElementById("farm1");

  if (event.target == modal) {
    modal.style.display = "none";
    document.body.classList.remove("queen");
  }
  if (event.target == modal1) {
    modal1.style.display = "none";
    document.body.classList.remove("queen");
  }
};

const File = () => {
  const [modal, setModal] = useState(false);
  const [backdrop, setBackdrop] = useState(true);
  const [keyboard, setKeyboard] = useState(false);
  const [stage, setStage] = useState("connect");
  const [speed, setSpeed] = useState("paper");
  const [speed1, setSpeed1] = useState("two");
  const [isOpen, setIsOpen] = useState(true);
  const [speed4, setSpeed4] = useState("EGC");
  const [speed5, setSpeed5] = useState("BNB");
  const [image1, setImage1] = useState("/img/bnb-icon.svg");
  const [image, setImage] = useState("/img/egc-icon.svg");
  const [unlocking, setUnlocking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [changeShow, setChangeShow] = useState(0);
  const [changeShow1, setChangeShow1] = useState(0);
  const [hash, setHash] = useState("");
  const [task, setTask] = useState("collateral");
  const [text, setText] = useState(
    "Transacting with blockchain, please wait..."
  );
  const [asset, setAsset] = useState("");
  const [base, setBase] = useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchResults1, setSearchResults1] = React.useState([]);
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [defaultPrice, setDefaultPrice] = useState(0);
  const [coinBalance, setCoinBalance] = useState(0.0);
  const [baseBalance, setBaseBalance] = useState(0.0);
  const [crossX, setCrossX] = useState(false);
  const [xDefault, setXDefault] = useState(false);
  const [assetAddress, setAssetAddress] = useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const switchAssets = () => {
    setSpeed4(speed5);
    setSpeed5(speed4);
    setImage1(image);
    setImage(image1);
    setBaseBalance(coinBalance);
    setCoinBalance(baseBalance);
    setChangeShow1(changeShow);
    setChangeShow(changeShow1);
  };
  const feedExchangeData = (initialSpeed4, initialSpeed5) => {
    setChangeShow("");
    setChangeShow1("");
    if (account) {
      setModal(true);
      setStage("loading");
      setText("Fetching data!");
      if (initialSpeed4 == "BNB" || initialSpeed5 == "BNB") {
        let ticker =
          initialSpeed5 == "BNB"
            ? initialSpeed4 + "-" + initialSpeed5
            : initialSpeed5 + "-" + initialSpeed4;
        initialSpeed5 == "BNB" ? setXDefault(true) : setXDefault(false);
        setCrossX(false);
        getPrice(ticker, library.getSigner()).then((price) => {
          setDefaultPrice(formatEther(price.message));
        });
        getTickerInfo(ticker, library.getSigner()).then((data) => {
          library
            .getBalance(account)
            .then((balance) => {
              setAssetAddress(data.message.asset);
              tokenBalance(
                data.message.asset,
                account,
                library.getSigner()
              ).then((tb) => {
                console.log(
                  formatEther(balance),
                  formatEther(tb.message),
                  initialSpeed4,
                  initialSpeed5
                );
                setBaseBalance(
                  initialSpeed4 != "BNB"
                    ? formatEther(balance)
                    : formatEther(tb.message)
                );
                setCoinBalance(
                  initialSpeed4 == "BNB"
                    ? formatEther(balance)
                    : formatEther(tb.message)
                );
                setModal(false);
              });
            })
            .catch(() => {
              setBaseBalance(null);
            });
        });
      } else {
        //
        let ticker1 = initialSpeed4 + "-BNB";
        let ticker2 = initialSpeed5 + "-BNB";
        setCrossX(true);
        setXDefault(false);
        getPrice(ticker2, library.getSigner()).then((price) => {
          setFromPrice(formatEther(price.message));
        });

        getPrice(ticker1, library.getSigner()).then((price) => {
          setToPrice(formatEther(price.message));
        });

        getTickerInfo(ticker1, library.getSigner()).then((data) => {
          tokenBalance(data.message.asset, account, library.getSigner()).then(
            (tb) => {
              getTickerInfo(ticker2, library.getSigner()).then((data2) => {
                setAssetAddress(data2.message.asset);
                tokenBalance(
                  data2.message.asset,
                  account,
                  library.getSigner()
                ).then((tlb) => {
                  setCoinBalance(formatEther(tb.message));
                  setBaseBalance(formatEther(tlb.message));
                  setModal(false);
                });
              });
            }
          );
        });
      }
    } else {
      setModal(true);
    }
  };
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
  useEffect(() => {
    feedExchangeData(speed4, speed5);
  }, [chainId, account, connector]);
  useEffect(() => {
    const results = sweet.filter((person) =>
      person.bar.toLowerCase().includes(searchTerm)
    );
    const results1 = sweet1.filter((person2) =>
      person2.bar.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
    setSearchResults1(results1);
  }, [searchTerm]);

  const deff = (ey) => {
    // typing on the token side

    if (!crossX) {
      if (speed4 == "BNB") {
        setChangeShow1(ey.target.value / defaultPrice);
      } else {
        setChangeShow1(defaultPrice * ey.target.value);
      }
    } else {
      let bnbValue = toPrice * ey.target.value;
      setChangeShow1(bnbValue / fromPrice);
    }
    setChangeShow(ey.target.value);
    document.getElementById("send8").style.display = "block";
    let pap = document.getElementById("send9");
    if (pap.value <= 0) {
      document.getElementById("send8").style.display = "none";
    }
  };

  const [formData, setFormData] = useState({});

  const deff2 = (eye) => {
    // typing on the base side

    if (!crossX) {
      if (speed5 !== "BNB") {
        setChangeShow(defaultPrice * eye.target.value);
      } else {
        setChangeShow(eye.target.value / defaultPrice);
      }
    } else {
      let bnbValue = fromPrice * eye.target.value;
      setChangeShow(bnbValue / toPrice);
    }
    setChangeShow1(eye.target.value);
    document.getElementById("send208").style.display = "block";
    let pap = document.getElementById("dera3");
    if (pap.value <= 0) {
      document.getElementById("send208").style.display = "none";
    }
  };
  const onSwap = async (e) => {
    e.preventDefault();
    console.log(
      toPrice,
      fromPrice,
      defaultPrice,
      crossX,
      xDefault,
      speed4,
      speed5
    );
    setStage("loading");
    setModal(!modal);
    setText("Swapping! Please wait....");
    if (speed5 == "BNB") {
      let ret = await exchangeDefault(
        speed4 + "-" + speed5,
        parseEther(changeShow1, "wei").toString(),
        library.getSigner()
      );
      if (ret.status == true) {
        localStorage.setItem("unlocking", true);
        localStorage.setItem("unlockingHash", ret.message.hash);
        setText("Disbursing tokens please wait aleast 1/2 minutes");
        setHash(ret.message.hash);
      } else if (ret.status == false) {
        if (ret.message.code < 0) {
          setText(ret.message.data.message);
        } else if (ret.message.code == 4001) {
          setText(ret.message.message);
        }
        setStage("error");
        setIsLoading(false);
      }
    } else if (speed5 !== "BNB" && speed4 == "BNB") {
      let check = await checkAllowance(
        assetAddress,
        account,
        parseEther(changeShow1, "wei").toString(),
        library.getSigner()
      );
      if (check.status == true) {
        let ret = await getDefault(
          speed5 + "-" + speed4,
          parseEther(changeShow1, "wei").toString(),
          library.getSigner()
        );
        if (ret.status == true) {
          localStorage.setItem("unlocking", true);
          localStorage.setItem("unlockingHash", ret.message.hash);
          setText("Disbursing tokens please wait aleast 1/2 minutes");
          setHash(ret.message.hash);
        } else if (ret.status == false) {
          if (ret.message.code < 0) {
            setText(ret.message.data.message);
          } else if (ret.message.code == 4001) {
            setText(ret.message.message);
          }
          setStage("error");
          setIsLoading(false);
        }
      } else {
        setUnlocking(true);
        setStage("unlock");
        setIsLoading(false);
      }
    } else if (speed4 !== "BNB" && speed5 !== "BNB") {
      let check = await checkAllowance(
        assetAddress,
        account,
        parseEther(changeShow1, "wei").toString(),
        library.getSigner()
      );
      if (check.status == true) {
        let ret = await crossexchange(
          speed5 + "-BNB",
          speed4 + "-BNB",
          parseEther(changeShow1, "wei").toString(),
          library.getSigner()
        );
        if (ret.status == true) {
          localStorage.setItem("unlocking", true);
          localStorage.setItem("unlockingHash", ret.message.hash);
          setText("Disbursing tokens please wait aleast 1/2 minutes");
          setHash(ret.message.hash);
        } else if (ret.status == false) {
          if (ret.message.code < 0) {
            setText(ret.message.data.message);
          } else if (ret.message.code == 4001) {
            setText(ret.message.message);
          }
          setStage("error");
          setIsLoading(false);
        }
      } else {
        setUnlocking(true);
        setStage("unlock");
        setIsLoading(false);
      }

      // crossexchange = async (from, to, amoumt, signer)
    }
  };
  //   let defe = (x)=>{
  //  return(x + x)
  //   }

  const fetchDetails = (e, token) => {
    let tbase = speed5;
    let ttoken = speed4;
    if (e == "base") {
      if (token == speed4) {
        if (token == "BNB") {
          setSpeed4("EGC");
          ttoken = "EGC";
          tbase = token;
          setImage("/img/egc-icon.svg");
        } else {
          setSpeed4("BNB");
          ttoken = "BNB";
          tbase = token;
          setImage("/img/bnb-icon.svg");
        }
      } else {
        tbase = token;
        setSpeed5(token);
        // setImage("/img/egc-icon.svg");
      }
    } else if (e == "token") {
      if (token == speed5) {
        if (token == "BNB") {
          setSpeed5("EGC");
          tbase = "EGC";
          ttoken = token;
          setImage1("/img/egc-icon.svg");
        } else {
          setSpeed5("BNB");
          tbase = "BNB";
          ttoken = token;
          setImage1("/img/bnb-icon.svg");
        }
      } else {
        setSpeed4(token);
        ttoken = token;
        //setImage1("/img/bnb-icon.svg");
      }
    }

    feedExchangeData(
      e == "token" ? token : ttoken,
      e == "base" ? token : tbase
    );
  };
  const toggle = () => {
    setModal(!modal);
  };

  const Continue = async (e) => {
    setStage("");
    setText("");
    setModal(!modal);
  };
  const doUnluck = async (e) => {
    setText("Transacting with blockchain, please wait...");
    setStage("loading");
    setIsLoading(true);

    let ret = await unluckToken(
      assetAddress,
      parseEther(changeShow1.toString(), "wei").toString(),
      library.getSigner()
    );
    if (ret.status == true) {
      localStorage.setItem("unlocking", true);
      localStorage.setItem("unlockingHash", ret.message);
      setText("Unlocking please wait aleast 1/2 minutes");
    } else {
      if (ret.message.code == 4001) {
        setText(ret.message.message);
      }

      setStage("error");
      setIsLoading(false);
    }
  };
  const close4 = () => {
    document.getElementById("farm").style.display = "none";

    document.body.classList.remove("queen");
  };

  const close5 = () => {
    document.getElementById("farm1").style.display = "none";

    document.body.classList.remove("queen");
  };

  const show45 = () => {
    document.getElementById("farm").style.display = "flex";
    document.body.classList.add("queen");
  };
  const show46 = () => {
    document.getElementById("farm1").style.display = "flex";
    document.body.classList.add("queen");
  };
  const sign = "$";

  const send = (e) => {
    const sand = e.target.id;
    setSpeed(sand);
  };

  const send1 = (e) => {
    const sand1 = e.target.id;
    setSpeed1(sand1);
  };
  const Just = () => {
    document.getElementById("water").style.display = "none";
    document.getElementById("COMJ").style.display = "none";
    document.getElementById("COMES").style.display = "block";
    // window.scroll.top='70px';
  };
  const Just2 = () => {
    document.getElementById("water").style.display = "block";
    document.getElementById("COMJ").style.display = "block";
    document.getElementById("COMES").style.display = "none";
  };
  setInterval(() => {
    if (localStorage.getItem("unlocking") == "true") {
      transactReceipt(localStorage.getItem("unlockingHash"), library).then(
        function (env) {
          // console.log("running Interval", env);
          if (env.status == true && env.message !== null) {
            if (env.message.confirmations > 2) {
              setStage("success");
              setHash(localStorage.getItem("unlockingHash"));
              setIsLoading(false);

              localStorage.setItem("unlocking", false);
            }
          }
        }
      );
    }
  }, 7000);
  return (
    <div className="other2">
      <div>
        <div className="Trade4">
          <div>
            <div>
              <form>
                <div className="send1">SEND</div>
                <div>
                  <div className="For">
                    <div className="send2">
                      <span style={{ color: "#000" }}>
                        Balance: {baseBalance}
                      </span>{" "}
                      <span className="send3">Amount</span>
                    </div>
                    <div className="send5">
                      <div>
                        <div className="send6">
                          <div className="send7">
                            <img src={image1} alt="" className="send4" />
                          </div>
                          <div>
                            {" "}
                            <div
                              onClick={show46}
                              style={{
                                color: "#000",
                                marginRight: "5px",
                                display: "flex",
                                alignItems: "center",
                                fontWeight: "600",
                                cursor: "pointer",
                              }}
                            >
                              {speed5} <ArrowDropDownIcon />{" "}
                            </div>{" "}
                          </div>

                          <div style={{ color: "#000", fontWeight: "600" }}>
                            MAX
                          </div>
                        </div>
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="0.00"
                          className="send8"
                          id="dera3"
                          value={changeShow1}
                          onChange={deff2}
                          onKeyUp={deff2}
                        />
                        <input
                          type="number"
                          alt=""
                          className="send8"
                          id="send208"
                          placeholder="0.00"
                          value={changeShow1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="For1">
                    <div
                      style={{ flex: "1", fontWeight: "bold" }}
                      className="rete"
                    >
                      RECEIVE
                    </div>
                    {/* <div style={{flex:'1'}}>{<img src="../../img/map11.svg" alt=""/>/</div> */}
                    <div style={{ flex: "1" }}>
                      <svg
                        onClick={switchAssets}
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium sidebarIcon45 css-i4bv87-MuiSvgIcon-root"
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        data-testid="SwapHorizontalCircleIcon"
                      >
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zm-7-5.5 3.5 3.5-3.5 3.5V11h-4V9h4V6.5zm-6 11L5.5 14 9 10.5V13h4v2H9v2.5z"></path>
                      </svg>
                    </div>
                  </div>

                  <div className="For">
                    <div className="send2">
                      <span style={{ color: "#000" }}>
                        Balance: {coinBalance}
                      </span>{" "}
                      <span className="send3">Amount</span>
                    </div>
                    <div className="send5">
                      <div className="send6">
                        <div className="send7">
                          {" "}
                          <img src={image} alt="" className="send4" />
                        </div>
                        <div>
                          {" "}
                          <div
                            onClick={show45}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: "#000",
                              fontWeight: "600",
                              cursor: "pointer",
                            }}
                          >
                            {speed4} <ArrowDropDownIcon id="COMES1" />{" "}
                          </div>
                        </div>
                      </div>
                      <div>
                        <input
                          type="number"
                          alt=""
                          className="send8"
                          id="send9"
                          placeholder="0.00"
                          value={changeShow}
                          onChange={deff}
                          onKeyUp={deff}
                        />
                        <input
                          type="number"
                          alt=""
                          className="send8"
                          id="send8"
                          placeholder="0.00"
                          value={changeShow}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="Enable">Enable Gas Token</div>
                <button
                  className="logout-btn Enable1 btn-block"
                  onClick={(e) => onSwap(e)}
                >
                  {" "}
                  Swap
                </button>
              </form>
            </div>
          </div>

          <div id="COMJ">
            <div className="Enable2 deep" onClick={Just}>
              Advanced <ArrowDropDownIcon />
            </div>
          </div>
          <div id="COMES">
            <div className="Enable2 deep" onClick={Just2}>
              Advanced <ArrowDropDownIcon />
            </div>
          </div>

          <div className="Enable3" id="water">
            <div className="Enable4">Limit additional price slippage</div>
            <div className="Enable5">
              <div
                className={speed1 === "two" ? "ada ada1" : "ada"}
                onClick={send1}
                id="two"
              >
                0.1%
              </div>
              <div
                className={speed1 === "two2" ? "ada ada1" : "ada"}
                onClick={send1}
                id="two2"
              >
                0.2%
              </div>
              <div
                className={speed1 === "two3" ? "ada ada1" : "ada"}
                onClick={send1}
                id="two3"
              >
                0.5%
              </div>
              <div
                className={speed1 === "two4" ? " ada ada1" : "ada"}
                onClick={send1}
                id="two4"
              >
                1%
              </div>
              <div
                className={speed1 === "two5" ? " ada ada1" : "ada"}
                onClick={send1}
                id="two5"
              >
                3%
              </div>
              <div
                className={speed1 === "two6" ? " ada ada1" : "ada"}
                onClick={send1}
                id="two6"
              >
                5%
              </div>
            </div>
            <div className="rece">Minimum received:... DF</div>
            <div className="Gas">Gas Fee (GWEI)</div>
            <div className="Gas1">
              <div
                className={speed === "paper" ? "Gas2  Gas3" : "Gas2"}
                onClick={send}
                id="paper"
              >
                121 <span>Standard</span>
              </div>{" "}
              <div
                className={speed === "paper1" ? " Gas2 Gas3" : "Gas2"}
                onClick={send}
                id="paper1"
              >
                134 <span>Fast</span>{" "}
              </div>{" "}
              <div
                className={speed === "paper2" ? " Gas2 Gas3" : "Gas2"}
                onClick={send}
                id="paper2"
              >
                148 <span>instant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
      {isOpen ? (
        <div className="feed12 feed21" id="farm">
          <div className="feed22">
            <form>
              <div className="feed23">
                <div className="feed25">
                  <div className="feed24">Select a token</div>{" "}
                  <svg
                    onClick={close4}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="sc-1cchcrx-1 bNKSgQ"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search name or paste address"
                  value={searchTerm}
                  className="feed26"
                  onChange={handleChange}
                />
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "500",
                  }}
                >
                  Common bases <span className="feed27">?</span>
                </p>
                <div className="feed30">
                  {sweet101.map((sde) => (
                    <div
                      className="feed29"
                      onClick={() => {
                        setSpeed4(sde.nase);
                        document.body.classList.remove("queen");
                        document.getElementById("farm").style.display = "none";
                        setImage(sde.imgs);
                        fetchDetails("token", sde.nase);
                      }}
                    >
                      <img src={sde.imgs} alt="" className="feed28" />
                      <span style={{ marginLeft: "8px", fontWeight: "600" }}>
                        {sde.nase}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ position: "relative", flex: 1, overflow: "auto" }}>
                <div className="saw2">
                  {/* {sweet.map((ser)=>(<div  onClick={()=>{setSpeed4(ser.bar); document.getElementById('farm').style.display='none'; setImage(ser.img)}} key={ser}className='saw' style={{display:'flex',alignItems:'center',marginBottom:'10px'}}><img src={ser.img} alt="" className="feed28"/><div style={{display:'flex',marginLeft:'10px',flexDirection:'column'}}><span>{ser.bar}</span><span style={{fontSize:'12px',marginTop:'-5px',fontWeight:'300',color:'rgb(110, 114, 125)'}}>{ser.bar1}</span></div></div>)) */}
                  {searchResults.map((ser) => (
                    <div
                      onClick={() => {
                        setSpeed4(ser.bar);
                        document.body.classList.remove("queen");
                        document.getElementById("farm").style.display = "none";
                        setImage(ser.img);
                        fetchDetails("token", ser.bar);
                      }}
                      key={ser}
                      className="saw"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <img src={ser.img} alt="" className="feed28" />
                      <div
                        style={{
                          display: "flex",
                          marginLeft: "10px",
                          flexDirection: "column",
                        }}
                      >
                        <span>{ser.bar}</span>
                        <span
                          style={{
                            fontSize: "12px",
                            marginTop: "-5px",
                            fontWeight: "300",
                            color: "rgb(110, 114, 125)",
                          }}
                        >
                          {ser.bar1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            <div className="saw1">Manage Token Lists</div>
          </div>
        </div>
      ) : null}

      {isOpen ? (
        <div className="feed12 feed21" id="farm1">
          <div className="feed22">
            <form>
              <div className="feed23">
                <div className="feed25">
                  <div className="feed24">Select a token</div>{" "}
                  <svg
                    onClick={close5}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="sc-1cchcrx-1 bNKSgQ"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search name or paste address"
                  value={searchTerm}
                  className="feed26"
                  onChange={handleChange}
                />
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "500",
                  }}
                >
                  Common bases <span className="feed27">?</span>
                </p>
                <div className="feed30">
                  {sweet102.map((sde1) => (
                    <div
                      className="feed29"
                      onClick={() => {
                        setSpeed5(sde1.nase);
                        document.getElementById("farm1").style.display = "none";
                        document.body.classList.remove("queen");
                        setImage1(sde1.imgs);
                        fetchDetails("base", sde1.nase);
                      }}
                    >
                      <img src={sde1.imgs} alt="" className="feed28" />
                      <span style={{ marginLeft: "8px", fontWeight: "600" }}>
                        {sde1.nase}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ position: "relative", flex: 1, overflow: "auto" }}>
                <div className="saw2">
                  {/* {sweet.map((ser)=>(<div  onClick={()=>{setSpeed4(ser.bar); document.getElementById('farm').style.display='none'; setImage(ser.img)}} key={ser}className='saw' style={{display:'flex',alignItems:'center',marginBottom:'10px'}}><img src={ser.img} alt="" className="feed28"/><div style={{display:'flex',marginLeft:'10px',flexDirection:'column'}}><span>{ser.bar}</span><span style={{fontSize:'12px',marginTop:'-5px',fontWeight:'300',color:'rgb(110, 114, 125)'}}>{ser.bar1}</span></div></div>)) */}
                  {searchResults1.map((serr) => (
                    <div
                      onClick={() => {
                        setSpeed5(serr.bar);
                        document.getElementById("farm1").style.display = "none";
                        document.body.classList.remove("queen");
                        setImage1(serr.img);
                        fetchDetails("base", serr.bar);
                      }}
                      key={serr}
                      className="saw"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <img src={serr.img} alt="" className="feed28" />
                      <div
                        style={{
                          display: "flex",
                          marginLeft: "10px",
                          flexDirection: "column",
                        }}
                      >
                        <span>{serr.bar}</span>
                        <span
                          style={{
                            fontSize: "12px",
                            marginTop: "-5px",
                            fontWeight: "300",
                            color: "rgb(110, 114, 125)",
                          }}
                        >
                          {serr.bar1}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            <div className="saw1">Manage Token Lists</div>
          </div>
        </div>
      ) : null}

      <Modal
        fullscreen
        isOpen={modal}
        toggle={toggle}
        className="walletModal mx-auto"
        backdrop={backdrop}
        keyboard={keyboard}
      >
        <ModalBody className="p-4" style={{ background: "#f7f8fa" }}>
          <div style={{ marginTop: "190px" }}>
            {stage == "unlock" ? (
              <div>
                <div className="row">
                  <h1 className="mb-2 text-center">
                    <FontAwesomeIcon icon={faLock} />
                  </h1>

                  <small className="mb-2 text-center">
                    Approve <b>Egoras</b> to spend {speed5} on your behalf.
                  </small>
                  <div
                    className="transact-stat col-md-6 "
                    style={{ margin: "auto" }}
                  >
                    <div className="w-100 ">
                      <input
                        type="text"
                        name="stateAmountToGenerate"
                        value={changeShow1}
                        readonly
                        className="vault_input_vaulta"
                      />
                    </div>

                    <div className="text-center">
                      <button
                        className="open_vault_input_btn mt-4 btn-block"
                        style={{ padding: "0.9em 4.5em" }}
                        onClick={(e) => doUnluck(e)}
                      >
                        {isLoading ? (
                          <FontAwesomeIcon icon={faCircleNotch} spin />
                        ) : null}{" "}
                        Unlock {asset}
                      </button>
                    </div>
                  </div>
                </div>

                <br />
              </div>
            ) : null}

            {stage == "loading" ? (
              <div>
                <p
                  className="text-center loadingContainer"
                  style={{ fontSize: "54px" }}
                >
                  <FontAwesomeIcon icon={faCircleNotch} spin />
                </p>
                <p className="text-center">{text}</p>
              </div>
            ) : null}

            {stage == "success" ? (
              <div className="col-md-12 mt-4">
                <h1 className="text-center text-success">
                  <FontAwesomeIcon icon={faCheckCircle} /> <br />
                  Success
                </h1>
                <p className="text-center">
                  Transaction was successful.
                  <br />
                  <a
                    className="btn btn-link text-success"
                    href={"https://testnet.bscscan.com/tx/" + hash}
                    target="_blank"
                  >
                    View on bscscan.com
                  </a>
                  <br />
                  <button
                    className="open_vault_input_btn mt-4 btn-block btn-lg"
                    onClick={(e) => Continue(e)}
                  >
                    Continue
                  </button>
                </p>
              </div>
            ) : null}

            {stage == "error" ? (
              <div className=" mt-4">
                <h1 className="text-center text-danger">
                  <FontAwesomeIcon icon={faWindowClose} /> <br />
                  Error
                </h1>
                <p className="text-center">
                  {text}
                  <br />

                  <br />
                  <button
                    className="open_vault_input_btn mt-4 btn-block btn-lg"
                    onClick={(e) => Continue(e)}
                  >
                    Continue
                  </button>
                </p>
              </div>
            ) : null}

            {stage == "connect" ? (
              <div className=" text-center mt-4">
                <h1 className="text-center">
                  <FontAwesomeIcon icon={faWallet} /> <br />
                </h1>
                <p>To access this please connect your wallet</p>
              </div>
            ) : null}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default File;
