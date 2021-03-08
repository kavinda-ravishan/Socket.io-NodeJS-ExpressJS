const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", (socket) => {
  console.log(`A user connected with ID : ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected with ID : ${socket.id}`);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on PORT : 3000");
});
