import details from "./details";
import nearby from "./nearby";
import photo from "./photo";
export { ILocation as IPlaceDetails, IPhoto, IReview } from "./details";
export { ILocation as IPlaceNearby } from "./nearby";
export default (key: string) => ({
    details: details(key),
    photo: photo(key),
    nearby: nearby(key),
});
