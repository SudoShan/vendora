import React from "react";
import heroImg from "../../assets/hero.webp";

const Hero: React.FC = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fafafa",
      maxWidth: "100vw", // Prevent horizontal scroll
    }}
  >
    <img
      src={heroImg}
      alt="Hero"
      style={{
        position: "absolute",
        top: -20,
        left: -20,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        pointerEvents: "none",
        userSelect: "none",
        maxWidth: "100vw",
        maxHeight: "100vh",
      }}
      draggable={false}
    />
  </div>
);

export default Hero;
