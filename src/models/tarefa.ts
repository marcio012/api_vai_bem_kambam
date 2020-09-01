import { TipoTarefa } from './tipoTarefa'

export default interface Tarefa {
  id: number
  idUsuario: number
  conteudo: number
  dataEntrega: Date
  tipo: TipoTarefa
  completada: boolean
}
