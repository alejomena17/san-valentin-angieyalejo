/* ==============================
   🎵 MÚSICA
============================== */

const musicBtn = document.getElementById('musicBtn');
const music = document.getElementById('bgMusic');

if (musicBtn && music) {
  musicBtn.addEventListener('click', () => {
    music.play();
    musicBtn.style.display = "none";
  });
}


/* ==============================
   ❤️ CORAZONES
============================== */

const heartsContainer = document.querySelector('.hearts');

if (heartsContainer) {

  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 10 + 15) + "px";
    heart.style.animationDuration = (Math.random() * 3 + 4) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 6000);
  }

  setInterval(createHeart, 400);
}


/* ==============================
   🔁 FLIP + BLOQUEO TOTAL COLUMNA
============================== */

const cards = document.querySelectorAll('.card');

cards.forEach(card => {

  card.addEventListener('pointerdown', (e) => {

    e.stopPropagation();

    const column = card.closest('.column');
    const isFlipped = card.classList.contains('flipped');

    if (!column) return;

    if (!isFlipped) {
      // 🔒 Si se va a girar → bloquear columna
      column.style.overflowY = 'hidden';
      column.dataset.locked = "true";
      card.classList.add('flipped');
    } else {
      // 🔓 Si se va a cerrar → desbloquear
      card.classList.remove('flipped');
      column.style.overflowY = 'auto';
      column.dataset.locked = "false";
    }

  });

});


/* ==============================
   🔄 SINCRONIZACIÓN SUAVE COLUMNAS
   (solo si no está bloqueada)
============================== */

const columns = document.querySelectorAll('.column');

let scrollTimeout;

columns.forEach((column, index) => {

  column.addEventListener('scroll', () => {

    // ❌ Si esta columna está bloqueada, no sincronizar
    if (column.dataset.locked === "true") return;

    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {

      const maxScrollMain = column.scrollHeight - column.clientHeight;
      if (maxScrollMain <= 0) return;

      const scrollPercent = column.scrollTop / maxScrollMain;

      columns.forEach((otherColumn, otherIndex) => {

        if (otherIndex !== index && otherColumn.dataset.locked !== "true") {

          const maxScrollOther = otherColumn.scrollHeight - otherColumn.clientHeight;

          otherColumn.scrollTo({
            top: scrollPercent * maxScrollOther * 0.3,
            behavior: "smooth"
          });

        }

      });

    }, 120);

  });

});