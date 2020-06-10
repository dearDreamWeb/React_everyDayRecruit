import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
const DiyHeader = props => {
    return (
        <header
            className={`diy_header ${props.isFixed ? "fixed" : ""}`}
        >
            {props.title}
        </header >
    )
}
// props值校验
DiyHeader.prototype = {
    title: PropTypes.string.isRequired,
    isFixed: PropTypes.bool
}
export default DiyHeader;