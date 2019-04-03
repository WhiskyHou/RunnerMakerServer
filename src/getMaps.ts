import dbHelper from './dbHelper'

export default function getMaps() {
  return new Promise((resolve, reject) => {
    const mapsPromise = dbHelper.searchAllMapsInfo()
    mapsPromise.then((maps: any) => {
      resolve(JSON.stringify(maps))
    })
  });
}
