import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import "./index.scss";
import logo from "../../assets/images/logo/logo.png";
import { List, InputItem, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import VerificationCode from "../../component/verificationCode";//验证码组件
import DiyHeader from "../../component/header";  //头部组件
import { createForm } from 'rc-form';
import axios from "axios";
import { encrypt } from "../../rsa"; //rsa加密
import { ContextData } from "../../useReducer";


const Form = (props) => {
    const { dispatch } = useContext(ContextData);
    const [canvasCode, setCanvasCode] = useState(""); //canvas生成的验证码
    const { getFieldProps, getFieldError, validateFields } = props.form;

    // 点击登录
    const handleClick = () => {
        validateFields().then(res => {
            axios({
                method: "post",
                url: "/api/login",
                data: res
            }).then(res => {
                if (res.data.status === 0) {
                    // 本地存储登录的用户id和用户类型
                    window.localStorage.setItem("userInfo", encrypt(JSON.stringify(res.data.userInfo)));
                    Toast.success(res.data.message, 2, () => props.history.push("/"));

                    // 把用户列表userList和聊天列表chatList给useReducer
                    dispatch({ type: "initData", userList: res.data.userList, chatList: res.data.chatList });
                    
                } else {
                    Toast.fail(res.data.message);
                }
            }).catch(err => console.log(err));
        }).catch(() => {
            Toast.info("请确认表单内容全部正确");
        })
    }

    // 获取子组件传过来的验证码
    const getCode = (value) => {
        setCanvasCode(value);
    }

    // 校验用户名
    const validateUserName = (rule, value, callback) => {
        // 仅允许输入英文和数字
        const reg = /^\w{3,8}$/;
        if (reg.test(value)) {
            callback();
        } else {
            callback(new Error("仅允许英文、数字长度为3到8"));
        }
    }

    // 校验密码
    const validatePassword = (rule, value, callback) => {

        //匹配是否有特殊字符（包括空格）,允许的特殊字符@,.
        const reg = /^[\w@,.]{6,16}$/;
        if (reg.test(value)) {
            callback();
        } else {
            callback(new Error("仅允许英文、数字和特殊字符@ , .长度为6到16"))
        }
    }

    // 校验验证码
    const validateVerificationCode = (rule, value, callback) => {
        if (value.toLowerCase() === canvasCode.toLowerCase()) {
            callback();
        } else {
            callback(new Error("验证码错误"));
        }
    }


    return (
        <WingBlank>
            <List>
                {/* 用户名 */}
                <InputItem
                    {...getFieldProps('userName', {
                        validate: [{
                            trigger: "onBlur",
                            rules: [
                                { validator: validateUserName }
                            ],
                        }],

                    })}
                    error={!!getFieldError('userName')}
                    onErrorClick={() => {
                        Toast.info(getFieldError('userName'), 1);
                    }}
                    clear
                    placeholder="请输入用户名"
                >用户名</InputItem>

                {/* 密码 */}
                <InputItem
                    {...getFieldProps('password', {
                        validate: [{
                            trigger: "onBlur",
                            rules: [
                                { validator: validatePassword }
                            ],
                        }],

                    })}
                    error={!!getFieldError('password')}
                    onErrorClick={() => {
                        Toast.info(getFieldError('password'), 1);
                    }}
                    type="password"
                    clear
                    placeholder="请输入密码"
                >密码</InputItem>

                {/* 验证码 */}
                <List.Item>
                    <VerificationCode getCode={value => getCode(value)} />
                </List.Item>
                <WhiteSpace />
                <InputItem
                    {...getFieldProps('verificationCode', {
                        validate: [{
                            trigger: "onBlur",
                            rules: [
                                { validator: validateVerificationCode },
                            ],
                        }],

                    })}
                    error={!!getFieldError('verificationCode')}
                    onErrorClick={() => {
                        Toast.info(getFieldError('verificationCode'), 1);
                    }}
                    clear
                    placeholder="请输入验证码"
                >验证码</InputItem>

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
const Form1 = createForm()(withRouter(Form));
const Login = () => {

    return (<div className="login">
        <DiyHeader title="天天直聘" />
        <section className="logo">
            <img src={logo} alt="logo" />
        </section>
        <section className="form">
            <Form1 />
        </section>
    </div>)
}
export default withRouter(Login);