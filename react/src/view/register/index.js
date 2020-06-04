import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./index.scss";
import logo from "../../images/logo.png";
import { List, InputItem, Button, WingBlank, WhiteSpace, Picker, Toast } from 'antd-mobile';
import VerificationCode from "../../component/verificationCode"; //验证码组件
import { createForm } from 'rc-form';


const Form = (props) => {
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState(["0"]);    //用户类型，默认是1即是老板的选项
    const [canvasCode, setCanvasCode] = useState(""); //canvas生成的验证码
    // 用户类型数据
    const userTypeData = [
        {
            label: "大神",
            value: "0",
        },
        {
            label: "老板",
            value: "1",
        }];
    const { getFieldProps, getFieldError } = props.form;


    // 点击注册
    const handleClick = () => {
        props.form.validateFields({ force: true }, (error) => {
            if (!error) {
                console.log(props.form.getFieldsValue());
            } else {
                Toast.info("请确认表单内容全部正确");
            }
        });
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

    // 输入密码校验
    const validatePassword = (rule, value, callback) => {
        //匹配是否有特殊字符（包括空格）,允许的特殊字符@,.
        const reg = /^[\w@,.]{6,16}$/;
        if (reg.test(value)) {
            setPassword(value);
            callback();
        } else {
            callback(new Error("仅允许英文、数字和特殊字符@ , .长度为6到16"))
        }
    }

    // 再次输入密码校验
    const validateRePassword = (rule, value, callback) => {
        if (value && value === password) {
            callback();
        } else if (value.length === 0) {
            callback(new Error('请再次输入密码'));
        } else {
            callback(new Error('两次输入密码不一致'));
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

                {/* 确认密码 */}
                <InputItem
                    {...getFieldProps('rePassword', {
                        validate: [{
                            trigger: "onBlur",
                            rules: [
                                { validator: validateRePassword },
                            ],
                        }],

                    })}
                    error={!!getFieldError('rePassword')}
                    onErrorClick={() => {
                        Toast.info(getFieldError('rePassword'), 1);
                    }}
                    type="password"
                    clear
                    placeholder="请再次输入密码"
                >确认密码</InputItem>

                {/* 用户类型 */}
                <Picker
                    {...getFieldProps('userType', {
                        initialValue: userType
                    })}
                    data={userTypeData}
                    title="用户类型"
                    extra="请选择"
                    cols={1}
                    value={userType}
                    onOk={v => setUserType(v)}
                >
                    <List.Item arrow="horizontal">用户类型</List.Item>
                </Picker>

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
                    >注册</Button>
                </List.Item>

                <List.Item>
                    <Button onClick={() => { props.history.push("/login") }}>
                        已有账户
                    </Button>
                </List.Item>
            </List>
        </WingBlank>
    )

}
const Form1 = createForm()(withRouter(Form))
const Register = () => {

    return (<div className="register">
        <header className="register_header">天天直聘</header>
        <section className="logo">
            <img src={logo} alt="logo" />
        </section>
        <section className="form">
            <Form1 />
        </section>
    </div>)
}
export default withRouter(Register);