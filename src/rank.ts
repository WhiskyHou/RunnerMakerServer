import dbHelper from "./dbHelper";


export function getGoodRank(user: any) {
  return new Promise((resolve, rejects) => {
    const userPromise = dbHelper.getAllUser()
    const mapPromise = dbHelper.getAllMap()

    Promise.all([userPromise, mapPromise]).then(array => {
      const userList = array[0] as any[]
      const mapList = array[1] as any[]

      const rankList: GoodRankInfo[] = []
      const rankMe: GoodRankInfo = { uid: user.uid, rank: 0, nickname: user.nickname, goodCount: 0 }

      userList.forEach((userItem: any) => {
        const userRank: GoodRankInfo = { uid: userItem.uid, rank: 0, nickname: userItem.nickname, goodCount: 0 }
        mapList.forEach((mapItem: any) => {
          if (userItem.uid === mapItem.uid) {
            userRank.goodCount += mapItem.good_count
          }
        })
        rankList.push(userRank)
      });

      rankList.sort((x: GoodRankInfo, y: GoodRankInfo): number => {
        if (x.goodCount < y.goodCount) {
          return 1
        } else if (x.goodCount > y.goodCount) {
          return -1
        } else {
          return 0
        }
      })

      rankList.forEach((item, index) => {
        item.rank = index + 1
        if (item.uid === user.uid) {
          rankMe.rank = item.rank
          rankMe.goodCount = item.goodCount
        }
      })

      const result: GoodRankResult = { error: 0, me: rankMe, list: rankList }
      resolve(JSON.stringify(result))
    })
  })
}

export function getCreateRank(user: any) {
  return new Promise((resolve, rejects) => {
    const userPromise = dbHelper.getAllUser()
    const mapPromise = dbHelper.getAllMap()

    Promise.all([userPromise, mapPromise]).then(array => {
      const userList = array[0] as any[]
      const mapList = array[1] as any[]

      const rankList: CreateRankInfo[] = []
      const rankMe: CreateRankInfo = { uid: user.uid, rank: 0, nickname: user.nickname, createCount: 0 }

      // 计算数量
      userList.forEach((userItem: any) => {
        const userRank: CreateRankInfo = { uid: userItem.uid, rank: 0, nickname: userItem.nickname, createCount: 0 }
        mapList.forEach((mapItem: any) => {
          if (userItem.uid === mapItem.uid) {
            userRank.createCount++
          }
        })
        rankList.push(userRank)
      });

      // 排序
      rankList.sort((x: CreateRankInfo, y: CreateRankInfo): number => {
        if (x.createCount < y.createCount) {
          return 1
        } else if (x.createCount > y.createCount) {
          return -1
        } else {
          return 0
        }
      })

      // 排名赋值 & 挑出自己
      rankList.forEach((item, index) => {
        item.rank = index + 1;
        if (item.uid === user.uid) {
          rankMe.rank = item.rank
          rankMe.createCount = item.createCount
        }
      })

      const result: CreateRankResult = { error: 0, me: rankMe, list: rankList }
      resolve(JSON.stringify(result))
    })
  })
}