import React from "react";
import { withRouter } from "react-router-dom";
import { TabBar } from "antd-mobile";
import PropTypes from 'prop-types';
import "./index.scss";

const NavFooter = props => {
    // 当前路径
    const pathname = props.location.pathname;

    // 获取父组件传来的导航数据，并过滤大神或者老板的导航
    let navListData = props.navListData;
    navListData = navListData.filter(item => !item.hidden);

    // props值的类型
    NavFooter.propTypes = {
        navListData: PropTypes.array.isRequired,
        userInfo: PropTypes.object
    }

    return (<div className="nav_footer">
        <TabBar>
            {navListData.map((item, index) => {
                return (
                    <TabBar.Item
                        key={index}
                        title={item.text}
                        icon={{ uri: require(`./images/${item.icon}.png`) }}
                        selectedIcon={{ uri: require(`./images/${item.icon}-selected.png`) }}
                        selected={pathname === item.path} //如果当前路径和item中的path一样，则是被选中
                        onPress={() => props.history.push({ pathname: item.path, state: { userInfo: props.userInfo } })}
                    />)
            })}
        </TabBar>
    </div>)
}

export default withRouter(NavFooter);