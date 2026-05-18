import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx';
import SearchPage from '../pages/SearchPage.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import ListPage from '../pages/ListPage.jsx';
import PropertyPage from '../pages/PropertyPage.jsx';
import Ratings from '../pages/Ratings.jsx';
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: SearchPage },
            { path: "login", Component: Login },
            { path: "register", Component: Register },
            { path: "list", Component: ListPage },
            { path: "property/:id", Component: PropertyPage },
            { path: "ratings", Component: Ratings },
            { path: "*", element: <Navigate to="/" replace/> },
        ],
    },
]);
export default router;