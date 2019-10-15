import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const getRandomChar = () => {
  return String.fromCharCode(Math.random() * 128);
};

const Matrix = ({ width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const w = (canvas.width = width);
    const h = (canvas.height = height);
    let requestId = null;

    // We want to make the text fall in columns. Each column will be 20px wide. And in each frame of the animation, we will put a single character at the end of each column. Initially the end (y coordinate) of each column is at 0.
    const columns = Math.floor(w / 20) + 1;
    const startPositions = Array.from({ length: columns }).map((_, i) => ({
      x: i * 20,
      y: 0,
    }));
    let int = 0; // control the timing
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    const matrix = () => {
      requestId = requestAnimationFrame(matrix);
      if (int % 2 === 0) {
        ctx.fillStyle = "#0001";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#0f0";
        ctx.font = "14pt monospace";

        startPositions.forEach(pos => {
          const char = getRandomChar();
          ctx.fillText(char, pos.x, pos.y);

          // randomly reset the end of the column if it's at least 100px high
          if (pos.y > 100 + Math.random() * 5000) pos.y = 0;
          pos.y += 20;
        });
      }
      int++;
    };

    requestAnimationFrame(matrix);
    // const int = setInterval(matrix, 100000);

    return () => {
      cancelAnimationFrame(requestId);
      clearInterval(int);
    };
  });
  return <canvas ref={canvasRef}></canvas>;
};

Matrix.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Matrix;
