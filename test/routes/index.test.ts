import request from 'supertest'
import app from '../../src/app'

describe('baseRoute', () => {
  it('deve retornar um http status 200', async () => {
    const result = await request(app).get('/')
    expect(result.status).toEqual(200)
  })
  it('should respond with success message', async () => {
    const result = await request(app).get('/')
    expect(result.text).toEqual('Api Teste Vai Bem!')
  })
})
