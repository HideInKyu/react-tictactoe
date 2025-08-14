import "./App.css";
import Grid from "./components/grid";
import io from "socket.io-client";
import HomeScreen from "./components/HomeScreen";
import { SocketContext } from "./hooks/SocketContext";
import { useState, useEffect } from "react";

function App() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [XO, setXO] = useState("");
  useEffect(() => {
    const socketUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const newSocket = io(socketUrl);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  console.log(import.meta.env.VITE_API_URL);

  return (
    <>
      <SocketContext.Provider value={socket}>
        <Grid
          gName="grid"
          bName="box"
          grid={9}
          name={name}
          roomNumber={roomNumber}
          connected={connected}
          XO={XO}
        ></Grid>
        {connected ? (
          ""
        ) : (
          <HomeScreen
            setRoomNumber={setRoomNumber}
            setName={setName}
            setConnected={setConnected}
            setXO={setXO}
          />
        )}
      </SocketContext.Provider>
    </>
  );
}

export default App;
