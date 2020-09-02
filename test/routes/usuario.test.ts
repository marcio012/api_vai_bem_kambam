import request from 'supertest'
import { UsuarioModel } from '../../src/database/schemas/usuarios'
import app from '../../src/app'
import Usuario from '../../src/models/usuario'

const usuario: Usuario = {
  nomeusuario: 'marcio',
  primeiroNome: 'Marcio',
  segundoNome: 'Pessoa',
  email: 'marcio@myemail.com',
  senha: '123456',
}

describe('userRoute', () => {
  it('deve responder com HTTP status 404 quando não há usuário', async () => {
    const result = await request(app).get(`/usuarios/${usuario.nomeusuario}`)
    expect(result.status).toEqual(404)
  })
  it('deve criar um usuário retorna-lo', async () => {
    const result = await request(app).post(`/usuarios`).send(usuario)
    expect(result.status).toEqual(201)
    expect(result.body.nomeusuario).toEqual(usuario.nomeusuario)
  })
  it('deve retornar o usuário no banco', async () => {
    const result = await request(app).get(`/usuarios/${usuario.nomeusuario}`)
    expect(result.status).toEqual(200)
    expect(result.body.nomeusuario).toEqual(usuario.nomeusuario)
  })
  it('deve atualizar o usuário Marcio', async () => {
    usuario.nomeusuario = 'marcio Updated'
    usuario.primeiroNome = 'Marcio Updated'
    usuario.segundoNome = 'Pessoa Updated'
    usuario.email = 'marcio@myemail_updated.com'
    usuario.senha = '1234567Updated'
    const result = await request(app).patch(`/usuarios/marcio`).send(usuario)
    expect(result.status).toEqual(204)
  })
  it('deve retornar o usuário atualizado', async () => {
    const result = await request(app).get(`/usuarios/${usuario.nomeusuario}`)

    expect(result.status).toEqual(200)
    expect(result.body.nomeusuario).toEqual(usuario.nomeusuario)
    expect(result.body.primeiroNome).toEqual(usuario.primeiroNome)
    expect(result.body.segundoNome).toEqual(usuario.segundoNome)
    expect(result.body.email).toEqual(usuario.email)
    expect(result.body.senha).toEqual(usuario.senha)
  })
  it('deve remover um usuário existente', async () => {
    const result = await request(app).del(`/usuarios/${usuario}`)
    expect(result.status).toEqual(204)
  })

  it('deve retornar 404 se o usuário não existir', async () => {
    usuario.nomeusuario = 'bill'
    const result = await request(app).patch(`/usuarios/bill`).send(usuario)
    expect(result.status).toEqual(404)
  })
  it('deve retornar 404 quando estiver tentando remover um usuário que não existe', async () => {
    const result = await request(app).del(`/usuarios/${usuario.nomeusuario}`)
    expect(result.status).toEqual(404)
  })
})
