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
const photo_1 = require("./photo");
it("photo success", () => __awaiter(this, void 0, void 0, function* () {
    expect((yield photo_1.Photo({
        request: (url) => __awaiter(this, void 0, void 0, function* () { return new Buffer(url + "test"); }),
        Url: (key, placeId) => "url1" + key + placeId,
    })("key1")("placeId1")).toString()).toBe("url1key1placeId1test");
}));
