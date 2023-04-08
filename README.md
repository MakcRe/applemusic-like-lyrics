<div align=center>

![](./src/assets/amll-icon.svg)

# Apple Music-like Lyrics

一个基于 [BetterNCM](https://github.com/MicroCBer/BetterNCM)/[MRBNCM](https://github.com/Steve-xmh/mrbncm)/[MMBNCM](https://github.com/Steve-xmh/mmbncm) 的类 Apple Music 歌词显示插件。

这是你能在网易云上见到的最像 iPad Apple Music 的播放页面了。

![](https://user-images.githubusercontent.com/39523898/230704437-9dd0a7f3-adcb-42e4-a19e-797e8abceb74.png)
![](https://user-images.githubusercontent.com/39523898/230704176-610d4a64-b33f-4d3e-934a-4387bd9c81f5.png)
![](https://user-images.githubusercontent.com/39523898/230704540-1b45fdab-be21-4285-a0f6-5abca75103e5.png)
![](https://user-images.githubusercontent.com/39523898/230705199-002402ca-b18a-48d2-b4e7-54054d604af9.png)
![](https://user-images.githubusercontent.com/39523898/230705314-44f28376-c3d8-4119-8482-f441565574db.png)
![](https://user-images.githubusercontent.com/39523898/230705260-79b3c1cb-992f-4388-b3d0-cfb047155d4c.png)

</div>

## 安装说明

你可以前往本仓库的 Release 下载对应的插件包，也可以通过 BetterNCM 的插件商店安装本插件。

请不要将本插件与其它同功能用途的插件混用，**作者不会为其做兼容工作**！以下是不兼容或有功能影响的插件清单：

- [RefinedNowPlaying - 一个美化网易云音乐播放界面的 BetterNCM 插件](https://github.com/solstice23/refined-now-playing-netease)

主题插件作者推荐使用 MoTheme 或 [Material You](https://github.com/solstice23/material-you-theme-netease)，其它主题插件作者没有使用过，可能需要你做一定的设置调整才能契合主题。

## 开发/构建/打包流程

安装好 `nodejs` 和 `yarn`，克隆本仓库到任意文件夹后在终端输入以下指令即可构建：

```bash
yarn
yarn build:dev # 开发构建，包含 Source Map 方便查错
yarn build # 发行构建，会压缩代码，不包含 Source Map
yarn dist # 在发行构建的基础上打包 .plugin 插件文件
```

## 鸣谢

- [MicroCBer/BetterNCM](https://github.com/MicroCBer/BetterNCM)
- [Steve-xmh/mrbncm](https://github.com/Steve-xmh/mrbncm)
- [Steve-xmh/mmbncm](https://github.com/Steve-xmh/mmbncm)
- [solstice23/refined-now-playing-netease](https://github.com/solstice23/refined-now-playing-netease)
- [Barba828/color-quantize](https://github.com/Barba828/color-quantize)
