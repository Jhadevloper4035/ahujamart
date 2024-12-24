import { Card, Skeleton } from "antd";
import React from "react";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCard = [];

    for (let i = 0; i < count; i++) {
      totalCard.push(
        <Card key={i} className="col-md-4  mb-3 ">
          <Skeleton active />
        </Card>
      );
    }

    return totalCard;
  };

  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
