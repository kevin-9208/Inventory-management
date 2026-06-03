# Inventory Management System

Vue3 + Supabase + TailwindCSS

## 功能

### 管理员

- 登录
- Dashboard
- 产品新增
- 产品编辑
- 产品删除
- 查看库存
- 查看所有订单
- 查看所有出入库记录

### 仓库人员

- 登录
- 查看产品
- 修改库存
- 新增出入库记录

---

## 技术栈

Vue3

Vite

Pinia

Vue Router

TailwindCSS

Supabase Auth

Supabase PostgreSQL

---

## 安装

```bash
npm install
```

创建环境变量

```env
VITE_SUPABASE_URL=

VITE_SUPABASE_ANON_KEY=
```

启动

```bash
npm run dev
```

---

## 数据库

执行：

supabase/schema.sql

执行：

supabase/claims.sql

执行：

supabase/rls.sql

执行：

supabase/seed.sql

---

## 用户角色

admin

warehouse

---

## SKU格式

SKU-YYYYMMDD-RANDOM

示例：

SKU-20260603-8F7A2B

自动生成