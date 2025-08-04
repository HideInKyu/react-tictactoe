import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Grid from "./components/grid";

function App() {
  return (
    <>
      <Grid gName="grid" bName="box" grid={9}></Grid>
    </>
  );
}

export default App;
