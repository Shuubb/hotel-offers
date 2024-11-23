import { useState, useEffect } from "react";

function FadeInComponent({ children }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 50); // Delay for smooth effect
    }, []);

    return <div className={`fade-in ${isVisible ? "fade-in-active" : ""}`}>{children}</div>;
}
