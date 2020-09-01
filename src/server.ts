import { logger } from './common/logging'
import app from './app'

const { PORT } = process.env

app.listen(PORT, () => {
  logger.info(`Servidor Rodando com Sucesso! Express: http://localhost:${PORT}`)
})
