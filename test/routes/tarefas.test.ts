import request from 'supertest'
import { TarefasModel } from '../../src/database/schemas/tarefas'
import app from '../../src/app'
import Tarefa from '../../src/models/tarefa'
import { TipoTarefa } from '../../src/models/tipoTarefa'

import Usuario from '../../src/models/usuario'

const tarefa: Tarefa = {
  idUsuario: '12',
  conteudo: 'Estudar Java',
  dataEntrega: new Date(),
  tipo: TipoTarefa.AFazer,
  completada: false,
}
// eslint-disable-next-line no-var
var tarefaIdCriacao = 0

describe('tarefasRoute', () => {
  it('deve responder com o status HTTP 404 quando não há tarefa', async () => {
    const result = await request(app).get(`/tarefas/${'123123'}`)
    expect(result.status).toEqual(404)
  })

  it('devo criar um usuario para o teste e retornar ele', async () => {
    const usuario: Usuario = {
      nomeusuario: 'marcio teste',
      primeiroNome: 'Marcio teste',
      segundoNome: 'Pessoa teste',
      email: 'marcio@myemailteste.com',
      senha: '123456',
    }
    const result = await request(app).post(`/usuarios`).send(usuario)
    const { _id } = result.body
    expect(result.status).toEqual(201)
    expect(result.body.nomeusuario).toEqual(usuario.nomeusuario)
    tarefa.idUsuario = _id
  })

  it('deve retorna a tarefa criada na etapa anterior e retorna-la de volta', async () => {
    const result = await request(app).post('/tarefas').send(tarefa)
    const { _id } = result.body
    tarefaIdCriacao = _id
    expect(result.status).toEqual(201)
    expect(result.body.idUsuario).toEqual(tarefa.idUsuario)
    expect(result.body.completada).toBe(false)
  })

  it('deve retornar todas as tarefas criadas', async () => {
    const result = await request(app).get('/tarefas')
    expect(result.status).toEqual(200)
    expect(result.body.length).toEqual(expect.not.arrayContaining([]))
  })

  it('as tarefas deve serem retornadas de acordo com o os parametro de paginacao de tarefas', async () => {
    const result = await request(app).get(`/tarefas/?offset=2&limit=2`)
    expect(result.status).toEqual(200)
    expect(result.body).toEqual(expect.arrayContaining([]))
  })

  it('deve retornar 200 e as tarefas filtrada pelo tipo.', async () => {
    const result = await request(app).get(`/tarefas/agrupadas?tipo=A%20FAZER`)
    expect(result.status).toEqual(200)
    expect(result.body).toEqual(expect.not.objectContaining([]))
  })

  it('deve remover uma tarefa existente', async () => {
    const result = await request(app).del(`/tarefas/${tarefaIdCriacao}`)
    expect(result.status).toEqual(204)
  })
  it('deve responder com o status HTTP status 404 quando não há tarefa', async () => {
    const result = await request(app).get(`/tarefa/${tarefaIdCriacao}`)
    expect(result.status).toEqual(404)
  })
})
