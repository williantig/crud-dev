const bookshelf = require('../../bookshelf');
const moment = require('moment');

module.exports = bookshelf.model('Developers', {
  tableName: 'developers',
  idAttribute: 'id',
  hidden: ['deleted_at'],
  softDelete: true,
  hasTimestamps: true,
  toJSON: function () {
    var attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);
    const birthday = moment(this.get('birthday'));

    // TODO: adicionar campo 'age' e calcular com base na data de nascimento
    // e colocar no filtro a busca pelo campo calculado

    attrs.birthday = birthday.format('YYYY-MM-DD');
    return attrs;
  }
});
