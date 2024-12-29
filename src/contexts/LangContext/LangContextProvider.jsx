import React, { useState } from "react";
import LangContext from "./LangContext";

export default function LangContextProvider({ children }) {
    const [language, setLanguage] = useState("GEO");
    return <LangContext.Provider value={{ language, setLanguage }}>{children}</LangContext.Provider>;
}
