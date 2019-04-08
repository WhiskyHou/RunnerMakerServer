import dbHelper from './dbHelper'

export default function uploadMap(map: any) {
  return new Promise((resolve, reject) => {
    const data = { uid: map.uid }

    const promise = dbHelper.createMap(data)
    promise.then(e => {
      if (e === "fail") {
        const result = {}
        resolve(JSON.stringify(result))
      } else {

      }
    })
  });
}
