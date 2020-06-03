import React, { useRef, useEffect } from "react";
const VerificationCode = (props) => {
    const canvasRef = useRef();
    useEffect(() => {
        curCanvas();
    }, [])

    // 初始化验证码
    const curCanvas = () => {
        const canvasDom = canvasRef.current;
        const ctx = canvasDom.getContext("2d");
        let canvasWidth = canvasDom.clientWidth;
        let canvasHeight = canvasDom.clientHeight;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        // 调用points函数生成干扰点
        points(ctx, 180, 220, 2, 5, canvasWidth, canvasHeight);

        // 获取随机字符
        let characterArr = allCharacter();
        let str = ""; // 验证码
        for (let i = 0; i < 4; i++) {
            let index = randomNum(0, characterArr.length);
            str += characterArr[index];
        }

        // 核心代码
        //设置4个内容 将canvas 平分成4分 然后让内容在1/4的空间旋转缩放
        //原理 ：每次都是位移旋转之后再回复原位
        for (let i = 0; i < str.length; i++) {
            let colorR = randomNum(0, 256);
            let colorG = randomNum(0, 256);
            let colorB = randomNum(0, 256);
            let deg = randomNum(-30, 30);
            let x = randomNum(20, 30);
            // 设置颜色 和字体大小以及样式
            ctx.font = "80px sans-serif";
            ctx.fillStyle = `rgb(${colorR},${colorG},${colorB})`;
            // 先把原点调到字符出现的位置，再旋转 ，然后填充字符
            ctx.translate(x + 60 * i, 0);
            ctx.rotate((Math.PI / 180) * deg);
            ctx.fillText(str[i], 0, canvasHeight / 2 + 10);
            // 把原点和旋转角度复位
            ctx.rotate((Math.PI / 180) * -deg);
            ctx.translate(-(x + 60 * i), 0);
        }

        // 向父组件发送验证码
        props.getCode(str);
    }

    // 所有字符
    const allCharacter = () => {
        let arr = [];
        for (let i = 48; i < 58; i++) {
            arr.push(String.fromCharCode(i));
        }
        for (let j = 65; j < 123; j++) {
            if (j >= 91 && j <= 96) {
                continue;
            }
            arr.push(String.fromCharCode(j));
        }
        return arr;
    }

    // 随机值
    const randomNum = (min, max) => {
        return Math.round(Math.random() * (max - min)) + min;
    }

    /**
     * 生成干扰点
     * @param {*} ctx 
     * @param {*Number} minNum          干扰点最少个数
     * @param {*Number} maxNum          干扰点最多个数
     * @param {*Number} minSize         干扰点最小半径
     * @param {*Number} maxSize         干扰点最大半径
     * @param {*Number} canvasWidth     干扰点x轴的范围
     * @param {*Number} canvasHeight    干扰点y轴的范围
     */
    const points = (ctx, minNum, maxNum, minSize, maxSize, canvasWidth, canvasHeight) => {
        // 干扰点个数
        let pointsNum = randomNum(minNum, maxNum);
        for (let i = 0; i < pointsNum; i++) {
            let colorR = randomNum(0, 255);
            let colorG = randomNum(0, 255);
            let colorB = randomNum(0, 255);
            let r = randomNum(minSize, maxSize);
            let x = randomNum(0, canvasWidth);
            let y = randomNum(0, canvasHeight);
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(${colorR},${colorG},${colorB})`
            ctx.fill();
            ctx.closePath();
        }


    }

    // 点击刷新验证码
    const refresh = () => {
        curCanvas();
    }



    return (<div className="canvas-wrap">
        <canvas
            ref={canvasRef}
            width="300"
            height="150"
            onClick={refresh}
        >该浏览器不支持canvas</canvas>
        <p
            onClick={refresh}
            style={{ color: "blue" }}
        >看不清？点击刷新一下</p>
    </div>)
};
export default VerificationCode;