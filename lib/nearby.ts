import { stringify } from "querystring";
import { IPhoto } from "./details";
import PlaceType from "./PlaceType";
import { json } from "./request";
(Symbol as any).asyncIterator = Symbol.asyncIterator || Symbol.for("Symbol.asyncIterator");
export const URL = (params: any) =>
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` + stringify(params);
export const Nearby = ({
    request = json,
    Url = URL,
}) => (key: string) => async function* (location: string, radius: number, params: IParams):
        AsyncIterableIterator<ILocation> {
        const realParams = {
            location,
            key,
            radius,
            ...params,
        };
        do {
            const url = Url(realParams);
            const data: IData = await request(url);
            if (data.status !== "OK") {
                throw new Error("Invalid request, status " + data.status + ": " + StatusDescriptions[data.status]);
            }
            for (const loc of data.results) {
                yield loc;
            }
            realParams.pagetoken = data.next_page_token;
        } while (!!realParams.pagetoken);
    };
export default Nearby({});
export interface IParams {
    keyword?: string;
    language?: string;
    minprice?: number;
    maxprice?: number;
    opennow?: boolean;
    rankby?: "prominence" | "distance";
    type?: PlaceType;
    pagetoken?: string;
}
export interface IData {
    status: Status;
    results: ILocation[];
    next_page_token?: string;
}
export interface ILocation {
    icon: string;
    id: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
        viewport: {
            northeast: {
                lat: number;
                lng: number;
            };
            southwest: {
                lat: number;
                lng: number;
            };
        }
    };
    name: string;
    opening_hours: {
        open_now: boolean;
    };
    photos: IPhoto[];
    place_id: string;
    scope: string;
    alt_ids: Array<{
        place_id: string;
        scope: string;
    }>;
    price_level: 0 | 1 | 2 | 3 | 4;
    rating: number;
    types: PlaceType[];
    vicinity: string;
    formatted_address: string;
    permanently_closed: boolean;
}
export const StatusDescriptions: any = {
    OK: "Ошибок нет, место обнаружено, и получен хотя бы один результат.",
    ZERO_RESULTS: "Поиск выполнен, результатов не найдено." +
    " Такое может произойти, если для поиска установлены координаты latlng отдаленного места.",
    OVER_QUERY_LIMIT: "Превышена квота.",
    REQUEST_DENIED:
    "Означает, что запрос отклонен, как правило, из-за отсутствия или неверного значения параметра key.",
    INVALID_REQUEST: "Как правило, отсутствует обязательный параметр запроса (location или radius).",
};
export enum Status {
    OK = "OK",
    ZERO_RESULTS = "ZERO_RESULTS",
    OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
    REQUEST_DENIED = "REQUEST_DENIED",
    INVALID_REQUEST = "INVALID_REQUEST",
}
