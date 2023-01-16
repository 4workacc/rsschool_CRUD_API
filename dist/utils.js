"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showMessage = exports.chechIsUUID = void 0;
const chechIsUUID = (userId) => {
    let uuid4Reg = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    return uuid4Reg.test(userId);
};
exports.chechIsUUID = chechIsUUID;
const showMessage = (msg) => {
};
exports.showMessage = showMessage;
//# sourceMappingURL=utils.js.map