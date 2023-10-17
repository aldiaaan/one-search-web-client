import { Endpoints, request } from '@/api'

export type UserArgs = {
  username?: string
  email?: string
  password?: string
  authToken?: string
  fullName?: string
  firstName?: string
  lastName?: string
}

export class User {
  username?: string
  email?: string
  password?: string
  authToken?: string
  fullName?: string
  firstName?: string
  lastName?: string

  AUTH_TOKEN_KEYS = 'user-auth-token'

  constructor(args: UserArgs) {
    Object.assign(this, args)
  }

  static async getCurrentlyLoggedInUser() {
    
  }

  async signin() {
    const { data } = await request<{ data: { token: string } }>({
      method: 'POST',
      url: Endpoints.SIGN_IN,
      body: {
        email: this.email,
        password: this.password
      }
    })
    if (data.token) {
      localStorage.setItem(this.AUTH_TOKEN_KEYS, data.token)
    }
  }
}
