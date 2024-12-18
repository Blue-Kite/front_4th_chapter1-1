import render from "../core/render";
import isLogin from "../utils/isLogin";
import handleProfile from "../pages/handleProfile";

import NotFoundPage from "../pages/NotFoundPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HASH_ROUTES from "./hashRoutes";

const makeComponent = (path) => {
  const header = path === "#/" || path === "#/profile" ? Header() : "";
  const footer = path === "#/" || path === "#/profile" ? Footer() : "";
  const component = HASH_ROUTES[path] || NotFoundPage();
  return header + component + footer;
};

const hashRouter = (path) => {
  path = path || window.location.hash;

  if (path === "#/profile") {
    if (!isLogin()) {
      window.history.pushState({}, "", "#/login");
      const component = makeComponent("#/login");
      render(component);
      return;
    }
  }

  if (path === "#/login" && isLogin()) {
    window.history.pushState({}, "", "#/");
    const component = makeComponent("#/");
    render(component);
    return;
  }

  window.history.pushState({}, "", path);
  const component = makeComponent(path);
  render(component);
  handleProfile();
};

export default hashRouter;
