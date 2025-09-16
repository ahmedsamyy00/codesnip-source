import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function About() {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center py-5">
      <motion.h1
        className="mb-4 fw-bold"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About CodeSnip
      </motion.h1>

      <motion.p
        className="lead mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        CodeSnip is a modern snippet manager built with React, Electron, and
        SQLite.  
        It allows you to easily <strong>add, edit, delete, favorite, filter, and
        export</strong> your code snippets — all in a clean and user-friendly
        interface.
      </motion.p>

      <motion.button
        className="btn btn-primary btn-lg"
        onClick={() => navigate("/Home")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Back to Home
      </motion.button>
    </div>
  );
}

export default About;
