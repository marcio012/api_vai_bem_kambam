import * as userController from '../controllers/userController'

export class UserRoute {
  public routes(app): void {
    app.route('/usuarios').post(userController.adicionarUsuario)
    app.route('/usuarios/:nomeusuario').patch(userController.atualizarUsuario)
    app.route('/usuarios/:nomeusuario').delete(userController.removerUsuario)
    app.route('/usuarios/:nomeusuario').get(userController.pegarUsuario)
  }
}
