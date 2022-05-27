"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoConnection_1 = require("./database/mongoConnection");
const URLcontroller_1 = require("./controller/URLcontroller");
const api = (0, express_1.default)();
api.use(express_1.default.json());
const databaseMONGODB = new mongoConnection_1.MongoConnection();
databaseMONGODB.connect();
const URLcontroller = new URLcontroller_1.URLcontrolller();
api.post('/shorten', URLcontroller.shorten);
api.get('/:hash', URLcontroller.redirect);
api.listen(5000, () => console.log('Express listening'));
//# sourceMappingURL=index.js.map