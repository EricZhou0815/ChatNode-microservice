import dayjs from "dayjs"
import config from "config"
import { NextFunction, Request, Response } from "express"

import User from "#root/db/entities/User"
import UserService from "../services/UserService"
import UserSession from "#root/db/entities/UserSession"
import AuthService from "../services/AuthService"
import { IController } from "../interfaces/IController"
import { passwordCompareSync, hashPasswordSync } from "#root/helpers/passwordBcryptHelpers"
import { ErrorMessage } from "#root/constants/constants"

class UserResponse {
  public id: string
  public username: string
  public createdAt: string

  constructor(user: User) {
    this.id = user.id
    this.username = user.username
    this.createdAt = user.createdAt
  }
}

class UserController implements IController<User> {
  private userService: UserService = new UserService()
  private authService: AuthService = new AuthService()

  /**
   * Create and return a User for the correct username and password input
   * @param req 
   * @param res 
   * @param next 
   */
  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<UserResponse | any> => {
    const { body: { username, password } } = req

    if (!username || !password) {
      return next(new Error(ErrorMessage.INVALID_REQUEST_BODY))
    }

    try {
      const existedUser = await this.userService.findOne({ username: username })

      if (existedUser) return next(new Error(ErrorMessage.INVALID_REQUEST_USER_EXISTS))

      const user = new User(username, hashPasswordSync(password))

      const newUser = await this.userService.create(user)

      const userResponse = new UserResponse(newUser)

      return res.json(userResponse)
    } catch (err) {
      return next(err)
    }
  }

  public getUser = async (req: Request, res: Response, next: NextFunction): Promise<UserResponse | any> => {
    try {
      const { params: { id } } = req
      const user = await this.userService.findOne(id)

      if (!user) return next(new Error(ErrorMessage.INVALID_REQUEST_USER_ID))

      const userResponse = new UserResponse(user)

      return res.json(userResponse)
    } catch (err) {
      return next(err)
    }
  }

  /**
   * DEV ONLY!!!!
   */
  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<UserResponse[] | any> => {
    try {
      const users = await this.userService.findAll()

      if (!users) return next(new Error(ErrorMessage.INVALID_REQUEST_USER_ID))

      return res.json(users)
    } catch (err) {
      return next(err)
    }
  }

  /**
   * Create and return a UserSession for the correct username and password input
   * @param req 
   * @param res 
   * @param next 
   */
  public createSession = async (req: Request, res: Response, next: NextFunction): Promise<UserSession | any> => {
    const { body: { username, password } } = req

    if (!username || !password) {
      return next(new Error(ErrorMessage.INVALID_REQUEST_BODY))
    }

    try {
      const user = await this.userService.findOne({ username: username })

      if (!user) return next(new Error(ErrorMessage.INVALID_REQUEST_USER_NAME))

      if (!passwordCompareSync(password, user.password)) {
        return next(new Error(ErrorMessage.INVALID_REQUEST_PASSWORD))
      }

      // get default session expiry hours from the config
      const USER_SESSION_EXPIRY_HOURS = <number>config.get("USER_SESSION_EXPIRY_HOURS")

      // convert to standard datetime
      const expiresAt = dayjs().add(USER_SESSION_EXPIRY_HOURS, "hour").toISOString()

      const userSession = new UserSession(user.id, expiresAt)

      const newUserSession = await this.authService.create(userSession)

      return res.json(newUserSession)
    } catch (err) {
      return next(err)
    }
  }

  /**
   * Get all sessions! For Dev purpose only, do not use in production!!!!
   */
  public getAllSessions = async (req: Request, res: Response, next: NextFunction): Promise<UserSession[] | any> => {
    const { params: { id } } = req

    try {
      const userSessions = await this.authService.findAll()

      return res.json(userSessions)
    } catch (err) {
      return next(err)
    }
  }

  public getSession = async (req: Request, res: Response, next: NextFunction): Promise<UserSession | any> => {
    const { params: { id } } = req

    try {
      const userSession = await this.authService.findOne(id)

      if (!userSession) return next(new Error(ErrorMessage.INVALID_REQUEST_SESSION_ID))

      return res.json(userSession)
    } catch (err) {
      return next(err)
    }
  }

  public deleteSession = async (req: Request, res: Response, next: NextFunction): Promise<UserSession | any> => {
    const { params: { id } } = req
    try {
      const userSession = await this.authService.findOne(id)

      if (!userSession) return next(new Error(ErrorMessage.INVALID_REQUEST_SESSION_ID))

      await this.authService.delete(userSession.id)

      return res.end()
    } catch (err) {
      return next(err)
    }
  }
}

export default UserController
