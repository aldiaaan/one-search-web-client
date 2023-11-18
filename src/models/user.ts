import { Endpoints, request } from '@/api'
import { AUTH_TOKEN_KEY } from '@/constants'
import type { CommonRequestOptions } from './types'
import { Pagination } from './pagination'

export type UserArgs = {
  username?: string
  email?: string
  password?: string
  authToken?: string
  fullName?: string
  firstName?: string
  lastName?: string
  id?: string | number
  role?: 'staff' | 'root'
}

export class User {
  username?: string
  email?: string
  password?: string
  authToken?: string
  fullName?: string
  firstName?: string
  lastName?: string
  id?: string | number
  role?: 'staff' | 'root'
  profilePictureUrl?: string

  constructor(args: UserArgs) {
    Object.assign(this, args)
  }

  static signOut() {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    if (window) {
      window.location.href = '/login'
    }
  }

  static async me() {
    const { data } = await request<{
      data: {
        email: string
        first_name: string
        full_name: string
        id: number
        last_name: string
        role: 'staff' | 'root'
        profile_picture_url: string
      }
    }>({
      method: 'GET',
      url: Endpoints.ME
    })

    return new User({
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      fullName: data.full_name,
      id: data.id,
      role: data.role
    })
  }

  async save() {
    await request({
      method: 'POST',
      url: Endpoints.CREATE_USER,
      body: {
        email: this.email,
        first_name: this.firstName,
        last_name: this.lastName,
        password: this.password,
        role: this.role
      }
    })

    return true
  }

  async delete() {
    if (this.id) {
      await request({
        body: {},
        params: {},
        method: 'DELETE',
        url: Endpoints.DELETE_USER.replace('<id>', `${this.id}`)
      })
      return true
    }
    return false
  }

  static async find(options: CommonRequestOptions) {
    const { page = 0, perPage = 10, query } = options

    const { data, pagination } = await request<{
      data: {
        email: string
        first_name: string
        full_name: string
        id: number
        last_name: string
        role: 'staff' | 'root'
      }[]
      pagination: {
        current_page: number
        limit: number
        pages: number
        total: number
      }
    }>({
      method: 'GET',
      url: Endpoints.USERS,
      body: {},
      params: {
        limit: perPage,
        start: page * perPage,
        query
      }
    })

    return {
      users: data.map(
        (d) =>
          new User({
            email: d.email,
            firstName: d.first_name,
            fullName: d.full_name,
            lastName: d.last_name,
            id: d.id,
            role: d.role
          })
      ),
      pagination: new Pagination({
        page,
        pages: pagination.pages,
        total: pagination.total,
        perPage
      })
    }
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
      localStorage.setItem(AUTH_TOKEN_KEY, data.token)
    }
  }
}
