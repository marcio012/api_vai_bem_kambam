import * as userController from '../controllers/userController'

export class UserRoute {
  public routes(app) {
    app.route('/usuarios').post(userController.adicionar)
    // .get(userController.listar)
    app
      .route('/usuarios/:nomeusuario')
      .patch(userController.atualizar)
      .delete(userController.remover)
      .get(userController.pegarUm)
  }
}
