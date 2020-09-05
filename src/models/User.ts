import Task from './Task'

export interface User {
  _id?: Number
  firstName: String
  lastName: String
  email: String
  password: String
  created: Date
  updated: Date
  username: String
  // tarefas: Array<Task>
}
