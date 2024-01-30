import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import WaveAnimation from "./WaveAnimation/WaveAnimation";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Accordion from "@material-ui/core/Accordion";
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
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the current year when the component mounts
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000); // Update the year every second (you can adjust the interval as needed)

    // Clear the interval when the component unmounts    sss
    return () => clearInterval(intervalId);
  }, []);
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
              <div className="footerDiv1">
                <div className="footerDiv1_area1">
                  <div className="footerDiv1_area1_cont1">
                    <img
                      src="/img/egoras-logo.svg"
                      alt="..."
                      className="egr2-logo"
                    />
                    <img
                      src="/img/logoVideoThumbnail.svg"
                      alt="..."
                      className="egr2-logo2"
                    />
                  </div>
                </div>
                <div className="footerDiv1_area2">
                  <div className="footerDiv1_area2_cont1">
                    <div className="footerDiv1_area2_title">Protocol</div>
                    <div className="footerDiv1_area2_title_subLinks_div">
                      <a
                        href="#"
                        className="footerDiv1_area2_title_subLinks_div_link1"
                      >
                        About Us
                      </a>
                      <a
                        href="#"
                        className="footerDiv1_area2_title_subLinks_div_link1"
                      >
                        Lite Paper
                      </a>
                      <a
                        href={
                          window.location.protocol === "http:"
                            ? `http://localhost:${window.location.port}/`
                            : `https://egodao.org/`
                        }
                        className="footerDiv1_area2_title_subLinks_div_link1"
                      >
                        Egodao V2
                      </a>
                    </div>
                  </div>
                  <div className="footerDiv1_area2_cont1">
                    <div className="footerDiv1_area2_title">Need Help?</div>
                    <div className="footerDiv1_area2_title_subLinks_div">
                      <a
                        href="mailto:support@egoras.com"
                        className="footerDiv1_area2_title_subLinks_div_link1"
                        target="_blank"
                      >
                        support@egodao.org
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="footer_hr" />
              <div className="footer_lastDiv">© {currentYear} Egodao.org</div>
            </div>
          </section>
          <WaveAnimation />
        </div>
      ) : null}
    </>
  );
};

export default Footer;
