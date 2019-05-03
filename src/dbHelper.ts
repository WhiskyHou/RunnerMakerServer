import * as mysql from 'mysql'

class DataBaseHelper {

  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'ghostgaz',
      database: 'runner'
    })
  }

  public createUser(username: string, password: string, nickname: string) {
    const sql = `INSERT INTO user (username, password, nickname) VALUES ('${username}', '${password}', '${nickname}')`

    return new Promise((resolve, rejects) => {
      this.pool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
          if (error) {
            console.log("Create user failed: ", error)
            connection.release()
            resolve("fail")
          } else {
            console.log("Create user success")
            connection.release()
            resolve("success")
          }
        })
      })
    })
  }

  public searchUser(username: string) {
    const user: User = { uid: -1, username: '', password: '', nickname: '' }

    const sql = `SELECT * FROM user WHERE username='${username}'`

    return new Promise((resolve, rejects) => {
      this.pool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
          if (error) {
            console.log("Search user failed: ", error)
          } else {
            if (result.length === 1) {
              console.log("Search user success")
              user.uid = result[0].uid
              user.username = result[0].username
              user.password = result[0].password
              user.nickname = result[0].nickname
            }
            connection.release()
            resolve(user)
          }
        })
      })
    })
  }

  public createMap(data: any) {

    const sql = `INSERT INTO map (uid,
                                  nickname, 
                                  count_down, 
                                  width, 
                                  height,
                                  start_x,
                                  start_y,
                                  end_x,
                                  end_y,
                                  nodes_data ) VALUES (${data.uid},
                                                       '${data.nickname}',
                                                       ${data.countDown},
                                                       ${data.width},
                                                       ${data.height},
                                                       ${data.startX},
                                                       ${data.startY},
                                                       ${data.endX},
                                                       ${data.endY},
                                                       '${data.nodeInfo}' )`
    return new Promise((resolve, rejects) => {
      this.pool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
          if (error) {
            console.log("create map fail: ", error)
            connection.release()
            resolve("fail")
          } else {
            console.log("Create map success")
            connection.release()
            resolve("success")
          }
        })
      })
    })
  }

  public searchAllMapsInfo() {
    const maps: any[] = []

    const sql = `SELECT * FROM map`

    return new Promise((resolve, rejects) => {
      this.pool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
          if (error) {
            console.log("search maps fail: ", error)
            resolve("fail")
          } else {
            result.forEach((item: any) => {
              const map = {
                mid: item.mid,
                uid: item.uid,
                nickname: item.nickname,
                goodCount: item.good_count,
                diffcount: item.diff_count,
                passCount: item.pass_count,
                trysCount: item.trys_count
              }
              maps.push(map)
            });
            connection.release()
            resolve(maps)
          }
        })
      })
    })
  }

  public searchMapById(id: number) {

    const sql = `SELECT * FROM map WHERE mid=${id}`
    return new Promise((resolve, rejects) => {
      this.pool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
          if (error) {
            console.log("search map by id fail: ", error)
          } else {
            console.log("search map by id success")
            const map = {
              mid: result[0].mid,
              uid: result[0].uid,
              createrName: "",
              nickName: result[0].nickname,
              countDown: result[0].count_down,
              width: result[0].width,
              height: result[0].height,
              goodCount: result[0].good_count,
              diffCount: result[0].diff_count,
              passCount: result[0].pass_count,
              trysCount: result[0].trys_count,
              startPos: { x: result[0].start_x, y: result[0].start_y },
              endPos: { x: result[0].end_x, y: result[0].end_y },
              nodeInfo: JSON.parse(result[0].nodes_data),
            }

            connection.release()
            resolve(map)
          }
        })
      })
    })
  }

  public searchMapsByUid(uid: number) {
    const sql = `SELECT * FROM map WHERE uid=${uid}`
    return new Promise((resolve, rejects) => {
      this.pool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
          if (error) {
            console.log("search map by id fail: ", error)
          } else {
            console.log("search map by id success")

            const maps: any = []
            result.forEach((item: any) => {
              const map = {
                nickname: item.nickname,
                goodCount: item.good_count,
                diffCount: item.diff_count,
                passCount: item.pass_count,
                trysCount: item.trys_count
              }
              maps.push(map)
            });

            connection.release()
            resolve(maps)
          }
        })
      })
    })
  }

  public checkMapInfoWithUser(type: string, uid: number, mid: number) {
    const sql = `SELECT * FROM ${type} WHERE uid=${uid} AND mid=${mid}`
    return new Promise((resolve, rejects) => {
      this.pool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
          if (error) {
            console.log("check this map failed: ", error)
          } else {
            console.log("check this map success")

            let state = false
            if (result.length === 1) {
              console.log("has already this map")
              state = true
            }
            connection.release()
            resolve(state)
          }
        })
      })
    })
  }

  public goodOrDiffMap(type: string, uid: number, mid: number) {
    const sql = `INSERT INTO ${type} (uid, mid) VALUES (${uid}, ${mid})`
    return new Promise((resolve, rejects) => {
      this.pool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
          if (error) {
            console.log("good or diff this map failed: ", error)
          } else {
            console.log("good or diff this map success")

            this.mapInfoIncreace(type, mid)
            connection.release()
            resolve(true)
          }
        })
      })
    })
  }

  public passMapInsert(uid: number, mid: number, time: number) {
    const sql = `INSERT INTO pass (uid, mid, time) VALUES (${uid}, ${mid}, ${time})`
    return new Promise((resolve, rejects) => {
      this.pool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
          if (error) {
            console.log("pass this map failed: ", error)
          } else {
            console.log("pass this map success")

            // this.mapInfoIncreace("pass", mid)
            connection.release()
            resolve(true)
          }
        })
      })
    })
  }

  public passMapUpdate(uid: number, mid: number, time: number) {
    const sql = `UPDATE pass SET time=${time} WHERE uid=${uid} AND mid=${mid} AND time>=${time}`
    return new Promise((resolve, rejects) => {
      this.pool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
          if (error) {
            console.log("update pass time failed")
          } else {
            console.log("update pass time success")

            connection.release()
            resolve(true)
          }
        })
      })
    })
  }

  public mapInfoIncreace(type: string, mid: number) {
    let sql = ""
    switch (type) {
      case "good":
        sql = `UPDATE map SET good_count=good_count+1 WHERE mid=${mid}`; break
      case "diff":
        sql = `UPDATE map SET diff_count=diff_count+1 WHERE mid=${mid}`; break
      case "pass":
        sql = `UPDATE map SET pass_count=pass_count+1 WHERE mid=${mid}`; break
      case "trys":
        sql = `UPDATE map SET trys_count=trys_count+1 WHERE mid=${mid}`; break
    }
    return new Promise((resolve, rejects) => {
      this.pool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
          if (error) {
            console.log("map info update increace failed")
          } else {
            connection.release()
            resolve(true)
          }
        })
      })
    })
  }

}

const dbHelper = new DataBaseHelper()
export default dbHelper;