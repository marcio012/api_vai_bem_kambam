import { TipoTarefa } from './tipoTarefa'

export default interface Tarefa {
  idUsuario: number
  conteudo: string
  dataEntrega: Date
  tipo: TipoTarefa
  completada: boolean
}
