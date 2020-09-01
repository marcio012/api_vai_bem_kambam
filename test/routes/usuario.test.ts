import request from 'supertest'
import app from '../../src/app'
import Usuario from '../../src/models/usuario'

const user: Usuario = {
  // generic random value from 1 to 100 only for tests so far
  id: 1,
  nomeUsuario: 'marcio',
  primeiroNome: 'Marcio',
  segundoNome: 'Pessoa',
  email: 'marcio@myemail.com',
  senha: '123456',
}

describe('userRoute', () => {
  it('deve responder com HTTP status 404 quando não há usuário', async () => {
    const result = await request(app).get(`/usuarios/${user.nomeUsuario}`)
    expect(result.status).toEqual(404)
  })
  it('deve criar um usuário retorna-lo', async () => {
    const result = await request(app).post(`/usuarios/`).send(user)
    expect(result.status).toEqual(201)
    expect(result.body.nomeUsuario).toEqual(user.nomeUsuario)
  })
  it('deve retornar o usuário no banco', async () => {
    const result = await request(app).get(`/usuarios/${user.nomeUsuario}`)
    expect(result.status).toEqual(200)
    expect(result.body.nomeUsuario).toEqual(user.nomeUsuario)
  })
  it('deve atualizar o usuário Marcio', async () => {
    user.nomeUsuario = 'marcio Updated'
    user.primeiroNome = 'Marcio Updated'
    user.segundoNome = 'Pessoa Updated'
    user.email = 'marcio@myemail_updated.com'
    user.senha = '1234567Updated'
    const result = await request(app).patch(`/usuarios/marcio`).send(user)
    expect(result.status).toEqual(204)
  })
  it('deve retornar o usuário atualizado', async () => {
    const result = await request(app).get(`/usuarios/${user.nomeUsuario}`)

    expect(result.status).toEqual(200)
    expect(result.body.nomeUsuario).toEqual(user.nomeUsuario)
    expect(result.body.primeiroNome).toEqual(user.primeiroNome)
    expect(result.body.segundoNome).toEqual(user.segundoNome)
    expect(result.body.email).toEqual(user.email)
    expect(result.body.senha).toEqual(user.senha)
  })
  it('deve remover um usuário existente', async () => {
    const result = await request(app).del(`/usuarios/${user.nomeUsuario}`)
    expect(result.status).toEqual(204)
  })

  it('deve retornar 404 se o usuário não existir', async () => {
    user.nomeUsuario = 'bill'
    const result = await request(app).patch(`/usuarios/bill`).send(user)
    expect(result.status).toEqual(404)
  })
  it('deve retornar 404 quando estiver tentando remover um usuário que não existe', async () => {
    const result = await request(app).del(`/usuarios/Mary`)

    expect(result.status).toEqual(404)
  })
})
