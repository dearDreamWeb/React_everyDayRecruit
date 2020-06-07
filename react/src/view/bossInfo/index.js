import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import DiyHeader from "../../component/header";
import AvatarList from "../../component/avatarList";
import { List, InputItem, Toast, TextareaItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from "axios";


const BossInfo = props => {
    const [avatar, setAvatar] = useState(null);//选择的头像
    const { getFieldProps, getFieldError, validateFields } = props.form;


    // 公共的校验方法
    const validateCommon = (rule, value, callback) => {
        const reg = /[@,;'"$?<>`\s]/;
        if (!reg.test(value) && value) {
            callback();
        } else {
            value
                ? callback(new Error(`不能含有特殊字符@ , ; ' " $ ? < > \``))
                : callback(new Error(`请输入内容`))
        }
    }

    // 校验职位要求
    const validateJobRequire = (rule, value, callback) => {
        const reg = /[@,'"$?<>`]/;
        if (!reg.test(value) && value) {
            callback();
        } else {
            value
                ? callback(new Error(`不能含有特殊字符@ , ' " $ ? < > \``))
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
        <DiyHeader title="老板信息完善" />
        <AvatarList getAvatar={value => setAvatar(value)} />

        {/* Form表单 */}
        <List>
            {/* 招聘职位 */}
            <InputItem
                {...getFieldProps("job", {
                    validate: [{
                        trigger: "onBlur",
                        rules: [{
                            validator: validateCommon
                        }]
                    }]
                })}
                error={!!getFieldError('job')}
                onErrorClick={() => {
                    Toast.info(getFieldError('job'), 1);
                }}
                clear
                placeholder="请输入招聘职位"
            >招聘职位</InputItem>


            {/* 公司名称 */}
            <InputItem
                {...getFieldProps("companyName", {
                    validate: [{
                        trigger: "onBlur",
                        rules: [{
                            validator: validateCommon
                        }]
                    }]
                })}
                error={!!getFieldError('companyName')}
                onErrorClick={() => {
                    Toast.info(getFieldError('companyName'), 1);
                }}
                clear
                placeholder="请输入公司名称"
            >公司名称</InputItem>


            {/* 职位薪资 */}
            <InputItem
                {...getFieldProps("salary", {
                    validate: [{
                        trigger: "onBlur",
                        rules: [{
                            validator: validateCommon
                        }]
                    }]
                })}
                error={!!getFieldError('salary')}
                onErrorClick={() => {
                    Toast.info(getFieldError('salary'), 1);
                }}
                clear
                placeholder="请输入职位薪资"
            >职位薪资</InputItem>

            {/* 职业要求 */}
            <TextareaItem
                {...getFieldProps("jobRequire", {
                    validate: [{
                        trigger: "onBlur",
                        rules: [{
                            validator: validateJobRequire
                        }]
                    }]
                })}
                error={!!getFieldError('jobRequire')}
                onErrorClick={() => {
                    Toast.info(getFieldError('jobRequire'), 1);
                }}
                title="职位要求"
                placeholder="请输入职位要求,最多可输入200个字数"
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
export default createForm()(withRouter(BossInfo));