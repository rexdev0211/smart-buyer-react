import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import TrackingRoute from "./components/TrackingRoute";

import {SearchContextProvider} from "./contexts/SearchContext";

const Home = lazy(() => import("./views/Home/Home"));
const SignUp = lazy(() => import("./views/Auth/SignUp/SignUp"));
const SignIn = lazy(() => import("./views/Auth/SignIn/SignIn"));
const LanguageSelector = lazy(() => import("./views/LanguageSelector/LanguageSelector"));
const ProductDetail = lazy(() => import("./views/ProductDetails/ProductDetails"));
const SearchProduct = lazy(() => import("./views/SearchProduct/SearchProduct"));

function RoutesContainer({ lang }) {

  return (
    <Router basename={lang}>
      <Suspense fallback={<div>Loading...</div>}>
        <TrackingRoute path='/login' component={SignIn}></TrackingRoute>
        <TrackingRoute path='/signup' component={SignUp}></TrackingRoute>
        <TrackingRoute path='/languages' component={LanguageSelector}></TrackingRoute>
        <TrackingRoute
          path='/products/:productUrl+'
          component={ProductDetail}
        ></TrackingRoute>
        <TrackingRoute path={['/', '']} exact component={Home}></TrackingRoute>
        <TrackingRoute
          path={[
            '/:pathValue+',
          ]}
          render={(params) =>
            <SearchContextProvider render={true}>
              <SearchProduct {...params} />
            </SearchContextProvider>
          }
          exact
        ></TrackingRoute>
      </Suspense>
    </Router>
  )
}

export default RoutesContainer;