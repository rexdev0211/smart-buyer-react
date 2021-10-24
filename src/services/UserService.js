import Keycloak from 'keycloak-js';
import Cookies from 'js-cookie';
import { setAccessToken } from '../@utils/storageProvider';
import { ApiService } from './ApiService';

const keycloak = new Keycloak({
    "realm": "tyk",
    "url": `${process.env.REACT_APP_BASE_URL}/auth/`,
    "clientId": "tyk-client",
    "ssl-required": "none"
});

const initKeycloak = (onAuthenticationCallback) => {
    console.log('initKeycloak');
    // TODO: this is a temporary hack, the keycloak by default should not be initialized
    if (process.env.REACT_APP_WITHOUT_KEYCLOAK) {
        ApiService.setProductsClient(false, 'main');
        onAuthenticationCallback();
    } else {
        console.log('keycloak1');
        keycloak.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
            pkceMethod: 'S256',
            messageReceiveTimeout: 15000
        })
        .then(authenticated => {
            console.log('authenticate: ', authenticated);
            if(authenticated) {
                setAccessToken(getToken(), { path: '/' });
                ApiService.setProductsClient(true, 'main');
                onAuthenticationCallback();
            } else {
                // message or anything if user is not authenticated
                ApiService.setProductsClient(false, 'main');
                onAuthenticationCallback();
            }
        })
        .catch(() => ApiService.setProductsClient(false, 'main'))
    }
}

const doLogin = keycloak.login;

const doLogout = keycloak.logout;

const getToken = () => keycloak.token;

const doSignOut = () => {
   doLogout();
   Cookies.remove("access_token");
   ApiService.setProductsClient(false, 'main');
}

const isLoggedIn = () => {
    if (keycloak.token) {
        keycloak.updateToken(5);
        return keycloak.token;
    } else {
        return false;
    }
}

const getUserName = () => keycloak.tokenParsed?.preferred_username;

export const UserService = {
    initKeycloak,
    doLogin,
    doLogout,
    getToken,
    getUserName,
    doSignOut,
    isLoggedIn
}