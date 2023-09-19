import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import WorkerProvider from "./workers/WorkerProvider.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { ConfigProvider } from "antd";
import { variables } from "./styles/variables.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: variables.primary,
          fontFamily: "ClashGrotest"
        },
      }}>
      <WorkerProvider >
        <App />
      </WorkerProvider>
    </ConfigProvider>

  </React.StrictMode>,
);
