import {IService} from "./IService"
import User from "#root/db/entities/User"

export abstract class AbstractUserService implements IService<User> {
  abstract findAll(): Promise<User[] | undefined>
  abstract findOne(id: any, includePassword: boolean): Promise<User | undefined>;
  abstract create(user: User): Promise<User>;
  abstract update(id: string, user: User): Promise<User>;
  abstract delete(id: string): void;
}