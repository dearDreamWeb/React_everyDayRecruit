import React, { useEffect, useState } from "react";
import { Card, WingBlank } from 'antd-mobile';
import axios from "axios";
import "./index.scss";

const UsersList = props => {
    const [usersData, setUsersData] = useState([]);
    const userType = props.userType;


    useEffect(() => {
        initData();
    }, [])

    // 初始化数据
    const initData = () => {
        axios({
            method: "get",
            url: "/api/userList",
            params: {
                userType: userType
            }
        }).then(res => {
            if (res.data.status === 0) {
                setUsersData(res.data.userData);
            }
        }).catch(err => console.log(err));
    }

    return (<div className="user_list">
        <WingBlank>
            {usersData.map((item, index) => {
                return (
                    <Card full className="card-wrap" key={index}>
                        <Card.Header
                            thumb={require(`../../assets/images/avatar/${item.avatar}.png`)}
                            extra={<span>{item.userName}</span>}
                        />
                        <Card.Body>
                            <div className="item">职位：{item.wantJob || item.job}</div>
                            <div
                                className="item"
                                style={{ display: item.companyName ? "block" : "none" }}
                            >公司：{item.companyName}</div>
                            <div
                                className="item"
                                style={{ display: item.salary ? "block" : "none" }}
                            >月薪：{item.salary}</div>
                            <div className="item description">
                                <span className="description_title">描述：</span>
                                <p>{item.selfIntroduction || item.jobRequire}</p>
                            </div>
                        </Card.Body>
                    </Card>

                )
            })}
        </WingBlank>
    </div>)
}

export default UsersList;