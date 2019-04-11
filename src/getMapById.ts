import dbHelper from "./dbHelper"

export default function getMapById(mid: number) {
    return new Promise((resolve, rejects) => {
        const mapPromise = dbHelper.searchMapById(mid)
        mapPromise.then(e => {
            const map = e as MapData
            resolve(JSON.stringify(map))
        })
    })
}