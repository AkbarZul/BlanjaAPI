require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const http = require('http')
const server = http.createServer(app)
const socketio = require("socket.io")
const io = socketio(server).sockets
const port = process.env.PORT || 8007;
const mainRouter = require("./src/routes/index");


global.io = io

io.on("connection", (socket) => {
  const id = socket.handshake.query.user_id;
  console.log("a user connected ...",id, socket.id);
  socket.join(id);
  socket.on("chat message", (msg, id_recipient) => {
    console.log(`=====================`)
    console.log('sender'+msg.sender);
    console.log('penerima '+id_recipient);
    console.log('id handshake'+id)
    console.log(msg)
    io.to(id_recipient).to(id).emit("chat message", msg);
  });
  socket.on('fromBuyer', msgEvent =>{
	  socket.emit('fromBuyer',msgEvent);
  });
  socket.on('fromSeller', msgEvent =>{
	  socket.emit('fromSeller',msgEvent);
  });
});


// const port = 8007;
// listen port
// app.listen(port, () => {
//   console.log(`Server is running at port ${port}`);
// });
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use(cors());

// menambahkan logger
app.use(logger("dev"));

// menambahkan parser untuk x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// extended: false => menggunakan qs
// extended: true => menggunakan querystring

// menambahkan parser untuk raw json
app.use(express.json());

app.use(express.static("public"));

app.use("/", mainRouter);
// Handle all 404 responses
app.use(function (req, res) {
  res.status(404).json({
    msg: "Data Not Found",
    status: 404,
  });
});

module.exports = app;