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
    const maps: { maps: any[] } = { maps: [] }

    const sql = `SELECT * FROM map`

    return new Promise((resolve, rejects) => {
      this.pool.getConnection((err, connection) => {
        connection.query(sql, (error, result) => {
          if (error) {
            console.log("search maps fail: ", error)
          } else {
            result.forEach((item: any) => {
              const map = { mid: item.mid, uid: item.uid, nickname: item.nickname }
              maps.maps.push(map)
            });
            connection.release()
            resolve(maps)
          }
        })
      })
    })
  }

  public searchMapById(id: number) {

    return new Promise((resolve, rejects) => {
      this.pool.getConnection((err, connection) => {

      })
    })
  }
}

const dbHelper = new DataBaseHelper()
export default dbHelper;