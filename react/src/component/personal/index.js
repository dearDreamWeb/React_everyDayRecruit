import React, { useState } from "react";
import { Result, List, Button, Toast } from "antd-mobile";
import axios from "axios";
import PropTypes from "prop-types";

const Personal = props => {
    const [userInfo, setUserInfo] = useState(props.location.state.userInfo);

    // props值校验
    Personal.prototype = {
        userInfo: PropTypes.object.isRequired
    }

    // 退出登录
    const loginOut = () => {
        axios({
            method: "get",
            url: "/api/loginOut"
        }).then(res => {
            if (res.data.status === 0) {
                window.localStorage.removeItem("userInfo");
                Toast.success(res.data.message);
                props.history.push("/login");
            }
        }).catch(err => console.log(err));
    }

    return (<div className="personal">
        {/* 简介介绍 */}
        <Result
            img={<img src={require(`../../assets/images/avatar/${userInfo.avatar}.png`)} alt="头像" />}
            title={userInfo.userName}
            message={userInfo.companyName}
        />

        {/* 相关信息 */}
        <List renderHeader={() => "相关信息"}>
            <List.Item multipleLine>
                <List.Item.Brief>职位：{userInfo.wantJob || userInfo.job}</List.Item.Brief>
                <List.Item.Brief>
                    <div
                        style={{
                            wordWrap: "break-word",
                            whiteSpace: "pre-wrap"
                        }}>
                        简介：{userInfo.selfIntroduction || userInfo.jobRequire}
                    </div>
                </List.Item.Brief>

                {/* 当是大神的个人中心的话，薪资这一行隐藏 */}
                <List.Item.Brief
                    style={{
                        display: userInfo.salary ? "block" : "none"
                    }}>
                    薪资：{userInfo.salary}
                </List.Item.Brief>
            </List.Item>
        </List>


        {/* 退出登录按钮 */}
        <Button type="warning" onClick={loginOut}>退出登录</Button>
    </div>)
}
export default Personal;