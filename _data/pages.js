import fetch from "../src/utils/fetch.js";

export default async function () {
    const apiUrl = process.env.API_URL;

    const pages = [];
    let page = 1;
    let hasNext = true;
    while (hasNext) {
        const result = await fetch(`${apiUrl}/api/pages?page=${page}`);
        if (result.docs != null) {
            pages.push(...result.docs);
        }
        page = result.nextPage;
        hasNext = result.hasNextPage;
    }

    return pages;
};
