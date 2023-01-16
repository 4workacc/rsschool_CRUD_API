import assert from 'assert';
import { addUserController, getAllUsersController, getOneUserController } from '../controllers';

describe('Controllers', function () {
    describe('#getAllUsersController()', function () {
      it('should return [].length = 1 when the value is not present and first request', function () {
        return getAllUsersController().then((data)=>{
          assert.equal(data.length, 1);
        }) 
      });
      it('should return Array', function () {
        return getAllUsersController().then((data)=>{
          assert.equal(typeof(data), 'object');
        })
      });
    });
    describe('#getOneUserController()', function(){
      it('should return one default object', function(){
        return getOneUserController('a24a6ea4-ce75-4665-a070-57453082c256').then((data)=>{
          assert.deepEqual(data, { id: 'a24a6ea4-ce75-4665-a070-57453082c256',username: 'III', age: 1,  hobbies: [] })
        })
      });
      it('should return object with id: -1 if not userId present', function(){
       
        return getOneUserController('').then((data)=>{assert.equal(data.id, -1)})
      })
    });
    describe('#addUserController()', function(){      
      it ('should return new user with username: Q', function(){
       return  addUserController({username: 'Q', age: 10, hobbies:[]}).then((data)=>{assert(data.username, 'Q')}); 
      });
      it ('should return new user with age: 10', function(){
        return  addUserController({username: 'Q', age: 10, hobbies:[]}).then((data)=>{assert(data.age, '10')}); 
      })
      it ('should return new user with hobbies: []', function(){
        return  addUserController({username: 'Q', age: 10, hobbies:[]}).then((data)=>{assert(data.hobbies, '[]')}); 
      })
    })
  });