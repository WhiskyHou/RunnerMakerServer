
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

interface UploadMapResult {
  error: number
}

interface GetMapsResult {
  error: number
  maps: { mid: number, uid: number, nickname: string }[]
}

interface GetMyMapsInfo {
  error: number
  maps: { nickname: string, goodCount: number, diffCount: number, passCount: number, trysCount: number }[]
}

interface MapData {
  mid: number
  uid: number
  nickName: string
  createrName: string
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