import { Details, Status } from "./details";
const res1 = { test: "value" };
const requestMock = jest.fn().mockImplementation((url: string) => {
    switch (url) {
        case "url1":
            return Promise.resolve({
                status: Status.OK,
                result: res1,
            });
        case "url3":
            return Promise.resolve({
                status: Status.INVALID_REQUEST,
            });
        default:
            return null;
    }
});
it("details success", async () => {
    const mockUrl = jest.fn().mockReturnValue("url1");
    expect(
        await Details({
            request: requestMock as any,
            Url: mockUrl as any,
        })("key1")("placeid1")).toEqual(res1);
});

it("details failure google answer", async () => {
    const mockUrl = jest.fn().mockReturnValue("url3");
    await expect(Details({
        request: requestMock as any,
        Url: mockUrl as any,
    })("key1")("placeid1")).rejects.toBeDefined();
});
