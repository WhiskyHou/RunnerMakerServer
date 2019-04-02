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
    const user = { uid: -1, username: '', password: '', nickname: '' }

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
}

const dbHelper = new DataBaseHelper()
export default dbHelper;