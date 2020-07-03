import React, { useState, useEffect, useRef, useContext } from "react";
import DiyHeader from "../../component/header";     // 头部标题组件
import { Icon, InputItem, Toast, List } from "antd-mobile";
import "./index.scss";
import axios from "axios";
import socket from "../../socketIo_client/index"; //引入socket
import moment from 'moment'; //日期格式整理工具
import "animate.css";
import { ContextData } from "../../useReducer";


const Chat = props => {
    const { state, dispatch } = useContext(ContextData);
    const [chatList, setChatList] = useState([]); // 聊天信息列表
    const [title, setTitle] = useState(""); // 头部显示聊天的用户名
    const [chatContent, setChatContent] = useState(""); // 输入消息框里的内容
    const [self_userInfo, setSelfUserInfo] = useState({}); // 登录的本用户的信息
    const [self_avatar, setSelfAvatar] = useState(""); // 本用户的头像地址
    const [isShowEmojis, setIsShowEmojis] = useState(false); // 是否显示表情
    const chat_userId = props.location.state.userInfo.userId; //聊天对象的id
    const chat_userInfo = props.location.state.userInfo;    //聊天对象的信息
    const chat_avatar = require(`../../assets/images/avatar/${chat_userInfo.avatar}.png`);//聊天对象的头像地址
    // 表情
    const emojis = [
        "😀", "😄", "😁", "😆", "😅", "🤣", "😂", "🙃",
        "😉", "😇", "🥰", "😍", "😜", "🤪", "😝", "🤑",
        "🤐", "🙄", "🤫", "😷", "😴", "🤮", "🥵", "😵"]

    // 设置ref
    const sendMsgRef = useRef();
    const listsRef = useRef();


    // 页面加载完成
    useEffect(() => {
        getChatData();
    }, [])

    useEffect(() => {
        socketInit();
    }, [state])

    useEffect(() => {
        updateRead();
    }, [self_userInfo])

    useEffect(() => {
        // 滚动条滚到底部
        document.scrollingElement.scrollTop = listsRef.current.offsetHeight;
    })


    useEffect(() => {
        // 当切换显示和隐藏表情的时候，将消息列表的padding-bottom值变大，并将滚动条到底部
        listsRef.current.style.paddingBottom = sendMsgRef.current.offsetHeight + "px";
        // 滚动条滚到底部
        document.scrollingElement.scrollTop = listsRef.current.offsetHeight + sendMsgRef.current.offsetHeight;
    }, [isShowEmojis])

    // 获取用户聊天信息
    const getChatData = () => {

        setTitle(chat_userInfo.userName);
        axios({
            method: "get",
            url: "/api/chat_init",
            params: {
                userId: chat_userId
            }
        }).then(res => {
            if (res.data.status === 0) {
                // setChatList(res.data.chat_data);
                setSelfUserInfo(res.data.self_userInfo);
                setSelfAvatar(require(`../../assets/images/avatar/${res.data.self_userInfo.avatar}.png`))
            } else {
                // 用户未登录，返回登录页面
                Toast.fail(res.data.message, 3, () => props.history.push("/login"));
            }
        }).catch(err => console.log(err));
    }

    // 发送消息
    const sendMsg = () => {
        setChatContent(""); //清空输入框
        if (chatContent.trim() !== "") {
            // 要发送的数据
            const sendData = {
                from: self_userInfo.userId,
                to: chat_userId,
                chat_content: chatContent
            }

            // 向服务器发送数据
            socket.emit("message", JSON.stringify(sendData));
        } else {
            Toast.info("发送的内容不能为空");
        }
    }

    // socketIo接收消息
    const socketInit = () => {
        let arr = state.chatList.filter(item => {
            return (item.from === self_userInfo.userId && item.to === chat_userId)
                || (item.to === self_userInfo.userId && item.from === chat_userId)
        })
        setChatList(arr.reverse());

        // socket.on("message", data => {
        //     let newData = JSON.parse(data);
        //     setChatList([...chatList, newData]);
        // });
    }


    // 切换隐藏或显示表情
    const showEmojis = () => {
        setIsShowEmojis(!isShowEmojis);
    }

    // 更新未读信息，已进入聊天界面，将于此用户的聊天信息更新为已读
    const updateRead = () => {
        axios({
            method: "get",
            url: "/api/updateRead",
            params: {
                userId: chat_userId
            }
        }).then(res => {
            // 更新useReducer中的chatList列表中的对应聊天的信息
            if (res.data.status === 0) {
                let newChatList = state.chatList;
                newChatList.forEach(item => {
                    if (item.from === chat_userId && item.to === self_userInfo.userId) {
                        item.read = 1;
                    }
                })
                dispatch({ type: "updateChatList", data: newChatList })
            }
        }).catch(err => console.log(err));
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
        <main className="lists" ref={listsRef}>
            <List>
                {chatList.map((item, index) => {
                    return (
                        <List.Item key={index}>
                            {/* 设置动画 */}
                            <div

                            >
                                {/* 消息时间 */}
                                <p className="chat_time">{moment(new Date(item.created_time)).format('YYYY-MM-DD HH:mm:ss')}</p>

                                {/* 判断消息是否是本人，是本人就给chat_right的class名，让消息靠右 */}
                                <div className={item.from === self_userInfo.userId ? "chat_right" : "chat_left"}>
                                    <img
                                        className="avatar"
                                        src={item.from === self_userInfo.userId ? self_avatar : chat_avatar}
                                        alt="头像"
                                    />
                                    <span className="chat_content">{item.chat_content}</span>
                                </div>
                            </div>
                        </List.Item>
                    )
                })}

            </List>
        </main>

        {/* 底部发送消息 */}
        <footer className="sendMsg" ref={sendMsgRef}>
            <InputItem
                placeholder="请输入"
                maxLength={100}
                extra={
                    <span>
                        <span className="emoji" onClick={() => showEmojis()}>😀</span>
                        <span onClick={() => sendMsg()}>发送</span>
                    </span>
                }
                value={chatContent}
                onChange={value => setChatContent(value)}
                onFocus={() => setIsShowEmojis(false)}
            />

            {/* 是否显示表情 */}
            {isShowEmojis ? (<div className="emojis_wrap">
                {emojis.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="emojis_item"
                            onClick={() => setChatContent(chatContent + item)}
                        >{item}</div>
                    )
                })}
            </div>) : null}
        </footer>
    </div>)
}

export default Chat;