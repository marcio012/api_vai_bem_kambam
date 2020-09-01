import * as bodyParser from 'body-parser'
import express from 'express'
import { Index } from './routes/index'
import { UserRoute } from './routes/userRoutes'
import { APIRoute } from './routes/api'
import { TarefasRoute } from './routes/tarefasRoutes'

class App {
  public app: express.Application

  public indexRoutes: Index = new Index()

  public userRoutes: UserRoute = new UserRoute()

  public apiRoutes: APIRoute = new APIRoute()

  public tarefasRoutes: TarefasRoute = new TarefasRoute()

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
    this.indexRoutes.routes(this.app)
    this.apiRoutes.routes(this.app)
    this.userRoutes.routes(this.app)
    this.tarefasRoutes.routes(this.app)
  }
}

export default new App().app
