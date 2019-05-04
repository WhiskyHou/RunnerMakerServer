# 毕业设计 服务端

## 链接
* [论文及毕设相关材料](https://github.com/WhiskyHou/GraduationPaper)
* [客户端 RunnerMaker](https://github.com/WhiskyHou/RunnerMaker)

## 环境配置
* npm install -g typescript
* npm install
* tsc -w
* npm run dev

## 接口列表
1. signin - 登录
    * 参数 - username, password
    * 返回 - error (0 成功，1 密码错误，2 用户名错误) data (User)

2. signup - 注册
    * 参数 - username, password, nickname
    * 返回 - error (0 成功，1 已被占用，2 服务端失败)

3. uploadMap - 上传地图
    * 参数 - map ~按照客户端中的Map规范~
    * 返回 - status (0 成功，1 服务端失败)

4. getMaps - 获取所有地图
    * 参数 - 
    * 返回 - error (0 成功，1 服务端错误) maps ({ mid, uid, nickname, goodCount, diffCount, passCount, trysCount }[])

5. getRemoteMapsInfo - 获取用户已发布的地图的信息
    * 参数 - uid, username, password, nickname
    * 返回 - error (0 成功，1 服务端失败) maps (GetMyMapsInfo.maps)

6. upgradeMapInfo - 更新地图点赞困难和通关数据，更新用户和地图关系数据表
    * 参数 - type, uid, mid, time(可选)
    * 返回 - error（0 成功，1 已经有了，2 服务端失败）

7. getGoodRank - 获取点赞排行榜数据
    * 参数 - user
    * 返回 - error（0 成功，1 服务器失败）me (GoodRankInfo) list (GoodRankList[])

8. getCreateRank - 获取创作量排行榜数据
    * 参数 - user
    * 返回 - error（0 成功，1 服务器失败）me (CreateRankInfo) list (CreateRankList[])