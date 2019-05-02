import * as mysql from 'mysql'
import { rejects } from 'assert';

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
}

const dbHelper = new DataBaseHelper()
export default dbHelper;