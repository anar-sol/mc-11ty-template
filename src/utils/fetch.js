import fetch from "@11ty/eleventy-fetch";

export default async function (url) {
    const apiKey = process.env.API_KEY;

    const result = await fetch(url, {
        duration: "30s",
        type: "json",
        fetchOptions: {
            headers: {
                "Authorization": `users API-Key ${apiKey}`,
                "Content-Type": "application/json"
            },
        },
    });
    return result;
};
