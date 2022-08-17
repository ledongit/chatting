const express = require("express");
const http = require("http"); // node에 원래 있는 모듈
const path = require("path"); // node에 원래 있는 모듈
const moment = require("moment");

const app = express();
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server); // 여기서 클라이언트로 데이터 내려줌

// 정적 파일을 서비스하는 폴더 지정
app.use(express.static(path.join(__dirname, "/public")));

app.set("port", process.env.PORT || 8099);
const PORT = app.get("port");

io.on("connection", (socket) => {
  console.log("클라이언트 연결되었습니다.");
  // socket.on("yaho", (data) => {
  //   console.log(data);
  //   io.emit(
  //     "yaho",
  //     "클라이언트가 yaho로 보낸 이벤트를 서버가 다시 yaho로 이벤트를 발송함"
  //   );
  // });
  socket.on("chatting", (data) => {
    console.log(data);
    const sendTime = moment(new Date()).format("A hh:mm");
    io.emit("chatting", {
      nickName: data.nickName,
      msg: data.msg,
      time: sendTime,
    });
  });
});

app.get("/", (req, res) => {
  res.send("hello node");
});

app.get("/chatting", (req, res) => {
  // res.send("채팅룸");
  res.sendFile(path.join(__dirname, "/public/html/chatting.html"));
});

server.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
