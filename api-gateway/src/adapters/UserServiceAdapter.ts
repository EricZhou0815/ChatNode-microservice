import config from "config"
import got from "got"

const USERS_SERVICE_URI = <string>config.get("USERS_SERVICE_URI")

export interface UserSession {
  expiresAt: string
  id: string
  createdAt: string
  userId: string
}

export interface User {
  userId: string
  username: string
  createdAt: string
}

export default class UserServiceAdapter {
  static createUser = async ({ password, username }: { username: string, password: string }) => {
    const response = <User>await got.post(`${USERS_SERVICE_URI}/users`, { json: { password, username } }).json()
    return response
  }

  static fetchUser = async ({ userId }: { userId: string }): Promise<User | null> => {
    const response = <User>await got.get(`${USERS_SERVICE_URI}/users/${userId}`).json()
    return response ? response : null
  }

  static createUserSession = async ({ password, username }: { username: string, password: string }) => {
    const response = <UserSession>await got.post(`${USERS_SERVICE_URI}/sessions`, { json: { password, username } }).json()
    return response
  }

  static fetchUserSession = async ({ sessionId }: { sessionId: string }): Promise<UserSession | null> => {
    const response = <UserSession>await got.get(`${USERS_SERVICE_URI}/sessions/${sessionId}`).json()
    return response ? response : null
  }

  static deleteUserSession = async ({ sessionId }: { sessionId: string }) => {
    const response = <UserSession>await got.delete(`${USERS_SERVICE_URI}/sessions/${sessionId}`).json()
    return response
  }
}