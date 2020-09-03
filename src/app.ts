import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as mongoose from 'mongoose'
import { APIRoute } from './routes/api'
import { UserRoute } from './routes/userRoutes'
import { TarefasRoute } from './routes/tarefasRoutes'

import { logger } from './common/logging'

class App {
  public app: express.Application

  public userRoutes: UserRoute = new UserRoute()

  public apiRoutes: APIRoute = new APIRoute()

  public tarefasRoutes: TarefasRoute = new TarefasRoute()

  public mongoUrl = `mongodb://localhost:27017/vai-bem-api`

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
    this.apiRoutes.routes(this.app)
    this.userRoutes.routes(this.app)
    this.tarefasRoutes.routes(this.app)

    this.mongoSetup(this.mongoUrl)
  }

  private mongoSetup(db: string): void {
    mongoose
      .connect(this.mongoUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        return logger.info(`Successfully connected to ${db}`)
      })
      .catch(error => {
        logger.info('Error connecting to database: ', error)
        return process.exit(1)
      })
  }
}

export default new App().app
