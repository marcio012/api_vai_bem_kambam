import * as passport from 'passport'
import * as userController from '../controllers/userController'
import { PassportConfiguration } from '../util/passportConfiguration'

export class UserRoute {
  public routes(app: any): void {
    app.route('/users/login').get(userController.login)
    app.route('/users').post(userController.add)
    // .get(userController.listar)
    app
      .route('/users/:username')
      .get(
        passport.authenticate('jwt', { session: false }),
        userController.getOne,
      )
      .patch(
        passport.authenticate('jwt', { session: false }),
        userController.update,
      )
      .delete(
        passport.authenticate('jwt', { session: false }),
        userController.remove,
      )
    app.route('/users/tasks/:idUser').get(userController.getTaskByUser)
  }
}
