import React, { useState, useContext, useEffect } from "react";
import { List, Badge } from "antd-mobile";
import PropTypes from "prop-types";
import { ContextData } from "../../useReducer";
import "./index.scss";
import moment from 'moment';

const ChatMessage = props => {
    const { state } = useContext(ContextData);
    const { userList, chatList } = state;
    const [lastChatList, setLastChatList] = useState([]);
    const userInfo = props.location.state.userInfo;


    // props值校验
    ChatMessage.prototype = {
        userInfo: PropTypes.object.isRequired
    }

    useEffect(() => {
        initLastChatList();
    }, [state])

    // 初始化用户列表
    /**
     * 1. 先将所有的消息列表chatList遍历
     * 2. 分好组，传到对象中
     * 3. 遍历分完组的obj，统计完未读数，将每组第一个添加到arr中
     * 4. 将去重得到的arr聊天列表，map遍历和userList列表中的数据作对比，找到对应的聊天用户的个人信息return合成
     */
    const initLastChatList = () => {
        let obj = {};
        let arr = [];
        chatList.forEach(item => {
            // 判断出聊天用户的userId，userInfo.userId是本人的userId
            let userId = item.from === userInfo.userId ? item.to : item.from;
            // 如果对象中有该用户id的信息，添加item，没有的话就初始化一下
            if (obj.hasOwnProperty(userId)) {
                obj[userId] = [...obj[userId], item];
            } else {
                obj[userId] = new Array(item)
            }
        })

        // 遍历分好组的obj，统计完未读数，将每组第一个添加到arr中 
        for (const key in obj) {
            // 记录个消息列表的未读数
            let unReadCount = 0
            // 遍历每个用户对的消息列表，记录未读数
            obj[key].forEach(item => {
                if (item.to === userInfo.userId && item.read === 0) unReadCount++;
            })
            obj[key][0].unReadCount = unReadCount
            arr.push(obj[key][0])
        }
        // 将去重得到的arr聊天列表，map遍历和userList列表中的数据作对比，找到对应的聊天用户的个人信息return合成
        arr = arr.map(item => {
            // 日期格式化一下
            item.created_time = moment(new Date(item.created_time)).format('YYYY-MM-DD HH:mm:ss');

            // 判断出聊天用户的userId，userInfo.userId是本人的userId
            let userId = item.from === userInfo.userId ? item.to : item.from;
            let userArr = userList.filter(item1 => {
                return item1.userId === userId;
            })
            return { ...userArr[0], ...item }
        })
        setLastChatList(arr);
    }

    return (
        <div className="chat_message">
            <List>
                {lastChatList.map((item, index) => {
                    return (
                        <List.Item
                            key={index}
                            arrow={"horizontal"}
                            onClick={() => {
                                const { userId, avatar, userName } = item;
                                props.history.push({ pathname: `/chat/${item.userId}`, state: { userInfo: { userId, avatar, userName } } })
                            }}
                        >
                            <div className="lastChat_wrap">
                                <img
                                    className="avatar"
                                    src={require(`../../assets/images/avatar/${item.avatar}.png`)}
                                    alt="头像"
                                />
                                <div className="main">
                                    <p className="content">
                                    {/* 当聊天内容长度超过10的时候，截取并加上... */}
                                        {
                                            item.chat_content.length > 7
                                                ? item.chat_content.slice(0, 7) + "..."
                                                : item.chat_content
                                        }
                                    </p>
                                    <p className="userName">{item.userName}</p>
                                </div>
                                <div className="time_badge">
                                    <p className="time">{item.created_time}</p>
                                    <Badge text={item.unReadCount} />
                                </div>
                            </div>
                        </List.Item>
                    )
                })}
            </List>
        </div >
    )
}

export default ChatMessage;