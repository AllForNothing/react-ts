import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GlobalModel, IGlobalModel } from "../providers/GlobalProvider";

// 进入任何需要登录的路由前， 判断
function RequireAuth () {
    const model: IGlobalModel = React.useContext(GlobalModel);
    const [auth, setAuth] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (model.currenUser) {
            setAuth(true);
        } else {
            model.getCurrentUser().then(r => {
                if(r) {
                    setAuth(true);
                }
            }).catch(
                err => {
                    // 当err 存在时 说明请求出错， 不存在则是GlobalProvider 中的loadingCurrentUser 为true
                    if (err) {
                        setAuth(false);
                        navigate('/login',{
                            replace:  false,
                            state: {
                                from: location
                            }
                        })
                    }
                }
            );
        }
    }, [location,model,navigate])
   return auth?<Outlet/>:null;
}

export default RequireAuth
