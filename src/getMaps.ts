import dbHelper from './dbHelper'

export default function getMaps() {
  return new Promise((resolve, reject) => {
    const mapsPromise = dbHelper.searchAllMapsInfo()
    mapsPromise.then((maps: any) => {
      if (maps === "fail") {
        const result: GetMapsResult = { error: 1, maps: [] }
        resolve(JSON.stringify(result))
      } else {
        const result: GetMapsResult = { error: 0, maps: maps }
        resolve(JSON.stringify(result))
      }
    })
  });
}
