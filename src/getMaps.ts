import * as fs from "fs";
import * as mysql from "mysql";

export default function getMaps() {
  return new Promise((resolve, reject) => {
    // const data = fs.readFileSync("./data/maps.json", { encoding: "utf-8" });

    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "forjs"
    });
    connection.connect();

    const sql = "select * from user";

    connection.query(sql, (err, result) => {
      if (err) {
        resolve(err);
      } else {
        const data: { id: number }[] = [];
        result.forEach((item: any) => {
          const maps = JSON.parse(item.maps);
          data.push(...maps.maps);
        });
        connection.end();
        resolve(JSON.stringify(data));
      }
    });
  });
}
