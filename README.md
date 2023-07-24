<p align="center">
  <a href="https://wmgame.design.weimob.com" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://github.com/weimob-tech/wmgame/assets/20334773/f6a87217-531d-4f58-8b51-9e5c390f29d5" alt="wmgame logo">
  </a>
</p>
<div align="center">

[![LICENSE][license-badge]][license-url]

[license-badge]: https://github.com/weimob-tech/wmgame/assets/20334773/127cb3d3-4cc1-45e9-946d-adf7b17e97f3
[license-url]: https://github.com/weimob-tech/wmgame/blob/master/LICENSE

</div>

[WmGame](https://github.com/weimob-tech/wmgame) 基于html5，小程序以及小游戏的canvas的2d动画引擎

## 📂 介绍
> 轻量级Canvas类库

我们实现了游戏所必要的基础动画，引擎文件只有4K大小。让你告别底层canvas编程的痛苦，快速编写代码，并且代码可以兼容html5，小程序以及小游戏三端。一套代码可以同在在三端运行，提高开发效率

## 🏆 H5 Demo预览
<img width="180" src="https://github.com/weimob-tech/wmgame/assets/20334773/87135bcc-98ba-4579-87bd-dfa9da42cefb" alt="h5 demo xiaoxiaole">

example 目录下有该demo的源码

## 🔱 三端效果
| H5  | 小程序  |  小游戏 |
| ----------- | ----------------- |----------------- |
|    <img width="200" alt="demo" src="https://github.com/weimob-tech/wmgame/assets/20334773/1d907265-39ba-4a40-828f-093522289e9e">     |    <img width="200" alt="demo" src="https://github.com/weimob-tech/wmgame/assets/20334773/586eb0b6-137b-4c54-a798-7f5973551085">     |       <img width="200" alt="demo" src="https://github.com/weimob-tech/wmgame/assets/20334773/c9cbd8e8-8cb5-47ea-9a6a-7c63064a74ad">      |

## 🎉 特性
- 💡 体积小而功能丰富
- ⚡️ 更快的加载速度
- 🛠️ 支持三端的游戏引擎
- 🔩  统一事件监听
- 🔑 完整的api
- 📦 可扩展性强


## 🔨 本地构建
```bash
$ git clone https://github.com/weimob-tech/wmgame.git
$ cd wmgame
$ npm install pnpm -g
$ pnpm install
$ pnpm build:prod
```
lib下会生成三份类库：h5、xcx（小程序）、xyx（小游戏）

## 👍 使用构建文件
1、引入js
```bash
 <script type="application/javascript" src="./lib/h5/wmgame.js"></script>  //h5

import wmGame from "./lib/xcx/wmgame.js";  //小程序

import wmGame from "./lib/xyx/wmgame.js";   //小游戏
```

2、初始化实例

```bash
wmGame.init("game",onCompleteHandle);

function onCompleteHandle(gdata,canvas){
    gdata.setFps(60);
    gdata.update("loop");
    ... //逻辑代码
}
```

## ⚡ 资源大小对比
| 名称 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; | 文件大小 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; |
| ----------- | ----------------- |
| CreateJS          |    172 KB       |
| StreakJS | 79 KB |
| Cax.js             | 126 KB              |
| Pixi.js             | 554 KB              |
| Matter.js             | 201 KB             |
| WmGame.js             | 4 KB            |

## 🔑 整体流程
![desc](https://github.com/weimob-tech/wmgame/assets/20334773/d9d27b60-0529-4a5b-acd6-0a82d922050d)


## 💡 案例
<img width="200" alt="案例" src="https://github.com/weimob-tech/wmgame/assets/20334773/236210a9-2125-4866-8719-6f41aab4fc7f">
<img width="200" alt="案例" src="https://github.com/weimob-tech/wmgame/assets/20334773/eabc7556-a9f7-49d2-a80d-957f0cefa1eb">
<img width="200" alt="案例" src="https://github.com/weimob-tech/wmgame/assets/20334773/80532c9e-b669-4efe-b8ea-07e02cb0c033">
<img width="200" alt="案例" src="https://github.com/weimob-tech/wmgame/assets/20334773/ed6d4056-df64-4589-afcb-6aa4f6ed3153">

## 🎈 协议

使用 [MIT 协议](LICENSE)
