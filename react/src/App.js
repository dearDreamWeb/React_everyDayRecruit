import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { decrypt } from "./rsa"; //rsa解密
import Home from "./view/home";
import Login from "./view/login";
import Register from "./view/register";
import BossInfo from "./view/bossInfo";
import DashenInfo from "./view/dashenInfo";
import Chat from "./view/chat";

function App() {
  // 判断用户是否登录，登录就显示Home组件，没登录就回到登录界面登录


  return (
    <div className="app">
      <BrowserRouter>
        <Switch>

          <Route path="/user" render={() => {
            const localStorage_userInfo = JSON.parse(decrypt(window.localStorage.getItem("userInfo")));
            return (< Home localStorage_userInfo={localStorage_userInfo} />)
          }} />

          {/* 判断是否自动登录，不是返回登录界面，是的话重定向到/user */}
          <Route exact path="/" render={() => {
            const localStorage_userInfo = JSON.parse(decrypt(window.localStorage.getItem("userInfo")));
            return localStorage_userInfo
              ? < Redirect to="/user" />
              : <Redirect to="/login" />
          }} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/boss_info" render={props => {
            // 判断是否是从注册页面跳转过来的并且userType是1
            return ((props.location.state && props.location.state.userType === "1")
              ? <BossInfo />
              : <Redirect to="/" />)
          }} />
          <Route exact path="/dashen_info" render={props => {
            // 判断是否是从注册页面跳转过来的并且userType是0
            return ((props.location.state && props.location.state.userType === "0")
              ? <DashenInfo />
              : <Redirect to="/" />)
          }} />
          <Route exact path="/chat/:userId" component={Chat} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
