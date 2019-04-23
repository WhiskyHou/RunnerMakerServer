import dbHelper from "./dbHelper"

export default function getMyMapsInfo(user: User) {
    return new Promise((resolve, rejects) => {
        const mapsPromise = dbHelper.searchMapsByUid(user.uid)
        mapsPromise.then(maps => {
            const result = { error: 0, maps: maps }
            resolve(JSON.stringify(result))
        })
    })
}