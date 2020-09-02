import * as bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import { Index } from './routes'
import { UserRoute } from './routes/userRoutes'
import { APIRoute } from './routes/api'
import { TarefasRoute } from './routes/tarefasRoutes'

import { logger } from './common/logging'
import connect from './database/connect'

class App {
  public app: express.Application

  public indexRoutes: Index = new Index()

  public userRoutes: UserRoute = new UserRoute()

  public apiRoutes: APIRoute = new APIRoute()

  public tarefasRoutes: TarefasRoute = new TarefasRoute()

  public mongoUrl = 'mongodb://localhost:27017/vai-bem-api'

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
    this.indexRoutes.routes(this.app)
    this.apiRoutes.routes(this.app)
    this.userRoutes.routes(this.app)
    this.tarefasRoutes.routes(this.app)

    this.mongoSetup(this.mongoUrl)
  }

  private mongoSetup(db: string): void {
    mongoose.Promise = global.Promise
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

    mongoose.connection.on('disconnected', connect)
  }
}
export default new App().app
