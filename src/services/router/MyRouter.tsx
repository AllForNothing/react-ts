import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { Router } from "react-router-dom";

import { BrowserHistory, createBrowserHistory } from "history";

export const history: BrowserHistory = createBrowserHistory();


const CustomRouter: React.FunctionComponent<any> = ({ history, ...props }) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    return (
        <Router
            {...props}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        />
    );
};

export default CustomRouter;
