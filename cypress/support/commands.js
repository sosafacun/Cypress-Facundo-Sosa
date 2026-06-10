Cypress.Commands.add('loginByApi', (apiUrl, username, password) => {
    cy.request({
        method: 'POST',
        url: `${apiUrl}/Login`, //la url se consigue del parámetro
        body: { username, password } //lo mismo con el usuario y contraseña
    }).then((response) => {
        expect(response.status).to.eq(200);

        //guarda el token de manera local en el browser.
        //https://stackoverflow.com/questions/50820732/in-cypress-set-a-token-in-localstorage-before-test
        window.localStorage.setItem('authToken', response.body.token);
        Cypress.apiToken = response.body.token;
        Cypress.userId = response.body.userDetails.userId;
    });
});