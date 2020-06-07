import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { decrypt } from "./rsa"; //rsa解密
import Home from "./view/home";
import Login from "./view/login";
import Register from "./view/register";
import BossInfo from "./view/bossInfo";
import DashenInfo from "./view/dashenInfo";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => {
            // 判断用户是否登录，登录就显示Home组件，没登录就回到登录界面登录
            const userInfo = JSON.parse(decrypt(window.localStorage.getItem("userInfo")));
            const isLogin = parseInt(window.localStorage.getItem("isLogin"));
            return (isLogin && userInfo)
              ? < Home userInfo={userInfo} />
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
