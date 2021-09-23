import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// using ScrollToTop makes the window scroll to the top on every navigation
// this fixes the issue where the page stays scrolled down when navigating
// https://reacttraining.com/react-router/web/guides/scroll-restoration/scroll-to-top

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
