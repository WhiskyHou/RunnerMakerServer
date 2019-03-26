import * as http from "http";
import * as fs from 'fs'
import setMap from "./setMap";
import getMaps from "./getMaps";
import querystring from 'querystring'

http
  .createServer((request, response) => {
    let body = "";
    request.on("data", (chunk: any) => {
      body += chunk;
      // console.log("chunk: ", chunk);
      // console.log("body: ", body)

      // python post json
      let res = querystring.parse(body)
      console.log(JSON.parse(res.data.toString()))

      // C# post json
      console.log(JSON.parse(body))
      // fs.writeFileSync("out.json", body, { encoding: "utf-8" })
    });

    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });

    // 发送响应数据 "Hello World"
    if (request.url === "/python") {
      setMap();
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

    console.log(request.url);
  })
  .listen(8686);

console.log("start a servert http://localhost:8686");
