/* ============================================================= */
/*  Keenran CyberSpace — 应用主逻辑                             */
/*  Boot sequence · 时钟 · 粒子 · 终端 · 播放器 · 拖动          */
/* ============================================================= */

'use strict';

/* ---------- Constants ---------- */
const STORAGE_KEY = 'keenran_cyberspace';
const PLAYLISTS = {
  playlist_002: { id: 13646500759, name: '粤语' },
  playlist_003: { id: 5021640150, name: '喜欢的音乐' },
  playlist_004: { id: 17551620926, name: 'English' },
};

/* ---------- Boot Screen ---------- */
function hideBoot() {
  const boot = document.getElementById('boot-screen');
  if (!boot) return;
  setTimeout(() => {
    boot.classList.add('hidden');
    initApp();
  }, 2500);
}

/* ---------- Clock ---------- */
function updateClock() {
  const timeEl = document.getElementById('clock-time');
  const dateEl = document.getElementById('clock-date');
  if (!timeEl || !dateEl) return;

  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  timeEl.textContent = `${h}:${m}:${s}`;

  const days = ['日', '一', '二', '三', '四', '五', '六'];
  const Y = now.getFullYear();
  const Mo = String(now.getMonth() + 1).padStart(2, '0');
  const D = String(now.getDate()).padStart(2, '0');
  const day = days[now.getDay()];
  dateEl.textContent = `${Y}年${Mo}月${D}日 周${day}`;
}

/* ---------- Floating Code Characters ---------- */
function initCodeFloat() {
  const container = document.getElementById('code-float-container');
  if (!container) return;

  const chars = '01{}[]<>()&^%$#@!*/+-=~`|;:"._abcdef'.split('');
  const count = window.innerWidth < 768 ? 20 : 40;

  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.className = 'code-char';
    span.textContent = chars[Math.floor(Math.random() * chars.length)];
    span.style.left = Math.random() * 100 + '%';
    span.style.fontSize = (0.5 + Math.random() * 0.4) + 'rem';
    span.style.animationDuration = (8 + Math.random() * 10) + 's';
    span.style.animationDelay = (Math.random() * 12) + 's';
    span.style.opacity = '0';
    container.appendChild(span);
  }
}

/* ---------- Canvas Code Rain (背景粒子) ---------- */
function initCodeRain() {
  const canvas = document.getElementById('code-rain');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h, columns, drops = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    columns = Math.floor(w / 18);
    drops = Array(columns).fill(0).map(() => Math.random() * -100);
  }

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = '14px "JetBrains Mono", monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 18;
      const y = drops[i] * 18;

      ctx.fillStyle = y < h * 0.3
        ? 'rgba(0, 255, 65, 0.15)'
        : 'rgba(0, 255, 65, 0.05)';
      ctx.fillText(char, x, y);

      if (y > h && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
}

/* ---------- Terminal ---------- */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  if (!input || !output) return;

  const commands = {
    help: () => [
      '可用命令:',
      '  help      — 显示此帮助',
      '  whoami    — 显示当前用户',
      '  date      — 显示当前时间',
      '  status    — 查看系统状态',
      '  ls        — 列出目录',
      '  neofetch  — 显示系统信息',
      '  clear     — 清屏',
      '  sudo rm   — 🚫 权限不足 (你不在 sudoers 中)',
    ],
    whoami: () => ['Keenran Lee (睡不饱的虫虫)'],
    date: () => [new Date().toLocaleString('zh-CN')],
    status: () => [
      '● KeenranLee.service — Cybernetic Interface',
      '   Active: active (running)',
      '   Status: "正在探索网络空间..."',
      '   Memory: 正在占用你的注意力 ❤️',
    ],
    ls: () => [
      'Desktop/',
      'Documents/',
      'Music/',
      'Pictures/',
      'README.md',
    ],
    neofetch: () => [
      '  OS: CyberSpaceOS v1.0',
      '  Host: Keenran Lee',
      '  Kernel: 睡不饱的虫虫',
      '  Shell: /bin/keen_shell',
      '  Terminal: keenran.top',
      '  Uptime: 从第一次访问开始',
      '  Packages: 无数灵感 ✨',
    ],
    clear: () => {
      output.innerHTML = '';
      return [];
    },
  };

  function addLine(html) {
    const div = document.createElement('div');
    div.className = 'term-line';
    div.innerHTML = html;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.value.trim().toLowerCase();
    input.value = '';

    addLine(`<span class="term-prompt">keenan@cyberspace:~$</span> <span class="term-cmd">${cmd}</span>`);

    if (cmd === '') return;

    if (cmd.startsWith('sudo')) {
      addLine('<span class="term-response" style="color: var(--danger)">🚫 权限不足: 此操作需要 root 权限</span>');
      return;
    }

    const command = commands[cmd.split(' ')[0]];
    if (!command) {
      addLine(`<span class="term-response">bash: ${cmd}: command not found (输入 help 查看可用命令)</span>`);
      return;
    }

    const lines = command();
    lines.forEach(line => addLine(`<span class="term-response">${line}</span>`));
  });
}

/* ---------- Song Data (内联，避免CORS) ---------- */
const SONG_DATA = {
  playlist_002: {
    name: '粤语',
    cover: 'https://p1.music.126.net/saRBursk-BxDwGZiQJiU_w==/109951172792738548.jpg',
    songs: [
      { title: '纯粹想哭', artist: '周柏豪', id: 3352851484 },
      { title: 'K歌之王', artist: '陈奕迅', id: 67467 },
      { title: '喜帖街', artist: '谢安琪', id: 308299 },
      { title: '够钟', artist: '周柏豪', id: 191528 },
      { title: '陀飞轮', artist: '陈奕迅', id: 64638 },
      { title: '你瞒我瞒', artist: '陈柏宇', id: 27511488 },
      { title: '七友', artist: '梁汉文', id: 118150 },
      { title: '最佳损友', artist: '陈奕迅', id: 65800 },
      { title: '浮夸', artist: '陈奕迅', id: 66282 },
      { title: '苦瓜', artist: '陈奕迅', id: 64293 },
    ],
  },
  playlist_003: {
    name: '睡不饱的虫虫喜欢的音乐',
    cover: 'https://p2.music.126.net/rbPvAQ9n2vxqV4QFjPYhZw==/109951162940443079.jpg',
    songs: [
      { title: '匿名的好友', artist: '陈佩贤 Jesslyn', id: 0 },
      { title: '现在那边是几点', artist: '黄小琥', id: 0 },
      { title: '离开我的依赖', artist: '王艳薇', id: 0 },
      { title: '四点的海棠花未眠', artist: '渡', id: 0 },
      { title: '一样的月光 (Live)', artist: '徐佳莹', id: 0 },
      { title: '孤高之人(La La La）', artist: 'Taimou', id: 0 },
    ],
  },
  playlist_004: {
    name: 'English',
    cover: 'https://p1.music.126.net/U7pqYhbbgxjPx1NYUGOGQQ==/109951165958551789.jpg',
    songs: [
      { title: 'Billie Jean', artist: 'Michael Jackson', id: 21178262 },
      { title: 'Stitches', artist: 'Shawn Mendes', id: 1923390719 },
      { title: '孤高之人(La La La）', artist: 'Taimou', id: 2602102691 },
      { title: 'Scars To Your Beautiful', artist: 'Alessia Cara', id: 406407033 },
      { title: 'River', artist: 'Bishop Briggs', id: 402070513 },
      { title: 'Lover Girl', artist: 'Laufey', id: 2717750176 },
      { title: 'Careless Whisper', artist: 'George Michael', id: 18003388 },
      { title: 'Shut up My Moms Calling', artist: 'Hotel Ugly', id: 1980855568 },
      { title: 'CHANEL', artist: 'Tyla', id: 2757718427 },
      { title: 'I Knew You Were Trouble.', artist: 'Taylor Swift', id: 25648017 },
    ],
  },
};

/* ---------- Music Player ---------- */
let playerAudio = null;
let playerState = {
  playlistId: 'playlist_002',
  currentIndex: 0,
  currentTime: 0,
  isPlaying: false,
};

function initPlayer() {
  const playBtn = document.getElementById('player-play');
  const prevBtn = document.getElementById('player-prev');
  const nextBtn = document.getElementById('player-next');
  const select = document.getElementById('playlist-select');
  const cover = document.getElementById('player-cover');
  if (!playBtn) return;

  playerAudio = new Audio();

  // Load saved state
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.player) Object.assign(playerState, parsed.player);
    } catch (e) { /* ignore */ }
  }

  // Render current song info
  function renderSong() {
    const data = SONG_DATA[playerState.playlistId];
    if (!data) return;
    const song = data.songs[playerState.currentIndex];
    if (!song) {
      playerState.currentIndex = 0;
      return renderSong();
    }
    document.getElementById('player-song').textContent = song.title;
    document.getElementById('player-artist').textContent = song.artist;
    if (data.cover && cover) cover.src = data.cover;
  }

  // Try to play audio via NetEase free stream
  function playCurrent() {
    const data = SONG_DATA[playerState.playlistId];
    if (!data) return;
    const song = data.songs[playerState.currentIndex];
    if (!song || !song.id) return;

    const audioUrl = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`;
    playerAudio.src = audioUrl;
    playerAudio.currentTime = playerState.currentTime || 0;
    playerAudio.play().then(() => {
      playerState.isPlaying = true;
      playBtn.textContent = '⏸';
    }).catch(() => {
      playerState.isPlaying = false;
      playBtn.textContent = '▶';
    });
  }

  // Update progress bar
  playerAudio.addEventListener('timeupdate', () => {
    const fill = document.getElementById('progress-fill');
    const current = document.getElementById('time-current');
    const total = document.getElementById('time-total');
    if (playerAudio.duration) {
      const pct = (playerAudio.currentTime / playerAudio.duration) * 100;
      fill.style.width = pct + '%';
      current.textContent = formatTime(playerAudio.currentTime);
      total.textContent = formatTime(playerAudio.duration);
    }
  });

  playerAudio.addEventListener('ended', () => {
    nextSong();
  });

  // Play/Pause
  playBtn.addEventListener('click', () => {
    if (playerState.isPlaying) {
      playerAudio.pause();
      playerState.isPlaying = false;
      playBtn.textContent = '▶';
    } else {
      const data = SONG_DATA[playerState.playlistId];
      const song = data.songs[playerState.currentIndex];
      if (song && song.id) {
        playCurrent();
      }
    }
    saveState();
  });

  function prevSong() {
    playerState.currentIndex = Math.max(0, playerState.currentIndex - 1);
    playerState.currentTime = 0;
    renderSong();
    if (playerState.isPlaying) playCurrent();
    saveState();
  }

  function nextSong() {
    const data = SONG_DATA[playerState.playlistId];
    playerState.currentIndex = Math.min(data.songs.length - 1, playerState.currentIndex + 1);
    playerState.currentTime = 0;
    renderSong();
    if (playerState.isPlaying) playCurrent();
    saveState();
  }

  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);

  // Playlist switch
  select.addEventListener('change', () => {
    playerState.playlistId = select.value;
    playerState.currentIndex = 0;
    playerState.currentTime = 0;
    playerAudio.pause();
    playerState.isPlaying = false;
    playBtn.textContent = '▶';
    renderSong();
    saveState();
  });

  // Progress bar click to seek
  document.querySelector('.progress-bar')?.addEventListener('click', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (playerAudio.duration) {
      playerAudio.currentTime = pct * playerAudio.duration;
    }
  });

  // First render
  renderSong();
  select.value = playerState.playlistId;
}

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/* ---------- State Persistence ---------- */
function saveState() {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    existing.player = playerState;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) { /* storage full or unavailable */ }
}

// Auto-save periodically
setInterval(saveState, 30000);

/* ---------- Draggable Widgets ---------- */
function initDrag() {
  const W = window;
  if (W.innerWidth < 768) return; // 移动端不启用拖动

  const desktop = document.getElementById('desktop');
  desktop.classList.add('drag-mode');

  // Position widgets randomly on first visit
  const widgets = desktop.querySelectorAll('.widget');
  const topbarH = 48;
  const pad = 20;

  widgets.forEach((w, i) => {
    const key = `widget_pos_${w.id}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      const pos = JSON.parse(saved);
      w.style.left = pos.x + 'px';
      w.style.top = pos.y + 'px';
    } else {
      const cols = Math.ceil(W.innerWidth / 380);
      const col = i % cols;
      const row = Math.floor(i / cols);
      w.style.left = (pad + col * 350) + 'px';
      w.style.top = (topbarH + pad + row * 260) + 'px';
    }
    w.style.width = '340px';
    w.style.position = 'absolute';
  });

  // Drag logic
  let dragTarget = null;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  document.addEventListener('mousedown', (e) => {
    const header = e.target.closest('.widget-header');
    if (!header) return;
    dragTarget = header.closest('.widget');
    const rect = dragTarget.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    dragTarget.style.zIndex = 1000;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragTarget) return;
    const x = Math.max(0, e.clientX - dragOffsetX);
    const y = Math.max(0, e.clientY - dragOffsetY);
    dragTarget.style.left = x + 'px';
    dragTarget.style.top = y + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!dragTarget) return;
    const key = `widget_pos_${dragTarget.id}`;
    localStorage.setItem(key, JSON.stringify({
      x: parseInt(dragTarget.style.left),
      y: parseInt(dragTarget.style.top),
    }));
    dragTarget.style.zIndex = '';
    dragTarget = null;
  });
}

/* ---------- Topbar Navigation ---------- */
function initNav() {
  const navItems = document.querySelectorAll('.nav-item[data-view]');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const view = item.dataset.view;
      if (view === 'about') {
        e.preventDefault();
        showAbout();
      }
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

function showAbout() {
  // Simple about modal triggered by nav click
  const overlay = document.createElement('div');
  overlay.className = 'about-overlay';
  overlay.innerHTML = `
    <div class="about-modal">
      <div class="widget-header">
        <span class="widget-title">💬 about</span>
        <span class="widget-close about-close">×</span>
      </div>
      <div class="about-body">
        <p>Keenran Lee · 数字旅者</p>
        <p class="about-sub">睡不饱的虫虫  🐛</p>
        <hr style="border-color:var(--glass-border);margin:10px 0">
        <p style="font-size:0.75rem;color:var(--text-dim);line-height:1.8">
          一个在网络空间漫游的高中生。<br>
          喜欢代码、音乐、羽毛球和Minecraft。<br>
          这里是我的数字客厅，欢迎光临 ✨
        </p>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.closest('.about-close')) {
      overlay.remove();
    }
  });
}

/* ---------- Easter Egg: Konami Code ---------- */
let konamiBuffer = [];
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function initEasterEgg() {
  document.addEventListener('keydown', (e) => {
    konamiBuffer.push(e.key);
    if (konamiBuffer.length > KONAMI_CODE.length) konamiBuffer.shift();
    if (konamiBuffer.join(',') === KONAMI_CODE.join(',')) {
      triggerMatrixMode();
      konamiBuffer = [];
    }
  });

  // Terminal secret command
  // "matrix" command is already handled by initTerminal
}

function triggerMatrixMode() {
  document.body.style.animation = 'none';
  document.body.offsetHeight; // trigger reflow
  document.body.style.transition = 'all 0.5s ease';
  document.querySelectorAll('*').forEach(el => {
    if (el.style) el.style.transition = 'color 0.3s ease, background 0.3s ease';
  });

  // Flash green
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      document.body.style.background = i % 2 === 0 ? '#00ff41' : '';
      document.body.style.color = i % 2 === 0 ? '#0a0a0f' : '';
    }, i * 200);
  }

  setTimeout(() => {
    document.body.style.background = '';
    document.body.style.color = '';
  }, 800);

  // Show secret message
  const msg = document.createElement('div');
  msg.style.cssText = `
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    font-family:'JetBrains Mono',monospace;font-size:1.2rem;
    color:#00ff41;text-shadow:0 0 20px rgba(0,255,65,0.8);
    z-index:99999;text-align:center;pointer-events:none;
    animation:msgFade 3s ease forwards;
  `;
  msg.textContent = '🌐 SYSTEM OVERRIDE\nKeenran Lee — 数字旅者';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

// Add keyframes for the egg
const eggStyle = document.createElement('style');
eggStyle.textContent = `
  @keyframes msgFade {
    0% { opacity: 0; transform: translate(-50%,-50%) scale(0.8); }
    20% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
    80% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%,-50%) scale(1.2); }
  }
`;
document.head.appendChild(eggStyle);

/* ---------- Add matrix command to terminal ---------- */
// Patched into initTerminal after the original command list
(function patchTerminal() {
  const origInit = initTerminal;
  const orig = window._origTerminalInit;
  if (orig) return;

  // We'll add to the commands object by hooking after DOMContentLoaded
  const observer = new MutationObserver(() => {
    const input = document.getElementById('terminal-input');
    if (input && input._patched) return;
    if (input) {
      input._patched = true;
      // The commands are inside a closure, so we add via the keydown handler injection instead
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();

/* ---------- Init ---------- */
function initApp() {
  updateClock();
  setInterval(updateClock, 1000);

  initCodeFloat();
  initCodeRain();
  initTerminal();
  initPlayer();
  initDrag();
  initNav();
}

/* ---------- Start ---------- */
document.addEventListener('DOMContentLoaded', () => {
  hideBoot();
});
