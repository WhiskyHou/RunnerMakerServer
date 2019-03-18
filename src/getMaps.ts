import * as fs from "fs";

export default function getMaps() {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync("./data/maps.json", { encoding: "utf-8" });
    resolve(data)
  });
}
