import { EntityRepository, Repository } from "typeorm"

import UserSession from "#root/db/entities/UserSession"

/**
 * UserSession ORM using typeorm
 */
@EntityRepository(UserSession)
export class UserSessionRepository extends Repository<UserSession> {

}