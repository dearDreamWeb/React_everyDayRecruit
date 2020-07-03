import React, { useReducer, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { decrypt } from "./rsa"; //rsa解密
import Home from "./view/home";
import Login from "./view/login";
import Register from "./view/register";
import BossInfo from "./view/bossInfo";
import DashenInfo from "./view/dashenInfo";
import Chat from "./view/chat";
import { reducer, ContextData, initData } from "./useReducer"
import socket from "./socketIo_client"; //引入socket
import axios from "axios";

function App() {
  const [state, dispatch] = useReducer(reducer, initData);
  const userInfo = JSON.parse(decrypt(window.localStorage.getItem("userInfo")));

  useEffect(() => {
    receiveMsg();
    // 如果用户存在就获取用户的数据
    userInfo && initUserChatList();
  }, [])

  // 接收socket发过来的消息
  const receiveMsg = () => {
    socket.emit("init", userInfo.userId)

    //接收消息时，向useReducer更新值
    socket.on("message", data => {
      let newData = JSON.parse(data);
      // 向useReducer存值
      dispatch({ type: "addChatList", newChat: newData })
    })
  }

  // 如果用户存在就获取用户所有的聊天列表
  const initUserChatList = () => {
    axios({
      method: "get",
      url: "/api/getChatList",
      params: {
        userId: userInfo.userId
      }
    }).then(res => {
      if (res.data.status === 0) {
        // 把用户列表userList和聊天列表chatList给useReducer
        dispatch({ type: "initData", userList: res.data.userList, chatList: res.data.chatList });
      }
    }).catch(err => console.log(err))
  }


  // 判断用户是否登录，登录就显示Home组件，没登录就回到登录界面登录
  return (
    <ContextData.Provider value={{
      state,
      dispatch // 把 dispatch 也作为 context 的一部分共享下去，从而在嵌套组件中调用以实现更新顶层的 state
    }}>
      <div className="app">
        <BrowserRouter>
          <Switch>

            <Route path="/user" render={() => {
              const localStorage_userInfo = userInfo;
              return (< Home localStorage_userInfo={localStorage_userInfo} />)
            }} />

            {/* 判断是否自动登录，不是返回登录界面，是的话重定向到/user */}
            <Route exact path="/" render={() => {
              const localStorage_userInfo = userInfo;
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

            {/* 聊天界面 */}
            <Route exact path="/chat/:userId" component={Chat} />
          </Switch>
        </BrowserRouter>
      </div>
    </ContextData.Provider>

  );
}

export default App;
