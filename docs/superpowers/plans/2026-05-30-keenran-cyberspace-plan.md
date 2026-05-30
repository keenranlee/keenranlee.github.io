# Keenran CyberSpace 实施计划

> **For agentic workers:** 本计划由 inline execution 在当前会话执行。步骤使用 `- [ ]` 语法追踪进度。

**目标:** 构建一个赛博绿码风的个人网络空间 SPA，部署在 `keenran.top`，作为 Keenran 的数字客厅。

**架构:** 纯前端单页应用，原生 HTML/CSS/JS，无框架依赖。小组件系统模块化设计，通过 localStorage 做持久化。所有小组件在桌面端可拖动，全平台响应式。

**Tech Stack:** HTML5 · CSS3 · Vanilla JS · GitHub Pages · 网易云公开 API · localStorage

---

### Task 1: 项目初始化 + HTML 骨架

**Files:**
- Create: `keenranlee.github.io/index.html`
- Create: `keenranlee.github.io/CNAME`
- Create: `keenranlee.github.io/README.md`

- [ ] **Step 1: 创建项目目录结构**

Run:
```powershell
New-Item -ItemType Directory -Path "E:\PC\Desktop\Keenran_blog\keenranlee.github.io\assets\css" -Force | Out-Null
New-Item -ItemType Directory -Path "E:\PC\Desktop\Keenran_blog\keenranlee.github.io\assets\js" -Force | Out-Null
New-Item -ItemType Directory -Path "E:\PC\Desktop\Keenran_blog\keenranlee.github.io\assets\images" -Force | Out-Null
```

- [ ] **Step 2: 创建 CNAME**

`keenranlee.github.io/CNAME`:
```
keenran.top
```

- [ ] **Step 3: 创建 index.html 骨架**

包含:
- 绿码主题 meta viewport
- 外部 CSS/JS 链接
- 小组件容器结构（时钟区、终端区、播放器区、状态区、社交区、底部）
- 加载完成时执行初始化脚本

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: project scaffold with HTML skeleton"
```

---

### Task 2: 绿码主题 CSS

**Files:**
- Create: `keenranlee.github.io/assets/css/style.css`

- [ ] **Step 1: CSS 变量 + 全局样式**

定义绿码配色变量：
```css
:root {
  --bg-primary: #0a0a0f;
  --bg-deep: #050510;
  --green-main: #00ff41;
  --green-dim: #00cc33;
  --green-bright: #39ff14;
  --green-accent: #00ff88;
  --glass-bg: rgba(0, 255, 65, 0.05);
  --glass-border: rgba(0, 255, 65, 0.2);
  --font-mono: 'Courier New', monospace;
}
```
全局 reset，全屏深空背景渐变。

- [ ] **Step 2: 小组件通用样式**

毛玻璃 card 样式（glass-card）：
- `background: var(--glass-bg)`
- `backdrop-filter: blur(10px)`
- `border: 1px solid var(--glass-border)`
- `box-shadow: 0 0 15px rgba(0, 255, 65, 0.1)`
- 鼠标悬停发光增强

- [ ] **Step 3: 响应式布局**

桌面：flex 网格自由排列
平板：2列网格
手机：单列瀑布流，小组件全宽
媒体查询断点：768px / 480px

- [ ] **Step 4: 元素动画**

```css
/* 呼吸光晕 */
@keyframes breathe {
  0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 65, 0.1); }
  50% { box-shadow: 0 0 25px rgba(0, 255, 65, 0.3); }
}

/* 闪烁光标 */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* 代码漂浮 */
@keyframes float {
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
}
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: green-hacker theme CSS with responsive layout"
```

---

### Task 3: 粒子背景 + 代码漂浮效果

**Files:**
- Create: `keenranlee.github.io/assets/js/effects.js`

- [ ] **Step 1: 粒子背景 Canvas**

初始化全屏 canvas，生成 100+ 个微小白点，随机缓慢移动，鼠标靠近时有轻微吸引/排斥效果。使用 requestAnimationFrame。

- [ ] **Step 2: 代码漂浮效果**

在背景中生成代码字符（`0` `1` `{` `}` `function` `const` `=>` 等绿码元素），从底部随机位置升起，缓慢向上漂浮，透明渐隐到消失。多个字符错落有致，营造"数据在空间中游走"的感觉。

- [ ] **Step 3: 鼠标视差**

鼠标移动时粒子层有极微弱的视差偏移，增强深邃感。

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: particle background + floating code rain effects"
```

---

### Task 4: 时钟小组件

**Files:**
- Modify: `keenranlee.github.io/index.html`（加入时钟容器）
- Modify: `keenranlee.github.io/assets/js/widgets.js`

- [ ] **Step 1: HTML 结构**

```html
<div id="clock-widget" class="glass-card widget">
  <div id="clock-time">00:00:00</div>
  <div id="clock-date">XXXX年XX月XX日 星期X</div>
  <div id="clock-greeting">🌙 晚上好，旅者</div>
</div>
```

- [ ] **Step 2: 时钟 JS 逻辑**

每秒更新：获取当前时间 → 格式化时分秒 → 更新 DOM
日期格式化 + 星期计算
根据时间段切换问候语（早上/下午/晚上）

- [ ] **Step 3: 赛博字体样式**

时钟数字使用等宽/像素字体，数字切换时轻微发光闪烁（CSS transition）

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: cyber clock widget with dynamic greeting"
```

---

### Task 5: 动态终端窗

**Files:**
- Modify: `keenranlee.github.io/index.html`（加入终端容器）
- Modify: `keenranlee.github.io/assets/js/widgets.js`

- [ ] **Step 1: HTML 结构**

```html
<div id="terminal-widget" class="glass-card widget">
  <div class="terminal-header">📡 cyber@keenran:~$ _</div>
  <div id="terminal-body"></div>
</div>
```

- [ ] **Step 2: 终端输出逻辑**

预设一组"黑客式"动态文本（GitHub动态、站点信息、彩蛋），逐行模拟终端输出打字效果。
每条输出间隔随机（1-3秒），支持无限循环。
实际数据源：将来可接入 GitHub API 拉取真实动态，现在先用预设内容。

- [ ] **Step 3: 绿码终端风格样式**

黑底绿字，等宽字体，顶部有模拟标题栏，文字有微弱扫描线效果（CSS pseudo-element）。

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: terminal widget with typewriter effect"
```

---

### Task 6: 当前状态卡 + 社交导航环

**Files:**
- Modify: `keenranlee.github.io/index.html`
- Modify: `keenranlee.github.io/assets/js/widgets.js`

- [ ] **Step 1: 状态卡 HTML + 逻辑**

```html
<div id="status-widget" class="glass-card widget">
  <div class="widget-title">🎯 当前状态</div>
  <div id="status-content">
    <div>🎯 正在攻克：信息学算法</div>
    <div>🎮 最近在玩：Minecraft</div>
    <div>📖 在读：...</div>
  </div>
</div>
```
手动配置数据，可更新。

- [ ] **Step 2: 社交环 HTML + 逻辑**

```html
<div id="social-widget" class="glass-card widget">
  <div class="widget-title">🌐 传送门</div>
  <div id="social-links">
    <a href="https://github.com/keenranlee" target="_blank">🐙 GitHub</a>
    <a href="https://space.bilibili.com/541864556" target="_blank">📺 B站</a>
    <a href="https://x.com/keenranlee" target="_blank">🐦 X</a>
    <a href="https://tiktok.com/@keenranlee" target="_blank">🎵 TikTok</a>
    <a href="https://t.me/keenranlee" target="_blank">✈️ Telegram</a>
  </div>
</div>
```
悬停发光效果，新标签页打开。

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: status card and social hub widgets"
```

---

### Task 7: 网易云播放器（核心功能）

**Files:**
- Modify: `keenranlee.github.io/index.html`
- Create: `keenranlee.github.io/assets/js/player.js`

- [ ] **Step 1: HTML 结构**

```html
<div id="player-widget" class="glass-card widget">
  <div id="player-info">
    <img id="player-cover" src="" alt="cover">
    <div id="player-meta">
      <div id="player-name">歌名</div>
      <div id="player-artist">歌手</div>
    </div>
  </div>
  <div id="player-progress">
    <div id="player-bar"><div id="player-current"></div></div>
    <span id="player-time">00:00 / 03:30</span>
  </div>
  <div id="player-controls">
    <button id="player-prev">⏮</button>
    <button id="player-play">▶</button>
    <button id="player-next">⏭</button>
    <select id="player-playlist"></select>
  </div>
</div>
```

- [ ] **Step 2: 多歌单配置**

预设歌单 ID 列表（待虫虫提供具体歌单链接后填入）：
```js
const PLAYLISTS = [
  { id: 'xxx', name: '歌单1' },
  { id: 'xxx', name: '歌单2' },
  // 待补充
];
```

- [ ] **Step 3: 播放器核心逻辑**

通过网易云 API 获取歌单歌曲列表。用 `<audio>` 元素播放。
提供播放/暂停/上一首/下一首控制。

- [ ] **Step 4: localStorage 记忆播放**

```js
// 首次访问
if (!localStorage.getItem('playerState')) {
  // 随机选歌单 → 随机选歌 → 播放
}
// 后续访问
const saved = JSON.parse(localStorage.getItem('playerState'));
// 恢复歌单、歌曲、进度
```

存储字段：`playlistId`, `songIndex`, `currentTime`, `timestamp`

- [ ] **Step 5: 手动切换歌单**

下拉菜单列出所有歌单，切换时重新加载该歌单的歌曲列表。

- [ ] **Step 6: 播放器样式**

毛玻璃卡片，右下角悬浮固定，封面圆角+发光边框，进度条为亮绿色。

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: NetEase player with multi-playlist and localStorage memory"
```

---

### Task 8: 顶栏导航 + 页面整合

**Files:**
- Modify: `keenranlee.github.io/index.html`
- Modify: `keenranlee.github.io/assets/js/main.js`
- Modify: `keenranlee.github.io/assets/css/style.css`

- [ ] **Step 1: 顶栏导航**

```html
<header id="topbar">
  <div id="avatar-section">
    <img src="assets/images/avatar.jpg" alt="Keenran" id="avatar">
    <span id="title">Keenran Lee · 数字旅者</span>
  </div>
  <nav id="nav-links">
    <span class="nav-item active">🌐 空间</span>
    <a href="https://blog.keenran.top" class="nav-item" target="_blank">📝 博客→</a>
    <span class="nav-item" id="nav-about">💬 关于</span>
  </nav>
</header>
```

- [ ] **Step 2: "关于"弹窗**

点击"💬 关于"弹出简单的介绍面板（毛玻璃浮层），包含简介文字和头像。

- [ ] **Step 3: 底部信息**

```
<footer>
  <span>© 2026 Keenran Lee</span>
  <span id="visitor-count">👾 访客 #42</span>
</footer>
```
访客计数用 localStorage 模拟。

- [ ] **Step 4: main.js 初始化逻辑**

```js
document.addEventListener('DOMContentLoaded', () => {
  initParticles();      // effects.js
  initCodeRain();        // effects.js
  initClock();           // widgets.js
  initTerminal();        // widgets.js
  initStatus();          // widgets.js
  initSocial();          // widgets.js
  initPlayer();          // player.js
});
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: topbar navigation, about modal, bottom footer, init integration"
```

---

### Task 9: 响应式适配 + 拖拽功能

**Files:**
- Modify: `keenranlee.github.io/assets/css/style.css`
- Modify: `keenranlee.github.io/assets/js/main.js`

- [ ] **Step 1: 响应式断点调优**

测试 768px 和 480px 断点下所有小组件的排列和可读性。
确保播放器在手机端固定底部、不遮挡内容。

- [ ] **Step 2: 桌面端拖拽（可选增强）**

用 `mousedown/mousemove/mouseup` 实现小组件自由拖拽。
位置存入 localStorage，刷新后保持。

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: responsive polish and widget drag-and-drop"
```

---

### Task 10: 彩蛋 + 打磨上弦

**Files:**
- Modify: `keenranlee.github.io/assets/js/effects.js`
- Modify: `keenranlee.github.io/assets/css/style.css`

- [ ] **Step 1: 彩蛋效果**

- 快速连击头像 → 触发全屏绿码矩阵雨效果（持续5秒后恢复）
- 页面空闲60秒后在终端窗输出隐藏彩蛋消息

- [ ] **Step 2: 加载过渡**

页面加载时显示一个简短的"SYSTEM BOOTING..."动画，完成后淡入主界面。

- [ ] **Step 3: 最终样式打磨**

检查所有小组件的间距、发光效果一致性、字体层次。
确保无样式泄漏或冲突。

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: easter eggs, boot animation, final polish"
```

---

### Task 11: 部署到 GitHub Pages

**Files:**
- 无文件变更，纯部署操作

- [ ] **Step 1: 创建 GitHub 仓库**

```bash
# 创建 keenranlee/keenranlee.github.io 仓库（如不存在）
```

- [ ] **Step 2: 推送代码**

```bash
git remote add origin https://github.com/keenranlee/keenranlee.github.io.git
git push -u origin main
```

- [ ] **Step 3: 配置 GitHub Pages**

在仓库 Settings → Pages 中：
- Source: Deploy from branch
- Branch: main, / (root)
- Custom domain: keenran.top

- [ ] **Step 4: DNS 配置**

在域名管理中添加：
```
keenran.top CNAME → keenranlee.github.io
```

- [ ] **Step 5: 验证上线**

访问 `https://keenran.top` 确认网站正常显示。

- [ ] **Step 6: Commit**

```bash
git commit --allow-empty -m "deploy: launch Keenran CyberSpace to keenran.top"
git push
```
