import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FTDApp from "./FTDApp.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <FTDApp />
        </BrowserRouter>
    </StrictMode>
);
