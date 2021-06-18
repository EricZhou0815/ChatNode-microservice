import { NextFunction, Request, Response } from "express"

import UserService from "#root/adapters/UserServiceAdapter"

const injectSession = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.userSessionId) {
    const userSession = await UserService.fetchUserSession({ sessionId: req.cookies.userSessionId })
    res.locals.userSession = userSession
  }

  return next()
}

export default injectSession