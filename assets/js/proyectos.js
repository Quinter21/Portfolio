const tarjetas = [...document.querySelectorAll('.anillo .tarjeta')];
const n = tarjetas.length;
let actual = 0;

// Ajusta estos valores para cambiar la forma del carrusel
const separacionX = 1.2;   // distancia lateral entre tarjetas (1 = ancho de una tarjeta)
const profundidad = 160;   // px que se alejan hacia el fondo
const giro = 35;           // grados que se inclinan

function colocar() {
  const ancho = tarjetas[0].offsetWidth;

  tarjetas.forEach((t, i) => {
    // posición relativa a la tarjeta activa: ..., -2, -1, 0, 1, 2, ...
    let o = ((i - actual) % n + n) % n;
    if (o > n / 2) o -= n;

    const abs = Math.abs(o);
    t.style.transform =
      `translateX(${o * ancho * separacionX}px) ` +
      `translateZ(${-abs * profundidad}px) ` +
      `rotateY(${-o * giro}deg)`;
    t.style.zIndex = n - abs;                    // la activa siempre encima
    t.style.opacity = abs > 1 ? 0 : 1 - abs * 0.1;
    t.style.pointerEvents = abs === 0 ? 'auto' : 'none';
  });
}

document.getElementById('siguiente').addEventListener('click', () => { actual = (actual + 1) % n; colocar(); });
document.getElementById('anterior').addEventListener('click', () => { actual = (actual - 1 + n) % n; colocar(); });
window.addEventListener('resize', colocar);
colocar();
setInterval(() => {actual = (actual + 1) % n; colocar();}, 10000);