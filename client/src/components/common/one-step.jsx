import React from "react";

const OneStepBanner = () => (
  <div
    style={{
      position: "fixed",
      left: 0,
      top: 0,
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      zIndex: 10,
      width: "20vw",
      marginTop: "30px",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        width: "100%",
        background: "transparent",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          background: "transparent",
          gap: "2.5rem",
          height: "100%",
          marginBottom: "2.5rem",
          marginLeft: "-2rem",
        }}
      >
        <span
          style={{
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            color: "#c93939c8",
            fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
            fontWeight: 900,
            fontSize: "5rem",
            letterSpacing: 2,
            lineHeight: 1.1,
            userSelect: "none",
            textAlign: "center",
            marginRight: "0.5em",
            marginTop: 0,
          }}
        >
          ONE STEP
        </span>
        <span
          style={{
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            color: "orange",
            fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
            fontWeight: 900,
            fontSize: "5rem",
            letterSpacing: 2,
            lineHeight: 1.1,
            userSelect: "none",
            textAlign: "center",
            marginLeft: "-1.2em",
            marginTop: 0,
          }}
        >
          AWAY
        </span>
      </div>
    </div>
  </div>
);

export default OneStepBanner;
