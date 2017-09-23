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
const nearby_1 = require("./nearby");
it("nearby failure", () => __awaiter(this, void 0, void 0, function* () {
    const nearby = nearby_1.Nearby({
        request: (_) => __awaiter(this, void 0, void 0, function* () {
            return ({
                status: nearby_1.Status.INVALID_REQUEST,
            });
        }),
        Url: (params) => JSON.stringify(params),
    });
    const iterator = nearby("key1")("1,2", 20, {
        keyword: "s",
        pagetoken: "pt",
    });
    try {
        yield iterator.next();
        fail("shoud be error");
    }
    catch (e) {
        expect(e).toBeDefined();
    }
}));
it("nearby many cycles", () => __awaiter(this, void 0, void 0, function* () {
    const nearby = nearby_1.Nearby({
        request: (url) => __awaiter(this, void 0, void 0, function* () {
            if (url.indexOf("pagetoken1") > -1) {
                return ({
                    status: nearby_1.Status.OK,
                    results: [url + "res1"],
                    next_page_token: "pagetoken2",
                });
            }
            if (url.indexOf("pagetoken2") > -1) {
                return ({
                    status: nearby_1.Status.OK,
                    results: [url + "res2"],
                    next_page_token: null,
                });
            }
            return null;
        }),
    });
    const iterator = nearby("key1")("1,2", 20, {
        keyword: "s",
        pagetoken: "pagetoken1",
    });
    const locs = [];
    try {
        for (var iterator_1 = __asyncValues(iterator), iterator_1_1; iterator_1_1 = yield iterator_1.next(), !iterator_1_1.done;) {
            const loc = yield iterator_1_1.value;
            locs.push(loc);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (iterator_1_1 && !iterator_1_1.done && (_a = iterator_1.return)) yield _a.call(iterator_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    expect(locs.length).toBe(2);
    expect(locs[0]).toBe("https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
        "location=1%2C2&key=key1&radius=20&keyword=s&pagetoken=pagetoken1res1");
    expect(locs[1]).toBe("https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
        "location=1%2C2&key=key1&radius=20&keyword=s&pagetoken=pagetoken2res2");
    var e_1, _a;
}));
