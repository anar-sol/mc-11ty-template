import fs from "fs/promises";
import { existsSync } from "fs";
import fetch from "./fetch.js";

async function getCategories(lang) {
    const apiUrl = process.env.API_URL;

    const categories = [];
    let page = 1;
    let hasNext = true;
    while (hasNext) {
        const result = await fetch(`${apiUrl}/api/categories?locale=${lang}&page=${page}`);
        if (result.docs != null) {
            categories.push(...result.docs);
        }
        page = result.nextPage;
        hasNext = result.hasNextPage;
    }

    return categories;
}

export default function ({ dir, runMode }, languages) {
        languages.forEach(async lang => {
            const categories = await getCategories(lang);
            categories.forEach(async category => {
            const templatePath = `${dir.input}/${lang}/${category.slug}.njk`;
            const template = `---\nlayout: base.njk\npagination:\n    data: posts.${lang}.${category.slug}\n    size: 10\n    alias: posts\n    generatePageOnEmptyData: true\n---
    {% include "components/feed.njk" %}`;

            if (existsSync(templatePath) && runMode !== "build") return;

            let templateFile;
            try {
                templateFile = await fs.open(templatePath, "w");
                await templateFile.writeFile(template);
            } finally {
                templateFile?.close();
            }
        });
    });
};
