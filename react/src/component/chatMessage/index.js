import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { ContextData } from "../../useReducer";

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
    }, [])

    // 初始化用户列表
    /**
     * 1. 先将所有的消息列表chatList遍历
     * 2. 声明一个新数组用来存最后一个消息，并判断新数组里面是否有来自同一个人的重复的消息，没有就把item加入新数组
     * 3. 将去重得到的arr聊天列表，map遍历和userList列表中的数据作对比，找到对应的聊天用户的个人信息return合成
     */
    const initLastChatList = () => {
        let arr = [];
        // 将所有的消息列表chatList遍历
        chatList.forEach(item => {
            // 如果arr.length等于0，就push进来一个
            if (arr.length === 0) {
                arr.push(item);
            } else {
                // 将arr进行filter过滤筛选出item的from和to一样的item
                let isHasItem = arr.filter(item1 => {
                    return (item1.from === item.from && item1.to === item.to) ||
                        (item1.from === item.to && item1.to === item.from);
                })
                // 当isHasItem的length为0时，说明没有重复的用户
                if (isHasItem.length === 0) {
                    arr.push(item)
                }
            }
        })

        // 将去重得到的arr聊天列表，map遍历和userList列表中的数据作对比，找到对应的聊天用户的个人信息return合成
        arr = arr.map(item => {
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
            xiaoxi
        </div>
    )
}

export default ChatMessage;