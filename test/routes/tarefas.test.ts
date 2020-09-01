import request from 'supertest'
import app from '../../src/app'
// import Usuario from '../../src/models/usuario'
import Tarefa from '../../src/models/tarefa'
import { TipoTarefa } from '../../src/models/tipoTarefa'

const tarefa: Tarefa = {
  // generic random value from 1 to 100 only for tests so far
  id: 1,
  idUsuario: 20,
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
  // it('deve retornar o inventário para todos os usuários', async () => {
  //   return chai
  //     .request(app)
  //     .get(`/tarefa`)
  //     .then(res => {
  //       expect(res.status).to.be.equal(200)
  //       expect(res.body[20].length).to.be.equal(1)
  //     })
  // })
  it('deve remover uma tarefa existente', async () => {
    const result = await request(app).del(`/tarefas/${tarefa.id}`)

    expect(result.status).toEqual(204)
  })
  // it('deve retornar 404 quando estiver tentando remover uma tarefa porque o pedido não existe', async () => {
  //   return chai
  //     .request(app)
  //     .del(`/store/orders/${order.id}`)
  //     .then(res => {
  //       expect(res.status).to.be.equal(404)
  //     })
  // })
})
