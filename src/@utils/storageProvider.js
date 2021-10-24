import Cookies from 'js-cookie';

export const setAccessToken = (token) => {
  Cookies.set('access_token', token)
}