import React from "react";
import Carousel from "react-material-ui-carousel";
import { DealsCard } from "./DealsCard";

const DealsPage = () => {
  const items = [
    {
      name: "Summer Sale",
      description: "Up to 60% off on top picks. Limited time only — shop before it's gone.",
      badge: "🔥 Hot Deal",
      color1: "#6C3CE1",
      color2: "#3B82F6",
    },
    {
      name: "New Arrivals",
      description: "Fresh products just dropped. Be the first to discover what's trending.",
      badge: "✨ Just In",
      color1: "#F97316",
      color2: "#EF4444",
    },
    {
      name: "Mega Clearance",
      description: "Massive discounts across all categories. Grab deals before stock runs out.",
      badge: "⚡ Flash Sale",
      color1: "#10B981",
      color2: "#3B82F6",
    },
  ];

  return (
    <div style={{ width: "100%", marginBottom: 8 }}>
      <Carousel
        animation="slide"
        interval={5000}
        navButtonsAlwaysVisible={false}
        indicators={true}
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
