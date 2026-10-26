# 赤乌堂

Angular 15 网站。首页采用「月下推理馆」设计，刊物、消息、文章和投稿页沿用相同的纸张与墨色排版。

## 本地开发

```sh
npm install
npm start
```

打开 `http://localhost:4200`。生产构建使用 `npm run build`，产物位于 `dist/`。托管服务器需要将前端路由（例如 `/book`、`/news/1`）回退到 `index.html`。

## 内容与资源

- 刊物链接、内页预览和成员：`src/app/world/publications.ts`
- 中英文文案：`src/app/i18n/translations.ts`
- 首页样式：`src/assets/styles/moonlit-home.css`
- 其余页面及英文适配：`src/assets/styles/moonlit-pages.css`
- 插画生成记录：`src/assets/world/ARTWORK.md`
- 本地字体使用 ZCOOL XiaoWei，授权见 `src/assets/world/FONT-LICENSE.txt`

公告列表与正文来自 `src/content/announcements.json`，构建时直接打包，不再调用消息接口，也不需要 GitHub Token。新增或编辑公告的方法见 `src/content/README.md`。历史文章地址保留，第五卷公告位于 `/news/40`。投稿继续使用编辑部邮箱。

## 测试

```sh
npm test -- --watch=false
```

完整套件涵盖页面渲染、键盘跳转正文、静态公告数据完整性、历史文章地址保留、文章路由切换及未知编号处理。
