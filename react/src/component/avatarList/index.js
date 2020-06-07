import React, { useState } from "react";
import { List, Grid } from "antd-mobile";


const AvatarList = props => {
    const [selectAvatar, setSelectAvatar] = useState(null);//选择的头像

    // 遍历头像图片数据
    let avatarListData = [];
    for (let i = 0; i < 20; i++) {
        avatarListData.push({
            icon: require(`../../assets/images/avatar/头像${i + 1}.png`),
            text: `头像${i + 1}`
        })
    }

    //列表头部的信息 如果没有选择头像，显示“请选择头像”，有的话就显示已选择的头像
    const listHeader = () => {
        return selectAvatar
            ? <div>已选择头像<img src={require(`../../assets/images/avatar/${selectAvatar}.png`)} alt="头像" /></div>
            : "请选择头像"
    }

    // 点击头像，把选择的头像传给父组件，更新selectAvatar
    const handleClick = el => {
        setSelectAvatar(el.text)
        props.getAvatar(el.text);
    }
    return (<div className="avatar_list">
        <List renderHeader={listHeader}>
            <Grid
                data={avatarListData}
                columnNum={5}
                onClick={(el, i) => handleClick(el, i)}
            />
        </List>
    </div>)
}
export default AvatarList;