import { Nearby, Status } from "./nearby";

it("nearby failure", async () => {
    const nearby = Nearby({
        request: async (_) => ({
            status: Status.INVALID_REQUEST,
        }),
        Url: (params) => JSON.stringify(params),
    });
    const iterator = nearby("key1")("1,2", 20, {
        keyword: "s",
        pagetoken: "pt",
    });
    try {
        await iterator.next();
        fail("shoud be error");
    } catch (e) {
        expect(e).toBeDefined();
    }
});
it("nearby many cycles", async () => {
    const nearby = Nearby({
        request: async (url) => {
            if (url.indexOf("pagetoken1") > -1) {
                return ({
                    status: Status.OK,
                    results: [url + "res1"],
                    next_page_token: "pagetoken2",
                });
            }
            if (url.indexOf("pagetoken2") > -1) {
                return ({
                    status: Status.OK,
                    results: [url + "res2"],
                    next_page_token: null,
                });
            }
            return null;
        },
    });
    const iterator = nearby("key1")("1,2", 20, {
        keyword: "s",
        pagetoken: "pagetoken1",
    });

    const locs: any[] = [];
    for await (const loc of iterator) {
        locs.push(loc);
    }
    expect(locs.length).toBe(2);
    expect(locs[0]).toBe("https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
        "location=1%2C2&key=key1&radius=20&keyword=s&pagetoken=pagetoken1res1");
    expect(locs[1]).toBe("https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
        "location=1%2C2&key=key1&radius=20&keyword=s&pagetoken=pagetoken2res2");
});
