import { IService } from "./IService"
import UserSession from "#root/db/entities/UserSession"

export abstract class AbstractAuthService implements IService<UserSession> {
  abstract findOne(id: string): Promise<UserSession | undefined>;
  abstract create(userSession: UserSession): Promise<UserSession>;
  abstract update(id: string, userSession: UserSession): Promise<UserSession>;
  abstract delete(id: string): void;
}