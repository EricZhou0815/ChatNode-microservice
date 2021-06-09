import bcrypt from "bcryptjs"

export const passwordCompareSync = (passwordToTest: string, passwordHash: string): boolean => {
  return bcrypt.compareSync(passwordToTest, passwordHash)
}

export const hashPasswordSync = (password:string):string=>{
  return bcrypt.hashSync(password,bcrypt.genSaltSync(12))
}
