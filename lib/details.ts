import { json } from "./request";

export const URL = (key: string, placeId: string) =>
    `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${key}`;
export const Details = ({
    request = json,
    Url = URL,
}) => (key: string) => async (
        placeId: string,
    ) => {
        const url = Url(key, placeId);
        const data: IData = await request(url);
        if (data.status !== "OK") {
            throw new Error("Invalid request, status " + data.status + ": " + StatusDescriptions[data.status]);
        }
        return data.result;
    };
export default Details({});
export interface IData {
    status: Status;
    result: ILocation;
}
export interface ILocation {
    address_components: Array<{
        long_name: string;
        short_name: string;
        types: string[];
    }>;
    formatted_address: string;
    formatted_phone_number: string;
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
    icon: string;
    id: string;
    international_phone_number: string;
    name: string;
    place_id: string;
    scope: string;
    alt_ids: Array<{
        place_id: string;
        scope: string;
    }>;
    rating: number;
    reference: string;
    reviews: IReview[];
    types: string[];
    url: string;
    vicinity: string;
    website: string;
    photos: IPhoto[];
    opening_hours: {
        open_now: boolean;
        periods: Array<{
            open: {
                day: number;
                time: string;
            };
        }>;
        weekday_text: string[];
    };
    utc_offset: number;
    permanently_closed: boolean;
    price_level: 0 | 1 | 2 | 3 | 4;
}
export interface IPhoto {
    width: number;
    height: number;
    html_attributions: string[];
    photo_reference: string;
}
export interface IReview {
    aspects: Array<{
        rating: number;
        type: string;
    }>;
    author_name: string;
    author_url: string;
    language: string;
    rating: number;
    text: string;
    time: number;
    profile_photo_url: string;
}
export const StatusDescriptions: any = {
    OK: "Ошибок нет, место обнаружено, и получен хотя бы один результат.",
    UNKNOWN_ERROR: "Ошибка на стороне сервера.Повторная попытка может быть успешной.",
    ZERO_RESULTS: "Ссылка более не указывает на корректный результат. " +
    "Такое может произойти, если организация прекратила свое существование.",
    OVER_QUERY_LIMIT: "Превышена квота.",
    REQUEST_DENIED:
    "Означает, что запрос отклонен, как правило, из-за отсутствия или неверного значения параметра key.",
    INVALID_REQUEST: "Обычно означает отсутствие запроса (reference).",
    NOT_FOUND: "Указанное место отсутствует в базе данных Google Places.",
};
export enum Status {
    OK = "OK",
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    ZERO_RESULTS = "ZERO_RESULTS",
    OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
    REQUEST_DENIED = "REQUEST_DENIED",
    INVALID_REQUEST = "INVALID_REQUEST",
    NOT_FOUND = "NOT_FOUND",
}
