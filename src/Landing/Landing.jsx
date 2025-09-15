import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #1e1e1e, #121212)",
        color: "#f5f5f5",
      }}
    >
   
      <motion.h1
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-3"
      >
        Welcome to <span style={{ color: "#38bdf8" }}>CodeSnip <i class="fa-solid fa-rocket"></i> </span>
      </motion.h1>

   
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mb-4 fs-5"
        style={{ maxWidth: "600px" }}
      >
        Organize, save, and manage your code snippets with ease.
      </motion.p>

      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 1,
          duration: 0.6,
          type: "spring",
          stiffness: 120,
        }}
      >
        <Link
          to="/home"
          className="btn btn-primary px-4 py-2"
          style={{
            borderRadius: "30px",
            fontSize: "1.1rem",
            fontWeight: "500",
          }}
        >
          Get Started
        </Link>
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "#38bdf8",
          top: "15%",
          left: "20%",
          filter: "blur(100px)",
          zIndex: -1,
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "#9333ea",
          bottom: "10%",
          right: "15%",
          filter: "blur(120px)",
          zIndex: -1,
        }}
      />
    </div>
  );
}
