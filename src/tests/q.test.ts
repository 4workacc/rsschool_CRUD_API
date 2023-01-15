import assert from 'assert';
import { addUserController, getAllUsersController, getOneUserController } from '../controllers';

describe('Controllers', function () {
    describe('#getAllUsersController()', function () {
      it('should return [].length = 1 when the value is not present and first request', function () {
        assert.equal(getAllUsersController().length, 1);
      });
      it('should return Array', function () {
        assert.equal(typeof(getAllUsersController()), 'object');
      });
    });
    describe('#getOneUserController()', function(){
      it('should return one default object', function(){
        assert.deepEqual(getOneUserController('a24a6ea4-ce75-4665-a070-57453082c256'), { id: 'a24a6ea4-ce75-4665-a070-57453082c256',username: 'III', age: 1,  hobbies: [] })
      });
      it('should return object with id: -1 if not userId present', function(){
        let us: any = getOneUserController('');
        assert.equal(us.id, -1)
      })
    });
    describe('#addUserController()', function(){
      let us = addUserController({username: 'Q', age: 10, hobbies:[]});
      it ('should return new user with username: Q', function(){
        assert(us.username, 'Q')
      });
      it ('should return new user with age: 10', function(){
        assert(us.age, '10')
      })
      it ('should return new user with hobbies: []', function(){
        assert(us.hobbies, '[]')
      })
    })
  });