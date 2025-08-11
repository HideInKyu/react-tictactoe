import "./App.css";
import Grid from "./components/grid";
import io from "socket.io-client";
import HomeScreen from "./components/HomeScreen";
import { SocketContext } from "./hooks/SocketContext";
import { useState } from "react";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    return () => newSocket.close();
  });

  return (
    <>
      <SocketContext.Provider value={socket}>
        <HomeScreen></HomeScreen>
        <Grid gName="grid" bName="box" grid={9}></Grid>
      </SocketContext.Provider>
    </>
  );
}

export default App;
