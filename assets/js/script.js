document.addEventListener('DOMContentLoaded', () => {
  // Headerのスクロール効果
  window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  // メニューリンククリック時にメニューを閉じる
  document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
          document.getElementById('navMenu').classList.remove('active');
      });
  });

  // フェードインアニメーション用のIntersection Observer
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
  });

  const heroSwiper = document.getElementById('heroSwiper');
    
    // Swiperのライブラリがロードされ、要素が存在する場合に初期化
    if (typeof Swiper !== 'undefined' && heroSwiper) {
        new Swiper('#heroSwiper', {
            // 縦スライダーを有効化
            direction: 'vertical',
            // ループを有効化
            loop: true,
            // 自動再生設定 (4秒ごと)
            autoplay: {
                delay: 4000, 
                disableOnInteraction: false, 
            },
            // スピード（スライド切り替え時間）
            speed: 800,
            // マウスホイールでの操作を無効化
            mousewheel: false, 
        });
    }

  // スムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });
  

});

// スマホ トグルメニュー
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}
// タイムラインのスクロールアニメーション
function updateTimelineProgress() {
    const timeline = document.getElementById('careerTimeline');
    const progress = document.getElementById('timelineProgress');
    const items = document.querySelectorAll('.timeline-item');
    
    if (!timeline || !progress) return;
    
    const timelineRect = timeline.getBoundingClientRect();
    const timelineTop = timelineRect.top + window.scrollY;
    const timelineHeight = timeline.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    
    // Calculate progress percentage
    const startOffset = timelineTop - windowHeight + 200;
    const endOffset = timelineTop + timelineHeight - 200;
    const scrolled = scrollTop - startOffset;
    const totalScroll = endOffset - startOffset;
    const percentage = Math.min(Math.max((scrolled / totalScroll) * 100, 0), 100);
    
    progress.style.height = percentage + '%';
    
    // Activate dots based on scroll position
    items.forEach((item, index) => {
        const itemTop = item.offsetTop;
        const progressHeight = (percentage / 100) * timelineHeight;
        
        if (progressHeight >= itemTop) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Initialize timeline animation
window.addEventListener('scroll', updateTimelineProgress);
window.addEventListener('load', updateTimelineProgress);

// buttonクリック時のOnclick関数
function redirect(element) {
    // data属性からURLを取得
    const url = element.getAttribute('data');

    // URLが存在すればページを遷移
    if (url) {
        window.location.href = url;
    }
}