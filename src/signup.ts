import dbHelper from './dbHelper'

export default function signUp(username: string, password: string) {
  return new Promise((resolve, rejects) => {
    dbHelper.searchUser(username)
      .then((user: any) => {
        if (user.id !== -1) {
          resolve("username has been used")
        } else {
          dbHelper.createUser(username, password)
            .then(e => {
              if (e === "fail") {
                resolve("sign up failed")
              } else {
                resolve("sign up success")
              }
            })
        }
      }).catch(console.log)
  })
}