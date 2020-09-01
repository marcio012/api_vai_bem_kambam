import { Response as Res } from 'express'
import { ApplicationType } from '../models/applicationType'

export function formatOutput(
  res: Res,
  data: any,
  statusCode: number,
  applicationType: ApplicationType,
) {
  return res.format({
    json: () => {
      res.type(applicationType)
      res.status(statusCode).send(data)
    },
    default: () => {
      res.status(406).send()
    },
  })
}
