
interface User {
  uid: number
  username: string
  password: string
  nickname: string
}

interface SignInResult {
  error: number
  data: User
}

interface SignUpResult {
  error: number
}

interface MapData {
  id: number
  nickname: string
  creatername: string
  width: number
  height: number
  countDown: number
  goodCount: number
  diffCount: number
  passCount: number
  trysCount: number
  startPos: { x: number, y: number }
  endPos: { x: number, y: number }
  nodeInfo: { pos: { x: number, y: number }, prefabType: string }[]
}