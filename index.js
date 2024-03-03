const app = require('express')();

const http = require('http').Server(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('login', email => {welcome(email)})
  socket.on('chat message', msg => {
    console.log('A user said: ' + msg)
    io.emit('chat message', msg);
  });
});
io.on('connection', (socket) => {
  console.log('A user connected!');
  io.emit('chat message', 'A user connected!')
  socket.on('disconnect', () => {
    console.log('User disconnected :(');
    io.emit('chat message', 'User disconnected :(')
  });
});
const writeFile = require('fs').writeFile

io.on("connection", (socket) => {
  socket.on("upload", (file, callback) => {
    console.log(file)
    console.log('A user sent a file: ' + file);
    try {
    // save the content to the disk, for example
    writeFile("/tmp/upload", file, (err) => {
      callback({ message: err ? "failure" : "success" });
    });
  } catch(err) {
    if (err = 'TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received null' == false) {
    console.log('A user sent a invalid file. The error was: ' + err)
    io.emit('chat message', 'A user sent a invalid file')
    }
  }
  });
});
http.listen(port, () => {
  console.log(`Chat is running at localhost:${port}`);
});