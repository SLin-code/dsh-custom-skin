# dsh-custom-skin

DeepSeek Harness Web 的自定义壁纸插件。它在设置页增加“个性化 / Wallpaper”页面，支持：

- 上传或拖入多张本地图片，并一键切换；
- 显示/隐藏、删除单张图片、清空图片库；
- 调整铺满方式、位置、遮罩、模糊和面板透明度；
- 自动适配 DSH 的亮色/暗色主题；
- 图片保存在当前浏览器的 IndexedDB，偏好保存在 localStorage，不上传到 DSH 服务端。

## 构建

```sh
pnpm install
pnpm build
pnpm check
```

仓库已经包含构建后的 `lib/`，普通本地安装不需要再次构建。

## 安装到 DSH Web

在 DeepSeek Harness 仓库中执行：

```sh
pnpm dsh plugin --profile web add github:SLin-code/dsh-custom-skin
pnpm dsh web
```

本地开发版本也可以直接安装：

```sh
pnpm dsh plugin --profile web add "/absolute/path/to/dsh-custom-skin"
pnpm dsh web
```

打开 Web 页面左下角的 Settings，进入“个性化”即可上传壁纸。

卸载：

```sh
pnpm dsh plugin --profile web remove dsh-custom-skin
```

## 数据与限制

- 每张图片最大 20 MB，最多保存 24 张；实际容量还受浏览器配额影响。
- 壁纸按浏览器和站点 origin 隔离。在另一个浏览器、端口或远程地址打开 DSH 时，需要重新添加图片。
- 清理该站点的浏览器数据会同时清除壁纸。
