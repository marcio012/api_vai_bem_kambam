import { NextFunction, Request, Response } from 'express'

export const getApi = (req: Request, res: Response, _next: NextFunction) => {
  return res.status(200).json({ title: 'Order API' })
}
