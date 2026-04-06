// THEME TOGGLE
function toggleTheme() {
    var isLight = document.body.classList.toggle('light');
    try { localStorage.setItem('tp_theme', isLight ? 'light' : 'dark'); } catch (e) { }
}

// Restaurar tema guardado al cargar
(function () {
    try { if (localStorage.getItem('tp_theme') === 'light') document.body.classList.add('light'); } catch (e) { }
})();

// COSMIC MOUSE FIELD (GLOBAL AURA)
let mx = 0, my = 0;
document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

// NAV
window.addEventListener('scroll', function () {
    document.getElementById('nav').classList.toggle('on', window.scrollY > 40);
});

// MOBILE MENU
function tmob() { 
    const nav = document.getElementById('mnav');
    const btn = document.getElementById('hbg');
    const isOpen = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
}
function cmob() { 
    document.getElementById('mnav').classList.remove('open');
    document.getElementById('hbg').setAttribute('aria-expanded', 'false');
}

// COSMIC AURA ENGINE (INEFFABLE UPGRADE)
(function () {
    const c = document.getElementById('cv'), ctx = c.getContext('2d');
    let W, H, time = 0, mouse = { x: 0, y: 0 }, targetMouse = { x: 0, y: 0 };
    function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { targetMouse.x = e.clientX; targetMouse.y = e.clientY; });
    resize();

    function draw() {
        time += 0.005;
        mouse.x += (targetMouse.x - mouse.x) * 0.05;
        mouse.y += (targetMouse.y - mouse.y) * 0.05;
        ctx.clearRect(0, 0, W, H);

        const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, W / 2);
        grd.addColorStop(0, 'rgba(74, 157, 255, 0.15)');
        grd.addColorStop(1, 'rgba(2, 5, 9, 0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);

        for (let i = 0; i < 3; i++) {
            const shiftX = Math.sin(time + i) * 100;
            const shiftY = Math.cos(time * 0.8 + i) * 100;
            ctx.beginPath();
            ctx.arc(W / 2 + shiftX, H / 2 + shiftY, 300 + Math.sin(time) * 50, 0, Math.PI * 2);
            const orbGrd = ctx.createRadialGradient(W / 2 + shiftX, H / 2 + shiftY, 0, W / 2 + shiftX, H / 2 + shiftY, 300);
            orbGrd.addColorStop(0, `rgba(74, 157, 255, ${0.05 - i * 0.01})`);
            orbGrd.addColorStop(1, 'rgba(2, 5, 9, 0)');
            ctx.fillStyle = orbGrd;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// LIQUID MERCURY TEXT REVEAL
gsap.to(".ln span", {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    duration: 2,
    stagger: { amount: 0.8, from: "start" },
    ease: "expo.out",
    delay: 0.3
});

// LENIS SMOOTH SCROLL
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP REVEAL (RESPONSIVE)
gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
    // Desktop / Tablet Animations (Refined horizontal shifts)
    document.querySelectorAll('.rv, .rvl, .rvr').forEach((el) => {
        gsap.fromTo(el,
            {
                opacity: 0,
                y: el.classList.contains('rvl') || el.classList.contains('rvr') ? 0 : 40,
                x: el.classList.contains('rvl') ? -40 : (el.classList.contains('rvr') ? 40 : 0)
            },
            {
                opacity: 1, y: 0, x: 0,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
});

mm.add("(max-width: 768px)", () => {
    // Mobile Animations (Dynamic Lateral Slide-in)
    document.querySelectorAll('.rv, .rvl, .rvr').forEach((el) => {
        gsap.fromTo(el,
            {
                opacity: 0,
                x: -40,       // Start from the left
                y: 0,
                rotation: -2,  // Slight rotation for energy
                scale: 0.98
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                duration: 1.1,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });
});

// MAGNETIC EFFECTS (LIQUID PHYSICS)
const magEls = document.querySelectorAll('.bw, .bg, .ncta, .wa, .bsend, .scard');
magEls.forEach(el => {
    // Disable magnetic scard on mobile
    const isScard = el.classList.contains('scard');

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

    el.addEventListener('mousemove', (e) => {
        if (isScard && window.innerWidth <= 768) return;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) * 0.35;
        const y = (e.clientY - centerY) * 0.35;
        xTo(x); yTo(y);
    });

    el.addEventListener('mouseleave', () => {
        xTo(0); yTo(0);
    });
});

// HERO PARALLAX
gsap.to(".orb", {
    y: (i, t) => -100 * (i + 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// COUNTERS
function easeOut(t) { return 1 - Math.pow(1 - t, 4); }
function counter(el, target, suffix, dur) {
    var start = performance.now();
    function step(now) {
        var p = Math.min((now - start) / dur, 1);
        el.textContent = Math.floor(easeOut(p) * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0' + suffix;
    requestAnimationFrame(step);
}
var ran = false;
var cobs = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
        if (e.isIntersecting && !ran) {
            ran = true;
            counter(document.getElementById('c1'), 200, '+', 1800);
            counter(document.getElementById('c2'), 8, '+', 1400);
            counter(document.getElementById('c3'), 98, '%', 2000);
        }
    });
}, { threshold: .3 });
cobs.observe(document.getElementById('sr'));

// FAQ
function ftog(btn) {
    var item = btn.closest('.fi'), open = item.classList.contains('open');
    document.querySelectorAll('.fi.open').forEach(function (i) { i.classList.remove('open'); });
    if (!open) item.classList.add('open');
}

// FORMULARIO — Web3Forms
async function smail(e) {
    e.preventDefault();
    var b = document.getElementById('sb');
    var form = document.getElementById('cForm');
    
    // BASIC CLIENT-SIDE VALIDATION
    var email = document.getElementById('fe').value;
    var name = document.getElementById('fn').value;
    var message = document.getElementById('fm').value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !message || !emailRegex.test(email)) {
        b.textContent = 'Por favor, llena los campos correctamente';
        b.style.background = '#ff4a6e';
        setTimeout(() => { b.textContent = 'Enviar Solicitud \u2192'; b.style.background = ''; }, 3000);
        return;
    }

    b.textContent = 'Enviando...'; b.disabled = true; b.style.opacity = '.7';

    var data = new FormData(form);

    try {
        var res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: data
        });
        var json = await res.json();
        if (json.success) {
            b.textContent = '✓ Mensaje enviado'; b.style.background = '#27c97b'; b.style.opacity = '1';
            form.reset();
            setTimeout(function () { b.textContent = 'Enviar Solicitud \u2192'; b.style.background = ''; b.disabled = false; }, 4000);
        } else {
            throw new Error('Error');
        }
    } catch (err) {
        b.textContent = 'Error al enviar — inténtalo de nuevo'; b.style.background = '#ff4a6e'; b.style.opacity = '1';
        setTimeout(function () { b.textContent = 'Enviar Solicitud \u2192'; b.style.background = ''; b.disabled = false; }, 4000);
    }
}
