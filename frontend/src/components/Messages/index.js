// const http = require("http").createServer(app);
// const io = require("socket.io")(http, {
//   cors: {
//     origin: "*",
//   },
//   maxHttpBufferSize: 1e8,
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api/request_handler", request_handler);

// const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

// io.on("connection", (socket) => {
//   console.log(`Client ${socket.id} connected`);

//   // Join a conversation
//   const { roomId } = socket.handshake.query;
//   socket.join(roomId);

//   // Listen for new messages
//   socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
//   //  console.log('we are in server message is',data);
//     io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
//   });

//   // Leave the room if the user closes the socket
//   socket.on("disconnect", () => {
//     console.log(`Client ${socket.id} diconnected`);
//     socket.leave(roomId);
//   });
// });
