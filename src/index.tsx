import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './css/bootstrap.min.css'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { serviceOptions } from "./generatedApis";
import { axiosInstance } from "./services/http.service";
import GlobalProvider from "./services/providers/GlobalProvider";
import MyRouter, { history } from "./services/router/MyRouter";
import 'antd/dist/antd.min.css';

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
// 初始化生成的API 中的axios 实例
serviceOptions.axios = axiosInstance;
root.render(
    <React.StrictMode>
        <GlobalProvider>
            <MyRouter history={history}>
                <App/>
            </MyRouter>
        </GlobalProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
