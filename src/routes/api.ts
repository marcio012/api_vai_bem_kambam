import * as express from 'express'
import * as apiController from '../controllers/apiController'

export class APIRoute {
  public routes(app: express.Application): void {
    app.route('/api').get(apiController.getApi)
  }
}
