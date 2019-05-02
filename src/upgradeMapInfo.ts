import dbHelper from "./dbHelper";

export default function upgradeMapInfo(info: any) {
    return new Promise((resolve, rejects) => {
        const statePromise = dbHelper.checkHasGood(info.uid, info.mid)
        statePromise.then(state => {
            const result = { error: 0 }
            if (state) {
                result.error = 1
            } else {
                const goodPromise = dbHelper.goodMap(info.uid, info.mid)
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
    })
}
