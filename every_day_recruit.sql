/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : every_day_recruit

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2020-07-03 20:41:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat` (
  `chat_id` int(100) NOT NULL AUTO_INCREMENT,
  `from` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `to` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `chat_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_time` bigint(255) NOT NULL,
  `read` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`chat_id`),
  KEY `from` (`from`),
  KEY `to` (`to`),
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`from`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`to`) REFERENCES `users` (`userId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of chat
-- ----------------------------
INSERT INTO `chat` VALUES ('1', 'a281654291', '4cc75c03b0', '你好！', '1593524944733', '0');
INSERT INTO `chat` VALUES ('2', 'a281654291', '4cc75c03b0', '贵公司现在招的岗位还缺人吗？', '1593527655978', '0');
INSERT INTO `chat` VALUES ('3', 'a281654291', '4cc75c03b0', '能告诉我吗', '1593527986218', '0');
INSERT INTO `chat` VALUES ('4', 'a281654291', '4cc75c03b0', '你好，你想问的是哪个岗位？', '1593528477243', '0');
INSERT INTO `chat` VALUES ('5', '4cc75c03b0', 'a281654291', '你好，你想问的是哪个岗位？', '1593528605171', '1');
INSERT INTO `chat` VALUES ('6', 'a281654291', '4cc75c03b0', '是关于前端开发岗', '1593528982955', '0');
INSERT INTO `chat` VALUES ('7', '4cc75c03b0', 'a281654291', '哦哦，知道了', '1593529157684', '1');
INSERT INTO `chat` VALUES ('8', '4cc75c03b0', 'a281654291', '现在只招前端H5的游戏开发岗位', '1593529627698', '1');
INSERT INTO `chat` VALUES ('9', 'a281654291', '4cc75c03b0', '那岗位的具体要求是什么', '1593529747272', '0');
INSERT INTO `chat` VALUES ('10', '4cc75c03b0', 'a281654291', '在我的职业要求上有，你看一下', '1593529903691', '1');
INSERT INTO `chat` VALUES ('11', 'a281654291', '4cc75c03b0', '好的，我看一下', '1593530485079', '0');
INSERT INTO `chat` VALUES ('12', 'a281654291', '4cc75c03b0', '我看了一下', '1593530756644', '0');
INSERT INTO `chat` VALUES ('13', 'a281654291', '4cc75c03b0', '我想面试一下，可以吗', '1593531534095', '0');
INSERT INTO `chat` VALUES ('14', '4cc75c03b0', 'a281654291', '你把你的简历发到我的邮箱里吧', '1593532167555', '1');
INSERT INTO `chat` VALUES ('15', 'a281654291', '4cc75c03b0', '好的', '1593532618918', '0');
INSERT INTO `chat` VALUES ('16', '4cc75c03b0', 'a281654291', '请稍后等通知', '1593532669934', '1');
INSERT INTO `chat` VALUES ('17', 'a281654291', '4cc75c03b0', '大概要多久', '1593533177679', '0');
INSERT INTO `chat` VALUES ('18', 'a281654291', '4cc75c03b0', '???', '1593654586530', '0');
INSERT INTO `chat` VALUES ('19', '4cc75c03b0', 'a281654291', '??', '1593654911673', '1');
INSERT INTO `chat` VALUES ('20', '4cc75c03b0', 'a281654291', '两三天?', '1593654960072', '1');
INSERT INTO `chat` VALUES ('21', 'a281654291', '4cc75c03b0', '??', '1593655209143', '0');
INSERT INTO `chat` VALUES ('22', 'a281654291', '4cc75c03b0', '?', '1593657189297', '0');
INSERT INTO `chat` VALUES ('23', 'a281654291', '43510ed517', '你好?', '1593696313372', '1');
INSERT INTO `chat` VALUES ('24', 'a281654291', 'ab0ed122d8', '请问贵公司还招人吗', '1593697203237', '0');
INSERT INTO `chat` VALUES ('25', 'a281654291', 'ab0ed122d8', '在吗', '1593697266243', '0');
INSERT INTO `chat` VALUES ('26', 'a281654291', 'ab0ed122d8', '?', '1593698112229', '0');
INSERT INTO `chat` VALUES ('27', '43510ed517', 'a281654291', '?', '1593703881312', '1');
INSERT INTO `chat` VALUES ('28', 'a281654291', '43510ed517', '请问贵公司的前端岗位还招人吗', '1593770089171', '1');
INSERT INTO `chat` VALUES ('29', '43510ed517', 'a281654291', '你好，目前还在招人?', '1593770460756', '1');
INSERT INTO `chat` VALUES ('30', '59a18ce2e6', '43510ed517', '??', '1593770929065', '1');
INSERT INTO `chat` VALUES ('31', '43510ed517', '59a18ce2e6', '你好，你是要应聘什么岗位', '1593771178294', '1');
INSERT INTO `chat` VALUES ('32', '59a18ce2e6', '43510ed517', '我想应聘前端工程师', '1593771257885', '1');
INSERT INTO `chat` VALUES ('33', '43510ed517', '59a18ce2e6', '啦啦啦', '1593772079220', '1');
INSERT INTO `chat` VALUES ('34', '59a18ce2e6', '43510ed517', '??', '1593772147685', '1');
INSERT INTO `chat` VALUES ('35', '43510ed517', '59a18ce2e6', '??', '1593772172156', '1');
INSERT INTO `chat` VALUES ('36', '43510ed517', '59a18ce2e6', '沙雕', '1593772436896', '1');
INSERT INTO `chat` VALUES ('37', '59a18ce2e6', '43510ed517', '还招人吗', '1593772752068', '1');
INSERT INTO `chat` VALUES ('38', '43510ed517', '59a18ce2e6', '还在招人中?', '1593772777908', '1');
INSERT INTO `chat` VALUES ('39', '43510ed517', '59a18ce2e6', '你的简历发我一份', '1593773244926', '1');
INSERT INTO `chat` VALUES ('40', '43510ed517', '59a18ce2e6', '你的简历发给我一份', '1593773419245', '1');
INSERT INTO `chat` VALUES ('41', '59a18ce2e6', '43510ed517', '好的，我一会就发给你', '1593773523566', '1');
INSERT INTO `chat` VALUES ('42', '59a18ce2e6', '43510ed517', '?', '1593773533192', '1');
INSERT INTO `chat` VALUES ('43', '43510ed517', '59a18ce2e6', '嗯嗯', '1593773753182', '1');
INSERT INTO `chat` VALUES ('44', '59a18ce2e6', '43510ed517', '我已经发过去了', '1593774359630', '1');
INSERT INTO `chat` VALUES ('45', '43510ed517', '59a18ce2e6', '我看看', '1593774375843', '1');
INSERT INTO `chat` VALUES ('46', '59a18ce2e6', '43510ed517', '收到了吗', '1593774465763', '1');
INSERT INTO `chat` VALUES ('47', '43510ed517', '59a18ce2e6', '收到了', '1593777715889', '1');
INSERT INTO `chat` VALUES ('48', '43510ed517', '59a18ce2e6', '请等待通知', '1593777729583', '1');
INSERT INTO `chat` VALUES ('49', '59a18ce2e6', '43510ed517', '好哒?', '1593777742674', '1');
INSERT INTO `chat` VALUES ('50', '59a18ce2e6', '43510ed517', '??', '1593777851399', '1');
INSERT INTO `chat` VALUES ('51', '43510ed517', '59a18ce2e6', '??', '1593777875528', '1');
INSERT INTO `chat` VALUES ('52', '59a18ce2e6', '43510ed517', '??', '1593777884730', '1');
INSERT INTO `chat` VALUES ('53', '59a18ce2e6', '43510ed517', '?', '1593777957672', '1');
INSERT INTO `chat` VALUES ('54', '43510ed517', '59a18ce2e6', '?', '1593778097770', '1');
INSERT INTO `chat` VALUES ('55', 'a281654291', '43510ed517', '我想应聘，请看一下我的简历，谢谢', '1593779182307', '0');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` varchar(10) CHARACTER SET utf8 NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `userType` tinyint(4) NOT NULL COMMENT '用户类型，老板还是大神，1是老板，0是大神',
  `avatar` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '头像',
  `job` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '老板招聘的职位',
  `companyName` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '老板的公司名字',
  `salary` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '老板开出的职位薪资',
  `jobRequire` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '老板对职位的要求',
  `wantJob` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '大神要找的工作岗位',
  `selfIntroduction` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '大神的个人介绍',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('43510ed517', 'MaYun', '123456', '1', '头像2', '前端开发工程师', '阿里麻麻', '30k', '1、大学本科以上学历；\r\n2、精通HTML、CSS和JavaScript，具备一定框架设计能力；\r\n3、精通面向对象编程，熟悉React等常用框架，熟悉JS模块化编程；\r\n4、精通网站性能优化，技术体验优化，浏览器兼容性；', null, null);
INSERT INTO `users` VALUES ('4829437a54', 'LiHua', '123456', '0', '头像20', null, null, null, null, '前端开发工程师', '1.熟练掌握原生HTML/CSS/JavaScript；\n2.熟悉前端框架React，并熟悉相关生态，包含React-router，Dva，Umi等；\n3.对ant-design有一定了解；\n4.熟练掌握canvas绘图技巧；\n5.熟悉OpenLayers基本使用；\n6.熟悉CSS动画及基础Less使用规则；\n7.熟悉使用webpack，能自行配置相关需求');
INSERT INTO `users` VALUES ('4cc75c03b0', 'MaHuTeng', '123456', '1', '头像6', 'H5游戏开发工程师', '迅腾', '40k', '1. 精通HTML/CSS/Javascript等前端技术，熟练掌握CSS和浏览器兼容问题。\n2. 熟悉HTTP协议。\n3. 至少熟练使用一种前端框架(Angular/React/Vue 等)\n4. 熟悉基本的数据结构和操作系统概念', null, null);
INSERT INTO `users` VALUES ('59a18ce2e6', 'www', '123456', '0', '头像10', null, null, null, null, '后端开发工程师', '• 熟悉常用数据结构和算法\n• 对Java虚拟机有所了解，有相关调优经验者优先\n• 熟悉常用数据库存储解决方案如 mysql，postgresql，mongodb等\n• 熟悉企业应用设计模式、面向对象的分析和设计技术，包括设计模式、UML建模等\n• 1年以上的大规模高并发访问的Web应用开发');
INSERT INTO `users` VALUES ('a281654291', 'wxb', '123456', '0', '头像20', null, null, null, null, '前端开发工程师', '熟悉Vue全家桶、Element-ui框架、jQuery的基本操作、移动布局、Express的前后端交互以及基础操作、ES6语法、JavaScript、CSS3、HTML5、Scss、HTTP协议等专业技能。');
INSERT INTO `users` VALUES ('ab0ed122d8', 'LiYanHon', '123456', '1', '头像18', '人工智能工程师', '度百', '30k', '无门槛，来者不拒', null, null);
