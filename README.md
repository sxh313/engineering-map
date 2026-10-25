# sxh · Engineering Map

从 Go 后端到 AI Agent 的在线学习地图。站点使用 VitePress 构建，正文同步自本地 Markdown 学习目录。

## 本地运行

```powershell
npm install
npm run sync
npm run dev
```

默认内容源为 `D:\desktop\AI\study\fullstack`。也可以指定其他目录：

```powershell
npm run sync -- --source "D:\path\to\fullstack"
```

## 构建

```powershell
npm run build
npm run preview
```

## 发布到 GitHub Pages

仓库默认按 `engineering-map` 配置 Pages base path。将项目推送到同名仓库的 `main` 分支，然后在 GitHub 仓库设置中选择 **GitHub Actions** 作为 Pages 来源即可自动发布。

如果仓库名不同，请修改 `.github/workflows/deploy.yml` 中的 `DOCS_BASE`。
