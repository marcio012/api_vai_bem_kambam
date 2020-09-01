import * as userController from '../controllers/userController'

export class UserRoute {
  public routes(app): void {
    app.route('/usuarios').post(userController.adicionarUsuario)
    app.route('/usuarios/:username').patch(userController.atualizarUsuario)
    app.route('/usuarios/:username').delete(userController.removerUsuario)
    app.route('/usuarios/:username').get(userController.pegarUsuario)
  }
}
