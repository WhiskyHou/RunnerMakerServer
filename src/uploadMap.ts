import dbHelper from './dbHelper'

export default function uploadMap(map: any) {
  return new Promise((resolve, reject) => {
    const data = {
      uid: map.uid,
      nickname: map.nickName,
      countDown: map.countDown,
      width: map.width,
      height: map.height,
      startX: map.startPos.x,
      startY: map.startPos.y,
      endX: map.endPos.x,
      endY: map.endPos.y,
      nodeInfo: JSON.stringify(map.nodeInfo)
    }

    const promise = dbHelper.createMap(data)
    promise.then(e => {
      if (e === "fail") {
        const result: UploadMapResult = { error: 1 }
        resolve(JSON.stringify(result))
      } else {
        const result: UploadMapResult = { error: 0 }
        resolve(JSON.stringify(result))
      }
    })
  });
}
