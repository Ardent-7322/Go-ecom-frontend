import React from "react";
import Carousel from "react-material-ui-carousel";
import { DealsCard } from "./DealsCard";

const DealsPage = () => {
  const items = [
    {
      name: "Summer Sale",
      description: "Up to 60% off on top picks. Limited time only.",
      tag: "Sale",
    },
    {
      name: "New Arrivals",
      description: "Fresh products just dropped. Be the first to discover what's trending.",
      tag: "New",
    },
    {
      name: "Clearance",
      description: "Massive discounts across all categories. Grab deals before stock runs out.",
      tag: "Limited",
    },
  ];

  return (
    <div style={{ width: "100%", marginBottom: 8 }}>
      <Carousel
        animation="slide"
        interval={5000}
        navButtonsAlwaysVisible={false}
        indicators={true}
        navButtonsProps={{
          style: { display: "none" }
        }}
        indicatorContainerProps={{
          style: { marginTop: "-28px", position: "relative", zIndex: 2 }
        }}
        indicatorIconButtonProps={{
          style: { color: "rgba(255,255,255,0.3)", padding: "4px" }
        }}
        activeIndicatorIconButtonProps={{
          style: { color: "#fff" }
        }}
        sx={{ width: "100%" }}
      >
        {items.map((item, i) => (
          <DealsCard key={i} deal={item as any} />
        ))}
      </Carousel>
    </div>
  );
};

export default DealsPage;
