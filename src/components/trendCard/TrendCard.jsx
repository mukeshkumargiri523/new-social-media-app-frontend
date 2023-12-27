import React from "react";
import "./TrendCard.css";
import { TrendingData } from "../../data/TrendingData";

const TrendCard = () => {
  return (
    <div className="TrendCard">
      <h3>Trending right now</h3>
      <div className="trend_heading">
        <span>Trends</span>
        <span>Shares</span>
      </div>
      <div className="trends">
        {TrendingData?.map((trend, id) => {
          return (
            <div className="trend" key={id}>
              <span className="trend_name">#{trend.name}</span>
              <span>{trend.share}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendCard;
