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
const details_1 = require("./details");
const res1 = { test: "value" };
const requestMock = jest.fn().mockImplementation((url) => {
    switch (url) {
        case "url1":
            return Promise.resolve({
                status: details_1.Status.OK,
                result: res1,
            });
        case "url3":
            return Promise.resolve({
                status: details_1.Status.INVALID_REQUEST,
            });
        default:
            return null;
    }
});
it("details success", () => __awaiter(this, void 0, void 0, function* () {
    const mockUrl = jest.fn().mockReturnValue("url1");
    expect(yield details_1.Details({
        request: requestMock,
        Url: mockUrl,
    })("key1")("placeid1")).toEqual(res1);
}));
it("details failure google answer", () => __awaiter(this, void 0, void 0, function* () {
    const mockUrl = jest.fn().mockReturnValue("url3");
    yield expect(details_1.Details({
        request: requestMock,
        Url: mockUrl,
    })("key1")("placeid1")).rejects.toBeDefined();
}));
