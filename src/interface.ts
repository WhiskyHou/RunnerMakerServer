
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


interface GoodRankResult {
  error: number
  me: GoodRankInfo
  list: GoodRankInfo[]
}
interface GoodRankInfo {
  uid: number
  rank: number
  nickname: number
  goodCount: number
}

interface CreateRankResult {
  error: number
  me: CreateRankInfo
  list: CreateRankInfo[]
}
interface CreateRankInfo {
  uid: number
  rank: number
  nickname: string
  createCount: number
}