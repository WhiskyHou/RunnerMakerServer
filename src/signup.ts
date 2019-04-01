import dbHelper from './dbHelper'

export default function signUp(username: string, password: string) {
  return new Promise((resolve, rejects) => {
    let userPromise = dbHelper.searchUser(username)
    userPromise.then((user: any) => {
      if (user.id !== -1) {
        resolve("username has been used")
      } else {
        addUser(username, password).then(resolve)
      }
    }).catch(console.log)
  })
}

function addUser(username: string, password: string) {
  return new Promise((resolve, rejects) => {
    dbHelper.createUser(username, password)
      .then(e => {
        if (e === "fail") {
          resolve("sign up failed")
        } else {
          resolve("sign up success")
        }
      })
  })
}