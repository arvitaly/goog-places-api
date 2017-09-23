"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = require("querystring");
const request_1 = require("./request");
Symbol.asyncIterator = Symbol.asyncIterator || Symbol.for("Symbol.asyncIterator");
exports.URL = (params) => `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` + querystring_1.stringify(params);
exports.Nearby = ({ request = request_1.json, Url = exports.URL, }) => (key) => function (location, radius, params) {
    return __asyncGenerator(this, arguments, function* () {
        const realParams = Object.assign({ location,
            key,
            radius }, params);
        do {
            const url = Url(realParams);
            const data = yield __await(request(url));
            if (data.status !== "OK") {
                throw new Error("Invalid request, status " + data.status + ": " + exports.StatusDescriptions[data.status]);
            }
            for (const loc of data.results) {
                yield loc;
            }
            realParams.pagetoken = data.next_page_token;
        } while (!!realParams.pagetoken);
    });
};
exports.default = exports.Nearby({});
exports.StatusDescriptions = {
    OK: "Ошибок нет, место обнаружено, и получен хотя бы один результат.",
    ZERO_RESULTS: "Поиск выполнен, результатов не найдено." +
        " Такое может произойти, если для поиска установлены координаты latlng отдаленного места.",
    OVER_QUERY_LIMIT: "Превышена квота.",
    REQUEST_DENIED: "Означает, что запрос отклонен, как правило, из-за отсутствия или неверного значения параметра key.",
    INVALID_REQUEST: "Как правило, отсутствует обязательный параметр запроса (location или radius).",
};
var Status;
(function (Status) {
    Status["OK"] = "OK";
    Status["ZERO_RESULTS"] = "ZERO_RESULTS";
    Status["OVER_QUERY_LIMIT"] = "OVER_QUERY_LIMIT";
    Status["REQUEST_DENIED"] = "REQUEST_DENIED";
    Status["INVALID_REQUEST"] = "INVALID_REQUEST";
})(Status = exports.Status || (exports.Status = {}));
