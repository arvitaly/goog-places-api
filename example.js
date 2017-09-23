"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncIterator) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const index_1 = require("./lib/index");
const key = fs_1.readFileSync(__dirname + "/key.txt").toString();
const api = index_1.default(key);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (var _a = __asyncValues(api.nearby("55.7494733,37.3523209", 50000, {
                keyword: "памятник",
            })), _b; _b = yield _a.next(), !_b.done;) {
                const loc = yield _b.value;
                const location = yield api.details(loc.place_id);
                // tslint:disable-next-line:no-console
                console.log(location.name);
                const buf = yield api.photo(location.photos[0].photo_reference);
                require("fs").writeFileSync(__dirname + "/1.jpg", buf);
                break;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) yield _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    });
}
start();
