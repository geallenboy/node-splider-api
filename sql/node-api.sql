/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : node-api

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 24/12/2021 15:28:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for player
-- ----------------------------
DROP TABLE IF EXISTS `player`;
CREATE TABLE `player` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tid` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '出身时间',
  `first_name_cn` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '姓名',
  `last_name_cn` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `position` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '位置',
  `jersey_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '号码',
  `birthdate` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '出生年月',
  `age` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '年龄',
  `experience` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '身高',
  `college` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '毕业学校',
  `logo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '头像',
  `centimeter` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '身高',
  `kilo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '体重',
  `nation` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wingspan` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reach` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `salary` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `draft_year` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `draft_round` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `draft_pick` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `team_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `team_market` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `feet` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pound` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `season` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=785 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for player_data
-- ----------------------------
DROP TABLE IF EXISTS `player_data`;
CREATE TABLE `player_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mid` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '比赛时间',
  `time` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `team_name` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '球队名称',
  `score` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '球队得分',
  `opp_team_name` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '对手球队名称',
  `opp_tid` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '对手球队id',
  `opp_score` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '对手球队得分',
  `host` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `minutes` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '上场时间',
  `points` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '得分',
  `field_goals_made` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '命中投篮数',
  `field_goals_att` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '总投蓝数',
  `field_goals_pct` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '投篮命中率',
  `three_points_made` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '三分命中投篮次数',
  `three_points_att` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '三分投篮次数',
  `three_points_pct` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '投篮命中率',
  `free_throws_made` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '罚球命中次数',
  `free_throws_att` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '罚球总命中次数',
  `free_throws_pct` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '罚球命中率',
  `offensive_rebounds` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '前场篮板',
  `defensive_rebounds` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '后场篮板',
  `rebounds` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '总篮板',
  `assists` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '助攻',
  `turnovers` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '失误',
  `assists_turnover_ratio` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '助失比',
  `steals` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '抢断',
  `blocks` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '盖帽',
  `personal_fouls` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '犯规',
  `pid` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `season` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `season_type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3509 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for player_list
-- ----------------------------
DROP TABLE IF EXISTS `player_list`;
CREATE TABLE `player_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pid` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `first_name_cn` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_name_cn` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jersey_number` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `position` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birthdate` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `age` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `experience` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `feet` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `centimeter` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pound` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `kilo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `college` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tid` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `season` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `team_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=524 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for season_match
-- ----------------------------
DROP TABLE IF EXISTS `season_match`;
CREATE TABLE `season_match` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `season` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mid` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `time` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status_en` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `home_city` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `home_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `home_tid` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `home_score` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `away_city` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `away_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `away_tid` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `live_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `video_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `slide_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `news_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `livecast_id` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `home_player` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `home_pid` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `home_points` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `home_rebounds` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `home_assists` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `away_player` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `away_pid` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `away_points` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `away_rebounds` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `away_assists` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS `team`;
CREATE TABLE `team` (
  `tid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '球队图片',
  `market` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '所属城市',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '英文名称',
  `market_cn` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '所属城市中文',
  `name_cn` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '中文名称',
  `alias` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '别名',
  `conference` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '所在分布',
  `division` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '所在区域',
  `state` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '所在特区',
  `city` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '所在城市',
  `venue` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '主场馆',
  `coach` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '现任主教练',
  `executive` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '总经理',
  `history` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '介绍',
  `boss` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '拥有者',
  `champions` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '总冠军次数',
  `champion_season` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '夺冠赛季'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for team_list
-- ----------------------------
DROP TABLE IF EXISTS `team_list`;
CREATE TABLE `team_list` (
  `tid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `team_market` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `team_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `team_market_cn` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `team_name_cn` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `division` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `area` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for team_season
-- ----------------------------
DROP TABLE IF EXISTS `team_season`;
CREATE TABLE `team_season` (
  `pid` int NOT NULL COMMENT '球队赛季id',
  `area` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '球队区域',
  `isWin` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '连续战绩',
  `losses` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '负',
  `wins` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '胜',
  `seasonCnPhase` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '常规赛',
  `seasonDesc` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '赛季日期',
  `serial` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '联盟',
  `continueRecord` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '连续战绩',
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET FOREIGN_KEY_CHECKS = 1;
