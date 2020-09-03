import { TipoTarefa } from './tipoTarefa'

export default interface Tarefa {
  idUsuario: String
  titulo: String
  conteudo: String
  dataEntrega: Date
  tipo: TipoTarefa
  completada: Boolean
}
