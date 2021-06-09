import { getCustomRepository } from "typeorm"
import generateUUID from "#root/helpers/generateUUID"

import { AbstractAuthService } from "../interfaces/AbstractAuthService"
import { UserSessionRepository } from "../repositories/UserSessionRepository"
import UserSession from "#root/db/entities/UserSession"

class AuthService extends AbstractAuthService {
  private repository: UserSessionRepository = getCustomRepository(UserSessionRepository)

  constructor() {
    super()
  }

  public findOne = async (id: string): Promise<UserSession | undefined> => {
    const user = await this.repository.findOne(id)
    return user
  }

  public create = async (userSession: UserSession): Promise<UserSession> => {
    userSession.id = generateUUID()
    const newUserSession = await this.repository.save(userSession)
    return newUserSession
  }

  public update = async (id: string, userSession: UserSession): Promise<UserSession> => {
    userSession.id = id;
    const updatedUserSession = await this.repository.save(userSession)
    return updatedUserSession
  }

  public delete = async (id: string): Promise<void> => {
    await this.repository.delete(id)
    return
  }

  /**
   * For dev only !!! DO not use in production
   */
  public findAll = async (): Promise<UserSession[] | undefined> => {
    const userSessions = await this.repository.find()
    return userSessions
  }
}

export default AuthService