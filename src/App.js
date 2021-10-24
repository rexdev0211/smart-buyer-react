import React, { useEffect, useContext, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RoutesContainer from './router';
import AppProvider from "./contexts/AppContext";
import Cookies from 'js-cookie';
import { getPathLanguage, changeLanguage } from './@utils/languageHelper';
import "./App.css";
import "./i18n";
import { SearchContextProvider } from "./contexts/SearchContext";
import { SearchBarProvider } from "./contexts/SearchBarContext";
import { ViewportProviderContext } from "./contexts/ViewportProvider";

function App() {
  const { viewportSize } = useContext(ViewportProviderContext);

  const mobileClass = viewportSize === "mobile" ? "App--mobile" : "";

  useEffect(() => {
    let curLang = getPathLanguage() || Cookies.get('language') || navigator.language.substring(0, 2);
    if (!['en', 'es', 'uk'].includes(curLang)) {
      changeLanguage("en");
    }
    else {
      changeLanguage(curLang);
    }
  }, []);

  return (
    <div className={`App ${mobileClass}`}>
      <Suspense fallback="loading">
        <AppProvider>
          <SearchContextProvider render={false}>
            <SearchBarProvider>
              <Router>
                <Switch>
                  <Route exact path='/en'><RoutesContainer lang="/en"/></Route>
                  <Route exact path='/en/*'><RoutesContainer lang="/en"/></Route>
                  <Route exact path='/es'><RoutesContainer lang="/es"/></Route>
                  <Route exact path='/es/*'><RoutesContainer lang="/es"/></Route>
                  <Route exact path='/uk'><RoutesContainer lang="/uk"/></Route>
                  <Route exact path='/uk/*'><RoutesContainer lang="/uk"/></Route>
                  <Route path='/'><RoutesContainer lang="/"/></Route>
                </Switch>
              </Router>
            </SearchBarProvider>
          </SearchContextProvider>
        </AppProvider>
      </Suspense>
    </div>
  );
}

export default App;
