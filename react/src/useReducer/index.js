import { createContext } from "react";

let initData = {};//初始数据
// 数据初始化时，获取sessionStorage里面的数据
if (window.sessionStorage.getItem("userList")) {
    initData["userList"] = JSON.parse(window.sessionStorage.getItem("userList"));
    initData["chatList"] = JSON.parse(window.sessionStorage.getItem("chatList"));
}

// 派发事件
const reducer = (state, action) => {
    switch (action.type) {
        case "initData":
            // 将数据存到sessionStorage里面
            window.sessionStorage.setItem("userList", JSON.stringify(action.userList));
            window.sessionStorage.setItem("chatList", JSON.stringify(action.chatList));
            return { userList: action.userList, chatList: action.chatList }
        default:
            return state
    }
}

const ContextData = createContext({});

export { initData, reducer, ContextData }

