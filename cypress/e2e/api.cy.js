import envUrls from '../fixtures/url.json';
import users from '../fixtures/user.json';

describe('Casos de prueba de API', () => {

    it('TC-01 | Obtener catálogo de libros (API)', () => {
        cy.request('GET', `${envUrls.api}/Book`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');

            //si hay al menos 1 libro, ya es correcto. Después verifica que ese libro tenga título e ID
            expect(response.body.length).to.be.greaterThan(0);
            expect(response.body[0]).to.have.property('bookId');
            expect(response.body[0]).to.have.property('title');
        });
    });

    it('TC-02 | Obtener libro individual por ID válido (API)', () => {
        //hardcodeado porque sé que es válido. Otra solución sería GET lista de libros
        //y de esa lista agarrar cualquier libro.

        const validBookId = 2;
        cy.request('GET', `${envUrls.api}/Book/${validBookId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('bookId', validBookId);
            expect(response.body).to.have.property('title');
        });
    });

    it('TC-03 | Obtener libro con ID inexistente (API)', () => {
        cy.request({
            method: 'GET',
            //de nuevo, hardcodeado porque sé que no existe.
            url: `${envUrls.api}/Book/99999`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('TC-04 | Autenticación con credenciales válidas (API)', () => {
        cy.loginByApi(envUrls.api, users.username, users.password);
        //ver ../support/commands.js 'loginByApi'
    });

    it('TC-05 | Autenticación con credenciales inválidas (API)', () => {
        cy.request({
            method: 'POST',
            url: `${envUrls.api}/Login`,
            failOnStatusCode: false,
            body: {
                username: users.username,
                password: "WrongPassword123!"
            }
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});