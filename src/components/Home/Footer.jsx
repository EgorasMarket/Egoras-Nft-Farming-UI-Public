import React, { useState, useEffect } from "react";
import { Twitter, Facebook, YouTube, Instagram } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
// import OpenVaultPage from "./DashBoardPages/OpenVaultPage"im
import OpenVaultPage from "../Dashboard/DashBoardPages/OpenVaultPage";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "../../css/footer.css";
import "../../css/footerMobile.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Footer = () => {
  // assets.forEach(asset);
  const [showFooter, setShowFooter] = useState(true);
  const currentPage = window.location.pathname;
  useEffect(() => {
    const urlArr = currentPage.split("/");
    if (currentPage === "/dashboard/") {
      setShowFooter(false);
    }
    if (currentPage === "/dashboard") {
      setShowFooter(false);
    }
    if (currentPage === "/dashboard/lend") {
      setShowFooter(false);
    }
    if (currentPage === "/dashboard/lend/pool/detail/branch/asset") {
      setShowFooter(false);
    }
    if (currentPage === "/dashboard/lending") {
      setShowFooter(false);
    }
    if (currentPage === "/dashboard/swap") {
      setShowFooter(false);
    }
    if (currentPage === "/dashboard/user") {
      setShowFooter(false);
    }
    if (currentPage === "/dashboard/lend/pool/detail") {
      setShowFooter(false);
    }
    if (currentPage === "/dashboard/add") {
      setShowFooter(false);
    }
    if (currentPage === "/dashboard/whitepaper") {
      setShowFooter(false);
    }
    if (currentPage === "/vault/" + urlArr[2] + "/ENGN") {
      setShowFooter(false);
    }
    if (currentPage === "/deposit_vault/" + urlArr[2] + "/ENGN") {
      setShowFooter(false);
    }
  });

  const classes = useStyles();

  return (
    <>
      {showFooter === true ? (
        <div id="FooterId">
          <section className="footerSection">
            <div className="container">
              <div className="footerArea">
                <div className="footerCard1">
                  <a href="#">
                    {" "}
                    <img
                      src="/img/egoras-logo.svg"
                      alt="..."
                      className="egr2-logo"
                    />
                  </a>

                  <div className="footerIcons">
                    <a
                      href="https://twitter.com/egorasmarket"
                      className="twitter"
                      target="_blank"
                    >
                      <Twitter />
                    </a>
                    <a
                      href="https://web.facebook.com/egorasmarket/"
                      className="twitter"
                      target="_blank"
                    >
                      <Facebook />
                    </a>
                    <a
                      href="https://instagram.com/egorasofficial"
                      className="twitter"
                      target="_blank"
                    >
                      <Instagram />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCHfi5EwXig46xp5Dx8hVBHQ"
                      className="twitter"
                      target="_blank"
                    >
                      <YouTube />
                    </a>
                  </div>
                </div>

                <div className="footerCard2">
                  <div className="footerCardTitle">General</div>
                  <div className="footerLinks">
                    {/* <a href="/" className="c1link1 a">
                  Home
                </a> */}

                    <a href="#howitworks" className="c1link1 a">
                      How it works
                    </a>
                    {/* <a href="#token" className="c1link1">
                  Tokens
                </a> */}
                    <a href="#features" className="c1link1">
                      Features
                    </a>
                  </div>
                </div>

                <div className="footerCard2">
                  <div className="footerCardTitle">About Us</div>
                  <div className="footerLinks">
                    <a
                      href="https://egoras.com/about"
                      className="c1link1"
                      target="_blank"
                    >
                      About
                    </a>
                    <a
                      href="/dashboard/whitepaper"
                      className="c1link1"
                      target="_blank"
                    >
                      White Paper
                    </a>
                  </div>
                </div>

                <div className="footerCard2">
                  <div className="footerCardTitle">Legal</div>
                  <div className="footerLinks">
                    <a
                      href="https://egoras.com/privacy"
                      className="c1link1 a"
                      target="_blank"
                    >
                      Privacy policy
                    </a>
                    <a
                      href="https://egoras.com/terms-conditions"
                      className="c1link1"
                      target="_blank"
                    >
                      Terms & conditions
                    </a>
                    {/* <a href="#partners" className="c1link1" target="_blank">
                  Partners
                </a> */}
                  </div>
                </div>

                <div className="footerCard2">
                  <div className="footerCardTitle">Tokens</div>
                  <div className="footerLinks">
                    {/* <a href="/egr-token" className="c1link1" target="_blank">
                  EGR
                </a> */}
                    <a
                      href="https://egoras.com/engn-token"
                      className="c1link1"
                      target="_blank"
                    >
                      eNGN
                    </a>
                    <a
                      href="https://egoras.com/egc_token"
                      className="c1link1"
                      target="_blank"
                    >
                      EGC
                    </a>
                  </div>
                </div>

                <div className="footerCard2">
                  <div className="footerCardTitle">Contact Us</div>
                  <div className="footerLinks">
                    <a href="https://t.me/egorasmarket" className="c1link1 a">
                      Get in Touch Today
                    </a>
                    <a href="" className="c1link1"></a>
                    <a href="/" className="c1linklast">
                      cs@egoras.com
                    </a>
                  </div>
                </div>

                {/* =================================
            ==================== */}
                <div className="footerCard3">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        General{" "}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="footerLinks">
                        {/* <a href="/" className="c1link1 a">
                      Home
                    </a> */}

                        <a href="#howitworks" className="c1link1 a">
                          How it works
                        </a>
                        <a href="#features" className="c1link1" target="_blank">
                          Features
                        </a>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography className={classes.heading}>
                        About Us
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="footerLinks">
                        <a
                          href="https://egoras.com/about"
                          className="c1link1"
                          target="_blank"
                        >
                          About
                        </a>
                        <a
                          href="/dashboard/whitepaper"
                          className="c1link1"
                          target="_blank"
                        >
                          White Paper
                        </a>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography className={classes.heading}>Legal</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="footerLinks">
                        <a
                          href="https://egoras.com/privacy"
                          className="c1link1 a"
                          target="_blank"
                        >
                          Privacy policy
                        </a>
                        <a
                          href="https://egoras.com/terms-conditions"
                          className="c1link1"
                          target="_blank"
                        >
                          Terms & conditions
                        </a>

                        {/* <a href="#partners" className="c1link1" target="_blank">
                      Partners
                    </a> */}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography className={classes.heading}>
                        Tokens
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="footerLinks">
                        {/* <a href="/egr-token" className="c1link1 a" target="_blank">
                      EGR
                    </a> */}
                        <a
                          href="https://egoras.com/engn-token"
                          className="c1link1"
                          target="_blank"
                        >
                          eNGN
                        </a>
                        <a
                          href="https://egoras.com/egc_token"
                          className="c1link1"
                          target="_blank"
                        >
                          EGC
                        </a>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography className={classes.heading}>
                        Contact Us
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="footerLinks">
                        <a
                          href="https://t.me/egorasmarket"
                          className="c1link1 a"
                        >
                          Get in Touch Today
                        </a>
                        <a href="" className="c1link1"></a>
                        <a href="/" className="c1linklast">
                          cs@egoras.com
                        </a>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>

              <hr></hr>
              <h5 className="footerBottomPara">
                ©️ 2022 Egoras. All rights reserved .
              </h5>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default Footer;
