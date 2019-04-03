import dbHelper from './dbHelper'

export default function signUp(username: string, password: string, nickname: string) {
  return new Promise((resolve, rejects) => {
    let userPromise = dbHelper.searchUser(username)
    userPromise.then((user: any) => {
      if (user.uid !== -1) {
        const result: SignUpResult = { error: 1 }
        resolve(JSON.stringify(result))
      } else {
        addUser(username, password, nickname).then(resolve)
      }
    }).catch(console.log)
  })
}

function addUser(username: string, password: string, nickname: string) {
  return new Promise((resolve, rejects) => {
    dbHelper.createUser(username, password, nickname)
      .then(e => {
        if (e === "fail") {
          const result: SignUpResult = { error: 2 }
          resolve(JSON.stringify(result))
        } else {
          const result: SignUpResult = { error: 0 }
          resolve(JSON.stringify(result))
        }
      })
  })
}