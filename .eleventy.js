import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { EleventyI18nPlugin } from "@11ty/eleventy";
import i18n from "eleventy-plugin-i18n";
import generateCategories from "./src/utils/generateCategories.js";

function getHtmlFromTextNode(textNode) {
    const strong = (textNode?.format & 0x1) !== 0;
    const em = (textNode?.format & 0x2) !== 0;
    const code = (textNode?.format & 0x10) !== 0;
    const sub = (textNode?.format & 0x20) !== 0;
    const sup = (textNode?.format & 0x40) !== 0;

    let html = textNode?.text || "";

    if (strong) {
        html = `<strong>${html}</strong>`;
    }
    if (em) {
        html = `<em>${html}</em>`;
    }
    if (code) {
        html = `<code>${html}</code>`;
    }
    if (sub) {
        html = `<sub>${html}</sub>`;
    }
    if (sup) {
        html = `<sup>${html}</sup>`;
    }

    return html;
}

function getHtmlFromNode(node) {
    const children = node?.children || [];

    const apiUrl = process.env.API_URL;

    return children.map(childNode => {
        switch (childNode.type) {

            case "upload":
                return `
                    <figure>
                        <img src="${apiUrl}${childNode.value.url}" alt="${childNode.value.alt}" width="${childNode.value.width}" height="${childNode.value.height}" sizes="100w">
                        <figcaption>${childNode.value.caption || ""}</figcaption>
                    </figure>
                `;
            case "relationship":
                const url = new URL(childNode.value.url);
                return `
                    <figure>
                        <iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed${url.pathname}${url.search}"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        <figcaption>${childNode.value.caption}</figcaption>
                    </figure>
                `;
            case "paragraph":
                return `<p>${getHtmlFromNode(childNode)}</p>`;
            case "heading":
            case "list":
                return `<${childNode.tag}>${getHtmlFromNode(childNode)}</${childNode.tag}>`;
            case "listitem":
                return `<li>${getHtmlFromNode(childNode)}</li>`;
            case "link":
                return `<a href="${childNode.fields.url}" target="${childNode.fields.newTab ? "_blank" : ""}">${getHtmlFromNode(childNode)}</a>`;
            case "text":
                return getHtmlFromTextNode(childNode);
        }
    }).join("");
}

function getHtmlFromLexicalJson(json) {
    return getHtmlFromNode(json?.root);
};

export default function (eleventyConfig) {
    eleventyConfig.addFilter("formattedDate", function (date) {
        return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    });

    eleventyConfig.addFilter("tohtml", function (content) {
        return getHtmlFromLexicalJson(content);
    });

    eleventyConfig.addPlugin(i18n, {
        translations: {
            "skip to main content": {
                en: "Skip to main content",
                fr: "Aller au contenu principal",
            },
            "home page": {
                en: "Home page",
                fr: "Page d'accueil",
            },
            "main menu": {
                en: "Main menu",
                fr: "Menu principal",
            },
            "close menu": {
                en: "Close menu",
                fr: "Fermer le menu",
            },
            "open menu": {
                en: "Open menu",
                fr: "Ouvrir le menu",
            },
            "follow us": {
                en: "Follow Us!",
                fr: "Suivez-nous!"
            },
            "all rights reserved": {
                en: "all rights reserved",
                fr: "tous droits réservés",
            },
            "read article": {
                en: "Read article",
                fr: "Lire l'article",
            },
            "next": {
                en: "next",
                fr: "suivants",
            },
            "previous": {
                en: "previous",
                fr: "précédents",
            },
            "get pattern": {
                en: "Get the Pattern!",
                fr: "Obtenir le Patron!"
            },
        },
        fallbackLocales: {
            '*': 'en'
        },
    });

    eleventyConfig.addPlugin(EleventyI18nPlugin, {
        defaultLanguage: "en",
    });

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        extensions: "html",
        formats: ["webp", "jpeg"],
        widths: ["300", "600", "900", "1200"],
        defaultAttributes: {
            loading: "lazy",
            decodind: "async",
        },
        urlPath: "/img/",
    });

    eleventyConfig.addShortcode("year", () => new Date().getFullYear());

    eleventyConfig.on("eleventy.before", (param) => generateCategories(param, ["en", "fr"]));

    eleventyConfig.addPassthroughCopy("_redirects");

    eleventyConfig.setUseGitIgnore(false);

    return {
        dir: {
            input: "content",
            layouts: "../src/_layouts",
            includes: "../src/_includes",
            data: "../_data",
            markdownTemplateEngine: "njk",
            htmlTemplateEngine: "njk",
            templateFormats: ["html", "md", "njk"],
        },
    };
};