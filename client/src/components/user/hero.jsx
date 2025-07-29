import React from "react";
import heroImg from "../../assets/hero.webp";
import { motion } from "framer-motion";


const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Hero = () => (
  <div
    style={{
      width: "100vw",
      height: "90vh",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fafafa",
      maxWidth: "100vw",
      maxHeight: "100vh",
    }}
  >
    <img
      src={heroImg}
      alt="Hero"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "90vh",
        objectFit: "cover",
        pointerEvents: "none",
        userSelect: "none",
      }}
      draggable={false}
    />
    <div
      style={{
        position: "absolute",
        width: "50vw",
        height: "10vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: "auto auto",
        gap: "0.5rem",
        zIndex: 2,
        maxHeight: "50vh",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.10)",
          backdropFilter: "blur(8px)",
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          padding: "2.5rem 3.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: "4rem",
            marginBottom: "0",
            letterSpacing: "2px",
            background: "linear-gradient(90deg, #c93939 60%, orange 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            textShadow: "0 2px 16px rgba(0,0,0,0.18)",
          }}
        >
          Vendora
        </motion.h1>
        <motion.h2
          variants={textVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: "1.5rem",
            marginBottom: "0.2rem",
            marginTop: "0",
            textAlign: "center",
            color: "#fff",
            textShadow: "0 2px 16px rgba(201,57,57,0.18)",
          }}
        >
          An exclusive place for all your needs
        </motion.h2>
        <motion.h3
          variants={textVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 500,
            fontSize: "1.4rem",
            marginBottom: "0.2rem",
            textAlign: "center",
            color: "#ffd580",
            textShadow: "0 2px 16px rgba(201,57,57,0.18)",
          }}
        >
          Hot Deals always Live
        </motion.h3>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            fontSize: "1.5rem",
            marginTop: "0.7rem",
            textAlign: "center",
            color: "#fff",
            letterSpacing: "1px",
            textShadow: "0 2px 16px rgba(0,0,0,0.18)",
          }}
        >
          Wander into{" "}
          <span style={{ color: "#c93939", fontWeight: 900 }}>Vendora.</span>
        </motion.p>
      </div>
    </div>
  </div>
);

export default Hero;
