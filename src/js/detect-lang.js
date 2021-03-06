const PATH_NAMES = {
    en: 'en',
    fr: ''
};
const FR_LANG = 'fr';
const EN_LANG = 'en';
const LANG_COOKIE = 'of-lang';

// Need to consider locationPath when in dev mode. In prod it will evaluate to empty string.
const locationPath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
const originUrl = `${location.origin}${locationPath}`;

const _redirectIfNecessary = (lang) => {
    const currentLang = location.pathname.indexOf(EN_LANG) !== -1 ? EN_LANG : FR_LANG;
    const newLang = PATH_NAMES[lang] !== undefined ? lang : EN_LANG;

    if(newLang !== currentLang) {
        location.replace(`${originUrl}/${PATH_NAMES[newLang]}`)
    }
};

const langCookie = Cookies.get(LANG_COOKIE);

if(langCookie) {
    _redirectIfNecessary(langCookie);
} else {
    let userLang = navigator.language || navigator.browserLanguage;
    if(userLang.indexOf(EN_LANG) !== -1) {
        userLang = EN_LANG;
    }
    _redirectIfNecessary(userLang);
}
