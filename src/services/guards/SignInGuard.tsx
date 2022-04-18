import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GlobalModel, IGlobalModel } from "../providers/GlobalProvider";

// 当路由到登录页时，如果用户已经登录， 则么有必要重复登录
function SignInGuard () {
    const model: IGlobalModel = React.useContext(GlobalModel);
    const [auth, setAuth] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 如果用户已经登录， 则没有必要再登录， 直接跳转相应页面
        if (model.currenUser) {
            setAuth(true);
            if (!(location.state as any)?.from?.pathname || (location.state as any)?.from?.pathname === '/login') {
                navigate('/', {
                    replace: true
                })
            } else {
                navigate((location.state as any).from.pathname);
            }
        } else {
            model.getCurrentUser().then(r => {
                if(r) {
                    setAuth(true);
                    if (!(location.state as any)?.from?.pathname || (location.state as any)?.from?.pathname === '/login') {
                        navigate('/', {
                            replace: true
                        })
                    } else {
                        navigate((location.state as any).from.pathname);
                    }
                }
            }).catch(
                err => {// 说明没登录， 则什么都不做
                    setAuth(true);
                }
            );
        }
    }, [location,model,navigate])
   return auth?<Outlet/>:null;
}

export default SignInGuard
