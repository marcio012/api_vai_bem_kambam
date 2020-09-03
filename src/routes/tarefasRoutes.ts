import * as passport from 'passport'
import * as tarefasController from '../controllers/tarefasController'
import { PassportConfiguration } from '../util/passportConfiguration'

export class TarefasRoute {
  public routes(app): void {
    app
      .route('/tarefas')
      .get(
        passport.authenticate('jwt', { session: false }),
        tarefasController.listar,
      )
      .post(
        passport.authenticate('jwt', { session: false }),
        tarefasController.adicionar,
      )

    app
      .route('/tarefas/:id')
      .get(
        passport.authenticate('jwt', { session: false }),
        tarefasController.listarPorId,
      )
      .delete(
        passport.authenticate('jwt', { session: false }),
        tarefasController.remover,
      )

    // app.route('/tarefas/agrupadas').get(tarefasController.listarPorTipo)
  }
}
