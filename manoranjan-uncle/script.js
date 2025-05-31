// 🎉 Confetti Particle System
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiParticles = [];

function createConfetti() {
    for (let i = 0; i < 300; i++) { // Increase count for more confetti
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 3, // Size variation
            color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
            velocityX: (Math.random() - 0.5) * 5, // Sideways movement
            velocityY: Math.random() * 5 + 2 // Downward fall
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    });
}

function updateConfetti() {
    confettiParticles.forEach(particle => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        if (particle.y > canvas.height) {
            particle.y = -10; // Reset when falling out
            particle.x = Math.random() * canvas.width;
        }
    });
}

function animateConfetti() {
    drawConfetti();
    updateConfetti();
    requestAnimationFrame(animateConfetti);
}

// 🎊 Start Confetti on Button Click
function startConfetti() {
    confettiParticles.length = 0;
    createConfetti();
    animateConfetti();
}

// ⏳ Countdown Timer with Confetti Trigger
const birthdayMusic = new Audio('music.mp3');


function countdown() {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0).getTime(); // Midnight (00:00) tonight

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = 
            `🎉 Time Left: ${hours}h ${minutes}m ${seconds}s 🎉`;

        if (timeLeft < 0) {
            clearInterval(interval);
            document.getElementById("countdown").innerHTML = "🎉 The celebration has begun! 🎉";
            startConfetti(); // Auto-confetti on celebration!
            birthdayMusic.play(); // Auto-play music at midnight
        }
    }, 1000);
}

// Run countdown
countdown();
