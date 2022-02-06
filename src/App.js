import { useReducer } from "react";
import Button from "@mui/material/Button";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import { Stack } from "@mui/material";
import { Main } from "./Styles/Styles";
import { initialState, reducerfunction } from "./Reducer/Reducer";
import { Context } from "./Context/Context";
import Canvas from "./Components/Canvas";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) =>
  augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    rectangle: createColor("#e56b6f "),
    circle: createColor("#b56576 "),
  },
});

function App() {
  const [state, dispatch] = useReducer(reducerfunction, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Main>
        <ThemeProvider theme={theme}>
          <Stack direction="row" gap={3}>
            <Button color="rectangle" variant="outlined">
              Rectangle
            </Button>
            <Button color="circle" variant="outlined">
              Circle
            </Button>
          </Stack>
        </ThemeProvider>
        <Canvas />
      </Main>
    </Context.Provider>
  );
}

export default App;
