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
exports.URL = (key, photoreference, maxwidth, maxheight) => `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoreference}&key=${key}` +
    "&maxwidth=" + maxwidth + "&maxheight=" + maxheight;
exports.Photo = ({ request = request_1.buffer, Url = exports.URL, }) => (key) => (photoreference, maxwidth = 4000, maxheight = 4000) => __awaiter(this, void 0, void 0, function* () {
    const url = Url(key, photoreference, maxwidth, maxheight);
    const res = yield request(url);
    return res;
});
exports.default = exports.Photo({});
