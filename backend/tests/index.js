/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const assert = require('assert');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

let testDev;

describe('api/developers', () => {
  it('Cria um desenvolvedor com sucesso', (done) => {
    const developer = {
      name: 'Mocha Developer Test User',
      sex: 'M',
      birthday: '1997-11-11',
      age: 23,
      hobby: 'Baseball',
    };

    chai.request('http://localhost:3000/api')
      .post('/developers')
      .send(developer)
      .end((err, res) => {
        testDev = res.body;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Verifica validação da criação de um desenvolvedor', (done) => {
    const developer = {
      name: 'Mocha Developer Test User',
      sex: 'C',
      age: 23,
      birthday: '1997-11-11',
    };

    chai.request('http://localhost:3000/api')
      .post('/developers')
      .send(developer)
      .end((err, res) => {
        expect(res).to.have.status(412);
        done();
      });
  });

  it('Lista desenvolvedores', (done) => {
    chai.request('http://localhost:3000/api')
      .get('/developers?name=Mocha Developer Test User')
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Atualiza desenvolvedor', (done) => {
    const { id } = testDev;

    const developer = {
      name: 'Mocha Developer Test User Updated',
      sex: 'F',
      birthday: '1997-01-01',
      age: 23,
      hobby: 'Fishing',
    };

    chai.request('http://localhost:3000/api/')
      .put(`/developers/${id}`)
      .send(developer)
      .end((err, res) => {
        expect(res.body.name).to.equal(developer.name);
        expect(res.body.sex).to.equal(developer.sex);
        expect(res.body.birthday).to.equal(new Date(developer.birthday).toISOString());
        expect(res.body.hobby).to.equal(developer.hobby);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Verifica validação da atualização de um desenvolvedor', (done) => {
    const { id } = testDev;

    const developer = {
      name: 'Mocha Developer Test User Updated',
      sex: 'C',
      age: 23,
      birthday: '1997-45-11',
    };

    chai.request('http://localhost:3000/api')
      .put(`/developers/${id}`)
      .send(developer)
      .end((err, res) => {
        expect(res).to.have.status(412);
        done();
      });
  });

  it('Remove desenvolvedor', (done) => {
    const { id } = testDev;

    chai.request('http://localhost:3000/api/')
      .delete(`/developers/${id}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
