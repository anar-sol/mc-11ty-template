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

    const categories = [];
    page = 1;
    hasNext = true;
    while (hasNext) {
        const result = await fetch(`${apiUrl}/api/categories?page=${page}`);
        if (result.docs != null) {
            categories.push(...result.docs);
        }
        page = result.nextPage;
        hasNext = result.hasNextPage;
    }

    const content = {
        all: posts,
        categories: categories,
    };

    categories.forEach(category => {
        content[category.slug] = posts.filter(post => post.category.id === category.id);
    });

    return content;
};
