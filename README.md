<p align="center">
  <a href="https://wmgame.weimob.com" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://github.com/yangaihe/panduola-introduce/assets/20334773/82c52568-1b9d-48ac-85cc-f11caf3661be" alt="wmgame logo">
  </a>
</p>
<div align="center">

[![NPM][npm-badge]][npm-url] [![LICENSE][license-badge]][license-url] [![NPM downloads][download-image]][download-url]

[npm-badge]: https://img.shields.io/npm/v/wmgame/weapp.svg
[npm-url]: https://www.npmjs.com/package/wmgame/weapp
[license-badge]: https://img.shields.io/npm/l/wmgame/weapp
[license-url]: https://github.com/weimob-tech/wmgame/blob/master/LICENSE
[download-image]: https://img.shields.io/npm/dm/wmgame/weapp
[download-url]: https://npmjs.org/package/wmgame/weapp

</div>

[Wmgame](https://github.com/weimob-tech/wmgame) 基于html5，小程序以及小游戏的canvas的2d动画引擎

## 📂介绍
> 轻量级Canvas类库

我们实现了游戏所必要的基础动画，引擎文件只有4K大小。让你告别底层canvas编程的痛苦，快速编写代码，并且代码可以兼容html5，小程序以及小游戏三端。一套代码可以同在在三端运行，提高开发效率

## 🏆 H5 Demo效果
<img width="180" src="https://github.com/yangaihe/panduola-introduce/assets/20334773/52e68ac3-1fc8-4e7d-aafc-3ee09f695ee9" alt="h5 demo xiaoxiaole">

example 目录下有该demo的源码

## 🎉 特性
- 💡 体积小而功能丰富
- ⚡️ 更快的加载速度
- 🛠️ 支持三端的游戏引擎
- 🔩  统一事件监听
- 🔑 完整的api
- 📦 可扩展性强


## 🔨 本地构建
```bash
$ git clone git@github.com:weimob-tech/wmgame.git
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

## ⚡资源大小对比
| 名称 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; | 文件大小 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; |
| ----------- | ----------------- |
| CreateJS          |    172 KB       |
| StreakJS | 79 KB |
| Cax.js             | 126 KB              |
| Pixi.js             | 554 KB              |
| Matter.js             | 201 KB             |
| Wmgame.js             | 4 KB            |

## 案例效果
<img width="180" alt="案例" src="https://github.com/yangaihe/panduola-introduce/assets/20334773/b1c2a00e-0dcf-4b60-86ce-a83dab8bef0e">
<img width="180" alt="案例" src="https://github.com/yangaihe/panduola-introduce/assets/20334773/6d1aebd5-1b83-424c-8eed-a92fd65a1b37">
<img width="180" alt="案例" src="https://github.com/yangaihe/panduola-introduce/assets/20334773/c607bc2b-faa5-4042-9301-bbb9a2b24ff0">
<img width="180" alt="案例" src="https://github.com/yangaihe/panduola-introduce/assets/20334773/5c964c64-63fa-4fb8-9bce-05332565ebeb">

## 🎈 协议

使用 [MIT 协议](LICENSE)