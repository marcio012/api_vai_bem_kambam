import { Document, Model, model, Schema } from 'mongoose'
import Tarefa from '../../models/tarefa'
// import TipoTarefas from '../../models/tipoTarefa'

export interface TarefasModel extends Tarefa, Document { }

export const TarefasSchema: Schema = new Schema({
  idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  conteudo: String,
  dataEntrega: Date,
  tipo: { type: String, enum: ['AFAZER', 'FAZENDO', 'PAUSADO', 'CONCLUIDO'] },
  completo: Boolean,
})

export const TarefasModel: Model<TarefasModel> = model<TarefasModel>(
  'Tarefa',
  TarefasSchema,
)
