import * as mysql from 'mysql'
import { rejects } from 'assert';

class DataBaseHelper {

  private connection?: mysql.Connection;

  constructor() {
    this.connect()
  }

  public createUser(username: string, password: string) {
    const emptyMaps = { maps: [] }
    const sql = `INSERT INTO user (username, password, maps) VALUES ('${username}', '${password}', '${JSON.stringify(emptyMaps)}')`

    return new Promise((resolve, rejects) => {
      this.connection!.query(sql, (error, result) => {
        if (error) {
          console.log("Create user failed: ", error)
          resolve("fail")
        } else {
          console.log("Create user success")
          resolve("success")
        }
      })
    })
  }

  public searchUser(username: string) {
    const user = { id: -1, username: '', maps: '' }

    const sql = `SELECT * FROM user WHERE username='${username}'`


    return new Promise((resolve, rejects) => {
      this.connection!.query(sql, (error, result) => {
        if (error) {
          console.log("Search user failed: ", error)
        } else {
          console.log("Search user success")
          if (result.length === 1) {
            user.id = result[0].id
            user.username = result[0].username
            user.maps = result[0].maps
          }
          resolve(user)
        }
      })
    })

  }

  private connect() {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'ghostgaz',
      database: 'runner'
    })
    try {
      connection.connect()
      this.connection = connection;
      console.log("Database connect success");
    } catch (err) {
      console.log("Database Connect failed: ", err);
    }
  }

  private close() {
    if (this.connection) {
      this.connection.end()
    }
  }
}

const dbHelper = new DataBaseHelper()
export default dbHelper;