import Fetch from "node-fetch";
export const request = async (url: string, options?: RequestInit) => {
    const res = await Fetch(url, options);
    if (res.status !== 200) {
        throw new Error("Invalid request " + url + ", status " + res.status + ", " + res.statusText);
    }
    return res;
};

export const json = async (url: string, options?: RequestInit) => (await request(url, options)).json();
export const buffer = async (url: string, options?: RequestInit) => (await request(url, options)).buffer();
