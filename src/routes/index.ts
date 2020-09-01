import { Request, Response } from 'express'

export class Index {
  public routes(app: any): void {
    return app.route('/').get((req: Request, res: Response) => {
      res.status(200).send('Api Teste Vai Bem!')
    })
  }
}
