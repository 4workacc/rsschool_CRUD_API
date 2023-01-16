"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.modifyUserController = exports.addUserController = exports.getOneUserController = exports.getAllUsersController = void 0;
const uuid = __importStar(require("uuid"));
const promises_1 = require("fs/promises");
const getAllUsersController = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = JSON.parse(yield (0, promises_1.readFile)("./src/db/local.json", "utf8")) || [];
    return (data);
});
exports.getAllUsersController = getAllUsersController;
const getOneUserController = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let outUser = {
        id: '-1',
        username: '',
        age: 1,
        hobbies: []
    };
    let data = JSON.parse(yield (0, promises_1.readFile)("./src/db/local.json", "utf8")) || [];
    data.forEach((el) => {
        if (el.id === userId) {
            outUser = el;
        }
    });
    return outUser;
});
exports.getOneUserController = getOneUserController;
const addUserController = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    let newUUID = uuid.v4();
    let newUser = {
        id: newUUID,
        username: userData.username,
        age: userData.age,
        hobbies: userData.hobbies,
    };
    let arr = [];
    yield (0, promises_1.readFile)("./src/db/local.json", "utf8").then((data) => {
        arr = JSON.parse(data);
        arr.push(newUser);
        (0, promises_1.writeFile)('./src/db/local.json', JSON.stringify(arr));
    });
    return newUser;
});
exports.addUserController = addUserController;
const modifyUserController = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () {
    let userArr = [];
    let updatedUser;
    yield (0, promises_1.readFile)("./src/db/local.json", "utf8").then((data) => {
        userArr = JSON.parse(data);
        userArr.forEach((el) => {
            if (el.id === userId) {
                el.username = updatedUserData.username === 'XXX' ? el.username : updatedUserData.username;
                el.age = updatedUserData.age === -1 ? el.age : updatedUserData.age;
                el.hobbies = updatedUserData.hobbies.length === 0 ? el.hobbies : updatedUserData.hobbies;
                updatedUser = el;
                (0, promises_1.writeFile)('./src/db/local.json', JSON.stringify(userArr));
                return el;
            }
            else {
                updatedUser = {
                    id: '-123',
                    username: "",
                    age: -1,
                    hobbies: []
                };
            }
        });
    });
    return updatedUser;
});
exports.modifyUserController = modifyUserController;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let ansCode = 404;
    let arr = [];
    yield (0, promises_1.readFile)("./src/db/local.json", "utf8").then((data) => {
        arr = JSON.parse(data);
        arr.forEach((el, i) => {
            if (el.id === userId) {
                arr.splice(i, 1);
                (0, promises_1.writeFile)('./src/db/local.json', JSON.stringify(arr));
                console.log(`DELETE status`, 204);
                ansCode = 204;
            }
        });
    });
    return ansCode;
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=controllers.js.map