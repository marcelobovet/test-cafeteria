const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it('status 200 al consultar productos', async () => {
        const response = await request(server).get('/cafes').send();
        const status = response.statusCode;
        const cafes = response.body;
        const total = cafes.length;
        expect(status).toBe(200);
        expect(cafes).toBeInstanceOf(Array);
        expect(total).toBeGreaterThanOrEqual(1);
    });

    it('eliminar un cafe', async () => {
        const jwt = 'token';
        const idToDelete = 'id';
        const response = (await request(server).delete(`/cafes/${idToDelete}`).set('Authorization', jwt)).setEncoding();
        expect(response.statusCode).toBe(404);
    });

    it('agregar cafe', async () => {
        const cafe = { id: 10, nombre: 'nuevo cafe'};
        const response = await request(server).post('/cafes').send(cafe);
        const status = response.statusCode;
        const cafes = response.body;
        expect(status).toBe(201);
        expect(cafes).toContainEqual(cafe);
    });

    it('actualizar cafe que no existe', async () => {
        const cafe = { id: 'hi', nombre: 'nuevo kafe'};
        const id = 'id inexistente';
        const response = await request(server).put(`/cafes/${id}`).send(cafe);
        const status = response.statusCode;
        expect(status).toBe(400);
    });
});






/* 

describe("Operaciones CRUD de cafes", () => {
    it('status 404 al eliminar un producto que no exise', async () => {
        const response = await request(server).delete('/cafes/21').send();
        const status = response.statusCode;
        expect(status).toBe(404);
    })
});

it("Enviando un nuevo producto", async () => {
    const id = Math.floor(Math.random() * 999);
    const cafe = { id, nombre: "Nuevo cafe" };
    const { body: cafes } = await request(server).post("/cafes").send(cafe);
    expect(cafes).toContainEqual(cafe);
}); */