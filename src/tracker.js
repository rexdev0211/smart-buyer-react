import ReactGA from "react-ga";

const id = process.env.REACT_APP_GA_TRACKING_ID;

export function initialize() {
  if (id) {
    ReactGA.initialize(id);
  }
}

export function pageview(page) {
  if (id) {
    ReactGA.pageview(page);
  }
}

export function event(opts) {
  if (id) {
    ReactGA.event(opts);
  }
}