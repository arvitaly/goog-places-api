import { readFileSync } from "fs";
import Api from "./lib/index";
const key = readFileSync(__dirname + "/key.txt").toString();
const api = Api(key);
async function start() {
    for await (const loc of api.nearby("55.7494733,37.3523209", 50000, {
        keyword: "памятник",
    })) {
        const location = await api.details(loc.place_id);
        // tslint:disable-next-line:no-console
        console.log(location.name);
        const buf = await api.photo(location.photos[0].photo_reference);
        require("fs").writeFileSync(__dirname + "/1.jpg", buf);
        break;
    }
}
start();
