import UserServiceAdapter from "#root/adapters/UserServiceAdapter"

interface Args {
  password: string
  username: string
}

const createUserResolver = async (obj: any, { password, username }: Args) => {
  return await UserServiceAdapter.createUser({ password, username })
}

export default createUserResolver