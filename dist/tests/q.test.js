"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const controllers_1 = require("../controllers");
describe('Controllers', function () {
    describe('#getAllUsersController()', function () {
        it('should return [].length = 1 when the value is not present and first request', function () {
            return (0, controllers_1.getAllUsersController)().then((data) => {
                assert_1.default.equal(data.length, 1);
            });
        });
        it('should return Array', function () {
            return (0, controllers_1.getAllUsersController)().then((data) => {
                assert_1.default.equal(typeof (data), 'object');
            });
        });
    });
    describe('#getOneUserController()', function () {
        it('should return one default object', function () {
            return (0, controllers_1.getOneUserController)('a24a6ea4-ce75-4665-a070-57453082c256').then((data) => {
                assert_1.default.deepEqual(data, { id: 'a24a6ea4-ce75-4665-a070-57453082c256', username: 'III', age: 1, hobbies: [] });
            });
        });
        it('should return object with id: -1 if not userId present', function () {
            return (0, controllers_1.getOneUserController)('').then((data) => { assert_1.default.equal(data.id, -1); });
        });
    });
    describe('#addUserController()', function () {
        it('should return new user with username: Q', function () {
            return (0, controllers_1.addUserController)({ username: 'Q', age: 10, hobbies: [] }).then((data) => { (0, assert_1.default)(data.username, 'Q'); });
        });
        it('should return new user with age: 10', function () {
            return (0, controllers_1.addUserController)({ username: 'Q', age: 10, hobbies: [] }).then((data) => { (0, assert_1.default)(data.age, '10'); });
        });
        it('should return new user with hobbies: []', function () {
            return (0, controllers_1.addUserController)({ username: 'Q', age: 10, hobbies: [] }).then((data) => { (0, assert_1.default)(data.hobbies, '[]'); });
        });
    });
});
//# sourceMappingURL=q.test.js.map