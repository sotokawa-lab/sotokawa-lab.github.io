// スクロール・リビール
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Rコードの簡易シンタックスハイライト（コメント・文字列・キーワード・数値）
const R_KEYWORDS = new Set(['if', 'else', 'for', 'while', 'function', 'return', 'library',
  'require', 'TRUE', 'FALSE', 'NA', 'NULL', 'in', 'install.packages']);

function highlightRLine(line, frag) {
  const push = (text, cls) => {
    if (!text) return;
    if (cls) {
      const s = document.createElement('span');
      s.className = cls;
      s.textContent = text;
      frag.appendChild(s);
    } else {
      frag.appendChild(document.createTextNode(text));
    }
  };
  let i = 0;
  let buf = '';
  const flushBuf = () => {
    // バッファ内のキーワード・数値を分離して出力
    buf.split(/([A-Za-z_.][A-Za-z0-9_.]*|\d+\.?\d*)/).forEach((part) => {
      if (!part) return;
      if (R_KEYWORDS.has(part)) push(part, 'tok-kw');
      else if (/^\d+\.?\d*$/.test(part)) push(part, 'tok-num');
      else push(part, null);
    });
    buf = '';
  };
  while (i < line.length) {
    const ch = line[i];
    if (ch === '#') {            // 行末までコメント
      flushBuf();
      push(line.slice(i), 'tok-com');
      return;
    }
    if (ch === '"' || ch === "'") { // 文字列
      const quote = ch;
      let j = i + 1;
      while (j < line.length && line[j] !== quote) j += 1;
      flushBuf();
      push(line.slice(i, j + 1), 'tok-str');
      i = j + 1;
      continue;
    }
    buf += ch;
    i += 1;
  }
  flushBuf();
}

document.querySelectorAll('.codeblock[data-lang="r"] pre code').forEach((code) => {
  const lines = code.textContent.split('\n');
  const frag = document.createDocumentFragment();
  lines.forEach((line, idx) => {
    highlightRLine(line, frag);
    if (idx < lines.length - 1) frag.appendChild(document.createTextNode('\n'));
  });
  code.replaceChildren(frag);
});

// コードブロックのコピー機能
document.querySelectorAll('.codeblock').forEach((block) => {
  const btn = block.querySelector('.btn-copy');
  const pre = block.querySelector('pre');
  if (!btn || !pre) return;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(pre.textContent);
      btn.textContent = 'COPIED!';
      setTimeout(() => { btn.textContent = 'COPY'; }, 1600);
    } catch (e) {
      btn.textContent = 'FAILED';
    }
  });
});

// メールアドレス組み立て（スクレイピング対策）
const mail = document.getElementById('mail');
if (mail) {
  const u = 'tsotokawa';
  const d = 'yachts.ac.jp';
  mail.addEventListener('click', () => {
    const at = document.createElement('span');
    at.className = 'at';
    at.textContent = '@';
    mail.replaceChildren(document.createTextNode(u), at, document.createTextNode(d));
  });
  mail.style.cursor = 'pointer';
  mail.title = 'クリックで @ 表記に切り替え';
}
