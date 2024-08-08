import fetch from "../src/utils/fetch.js";

export default async function () {
    const apiUrl = process.env.API_URL;

    const settings = {};

    const general = await fetch(`${apiUrl}/api/globals/general`);
    const mainNavResult = await fetch(`${apiUrl}/api/globals/main-nav`);
    const secondaryNavResult = await fetch(`${apiUrl}/api/globals/secondary-nav`);
    const socialMediaResult = await fetch(`${apiUrl}/api/globals/social-media`);

    const mainNav = mainNavResult.items.map(item => item.navItem)
    const mainCta = mainNavResult.cta;
    const secondaryNav = secondaryNavResult.items.map(item => item.navItem);
    const socialMedia = socialMediaResult.items.map(item => item.navItem);

    settings.general = general;
    settings.general.apiUrl = apiUrl;
    settings.mainNav = mainNav;
    settings.mainCta = mainCta;
    settings.secondaryNav = secondaryNav;
    settings.socialMedia = socialMedia;

    return settings;
};
