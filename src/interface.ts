
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