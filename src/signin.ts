import dbHelper from './dbHelper'

export default function signIn(username: string, passowrd: string) {
  return new Promise((resolve, rejects) => {
    const userPromise = dbHelper.searchUser(username)
    userPromise.then(e => {
      const user = e as User
      if (user.uid !== -1) {
        if (passowrd === user.password) {
          const result: SignInResult = { error: 0, data: user }
          resolve(JSON.stringify(result))
        } else {
          const result: SignInResult = { error: 1, data: user }
          resolve(JSON.stringify(result))
        }
      } else {
        const result: SignInResult = { error: 2, data: user }
        resolve(JSON.stringify(result))
      }
    })
  })
}