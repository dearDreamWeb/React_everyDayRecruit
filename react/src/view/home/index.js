import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import DiyHeader from "../../component/header";
import axios from "axios";

const Home = props => {
    const [userType, setUserType] = useState(null); //用户类型
    const [title, setTitle] = useState("");
    const navListData = [{
        path: "/dashen_list",
        title: "大神列表",
        text: "大神",
        icon: "dashen"
    },
    {
        path: "/boss_list",
        title: "老板列表",
        text: "老板",
        icon: "laoban"
    },
    {
        path: "/message",
        title: "消息列表",
        text: "消息",
        icon: "message"
    },
    {
        path: "/personal",
        title: "用户中心",
        text: "个人",
        icon: "personal"
    }]
    useEffect(() => {
        initUserData();
    }, [])

    /**
     * 初始化用户数据
     */
    const initUserData = () => {
        setUserType(props.userInfo.userType);  //更新用户类型
        setTitle(displayTitle)                 // 更新标题
    }

    // 标题显示
    const displayTitle = () => {
        // 当前路径
        let pathname = props.location.pathname;
        // 当路径为"/"时，判断当前登录的用户类型是老板还是大神，是老板显示大神列表，是大神显示老板列表
        if (pathname === "/") {
            return userType === 1 ? "大神列表" : "老板列表";
        } else {
            // 过滤数据判断是否是当前路径，返回该数据的title
            let arr = navListData.filter(item => item.path === pathname);
            return arr[0].title;
        }
    }

    return (<div className="home">
        <DiyHeader title={title} />
    </div>)
}
export default withRouter(Home);