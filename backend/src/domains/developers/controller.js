const moment = require('moment');

const Developer = require('./model');

const create = async (req, res) => {
  try {
    const { body } = req;
    const developer = await new Developer(body).save();

    res.json(developer);
  } catch (ex) {
    console.error(ex);
    res.sendStatus(400);
  }
};

const list = async (req, res) => {
  try {
    const {
      page = 0, size = 20, name,
      age, hobby, birthday,
      sex,
    } = req.query;

    const developers = await Developer.query((qb) => {
      if (age) qb.where('age', age);
      if (sex) qb.where('sex', sex);
      if (birthday) qb.where('birthday', birthday);
      if (name) qb.where('name', 'LIKE', `%${name}%`);
      if (hobby) qb.where('hobby', 'LIKE', `%${hobby}%`);
      qb.orderBy('created_at', 'desc');
    })
      .fetchPage({
        page,
        pageSize: size,
      });
    res.json({
      result: developers.models,
      pagination: developers.pagination,
    });
  } catch (ex) {
    console.error(ex);
  }
};

const update = async (req, res) => {
  try {
    const { body, params } = req;
    const { id } = params;

    const developer = await new Developer({ id }).fetch();

    if (!developer) {
      res.sendStatus(400);
    }

    const updatedDeveloper = await developer.save({
      ...body,
      birthday: moment(body.birthday).toDate(),
    }, { method: 'update', patch: true });

    res.json(updatedDeveloper.toJSON());
  } catch (ex) {
    console.error(ex);
    res.sendStatus(400);
  }
};

const deleteDeveloper = async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;

    const developer = await new Developer({ id }).fetch();

    if (!developer) {
      res.sendStatus(400);
    }

    developer.destroy();

    res.sendStatus(200);
  } catch (ex) {
    console.error(ex);
    res.sendStatus(400);
  }
};

module.exports = {
  create,
  deleteDeveloper,
  list,
  update,
};
