import { TypeTask } from './TypeTask'

export default interface Task {
  _id?: String
  userId: String
  title: String
  content: String
  dataShip: Date
  status: TypeTask
  done: Boolean
}
