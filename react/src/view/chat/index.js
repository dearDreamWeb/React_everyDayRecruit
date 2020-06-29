import React, { useState, useEffect } from "react";
import DiyHeader from "../../component/header";     // 头部标题组件
import { Icon, InputItem, Toast, List } from "antd-mobile";
import "./index.scss";
import axios from "axios";
import socket from "../../socketIo_client/index";

const Chat = props => {
    const [title, setTitle] = useState(""); // 头部显示聊天的用户名
    const [chatContent, setChatContent] = useState(""); // 输入消息框里的内容
    const [self_userInfo, setSelfUserInfo] = useState({}); // 登录的本用户的信息
    const chat_userInfo = props.location.state.userInfo;    //聊天对象的信息


    useEffect(() => {
        getChatData();
        setTitle(chat_userInfo.userName);
    }, [])

    // 获取用户聊天信息
    const getChatData = () => {
        axios({
            method: "get",
            url: "/api/chat_init",
            params: {
                userId: props.location.state.userInfo.userId
            }
        }).then(res => {
            if (res.data.status === 0) {
                console.log(res.data);
                setSelfUserInfo(res.data.self_userInfo)
            } else {
                // 用户未登录，返回登录页面
                Toast.fail(res.data.message, 3, () => props.history.push("/login"));
            }
        }).catch(err => console.log(err));
    }

    // 发送消息
    const sendMsg = () => {

        // 要发送的数据
        const sendData = {
            from: self_userInfo.userId,
            to: chat_userInfo.userId,
            content: chatContent
        }
        // console.log(chatContent);
        socket.on("message", data => console.log(data));
        
        // 向服务器发送数据
        socket.emit("message", JSON.stringify(sendData));
    }

    return (<div className="chat">

        {/* 返回按钮 */}
        <Icon
            className="back_icon"
            type="left"
            size="lg"
            color="#fff"
            onClick={() => props.history.goBack()}
        />

        {/* 头部标题 */}
        <DiyHeader title={title} isFixed={true} />

        {/* 聊天消息 */}
        <main className="lists">
            <List>
                <List.Item>
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="头像" />
                    <span className="chat_content">aaa</span>
                </List.Item>
            </List>
        </main>

        {/* 底部发送消息 */}
        <footer className="sendMsg">
            <InputItem
                placeholder="请输入"
                maxLength={100}
                extra={"发送"}
                value={chatContent}
                onChange={value => setChatContent(value)}
                onExtraClick={() => sendMsg()}
            />
        </footer>
    </div>)
}

export default Chat;