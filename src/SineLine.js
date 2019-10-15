import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function Line(ctx, width, startY, colors, amplitude, length) {
  this.startY = startY;
  this.color = colors[Math.floor(Math.random() * colors.length)];
  this.amplitude = amplitude;
  this.length = length;
  this.increment = Math.random();
  this.draw = function() {
    ctx.beginPath();
    ctx.moveTo(0, startY);
    for (let i = 0; i < width; i++) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 2;

      ctx.lineTo(
        i,
        this.startY +
          Math.sin(i / this.length + this.increment) * this.amplitude,
      );
    }
    ctx.stroke();
  };

  this.update = function() {
    this.increment += 0.01;

    this.draw();
  };
}

const SineLine = ({ width, height, startY, length, amplitude, colors }) => {
  const canvasRef = useRef(null);
  console.log(width);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const linesArr = [];
    let length1 = length;
    for (let i = 0; i < 10; i++) {
      linesArr.push(new Line(ctx, width, startY, colors, amplitude, length1));

      length1 += 3;
    }
    linesArr.forEach(l => l.draw());

    function update() {
      requestAnimationFrame(update);
      ctx.lineWidth = 2;
      ctx.fillStyle = "rgba(0,0,89,0.05)";
      ctx.fillRect(0, 0, width, height);
      linesArr.forEach(l => l.update());
    }
    const raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [height, width, amplitude, startY, length, colors]);
  return <canvas ref={canvasRef}></canvas>;
};

SineLine.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  amplitude: PropTypes.number,
};
SineLine.defaultProps = {
  amplitude: 100,
};
export default SineLine;
