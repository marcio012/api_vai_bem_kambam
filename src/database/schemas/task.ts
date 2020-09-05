import mongoose, { Document, Model, Schema } from 'mongoose'
import Task from '../../models/Task'

export interface TaskModel extends Omit<Task, '_id'>, Document { }

export const taskSchema: Schema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
      type: String,
      trim: true,
      required: 'Titulo obrigatório',
    },
    content: {
      type: String,
      trim: true,
    },
    dataShip: {
      type: Date,
      default: new Date(Date.now() + 1),
    },
    status: {
      type: String,
      enum: ['AFAZER', 'FAZENDO', 'PAUSADO', 'CONCLUIDO'],
    },
    done: {
      type: Boolean,
      default: false,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    updated: Date,
  },
  // {
  //   toJSON: {
  //     transform: (_, ret): void => {
  //       ret.id = ret._id
  //       delete ret._id
  //       delete ret.__v
  //     },
  //   },
  // },
)

export const TaskModel: Model<TaskModel> = mongoose.model('Task', taskSchema)
