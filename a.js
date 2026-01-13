const themeBtn = document.getElementById("themeButton");

function setTheme(isDark) {
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem("otaaTheme", isDark ? "dark" : "light");
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

if (themeBtn) {
  const thumb = themeBtn.querySelector(".theme-thumb");
  const track = themeBtn.querySelector(".theme-track");

  let dragging = false;
  let lastY = 0;

  function getYFromEvent(e) {
    const rect = track.getBoundingClientRect();
    const OFFSET = 40;
    const y = clamp(
      e.clientY - rect.top,
      -OFFSET,
      rect.height + OFFSET
    );
    return { y, rect };
  }

  thumb.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    dragging = true;
    thumb.setPointerCapture(e.pointerId);
    thumb.style.transition = "none";
  });

  thumb.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const { y } = getYFromEvent(e);
    lastY = y;
    thumb.style.top = `${y}px`;
  });

  thumb.addEventListener("pointerup", () => {
    if (!dragging) return;
    dragging = false;

    thumb.style.top = "";
    thumb.style.transition = "top 0.25s ease";

    const rect = track.getBoundingClientRect();
    const isDark = lastY > rect.height / 2;
    setTheme(isDark);
  });

  thumb.addEventListener("pointercancel", () => {
    dragging = false;
    thumb.style.top = "";
    thumb.style.transition = "top 0.25s ease";
  });

  themeBtn.addEventListener("click", (e) => {
    if (dragging) return;
    const { y, rect } = getYFromEvent(e);
    const isDark = y > rect.height / 2;
    setTheme(isDark);
  });
}


const worksToggle = document.getElementById("worksToggle");
const worksWrapper = document.querySelector(".works-wrapper");

if (worksToggle && worksWrapper) {
  worksToggle.addEventListener("click", (e) => {
    e.preventDefault();
    worksWrapper.classList.toggle("open");
  });
}

const lightbox = document.getElementById("lightbox");

if (lightbox) {
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxVideo = document.getElementById("lightbox-video");

  const clickable = document.querySelectorAll(
    ".grafik-gallery img, .enstalasyon-gallery img"
  );

  clickable.forEach(el => {
    el.addEventListener("click", () => {
      const videoSrc = el.dataset.video; 

      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";

      if (lightboxImg) {
        lightboxImg.style.display = "none";
        lightboxImg.src = "";
      }
      if (lightboxVideo) {
        lightboxVideo.style.display = "none";
        lightboxVideo.pause();
        lightboxVideo.src = "";
      }

      if (videoSrc && lightboxVideo) {
        lightboxVideo.src = videoSrc;
        lightboxVideo.style.display = "block";
        lightboxVideo.currentTime = 0;
        lightboxVideo.play();
      } else if (lightboxImg) {
        lightboxImg.src = el.src;
        lightboxImg.style.display = "block";
      }
    });
  });

 
  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";

    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.src = "";
      lightboxVideo.style.display = "none";
    }
    if (lightboxImg) {
      lightboxImg.src = "";
      lightboxImg.style.display = "none";
    }
  });
}

