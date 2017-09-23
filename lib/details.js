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
const request_1 = require("./request");
exports.URL = (key, placeId) => `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${key}`;
exports.Details = ({ request = request_1.json, Url = exports.URL, }) => (key) => (placeId) => __awaiter(this, void 0, void 0, function* () {
    const url = Url(key, placeId);
    const data = yield request(url);
    if (data.status !== "OK") {
        throw new Error("Invalid request, status " + data.status + ": " + exports.StatusDescriptions[data.status]);
    }
    return data.result;
});
exports.default = exports.Details({});
exports.StatusDescriptions = {
    OK: "Ошибок нет, место обнаружено, и получен хотя бы один результат.",
    UNKNOWN_ERROR: "Ошибка на стороне сервера.Повторная попытка может быть успешной.",
    ZERO_RESULTS: "Ссылка более не указывает на корректный результат. " +
        "Такое может произойти, если организация прекратила свое существование.",
    OVER_QUERY_LIMIT: "Превышена квота.",
    REQUEST_DENIED: "Означает, что запрос отклонен, как правило, из-за отсутствия или неверного значения параметра key.",
    INVALID_REQUEST: "Обычно означает отсутствие запроса (reference).",
    NOT_FOUND: "Указанное место отсутствует в базе данных Google Places.",
};
var Status;
(function (Status) {
    Status["OK"] = "OK";
    Status["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    Status["ZERO_RESULTS"] = "ZERO_RESULTS";
    Status["OVER_QUERY_LIMIT"] = "OVER_QUERY_LIMIT";
    Status["REQUEST_DENIED"] = "REQUEST_DENIED";
    Status["INVALID_REQUEST"] = "INVALID_REQUEST";
    Status["NOT_FOUND"] = "NOT_FOUND";
})(Status = exports.Status || (exports.Status = {}));
