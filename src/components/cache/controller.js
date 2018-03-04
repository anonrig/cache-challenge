const Cache = require('./model');
const Boom = require('boom');
const Chance = require('chance');
const logger = require('../../lib/logger');

class Controller {
  constructor() {
    this.model = Cache;
    this.chance = new Chance();
  }

  async get(key) {
    await this.checkKeyValidity();

    if (key) {
      const item = await this.model.findOne({key});

      if (!item) {
        const newItem = await this.model.create({
          key,
          payload: {
            data: this.chance.string()
          }
        });

        return newItem;
      }

      return item;
    }


    return this.model.find();
  }


  async update(key, payload) {
    await this.checkKeyValidity();
    const item = await this.model.findOne({key});

    if (!item)
      throw Boom.notFound('Cache item not found');

    if (!payload)
      throw Boom.preconditionFailed('Cache payload not found');

    await item.update({payload});

    return this.model.findOne({key});
  }


  async delete(key) {
    await this.checkKeyValidity();
    if (key) {
      const item = await this.model.findOne({key});

      if (!item)
        throw Boom.notFound('Cache item not found');

      await item.remove();

      return {};
    }


    await this.model.remove();

    return {};
  }

  async checkKeyValidity() {
    const queryDate = new Date();
    queryDate.setMinutes(queryDate.getMinutes() - 5);
    const items = await this.model.remove({
      lastUsed: {
        $lt: queryDate
      }
    });

    if (items.n > 0)
      logger.info(`Deleted ${items.n} number of documents`);

    return items;
  }
}


module.exports = new Controller();
