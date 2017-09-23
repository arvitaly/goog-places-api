"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = exports.StatusDescriptions;
