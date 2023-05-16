import React, { useState, useEffect } from "react";
import { Twitter, Facebook, YouTube, Instagram } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import WaveAnimation from "./WaveAnimation/WaveAnimation";
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
    // console.log(urlArr[1]);
    const urlArr = currentPage.split("/");
    if (currentPage === "/app/") {
      setShowFooter(false);
    }
    if (urlArr[2] === "market") {
      setShowFooter(false);
    }
    if (urlArr[1] === "app") {
      setShowFooter(false);
    }
    if (currentPage === "/app") {
      setShowFooter(false);
    }
    if (currentPage === "/app/earn") {
      setShowFooter(false);
    }
    if (currentPage === "/membership/sub") {
      setShowFooter(false);
    }
    if (
      currentPage ===
      "/app/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setShowFooter(false);
    }
    if (currentPage === "/app/earn/pool/" + urlArr[4] + "/detail") {
      setShowFooter(false);
    }
    if (
      currentPage ===
      "/app/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setShowFooter(false);
    }
    if (currentPage === "/app/earn/pool/detail/branch/asset") {
      setShowFooter(false);
    }
    if (urlArr[1] === "admin") {
      setShowFooter(false);
    }
    if (currentPage === "/admin/transactions") {
      setShowFooter(false);
    }
    if (currentPage === "/admin/assets") {
      setShowFooter(false);
    }
    if (currentPage === "/app/user/sales") {
      setShowFooter(false);
    }
    if (currentPage === "/app/earning") {
      setShowFooter(false);
    }
    if (currentPage === "/app/swap") {
      setShowFooter(false);
    }
    if (currentPage === "/app/user/referral") {
      setShowFooter(false);
    }
    if (currentPage === "/app/user") {
      setShowFooter(false);
    }
    if (currentPage === "/app/earn/pool/detail") {
      setShowFooter(false);
    }
    if (currentPage === "/app/add") {
      setShowFooter(false);
    }
    if (currentPage === "/app#") {
      setShowFooter(false);
    }
    if (currentPage === "/app/sell") {
      setShowFooter(false);
    }
    if (currentPage === "/app/market") {
      setShowFooter(false);
    }
    if (currentPage === "/app/stake") {
      setShowFooter(false);
    }
    if (currentPage === "/app/staking/egc") {
      setShowFooter(false);
    }
    if (currentPage === "/app/stake/vault/" + urlArr[4] + "/ENGN") {
      setShowFooter(false);
    }
    if (currentPage === "/app/stake/deposit_vault/" + urlArr[4] + "/ENGN") {
      setShowFooter(false);
    }
    console.log(urlArr);
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
                  <div className="FooterPageLinks">
                    <a href="#" className="FooterPageLinks_1" target="_blank">
                      About Us
                    </a>
                    <a href="#" className="FooterPageLinks_1" target="_blank">
                      White Paper
                    </a>
                  </div>
                  <a href="#">
                    {" "}
                    <img
                      src="/img/martgpt_logo_dark.svg"
                      alt="..."
                      className="egr2-logo"
                    />
                    <img
                      src="/img/martgpt_logo.svg"
                      alt="..."
                      className="egr2-logo2"
                    />
                  </a>

                  <div className="footerIcons">
                    <a
                      href="https://twitter.com/egorasmarket"
                      className="twitter"
                      target="_blank"
                    >
                      <Twitter className="twitter_icon" />
                    </a>
                    <a
                      href="https://web.facebook.com/egorasmarket/"
                      className="twitter"
                      target="_blank"
                    >
                      <Facebook className="twitter_icon" />
                    </a>
                    <a
                      href="https://instagram.com/egorasofficial"
                      className="twitter"
                      target="_blank"
                    >
                      <Instagram className="twitter_icon" />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCHfi5EwXig46xp5Dx8hVBHQ"
                      className="twitter"
                      target="_blank"
                    >
                      <YouTube className="twitter_icon" />
                    </a>
                  </div>
                </div>
                {/* =================================
            ==================== */}
                <div className="footerCard3">
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
                        <a href="#" className="c1link1" target="_blank">
                          About
                        </a>
                        <a href="/app#" className="c1link1" target="_blank">
                          White Paper
                        </a>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>

              <hr className="footer_hr_rule"></hr>
              <h5 className="footerBottomPara">
                ©️ 2023 Martgpt. All rights reserved .
              </h5>
            </div>
          </section>
          <WaveAnimation />
        </div>
      ) : null}
    </>
  );
};

export default Footer;
