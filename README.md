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
* signin - 登录
    * 参数 - username, password
    * 返回 - status
* signup - 注册
    * 参数 - username, password, nickname
    * 返回 - status
* uploadMap - 上传地图
    * 参数 - map
    * 返回 - status
* getMaps - 获取所有地图
    * 参数 - username
    * 返回 - maps