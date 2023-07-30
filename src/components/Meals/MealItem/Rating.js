import React from "react";

const Rating = ({ value }) => {
  const renderStar = (index) => {
    const decimalPart = value - index;
    if (decimalPart >= 0.75) {
      return <i className="fas fa-star" key={index} />;
    } else if (decimalPart >= 0.25) {
      return <i className="fas fa-star-half-alt" key={index} />;
    } else {
      return <i className="far fa-star" key={index} />;
    }
  };

  return (
    <div className="rating">
      {Array.from({ length: 5 }, (_, index) => renderStar(index))}
    </div>
  );
};

export default Rating;
