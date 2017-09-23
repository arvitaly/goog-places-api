"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
exports.request = (url, options) => __awaiter(this, void 0, void 0, function* () {
    const res = yield node_fetch_1.default(url, options);
    if (res.status !== 200) {
        throw new Error("Invalid request " + url + ", status " + res.status + ", " + res.statusText);
    }
    return res;
});
exports.json = (url, options) => __awaiter(this, void 0, void 0, function* () { return (yield exports.request(url, options)).json(); });
exports.buffer = (url, options) => __awaiter(this, void 0, void 0, function* () { return (yield exports.request(url, options)).buffer(); });
