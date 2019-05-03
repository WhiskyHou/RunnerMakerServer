import dbHelper from "./dbHelper";


export function getGoodRank(user: any) {
    return new Promise((resolve, rejects) => {
        const userPromise = dbHelper.getAllUser()
        const mapPromise = dbHelper.getAllMap()

        Promise.all([userPromise, mapPromise]).then(array => {
            const userList: any = array[0]
            const mapList: any = array[1]

            userList.forEach((item: any) => {

            });
        })
    })
}

export function getCreateRank(user: any) {
    return new Promise((resolve, rejects) => {

    })
}