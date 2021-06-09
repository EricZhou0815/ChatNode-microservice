import bodyParser from "body-parser"
import cors from "cors"
import express, { Application, NextFunction, Request, Response } from "express"

import { AppRoutes } from "./routes/Routes"

export class App {
  public app: Application
  public routes: AppRoutes = new AppRoutes()

  constructor() {
    this.app = express();
    this.config();
    this.routes.setupRoutes(this.app)
  }

  private config = (): void => {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS')
      res.header('Access-Control-Allow-Headers', '*')
      next()
    })

    this.app.use(bodyParser.json())
    this.app.use(cors({
      origin: (origin, cb) => cb(null, true),
      credentials: true
    }))

    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      return res.status(500).json({ message: err.message })
    })
  }
}