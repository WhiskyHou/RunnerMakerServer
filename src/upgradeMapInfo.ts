import dbHelper from "./dbHelper";

export default function upgradeMapInfo(info: any) {
  return new Promise((resolve, rejects) => {
    const result = { error: 0 }
    if (info.type === "trys") {
      const trysPromise = dbHelper.mapInfoIncreace("trys", info.mid)
      trysPromise.then(e => {
        if (e) {
          result.error = 0
        } else {
          result.error = 2
        }
        resolve(JSON.stringify(result))
      })
    } else if (info.type === "pass") {
      const statePromise = dbHelper.checkMapInfoWithUser(info.type, info.uid, info.mid)
      statePromise.then(state => {
        if (state) {
          dbHelper.passMapUpdate(info.uid, info.mid, info.time)
        } else {
          dbHelper.passMapInsert(info.uid, info.mid, info.time)
        }
        result.error = 0
        resolve(JSON.stringify(result))
      })
    } else {
      const statePromise = dbHelper.checkMapInfoWithUser(info.type, info.uid, info.mid)
      statePromise.then(state => {
        if (state) {
          result.error = 1
        } else {
          const goodPromise = dbHelper.goodOrDiffMap(info.type, info.uid, info.mid)
          goodPromise.then(e => {
            if (e) {
              result.error = 0
            } else {
              result.error = 2
            }
          })
        }
        resolve(JSON.stringify(result))
      })
    }
  })
}
