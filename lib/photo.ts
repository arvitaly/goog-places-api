import { buffer } from "./request";
export const URL = (key: string, photoreference: string, maxwidth: number, maxheight: number) =>
    `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoreference}&key=${key}` +
    "&maxwidth=" + maxwidth + "&maxheight=" + maxheight;
export const Photo = ({
    request = buffer,
    Url = URL,
}) => (key: string) => async (
        photoreference: string,
        maxwidth = 4000,
        maxheight = 4000,
    ) => {
        const url = Url(key, photoreference, maxwidth, maxheight);
        const res = await request(url);
        return res;
    };
export default Photo({});
