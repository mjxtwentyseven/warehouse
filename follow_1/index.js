const card = document.querySelector('.card');

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

// Linear interpolation function for smooth animation
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

document.addEventListener('mousemove', (e) => {
  const { innerWidth, innerHeight } = window;
  // Normalize mouse position to range [-1, 1]
  mouseX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
  mouseY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
});

function animate() {
  // Smoothly interpolate current positions towards mouse positions
  currentX = lerp(currentX, mouseX, 0.1);
  currentY = lerp(currentY, mouseY, 0.1);

  // Calculate rotation angles based on mouse position
  const rotateX = -currentY * 20;
  const rotateY = currentX * 20;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // Move the highlight effect using CSS variables
  const lightX = 50 + currentX * 20; // horizontal movement (50% is center)
  const lightY = 50 + currentY * 20; // vertical movement
  card.style.setProperty('--lightX', `${lightX}%`);
  card.style.setProperty('--lightY', `${lightY}%`);

  requestAnimationFrame(animate);
}

animate();

// Reset mouse position when leaving the card for smooth return
card.addEventListener('mouseleave', () => {
  mouseX = 0;
  mouseY = 0;
});
