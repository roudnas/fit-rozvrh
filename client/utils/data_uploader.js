/* eslint-disable */
const dotenv = require("dotenv");
const path = require("path");

(async () => {
    if (!process.argv[2] || !process.argv[3]) {
        return console.error("Missing arguments");
    }

    dotenv.config({ path: path.resolve(`${__dirname}/../.env`) });

    const nameInput = process.argv[2];
    const dataInput = (await import(process.argv[3], { assert: { type: "json" }})).default;
    const fetch = (await import("node-fetch")).default;

    const response = await fetch(`${process.env.VITE_API_BASE}/data/upload`, {
        method: "post",
        body: JSON.stringify({
            user: nameInput,
            timetable: dataInput
        }),
        headers: {'Content-Type': 'application/json'}
    });

    const data = await response.json();

    return console.log(data);
})()



