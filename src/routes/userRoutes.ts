import * as passport from 'passport'
import * as userController from '../controllers/userController'
import { PassportConfiguration } from '../util/passportConfiguration'

export class UserRoute {
  public routes(app) {
    app.route('/usuarios/login').get(userController.login)
    app.route('/usuarios').post(userController.adicionar)
    // .get(userController.listar)
    app
      .route('/usuarios/:nomeusuario')
      .patch(
        passport.authenticate('jwt', { session: false }),
        userController.atualizar,
      )
      .delete(
        passport.authenticate('jwt', { session: false }),
        userController.remover,
      )
      .get(
        passport.authenticate('jwt', { session: false }),
        userController.pegarUm,
      )
    app
      .route('/usuarios/tarefas/:idusuario')
      .get(userController.listarTarefasDoUsuario)
  }
}
