import React, { useState, useEffect } from "react";

import "../../../css/dashboardgovernancedetails.css";
const DashboardGovernanceDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <section className="governance_details_section">
        <div className="container">
          <div className="governance_details_area">
            <div className="governance_details1"></div>

            <div className="governance_details2">
              <img
                src="/img/bicoin-logo.svg"
                alt=""
                className="governance_details_image"
              />
                      </div>
                      
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardGovernanceDetails;
