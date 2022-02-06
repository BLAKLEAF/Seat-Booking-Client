import styled from "styled-components";
import { Stage } from "react-konva";

export const Main = styled.main`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    125.22deg,
    #fdf5f0 -3.4%,
    rgba(248, 221, 202, 0.989482) 56.09%,
    rgba(246, 188, 158, 0.98) 111.89%
  );
  margin: 0;
`;

// export const CanvasPaper = styled.canvas`
//   width: 80%;
//   height: 85%;
//   background: #ffe8d6;
//   filter: drop-shadow(0 0 0.75rem #ddbea9);
// `;
export const CanvasPaper = styled(Stage)`
  width: 80%;
  height: 85%;
  background: #ffe8d6;
  filter: drop-shadow(0 0 0.75rem #ddbea9);
`;
