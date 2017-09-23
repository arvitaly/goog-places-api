"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const details_1 = require("./details");
const nearby_1 = require("./nearby");
const photo_1 = require("./photo");
exports.default = (key) => ({
    details: details_1.default(key),
    photo: photo_1.default(key),
    nearby: nearby_1.default(key),
});
