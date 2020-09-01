import { Response as Res } from 'express'
import * as js2xmlparser from 'js2xmlparser'
import { ApplicationType } from '../models/applicationType'

export function formatOutput(
  res: Res,
  data: any,
  statusCode: number,
  appElementoType: string,
) {
  return res.format({
    json: () => {
      res.type(ApplicationType.JSON)
      res.status(statusCode).send(data)
    },
    xml: () => {
      res.type(ApplicationType.XML)
      res.status(statusCode).send(js2xmlparser.parse(appElementoType, data))
    },
    default: () => {
      res.status(406).send()
    },
  })
}
