const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

const MAXSIZE = 2;
const rooms = {}; // Stores room data: { roomId: [{ socketId, playerName }, ...] }

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("createRoom", ({ playerName, roomId }) => {
    if (io.sockets.adapter.rooms.get(roomId)) {
      socket.emit("error", { message: "Room already exists." });
      console.log(`Creation failed: Room "${roomId}" already exists.`);
      return;
    }
    socket.join(roomId);
    rooms[roomId] = [{ socketId: socket.id, playerName }];
    console.log(`${playerName} created and joined room: ${roomId}`);
    socket.emit("roomCreated", { playerName, roomId });
  });

  socket.on("joinRoom", ({ playerName, roomId }) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (room && room.size < MAXSIZE) {
      socket.join(roomId);
      rooms[roomId].push({ socketId: socket.id, playerName });
      console.log(`${playerName} joined room: ${roomId}`);
      socket.emit("roomJoined", { playerName, roomId });

      // If room is full, send opponent info to both players
      if (rooms[roomId].length === MAXSIZE) {
        const player1 = rooms[roomId][0];
        const player2 = rooms[roomId][1];

        console.log(`Emitting opponentInfo to ${player1.playerName} (${player1.socketId}) with opponent: ${player2.playerName}`);
        io.to(player1.socketId).emit("opponentInfo", { opponentName: player2.playerName });
        console.log(`Emitting opponentInfo to ${player2.playerName} (${player2.socketId}) with opponent: ${player1.playerName}`);
        io.to(player2.socketId).emit("opponentInfo", { opponentName: player1.playerName });
      }

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

  socket.on("reset", ({ roomNumber }) => {
    console.log(`Resetting game in room "${roomNumber}"`);
    io.to(roomNumber).emit("reset");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    // Find the room the disconnected socket was in and remove them
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter(player => player.socketId !== socket.id);
      if (rooms[roomId].length === 0) {
        delete rooms[roomId]; // Delete room if empty
      }
    }
  }); 
});
