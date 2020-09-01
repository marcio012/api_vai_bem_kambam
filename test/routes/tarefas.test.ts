import request from 'supertest'
import app from '../../src/app'
import Tarefa from '../../src/models/tarefa'
import { TipoTarefa } from '../../src/models/tipoTarefa'

const tarefa: Tarefa = {
  id: Math.floor(Math.random() * 100) + 1,
  idUsuario: 12,
  conteudo: 'Eu sou um cara legal',
  dataEntrega: new Date(),
  tipo: TipoTarefa.AFazer,
  completada: false,
}

describe('tarefasRoute', () => {
  it('deve responder com o status HTTP status 404 quando não há tarefa', async () => {
    const result = await request(app).get(`/tarefa/${tarefa.id}`)
    expect(result.status).toEqual(404)
  })
  it('deve criar um novo pedido e envia-lo de volta', async () => {
    const result = await request(app).post('/tarefas').send(tarefa)
    expect(result.status).toEqual(201)
    expect(result.body.idUsuario).toEqual(tarefa.idUsuario)
    expect(result.body.completada).toEqual(false)
    expect(tarefa.id).toBe(result.body.id)
  })
  it('deve retornar o pedido criado na etapa', async () => {
    const result = await request(app).get(`/tarefas/${tarefa.id}`)

    expect(result.status).toEqual(200)
    expect(result.body.id).toEqual(tarefa.id)
    expect(result.body.tipo).toEqual(tarefa.tipo)
  })

  it('deve retornar todas as tarefas', async () => {
    const result = await request(app).get(`/tarefas`)
    expect(result.status).toEqual(200)
    expect(result.body.length).toEqual(1)
  })
  it('deve retornar 200 e a coleção filtrada pelo tipo.', async () => {
    const result = await request(app).get(`/tarefas/agrupadas?tipo=A%20FAZER`)
    expect(result.status).toEqual(200)
    expect(result.body).toEqual(expect.not.objectContaining(tarefa))
  })

  it('não deve retornar tarefas porque o limit é maior que o tamanho da matriz de tarefas', async () => {
    const result = await request(app).get(`/tarefas/?offset=2&limit=2`)
    expect(result.status).toEqual(200)
    expect(result.body).toEqual(expect.arrayContaining([]))
  })

  it('deve remover uma tarefa existente', async () => {
    const result = await request(app).del(`/tarefas/${tarefa.id}`)
    expect(result.status).toEqual(204)
  })

  it('deve retornar 404 quando estiver tentando remover uma tarefa com id que não existe', async () => {
    const result = await request(app).del(`/tarefas/${tarefa.id}`)
    expect(result.status).toEqual(404)
  })
})
