import * as passport from 'passport'
import * as tasksController from '../controllers/tasksController'
import { PassportConfiguration } from '../util/passportConfiguration'

export class TasksRoute {
  public routes(app: any): void {
    app
      .route('/tasks')
      .get(
        // passport.authenticate('jwt', { session: false }),
        tasksController.listar,
      )
      .post(
        passport.authenticate('jwt', { session: false }),
        tasksController.adicionar,
      )

    app
      .route('/tasks/:id')
      .get(
        // passport.authenticate('jwt', { session: false }),
        tasksController.listarPorId,
      )
      .delete(
        // passport.authenticate('jwt', { session: false }),
        tasksController.remover,
      )

    app.route('/tasks/group').get(
      // passport.authenticate('jwt', { session: false }),
      tasksController.listarPorTipo,
    )
  }
}
