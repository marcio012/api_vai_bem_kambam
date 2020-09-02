import * as userController from '../controllers/userController'

export class UserRoute {
  public routes(app): void {
    app
      .route('/usuarios')
      .post(userController.adicionar)
      .get(userController.listar)
    app
      .route('/usuarios/:nomeusuario')
      .patch(userController.atualizarUsuario)
      .delete(userController.removerUsuario)
      .get(userController.pegarUsuario)
  }
}
