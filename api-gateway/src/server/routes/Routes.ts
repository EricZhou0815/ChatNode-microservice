import { Application } from "express"

//import UserController from "../controllers/UserController"
import { ENV } from "#root/constants/constants"
import config from "config"

export class AppRoutes {
  // Add controller
  //private userController: UserController = new UserController()
  /**
  * Envrionment settings: "DEV" or "PORD"
  * To expose different routes/handlers based on the value
  */
  private env: string = <string>config.get("ENV")

  /**
   * Register app routes and controller handlers
   */
  public setupRoutes = (app: Application): void => {
    // Add new routes here
    // app.get('/users/:id', this.userController.getUser)
    // app.post('/users', this.userController.createUser)
    // app.delete('/sessions/:id', this.userController.deleteSession)

    if (this.env === ENV.DEV) {
      // app.get('/users', this.userController.getUsers)
      // app.get('/sessions', this.userController.getAllSessions)
    }
  }
}