import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Grid from "./components/grid";
import io from "socket.io-client";
import HomeScreen from "./components/HomeScreen";

function App() {
  const socket = io("http://localhost:3000");

  return (
    <>
      <HomeScreen></HomeScreen>
      <Grid gName="grid" bName="box" grid={9}></Grid>
    </>
  );
}

export default App;
