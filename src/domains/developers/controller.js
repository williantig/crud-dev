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
    const developer = await Developer({ id }).save(body);
    res.json(developer.toJSON());
  } catch (ex) {
    console.error(ex);
    res.sendStatus(400);
  }
};

const deleteDeveloper = (req, res) => {
  res.send(200);
};

module.exports = {
  create,
  deleteDeveloper,
  list,
  update,
};
