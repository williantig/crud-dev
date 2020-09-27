/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const assert = require('assert');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('api/developers', () => {
  it('Verifica se o cadastro de desenvolvedor esta sendo salvo', (done) => {
    const developer = {
      name: 'Willian Rodrigues',
      sex: 'M',
      birthday: '2020-11-11',
    };

    chai.request('http://localhost:3000/api')
      .post('/developers')
      .send(developer)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Verifica cadastro de desenvolvedor com dados inválidos', (done) => {
    const developer = {
      name: 'Willian Rodrigues',
      sex: 'A',
      birthday: '2020-11-11',
    };

    chai.request('http://localhost:3000/api')
      .post('/developers')
      .send(developer)
      .end((err, res) => {
        expect(res).to.have.status(412);
        done();
      });
  });
});
