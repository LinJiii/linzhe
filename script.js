// === 2025-05-04 最新修改 ===
// 首屏终端打字效果
(function terminalWriter() {
  const terminalBody = document.getElementById('terminalBody');
  if (!terminalBody) return;

  const lines = [
    { type: 'cmd', text: '$ whoami' },
    { type: 'output', html: '<span class="output">林喆 · 产品经理</span>' },                             // 修改1
    { type: 'blank' },
    { type: 'cmd', text: '$ music expertise.txt' },
    { type: 'output', html: '<span class="output">✨ AI赋能增长 · Multi-Agent意图预测 · 商业化架构</span>' },
    { type: 'output', html: '<span class="output">✨ 用户体验 · 数据驱动 · 团队管理(30+人)</span>' },                        // 修改2
    { type: 'output', html: '<span class="output">✨ 主导过亿级AI智慧服务产品 · 千万级营收增长</span>' },   // 修改3
    { type: 'blank' },
    { type: 'cmd', text: '$ echo "AI + Product = Exponential Growth"' },
    { type: 'output', html: '<span class="highlight">⚡ 从0到1驱动DAU逆势增长至6700万，年营收+8800万</span>' }
  ];

  const lineElements = [];
  lines.forEach(line => {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    if (line.type === 'blank') div.innerHTML = '&nbsp;';
    lineElements.push({ el: div, data: line });
    terminalBody.appendChild(div);
  });

  const cursorLine = document.createElement('div');
  cursorLine.className = 'terminal-line visible';
  cursorLine.innerHTML = '<span class="terminal-cursor"></span>';
  cursorLine.style.opacity = '0';
  terminalBody.appendChild(cursorLine);

  let idx = 0;
  function typeNextLine() {
    if (idx >= lineElements.length) {
      cursorLine.style.opacity = '1';
      return;
    }
    const { el, data } = lineElements[idx];
    el.classList.add('visible');
    idx++;
    if (data.type === 'blank') {
      setTimeout(typeNextLine, 120);
      return;
    }
    if (data.type === 'cmd') {
      const parts = data.text.match(/^(\$ )(.*)/);
      if (parts) {
        el.innerHTML = '<span class="cmd">$ </span>';
        const rest = parts[2];
        let i = 0;
        function addChar() {
          if (i < rest.length) {
            el.innerHTML = '<span class="cmd">$ </span><span class="cmd-text">' + rest.substring(0, i+1) + '</span>';
            i++;
            setTimeout(addChar, 45);
          } else {
            setTimeout(typeNextLine, 260);
          }
        }
        addChar();
      } else {
        el.textContent = data.text;
        setTimeout(typeNextLine, 200);
      }
    } else {
      const prefix = '<span class="cmd">&gt; </span>';
      el.innerHTML = prefix;
      setTimeout(() => {
        el.innerHTML = prefix + data.html;
        setTimeout(typeNextLine, 220);
      }, 120);
    }
  }

  setTimeout(typeNextLine, 400);
})();

// 滚动触发 fade-up 动画
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.15, rootMargin: "0px 0px -30px 0px" });
document.querySelectorAll('.fade-up').forEach(el => scrollObserver.observe(el));

// 鼠标跟随光晕
const glow = document.getElementById('cursorGlow');
let mx = 0, my = 0, gx = 0, gy = 0;
document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
});
function animateGlow() {
  gx += (mx - gx) * 0.08;
  gy += (my - gy) * 0.08;
  if (glow) {
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';
  }
  requestAnimationFrame(animateGlow);
}
animateGlow();

// 卡片按钮点击提醒
document.querySelectorAll('.card-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    alert('📄 详细策略文档欢迎联系交流，可线下进一步展示。');
  });
});