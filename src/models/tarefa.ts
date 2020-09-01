import { TipoTarefa } from './tipoTarefa'

export default interface Tarefa {
  id: number
  idUsuario: number
  conteudo: string
  dataEntrega: Date
  tipo: TipoTarefa
  completada: boolean
}
