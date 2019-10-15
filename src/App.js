import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import SineLine from "./SineLine";
import Matrix from "./Matrix";

const baseColors = [
  "#026592",
  "#94bfd2",
  "#91a4a2",
  "#247067",
  "#38b1d4",
  "#fcffff",
  "#a18999",
  "#95c092",
  "#88dfe4",
];

function App() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    setDimensions({
      width: container.offsetWidth,
      height: container.offsetHeight,
    });

    const handleWindowResize = () => {
      setDimensions({
        width: container.offsetWidth,
        height: container.offsetHeight,
      });
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [containerRef]);
  return (
    <Main ref={containerRef}>
      <Matrix width={dimensions.width} height={dimensions.height}></Matrix>
      {/* <SineLine
        colors={baseColors}
        width={dimensions.width}
        height={dimensions.height}
        startY={dimensions.height / 2}
        length={100}
        amplitude={100}
      ></SineLine> */}
    </Main>
  );
}

export default App;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  ${"" /* background: #005; */}
`;
