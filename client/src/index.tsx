import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/layout/style.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./app/router/Routers";
import {Provider} from "react-redux";
import {store} from "./app/store/configureStore";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);


