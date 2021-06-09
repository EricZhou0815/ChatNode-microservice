import { EntityRepository, Repository } from "typeorm"

import User from "#root/db/entities/User"

/**
 * User ORM using typeorm
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {

}