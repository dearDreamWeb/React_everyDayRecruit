import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./index.scss";
import logo from "../../images/logo.png";
import { List, InputItem, Button, WingBlank } from 'antd-mobile';


const Form = (props) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // 用户名改变
    const changeUserName = value => {
        setUserName(value);
    }

    // 用户名改变
    const changePassword = value => {
        setPassword(value);
    }

    // 点击登录
    const handleClick = () => {
        console.log(userName, password);
    }

    return (
        <WingBlank>
            <List>
                <InputItem
                    clear
                    placeholder="请输入用户名"
                    onChange={value => changeUserName(value)}
                >用户名</InputItem>
                <InputItem
                    type="password"
                    clear
                    placeholder="请输入密码"
                    onChange={value => changePassword(value)}
                >密码</InputItem>
                <List.Item>
                    <Button
                        type="primary"
                        onClick={handleClick}
                    >登录</Button>
                </List.Item>

                <List.Item>
                    <Button onClick={() => { props.history.push("/register") }}>
                        还没有账户
                    </Button>
                </List.Item>
            </List>
        </WingBlank>
    )

}
const Form1 = withRouter(Form)
const Login = () => {

    return (<div className="login">
        <header className="login_header">天天直聘</header>
        <section className="logo">
            <img src={logo} alt="logo" />
        </section>
        <section className="form">
            <Form1 />
        </section>
    </div>)
}
export default withRouter(Login);