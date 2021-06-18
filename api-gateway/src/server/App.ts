import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import { ApolloServer } from "apollo-server-express"
import express, { Application, NextFunction, Request, Response } from "express"

import formatGraphQLErrors from "#root/middlewares/formatGraphQLErrors"
import injectSession from "#root/middlewares/injectSession"
import schema from "#root/graphql/schema"
import resolvers from "#root/graphql/resolvers"

import { AppRoutes } from "./routes/Routes"

export class App {
  public app: Application
  public routes: AppRoutes = new AppRoutes()
  public apolloServer: ApolloServer = new ApolloServer({
    context: a => a,
    formatError: formatGraphQLErrors,
    resolvers,
    typeDefs: schema
  })

  constructor() {
    this.app = express();
    this.config();
    this.routes.setupRoutes(this.app)
    this.apolloServerApplyMiddleware(this.app)
  }

  private config = (): void => {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS')
      res.header('Access-Control-Allow-Headers', '*')
      next()
    })

    this.app.use(cookieParser())
    this.app.use(bodyParser.json())
    this.app.use(cors({
      origin: (origin, cb) => cb(null, true),
      credentials: true
    }))
    this.app.use(injectSession)
  }

  private apolloServerApplyMiddleware = (app: Application): void => {
    this.apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' })
  }
}