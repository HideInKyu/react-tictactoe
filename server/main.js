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

  socket.on("xMove", ({ id, roomNumber }) => {
    console.log(`Move made in room "${roomNumber}" at box ${id}`);
    socket.to(roomNumber).emit("xMove", { id });
  });

  socket.on("oMove", ({ id, roomNumber }) => {
    console.log(`Move made in room "${roomNumber}" at box ${id}`);
    socket.to(roomNumber).emit("oMove", { id });
  }); 
});
