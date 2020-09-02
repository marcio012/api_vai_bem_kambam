import mongoose from 'mongoose'
import { logger } from '../common/logging'

export default (db: string) => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => {
        return logger.info(`Successfully connected to ${db}`)
      })
      .catch(error => {
        logger.info('Error connecting to database: ', error)
        return process.exit(1)
      })
  }
  connect()

  mongoose.connection.on('disconnected', connect)
}
