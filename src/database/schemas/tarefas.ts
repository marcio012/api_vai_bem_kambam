import { Document, Model, model, Schema } from 'mongoose'
import Tarefa from '../../models/tarefa'
import { TipoTarefa } from '../../models/tipoTarefa'

export interface TarefaModel extends Tarefa, Document { }

export const TarefasSchema: Schema = new Schema({
  idUsuario: { type: Schema.Types.ObjectId, ref: 'usuario' },
  titulo: {
    type: String,
    trim: true,
    required: 'Titulo obrigatório',
  },
  conteudo: {
    type: String,
    trim: true,
  },
  dataEntrega: {
    type: Date,
    default: new Date(Date.now() + 1),
  },
  status: {
    type: String,
    enum: ['AFAZER', 'FAZENDO', 'PAUSADO', 'CONCLUIDO'],
    default: 'AFAZER',
  },
  completo: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
})

export const TarefaModel: Model<TarefaModel> = model<TarefaModel>(
  'Tarefa',
  TarefasSchema,
)
