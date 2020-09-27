const bookshelf = require('../../bookshelf');

module.exports = bookshelf.model('Developers', {
  tableName: 'developers',
  idAttribute: 'id',
  hidden: ['deleted_at'],
  softDelete: true,
  hasTimestamps: true,
});
