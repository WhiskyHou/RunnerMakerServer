import dbHelper from './dbHelper'

export default function signIn(username: string, passowrd: string) {
  return new Promise((resolve, rejects) => {
    const userPromise = dbHelper.searchUser(username)
    userPromise.then(e => {
      const user = e as User
      if (user.uid !== -1) {
        if (passowrd === user.password) {
          resolve("sgin in success")
        } else {
          resolve("password error")
        }
      } else {
        resolve("user has not been sign up")
      }
    })
  })
}