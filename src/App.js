import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Matrix from "./Matrix";

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
    </Main>
  );
}

export default App;

const Main = styled.div`
  width: 100vw;
  height: 100vh; 
`;
