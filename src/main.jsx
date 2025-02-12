import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import "./custom.scss";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
