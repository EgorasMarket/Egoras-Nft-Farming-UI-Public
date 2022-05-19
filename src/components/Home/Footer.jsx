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
    if (currentPage === "/dashboard/lending") {
      setShowFooter(false);
    }
    if (currentPage === "/dashboard/swap") {
      setShowFooter(false);
    }
    if (currentPage === "/dashboard/add") {
      setShowFooter(false);
    }
    if (currentPage === "/dashboard/whitepaper") {
      setShowFooter(false);
    }
    if (currentPage === "/vault/" + urlArr[2] + "/EUSD") {
      setShowFooter(false);
    }
    if (currentPage === "/deposit_vault/" + urlArr[2] + "/EUSD") {
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
                    <a
                      href="https://egoras.com/explore_collaterals"
                      className="c1link1"
                      target="_blank"
                    >
                      Explore Collaterals
                    </a>
                    <a
                      href="https://egoras.com/whitepaper"
                      className="c1link1"
                      target="_blank"
                    >
                      White Paper
                    </a>
                  </div>
                </div>

                <div className="footerCard2">
                  <div className="footerCardTitle">About Us</div>
                  <div className="footerLinks">
                    <a href="#howitworks" className="c1link1 a">
                      How it works
                    </a>
                    {/* <a href="#token" className="c1link1">
                  Tokens
                </a> */}
                    <a
                      href="https://www.youtube.com/channel/UCHfi5EwXig46xp5Dx8hVBHQ/videos"
                      className="c1link1"
                      target="_blank"
                    >
                      Stories
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
                    <a
                      href="https://egoras.com/img/bye law/Scan.pdf"
                      className="c1link1"
                      target="_blank"
                    >
                      Co-operative Bye law
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
                        <a
                          href="https://egoras.com/explore_collaterals"
                          className="c1link1"
                          target="_blank"
                        >
                          Explore Collaterals
                        </a>
                        <a
                          href="https://egoras.com/whitepaper"
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
                      <Typography className={classes.heading}>
                        About Us
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="footerLinks">
                        <a href="#howitworks" className="c1link1 a">
                          How it works
                        </a>
                        <a
                          href="https://www.youtube.com/channel/UCHfi5EwXig46xp5Dx8hVBHQ/videos"
                          className="c1link1"
                          target="_blank"
                        >
                          Stories
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
                        <a
                          href="https://egoras.com/img/bye law/Scan.pdf"
                          className="c1link1"
                          target="_blank"
                        >
                          Co-operative Bye law
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
              <span className="law_write_up">
                “Egoras” and “Egoras.com” are trademarks of Egoras Technologies
                Limited, a company duly registered with CAC with{" "}
                <span className="add_color">RC Number: 1832671. </span>
                Egoras.com is a platform used for the provision of financial
                services under a Multipurpose Co-operative License with
                registration number <span className="add_color">34052</span>.
                The Co-operative and Egoras Technologies Limited are duly
                registered legal entities in Nigeria.
                <br />
                <br /> By the Co-operative’s Bye Law, every member of the
                Co-operative shall subscribe to a minimum of one share and may
                subscribe to additional shares subject to 20% maximum holding in
                accordance with the provision of section 27 of the Nigerian
                Co-operative Societies Act. Members of the Co-operative have
                their shareholding represented in{" "}
                <a href="/egc_token" className="add_color">
                  {" "}
                  Egoras Credit (EGC)
                </a>
                . However, possession of EGC is not proof of membership.
              </span>
              <hr></hr>
              <h5 className="footerBottomPara">
                ©️ 2022 Egoras Technologies LTD(RC - 1832671). All rights
                reserved .
              </h5>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default Footer;
