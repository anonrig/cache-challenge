const Controller = require('../../../src/components/cache/controller');


describe('CacheController', async function() {
  before(function() {
    this.sandbox = sinon.sandbox.create();
    this.findOne = this.sandbox.stub(Controller.model, 'findOne');
    this.find = this.sandbox.stub(Controller.model, 'find');
    this.create = this.sandbox.stub(Controller.model, 'create');
    this.remove = this.sandbox.stub(Controller.model, 'remove');
  });

  after(function() {
    this.sandbox.restore();
  });

  describe('constructor', () => {
    it('should exist', () => {
      expect(Controller).to.exist;
      expect(Controller.model).to.exist;
      expect(Controller.chance).to.exist;
    });
  });

  describe('get', function() {
    it('should get all', async function() {
      this.remove.returns(Promise.resolve({}));
      this.find.returns(Promise.resolve([]));

      try {
        await Controller.get();
      } catch(error) {
        expect(error).to.not.exist;
      }

      expect(this.find).to.have.been.called;
    });

    it('should get just one', async function() {
      const response = {key: 'value'};
      this.remove.returns(Promise.resolve({}));
      this.findOne.returns(Promise.resolve(response));

      try {
        const res = await Controller.get('test');
        expect(res).to.equal(response);
      } catch(error) {
        expect(error).to.not.exist;
      }
    });
  });

  describe('delete', function() {
    it('should remove all', async function() {
      this.remove.returns(Promise.resolve({}));

      try {
        await Controller.delete();
      } catch(error) {
        expect(error).to.not.exist;
      }

      expect(this.remove).to.have.been.called;
    });

    it('should remove just one', async function() {
      const key = 'testing';
      const itemRemove = this.sandbox.stub();

      this.remove.returns(Promise.resolve({}));
      this.findOne.returns(Promise.resolve({
        remove: itemRemove
      }));

      try {
        await Controller.delete(key);
      } catch(error) {
        expect(error).to.not.exist;
      }

      expect(this.remove).to.have.been.called;
      expect(this.findOne).to.have.been.calledWith({key});
      expect(itemRemove).to.have.been.called;
    });
  });

  describe('checkKeyValidity', () => {
    it('should check for validity', async function() {
      this.remove.returns(Promise.resolve({}));

      try {
        await Controller.checkKeyValidity();
      } catch(error) {
        expect(error).to.not.exist;
      }

      expect(this.remove).to.have.been.called;
    });
  });
});
