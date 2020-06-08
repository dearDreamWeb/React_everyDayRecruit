import React, { useEffect, useState } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import DiyHeader from "../../component/header";
import NavFooter from "../../component/navFooter";
import Personal from "../../component/personal";
import PropTypes from "prop-types";
import axios from "axios";

const Home = props => {
    // props值校验
    Home.prototype = {
        localStorage_userInfo: PropTypes.object.isRequired
    }
    const [userInfo, setUserInfo] = useState(null);
    const [userType, setUserType] = useState(null); //用户类型
    const [title, setTitle] = useState("");
    const navListData = [{
        path: "/user/dashen_list",
        title: "大神列表",
        text: "大神",
        icon: "dashen",
        hidden: userType === 0 ? true : false
    },
    {
        path: "/user/boss_list",
        title: "老板列表",
        text: "老板",
        icon: "laoban",
        hidden: userType === 1 ? true : false
    },
    {
        path: "/user/message",
        title: "消息列表",
        text: "消息",
        icon: "message"
    },
    {
        path: "/user/personal",
        title: "用户中心",
        text: "个人",
        icon: "personal"
    }]
    useEffect(() => {
        initUserData();
    }, [])

    useEffect(() => {
        setTitle(displayTitle)                 // 更新标题
    })
    /**
     * 初始化用户数据
     */
    const initUserData = () => {
        setUserType(props.localStorage_userInfo.userType);  //更新用户类型
        setTitle(displayTitle)                 // 更新标题

        // 自动登录，若失败清空localStorage中的userInfo和isLogin
        axios({
            method: "post",
            url: "/api/auto_login",
            data: {
                userId: props.localStorage_userInfo.userId
            }
        }).then(res => {
            if (res.data.status === 0) {
                setUserInfo(res.data.userInfo);
            } else {
                window.localStorage.removeItem("userInfo");
                window.localStorage.removeItem("isLogin");
                props.history.push("/login");
            }
        }).catch(err => console.log(err));
    }

    // 标题显示
    const displayTitle = () => {
        // 当前路径
        let pathname = props.location.pathname;
        // 当路径为"/"时，判断当前登录的用户类型是老板还是大神，是老板显示大神列表，是大神显示老板列表
        if (pathname === "/user") {
            return userType === 1 ? "大神列表" : "老板列表";
        } else {
            // 过滤数据判断是否是当前路径，返回该数据的title
            let arr = navListData.filter(item => item.path === pathname);
            return arr[0].title;
        }
    }

    return (<div className="home">
        <DiyHeader title={title} />
        <Switch>
            <Route exact path="/user" render={() => <Redirect to={userType === 1 ? "/user/dashen_list" : "/user/boss_list"} />} />
            <Route exact path="/user/personal" component={Personal} />
        </Switch>
        <NavFooter navListData={navListData} userType={userType} />
    </div>)
}
export default withRouter(Home);