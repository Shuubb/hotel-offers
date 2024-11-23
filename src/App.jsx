import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./App.scss";

function App() {
    const [zoomLevel, setZoomLevel] = useState(window.devicePixelRatio);

    useEffect(() => {
        const handleZoom = () => {
            const newZoomLevel = window.devicePixelRatio;
            if (newZoomLevel !== zoomLevel) {
                console.log(`Zoom level changed: ${newZoomLevel}`);
                setZoomLevel(newZoomLevel);
            }
        };

        // Attach resize event listener
        window.addEventListener("resize", handleZoom);

        // Cleanup event listener on unmount
        return () => window.removeEventListener("resize", handleZoom);
    }, [zoomLevel]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
