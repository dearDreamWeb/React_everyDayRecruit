import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import DiyHeader from "../../component/header";
import AvatarList from "../../component/avatarList";
import { List, InputItem, Toast, TextareaItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from "axios";


const DashenInfo = props => {
    const [avatar, setAvatar] = useState(null);//选择的头像
    const { getFieldProps, getFieldError, validateFields } = props.form;


    // 公共的校验方法
    const validateCommon = (rule, value, callback) => {
        const reg = /[@,;'"$?<>`\s]/;
        if (!reg.test(value) && value) {
            callback();
        } else {
            value
                ? callback(new Error(`不能含有特殊字符@ , ; ' " $ ? < > ` + "`"))
                : callback(new Error(`请输入内容`))
        }
    }

    /**
     * 保存
     * 提交的data是结合注册界面的路由传递过来的参数，一起发送到后端
     */
    const handleClick = () => {
        console.log(props)
        validateFields().then(res => {
            // 判断用户是否选择了头像，没有选择提醒用户选择头像
            if (avatar) {
                // console.log(Object.assign({}, res, { ...props.location.state.formData, avatar }));
                axios({
                    method: "post",
                    url: "/api/register",
                    data: Object.assign({}, res, { ...props.location.state.formData, avatar })
                }).then(res => {
                    if (res.data.status === 0) {
                        Toast.success(res.data.message, 3, () => props.history.push("/login"));
                    } else {
                        Toast.error(res.data.message);
                    }
                }).catch(err => console.log(err));
            } else {
                Toast.info("请选择头像");
            }
        }).catch(() => Toast.fail("请确认表单内容全部正确"));
    }

    return (<div className="boss_info">
        <DiyHeader title="大神信息完善" />
        <AvatarList getAvatar={value => setAvatar(value)} />

        {/* Form表单 */}
        <List>
            {/* 招聘职位 */}
            <InputItem
                {...getFieldProps("wantJob", {
                    validate: [{
                        trigger: "onBlur",
                        rules: [{
                            validator: validateCommon
                        }]
                    }]
                })}
                error={!!getFieldError('wantJob')}
                onErrorClick={() => {
                    Toast.info(getFieldError('wantJob'), 1);
                }}
                clear
                placeholder="请输入求职岗位"
            >求职岗位</InputItem>

            {/* 职业要求 */}
            <TextareaItem
                {...getFieldProps("selfIntroduction", {
                    validate: [{
                        trigger: "onBlur",
                        rules: [{
                            validator: validateCommon
                        }]
                    }]
                })}
                error={!!getFieldError('selfIntroduction')}
                onErrorClick={() => {
                    Toast.info(getFieldError('selfIntroduction'), 1);
                }}
                title="个人介绍"
                placeholder="请输入个人介绍,最多可输入200个字数"
                clear
                count={200} //最多输入字数
                autoHeight
            />
            <Button
                type="primary"
                onClick={handleClick}
            >保存</Button>
        </List>
    </div>)
}
export default createForm()(withRouter(DashenInfo));