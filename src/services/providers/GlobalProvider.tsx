import React, { useState } from "react";
import { UserResp, UserService } from "../../generatedApis";

export interface IGlobalModel {
    currenUser: UserResp | undefined;
    getCurrentUser: () => Promise<UserResp>;
}



export const GlobalModel = React.createContext<IGlobalModel>(null!)


interface IGlobalProviderProps {
    children: React.ReactNode
}
// 定义一个全局的当前用户
const GlobalProvider: React.FunctionComponent<IGlobalProviderProps> = (props) => {
    const [currenUser, setCurrenUser] = useState<UserResp>();
    let loadingCurrentUser: boolean = false;// 防止重复的getCurrentUser 的请求
    const getCurrentUser = (): Promise<UserResp> => {
       if (loadingCurrentUser) {
           return Promise.reject(null);
       } else {
           loadingCurrentUser = true;
           return  UserService.getCurrentUserInfo().then(res => {
               setCurrenUser(res);
               loadingCurrentUser = false;
               return res;
           }).catch(err => {
               loadingCurrentUser = false;
               setCurrenUser(undefined);
               return Promise.reject(err);
           })
       }
    }
    return <GlobalModel.Provider value={
        {currenUser, getCurrentUser}
    }>{props.children}</GlobalModel.Provider>
}

export default GlobalProvider
