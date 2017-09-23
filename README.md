# goog-places-api

Modern library for Google Places https://developers.google.com/places/?hl=ru

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# Install

    npm install goog-places-api --save

    or

    yarn add goog-places-api

# Usage

    import Api from "goog-places-api";

    const api = Api("key1");

    // Iterator for all places in area

    for await (const loc of api.nearby("55.7494733,37.3523209", 50000, {
        keyword: "restaurant",
    })) {

        // Get detail for current place

        const location = await api.details(loc.place_id);

        console.log(location.name);

        // Get first photo to buffer

        const buf = await api.photo(location.photos[0].photo_reference);

        // Write photo to file

        require("fs").writeFileSync(__dirname + "/1.jpg", buf);

        break;
    }

# Test

    npm install
    npm test

[npm-image]: https://badge.fury.io/js/goog-places-api.svg
[npm-url]: https://npmjs.org/package/goog-places-api
[travis-image]: https://travis-ci.org/arvitaly/goog-places-api.svg?branch=master
[travis-url]: https://travis-ci.org/arvitaly/goog-places-api
[daviddm-image]: https://david-dm.org/arvitaly/goog-places-api.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/arvitaly/goog-places-api
[coveralls-image]: https://coveralls.io/repos/arvitaly/goog-places-api/badge.svg
[coveralls-url]: https://coveralls.io/r/arvitaly/goog-places-api