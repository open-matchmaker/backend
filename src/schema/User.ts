export interface User {
  username: string
  email: string
  password: string
}

export interface UserUpdate{
  username?: string,
  bio?: string,
}
