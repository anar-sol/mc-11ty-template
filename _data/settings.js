import fetch from "../src/utils/fetch.js";

export default async function () {
    const apiUrl = process.env.API_URL;    

    const settings = {
        en: {},
        fr: {},
        apiUrl: apiUrl,
    };

    const generalEN = await fetch(`${apiUrl}/api/globals/general?locale=en`);
    const generalFR = await fetch(`${apiUrl}/api/globals/general?locale=fr`);

    settings.en.general = generalEN;
    settings.fr.general = generalFR;

    settings.en.mainNav = [
        {
            label: "Home",
            url: "/en/",
        },
        {
            label: "Tutorials",
            url: "/en/tutorials/",
        },
        {
            label: "About us",
            url: "/en/about-us/",
        },
        {
            label: "Contact us",
            url: "/en/contact-us/",
        },
    ];

    settings.fr.mainNav = [
        {
            label: "Accueil",
            url: "/fr/",
        },
        {
            label: "Tutos",
            url: "/fr/tutoriels/",
        },
        {
            label: "À propos",
            url: "/fr/a-propos/",
        },
        {
            label: "Contact",
            url: "/fr/nous-contacter/",
        },
    ];

    settings.en.mainCta = {
        label: "Shop",
        url: "https://www.etsy.com/fr/shop/MimiCouturePatterns"
    };

    settings.fr.mainCta = {
        label: "Boutique",
        url: "https://www.etsy.com/fr/shop/MimiCouturePatterns"
    };

    settings.en.socialMedia = [
        {
            label: "Youtube",
            url:"https://www.youtube.com/@diysewingmimi", 
        },
    ];

    settings.fr.socialMedia = [
        {
            label: "Youtube",
            url:"https://www.youtube.com/@CoutureFacileMimi", 
        },
    ];

    settings.en.secondaryNav = [
        {
            label: "Home",
            url: "/en/",
        },
        {
            label: "Tutorials",
            url: "/en/tutorials/",
        },
        {
            label: "Shop",
            url: "https://www.etsy.com/fr/shop/MimiCouturePatterns"
        },
        {
            label: "About us",
            url: "/en/about-us/",
        },
        {
            label: "Contact us / FAQ",
            url: "/en/contact-us/",
        },
        {
            label: "Privacy",
            url: "/en/privacy/",
        },
        {
            label: "Terms and conditions",
            url: "/en/terms-and-conditions/",
        },
    ];

    settings.fr.secondaryNav = [
        {
            label: "Accueil",
            url: "/fr/",
        },
        {
            label: "Tutos",
            url: "/fr/tutoriels/",
        },
        {
            label: "Boutique",
            url: "https://www.etsy.com/fr/shop/MimiCouturePatterns"
        },
        {
            label: "À propos",
            url: "/fr/a-propos/",
        },
        {
            label: "Contact / FAQ",
            url: "/fr/nous-contacter/",
        },
        {
            label: "Confidentialité",
            url: "/fr/confidentialite/",
        },
        {
            label: "Conditions générales",
            url: "/fr/conditions-generales/",
        },
    ];

    return settings;
};
