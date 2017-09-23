import { Photo } from "./photo";
it("photo success", async () => {
    expect((await Photo({
        request: async (url) => new Buffer(url + "test"),
        Url: (key, placeId) => "url1" + key + placeId,
    })("key1")("placeId1")).toString()).toBe("url1key1placeId1test");
});
