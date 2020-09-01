import request from 'supertest'
import app from '../../src/app'

describe('Rota da api', () => {
  it('deve retornar um http status 200', async () => {
    const result = await request(app).get('/api')
    expect(result.status).toEqual(200)
  })
  it('dever ter a mesma mensagem', async () => {
    const result = await request(app).get('/api')
    expect(result.body).toEqual({ title: 'Order API' })
  })
})
