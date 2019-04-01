import * as http from "http"
import * as fs from 'fs'
import setMap from "./setMap"
import getMaps from "./getMaps"
import signIn from "./signin"
import signUp from "./signup"
import querystring from 'querystring'

http
  .createServer((request, response) => {

    // 发送 HTTP 头部
    response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });

    // 解析出请求的数据
    let body = "";
    request.on("data", (chunk: any) => {
      body += chunk;

      // python post json
      // let res = querystring.parse(body)
      // console.log(JSON.parse(res.data.toString()))

      // C# post json
      const data = JSON.parse(body)
      console.log(data)

      // 根据请求接口做出响应
      if (request.url === "/python") {
        setMap();
      } else if (request.url === "/signin") {
        const obj = JSON.parse(body)
        signIn(obj.username, obj.password)
          .then(e => {
            response.end(e)
          })
      } else if (request.url === '/signup') {
        const obj = JSON.parse(body)
        signUp(obj.username, obj.password)
          .then(e => {
            response.end(e)
          }).catch(console.log)
      } else if (request.url === "/getMaps") {
        getMaps()
          .then(e => {
            response.end(e);
          })
          .catch(console.log);
      } else if (request.url === "/setMap") {
        setMap()
          .then(e => {
            response.end(e);
          })
          .catch(console.log);
      } else {
        response.end("api name error");
      }
    });

  })
  .listen(8686);

console.log("start a servert http://localhost:8686");
