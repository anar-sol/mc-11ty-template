import fetch from "../src/utils/fetch.js";

export default async function () {
    const apiUrl = process.env.API_URL;

    const posts = [];
    let page = 1;
    let hasNext = true;
    while (hasNext) {
        const result = await fetch(`${apiUrl}/api/posts?page=${page}`);
        if (result.docs != null) {
            posts.push(...result.docs);
        }
        page = result.nextPage;
        hasNext = result.hasNextPage;
    }
    return posts;
};
