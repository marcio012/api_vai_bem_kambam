import * as tarefasController from '../controllers/tarefasController'
import { adicionar } from '../controllers/userController'

export class TarefasRoute {
  public routes(app): void {
    app
      .route('/tarefas')
      .get(tarefasController.listarTodasTarefas)
      .post(tarefasController.adicionar)

    app
      .route('/tarefas/:id')
      .get(tarefasController.listarPorId)
      .delete(tarefasController.removerTarefas)

    app
      .route('/tarefas/agrupadas/:tipo')
      .get(tarefasController.listarTarefasPorTipo)
  }
}
