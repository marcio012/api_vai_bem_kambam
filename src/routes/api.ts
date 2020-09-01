import * as apiController from '../controllers/apiController'

export class APIRoute {
  public routes(app: any): void {
    app.route('/api').get(apiController.getApi)
  }
}
