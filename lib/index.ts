import details from "./details";
import nearby from "./nearby";
import photo from "./photo";
export default (key: string) => ({
    details: details(key),
    photo: photo(key),
    nearby: nearby(key),
});
