import Cookies from 'js-cookie';
import i18n from './../i18n';

export const getPathLanguage = () => {
  const pathArr = window.location.pathname.split('/');
  const pathLang = pathArr[1];
  return ['en', 'es', 'uk'].includes(pathLang) ? pathLang : null;
};

export const setPathLanguage = (lang) => {
  const pathArr = window.location.pathname.split('/');
  const pathLang = pathArr[1];
  if (!['en', 'es', 'uk'].includes(pathLang)) {
    window.location.pathname = `/${lang}${window.location.pathname}`;
  } else if (pathArr[1] !== lang) {
    pathArr[1] = lang;
    window.location.pathname = `${pathArr.join('/')}`;
  }
};

export const changeLanguage = (lang) => {
  Cookies.set('language', lang, { path: '/' });
  i18n.changeLanguage(lang);
  setPathLanguage(lang);
};
