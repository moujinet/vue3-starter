---
title: How to use
---

<CommonHeader>
  How to use
</CommonHeader>

#### 安装

```bash
git clone https://github.com/moujinet/vue3-starter
cd vue3-starter
pnpm i
```

#### 文件路由规则

```markdown
| src/pages/[id].vue                        | /:id                       |
| src/pages/blog/post-[id].vue              | /blog/post-:id             |
| src/pages/blog/post-[categoryId]-[id].vue | /blog/post-:categoryId-:id |
| src/pages/users/[[id]].vue                | /users/:id?                |
| src/pages/blog/[slugs]+.vue               | /blog/:slugs+              |
| src/pages/blog/[[slugs]]+.vue             | /blog/:slugs*              |
```

> 访问 [vite-plugin-vue-routes-generate](https://www.npmjs.com/package/vite-plugin-vue-routes-generate) 仓库，获得详细说明。