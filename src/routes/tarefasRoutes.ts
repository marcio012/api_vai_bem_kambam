import * as tarefasController from '../controllers/tarefasController'

export class TarefasRoute {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public routes(app: any): void {
    app.route('/tarefas/agrupadas').get(tarefasController.listarTarefasPorTipo)
    app.route('/tarefas').post(tarefasController.salvarTarefas)
    app.route('/tarefas').get(tarefasController.listarTodasTarefas)
    app.route('/tarefas/:id').get(tarefasController.listarUmaTarefas)
    app.route('/tarefas/:id').delete(tarefasController.removerTarefas)
  }
}
