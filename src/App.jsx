import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./App.scss";
import LangContextProvider from "./contexts/LangContext/LangContextProvider";

function App() {
    return (
        <LangContextProvider>
            <RouterProvider router={router} />
        </LangContextProvider>
    );
}

export default App;
