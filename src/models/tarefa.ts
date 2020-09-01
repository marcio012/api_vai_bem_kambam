import { TipoTarefa } from './tipoTarefa'

export default interface Order {
  id: number
  idUsuario: number
  conteudo: number
  dataEntrega: Date
  tipo: TipoTarefa
  completada: boolean
}
