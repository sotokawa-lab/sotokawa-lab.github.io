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
