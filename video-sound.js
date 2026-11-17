/* ===== Âm thanh cho video vòng lặp (file mp3 lưu trên Supabase Storage) =====
   Video giữ nguyên (không tiếng). Khi người xem bấm nút "Bật tiếng", file mp3 sẽ phát cùng video;
   bấm "Tắt tiếng" thì dừng. Dùng lại nút và chữ có sẵn trong trang, không cần sửa app.js.

   Cách gắn: thêm dòng này vào index.html, SAU dòng <script src="app.js" defer></script>:
   <script src="video-sound.js" defer></script>
*/
(function () {
  // ---- CẤU HÌNH: sửa cho đúng bucket và tên file mp3 của bạn ----
  // CÁCH 1 (đang dùng): để file mp3 ngay trong thư mục dự án, cùng chỗ với index.html -> không cần Supabase
  const FULL_URL = 'sound.mp3';            // tên file mp3 trong thư mục dự án (hoặc dán link đầy đủ)
  // CÁCH 2: lưu mp3 trên Supabase Storage -> để FULL_URL = '' rồi điền 2 dòng dưới
  const BUCKET = 'videos';                 // tên bucket (phải để Public)
  const FILE   = 'sound.mp3';              // tên file mp3 trong bucket
  const VOLUME = 0.8;                      // 0 -> 1
  const SUPABASE_URL = 'https://dweuihnqfpinmklvyezq.supabase.co';   // cùng project với video hiện tại

  const url = FULL_URL || (SUPABASE_URL + '/storage/v1/object/public/' + BUCKET + '/' + encodeURIComponent(FILE));

  function init() {
    const video = document.getElementById('bgCompanyVideo');
    const original = window.toggleAudio;            // hàm gốc trong app.js: đổi chữ/biểu tượng nút
    if (!video || typeof original !== 'function') return;

    const audio = new Audio();
    audio.loop = true; audio.preload = 'none'; audio.volume = VOLUME;
    let wanted = false;                              // người xem đang muốn nghe
    let synced = false;                              // mp3 dài gần bằng video -> giữ khớp mỗi vòng lặp

    const checkSync = () => { synced = isFinite(audio.duration) && isFinite(video.duration) && Math.abs(audio.duration - video.duration) < 1.5; };
    audio.addEventListener('loadedmetadata', checkSync);
    video.addEventListener('loadedmetadata', checkSync);

    // Khi video lặp lại từ đầu -> mp3 cũng về đầu (nếu hai file dài bằng nhau)
    let lastT = 0;
    video.addEventListener('timeupdate', () => {
      if (synced && wanted && video.currentTime + 0.5 < lastT) audio.currentTime = video.currentTime;
      lastT = video.currentTime;
    });

    async function start() {
      if (!audio.src) audio.src = url;
      try {
        if (isFinite(video.duration) && video.duration > 0 && isFinite(audio.duration) && audio.duration > 0) audio.currentTime = video.currentTime % audio.duration;
        await audio.play();
        wanted = true;
      } catch (e) {
        console.warn('Không phát được âm thanh:', e);
        wanted = false; original();                  // trả nút về trạng thái "Bật tiếng"
        const t = document.getElementById('audioText');
        if (t) { const old = t.innerText; t.innerText = 'Không tải được âm thanh'; setTimeout(() => { t.innerText = old; }, 2500); }
      }
    }
    function stop() { wanted = false; audio.pause(); }

    window.toggleAudio = function () {
      original();                                    // đổi trạng thái nút như cũ (video không có tiếng nên vô hại)
      if (video.muted) stop(); else start();
    };

    // Chỉ phát khi khu vực video đang hiện trên màn hình; cuộn đi hoặc chuyển tab thì tạm dừng
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(es => {
        es.forEach(en => { if (!en.isIntersecting) audio.pause(); else if (wanted) audio.play().catch(() => {}); });
      }, { threshold: 0.15 }).observe(video);
    }
    document.addEventListener('visibilitychange', () => { if (document.hidden) audio.pause(); else if (wanted) audio.play().catch(() => {}); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();