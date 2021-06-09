import { getCustomRepository } from "typeorm"
import generateUUID from "#root/helpers/generateUUID"

import { AbstractUserService } from "../interfaces/AbstractUserService"
import { UserRepository } from "../repositories/UserRepository"
import User from "#root/db/entities/User"

class UserService extends AbstractUserService {
  private repository: UserRepository = getCustomRepository(UserRepository)

  constructor() {
    super()
  }

  public findOne = async (id: any): Promise<User | undefined> => {
    const user = await this.repository.findOne(id)
    return user
  }

  public findAll = async (): Promise<User[] | undefined> => {
    const users = await this.repository.find()
    return users
  }

  public create = async (user: User): Promise<User> => {
    user.id = generateUUID()
    const newUser = await this.repository.save(user)
    return newUser
  }

  public update = async (id: string, user: User): Promise<User> => {
    user.id = id;
    const updatedUser = await this.repository.save(user)
    return updatedUser
  }

  public delete = async (id: string): Promise<void> => {
    await this.repository.delete(id)
    return
  }
}

export default UserService