import React from "react";

import "../../../css/dashboardanalytics.css";

const DashBoardAnalytics = () => {
  return (
    <div className="other2">
      {/* get started section start */}

      <section className="getStartedSection">
        <h1 className="getStartedTitle">Buy Airtime</h1>
        <div className="getStartedCards">
                  <div className="getStartedCard1">
                    
            <a href="/dashboard/airtime" className="getStartedCardHeading">
              {" "}
              Airtime Purchase
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoardAnalytics;
