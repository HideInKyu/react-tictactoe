const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

const MAXSIZE = 2;

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("createRoom", ({ playerName, roomId }) => {
    if (io.sockets.adapter.rooms.get(roomId)) {
      socket.emit("error", { message: "Room already exists." });
      console.log(`Creation failed: Room "${roomId}" already exists.`);
      return;
    }
    socket.join(roomId);
    console.log(`${playerName} created and joined room: ${roomId}`);
    socket.emit("roomCreated", { playerName, roomId });
  });

  socket.on("joinRoom", ({ playerName, roomId }) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (room && room.size < MAXSIZE) {
      socket.join(roomId);
      console.log(`${playerName} joined room: ${roomId}`);
      socket.emit("roomJoined", { playerName, roomId });
      socket.to(roomId).emit("playerJoined", {
        message: `${playerName} has joined the room.`,
      });
    } else {
      if (!room) {
        socket.emit("error", { message: "Room does not exist." });
        console.log(`Join failed: Room "${roomId}" does not exist.`);
      } else {
        socket.emit("error", { message: "Room is full." });
        console.log(`Join failed: Room "${roomId}" is full.`);
      }
    }
  });

  socket.on("playX", ({ XO, index, roomNumber }) => {
    const turn = 1;
    console.log(`Player X played at index ${index} in room ${roomNumber}`);
    socket.to(roomNumber).emit("playX", { turn, XO, index });
  });

  socket.on("playO", ({ XO, index, roomNumber }) => {
    const turn = 0;
    console.log(`Player O played at index ${index} in room ${roomNumber}`);
    socket.to(roomNumber).emit("playO", { turn, XO, index });
  });
});
