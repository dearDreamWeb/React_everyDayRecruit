import { createContext } from "react";
let initData = { count: 0 };//初始数据

// 派发事件
const reducer = (state, action) => {
    switch (action.type) {
        case "add":
            return { ...state, count: state.count + 1 }
        case "sub":
            return { ...state, count: state.count - 1 };
        default:
            return state
    }
}

const ContextData = createContext({});

export { initData, reducer, ContextData }

