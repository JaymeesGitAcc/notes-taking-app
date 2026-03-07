export interface User {
  _id: string
  name: string
  email: string
}

export interface AuthContextTypes {
  user: User | null
  login: (email: string, password: string) => Promise<any>
  logout: () => void
}

export interface AuthResponse {
  message: string
  data: {
    token: string
    user: User
  }
}
