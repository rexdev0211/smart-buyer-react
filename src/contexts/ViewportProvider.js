import React, { createContext, useEffect, useState } from "react";

export const ViewportProviderContext = createContext();

const ViewportProvider = ({ children }) => {
    const mobileBreakpoint = 600;
    const tabletBreakpoint = 960;
    const calcViewportSize = () => {
        return window.innerWidth < mobileBreakpoint
            ? "mobile"
            : window.innerWidth < tabletBreakpoint
                ? "tablet" : "large";
    }

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [viewportSize, setViewportSize] = useState(calcViewportSize());

    useEffect(() => {
        const handleWindowResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            setViewportSize(calcViewportSize());
        };
        
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return (
        <ViewportProviderContext.Provider value={{ width, height, viewportSize }}>
            {children}
        </ViewportProviderContext.Provider>
    );
};

export default ViewportProvider;