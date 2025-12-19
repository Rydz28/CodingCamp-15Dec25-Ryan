/*
============================================================
    LOGIKA JAVA SCRIPT PORTFOLIO BAHLIL
    Dicoding oleh: Ryan 
    Tanggal Rilis: Desember 2025
============================================================

LIBRARIES:
- GSAP 3.12.2
  - Buat ngatur timeline biar gak tabrakan
  - Plugin ScrollTrigger biar animasi jalan pas diintip
  
- ScrollReveal.js
  - Buat elemen yang malu-malu muncul pas di-scroll
  
- Vanilla Tilt.js 1.8.0
  - Efek kartu 3D yang bisa digoyang-goyang

FITUR-FITUR GACOR:
- Kursor posesif (ngikutin mouse mulu)
- Menu hamburger (bukan makanan) buat HP
- Intro Hero yang dramatis ala film Marvel
- Angka statistik yang nambah sendiri (Inflasi?)
- Efek kartu 3D pas disentuh mouse
- Formulir kontak yang output-nya sok-sokan hacker
- Navbar yang bisa berubah warna pas discroll
- Welcome modal dengan sapaan dinamis

DAFTAR ANIMASI:
- Teks judul muncul satu-satu (Staggered)
- Angka counter jalan sendiri
- Efek ngetik pas submit form
- Greeting text yang berubah sesuai nama user
============================================================
*/

// ========== KURSOR YANG NGINTIL (POSESIF KAMU SAMA AKU YAKK, KYAAAA, BIKIN MALUUUU) ==========
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Titik dalem langsung nempel (Gercep)
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Lingkaran luar agak telat (Lemot dikit biar smooth ala magnet)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// ========== TOMBOL BURGER (BUAT TAMPILAN HP) ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    // Klik burger buat buka menu (Toggle)
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Kalau link diklik, menunya tutup lagi
    navLinks.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ========== ANIMASI INTRO (BIAR DRAMATIS) ==========
document.addEventListener('DOMContentLoaded', () => {
    // Bikin timeline GSAP biar animasinya antri rapi
    const tl = gsap.timeline();

    // Navbar turun dari langit
    tl.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    })
        // Greeting text muncul duluan
        .from('.greeting-text', {
            y: -20,
            duration: 0.8,
            ease: 'power3.out'
        }, "-=0.5")
        // Kata-kata di judul muncul satu-satu (biar penasaran)
        .from('.hero-title .word', {
            y: 100,
            opacity: 0,
            stagger: 0.2, // Jeda 0.2 detik tiap kata
            duration: 1,
            ease: 'power4.out'
        }, "-=0.5")
        // Subtitle nyelonong dari kiri
        .from('.hero-subtitle', {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, "-=0.5")
        // Tombol CTA mental-mental dikit (Bounce effect)
        .from('.hero-cta .btn', {
            y: 20,
            stagger: 0.2,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, "-=0.5")
        // Bola cairan Oplosan membesar (Elastic)
        .from('.liquid-orb', {
            scale: 0,
            opacity: 0,
            duration: 1.5,
            ease: 'elastic.out(1, 0.3)'
        }, "-=1");

    // ========== SCROLL TRIGGER ==========
    gsap.registerPlugin(ScrollTrigger);

    // Animasi angka nambah sendiri pas kelihatan di layar
    gsap.utils.toArray('.stat-number').forEach(stat => {
        const target = stat.getAttribute('data-count');
        gsap.to(stat, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 }, // Buletin angka biar gak desimal
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%', // Mulai pas elemen udah 80% masuk layar
            }
        });
    });
});

// ========== SCROLLREVEAL (MUNCULIN ELEMEN) ==========
// Judul muncul dari kiri
ScrollReveal().reveal('.section-title', {
    delay: 200,
    distance: '50px',
    origin: 'left',
    duration: 1000,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
});

// Teks About muncul dari bawah
ScrollReveal().reveal('.about-text', {
    delay: 400,
    distance: '30px',
    origin: 'bottom',
    duration: 1000
});

// Foto Bahlil muncul dari kanan (Sok asik)
ScrollReveal().reveal('.about-image', {
    delay: 600,
    distance: '30px',
    origin: 'right',
    duration: 1000
});

// Kartu Portfolio muncul gantian (Staggered)
ScrollReveal().reveal('.portfolio-card', {
    delay: 300,
    interval: 200, // Jeda antar kartu
    distance: '50px',
    origin: 'bottom',
    duration: 800
});

// Headquarter Section
ScrollReveal().reveal('.headquarter-card', {
    delay: 300,
    distance: '50px',
    origin: 'bottom',
    duration: 1000,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
});

// ========== VANILLA TILT - EFEK KARTU GOYANG 3D ==========
VanillaTilt.init(document.querySelectorAll(".portfolio-card"), {
    max: 15,        // Miringnya jangan lebay
    speed: 400,     // Kecepatan goyang
    glare: true,    // Pake efek kilau biar mahal
    "max-glare": 0.2,
});

// ========== EFEK GLITCH ==========
const glitchText = document.querySelector('.highlight-glitch');
if (glitchText) {
    // Bikin glitch tiap 3 detik
    setInterval(() => {
        glitchText.classList.add('active');
        setTimeout(() => {
            glitchText.classList.remove('active');
        }, 200);
    }, 3000);
}

// ========== NAVBAR BERUBAH WARNA PAS SCROLL ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        // Pas discroll: Jadi agak gelap & padding mengecil
        navbar.style.background = 'rgba(5, 5, 5, 0.9)';
        navbar.style.padding = '15px 50px';
    } else {
        // Pas di atas: Transparan & lega
        navbar.style.background = 'rgba(5, 5, 5, 0.5)';
        navbar.style.padding = '20px 50px';
    }
});

// ========== FORMULIR SAMBAT - OUTPUT ALA HACKER ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Tahan dulu bro, jangan reload page

        // Ambil data dari inputan user
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value || '-';
        const message = document.getElementById('message').value;

        // Format waktu lokal Indonesia (WIB/WITA/WIT)
        const now = new Date().toLocaleString('id-ID', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Siapin data buat ditampilin di layar hitam (terminal)
        const outputs = [
            { id: 'outTime', value: now },
            { id: 'outName', value: name },
            { id: 'outDob', value: dob },
            { id: 'outGender', value: gender },
            { id: 'outMessage', value: message }
        ];

        // GSAP: Efek ngetik satu-satu (Typing effect - Terminal)
        outputs.forEach((item, index) => {
            const el = document.getElementById(item.id);

            gsap.fromTo(el,
                { opacity: 0, x: -10 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.85,
                    delay: index * 0.85, // Delay biar munculnya urut
                    onStart: () => {
                        el.textContent = item.value;
                        el.style.color = '#FFD700'; // Warna emas biar mewah
                    }
                }
            );
        });
    });
}

// ========== SCROLLREVEAL - BAGIAN KONTAK ==========
// Form muncul dari kiri
ScrollReveal().reveal('.form-card', {
    delay: 200,
    distance: '50px',
    origin: 'left',
    duration: 1000
});

// Terminal hacker muncul dari kanan
ScrollReveal().reveal('.terminal-card', {
    delay: 400,
    distance: '50px',
    origin: 'right',
    duration: 1000
});

// ========== SMOOTH SCROLL (ANIMASI LAMBAT) ==========
// Fitur request: Scroll lambat pas klik menu navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Hitung offset biar gak ketutup navbar
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            // Posisi target dikurang tinggi navbar
            const targetPosition = targetElement.offsetTop - navbarHeight;

            // Animasi scroll pake GSAP
            gsap.to("html, body", {
                scrollTop: targetPosition,
                duration: 2.5, // Durasi 2.5 detik (Lambat)
                ease: "power2.inOut"
            });
        }
    });
});

// ========== WELCOME MODAL - SAPAAN ==========
window.addEventListener('load', () => {
    const welcomeModal = document.getElementById('welcomeModal');
    const welcomeForm = document.getElementById('welcomeForm');
    const userNameInput = document.getElementById('userName');
    const greetingText = document.querySelector('.greeting-text');

    // Ambil nama dari localStorage
    let savedName = localStorage.getItem('portfolioUserName');

    if (savedName) {
        // Kalau udah ada nama, langsung tampilkan
        updateGreeting(savedName);
    } else {
        // Kalau belum, tampilkan modal setelah animasi intro
        setTimeout(() => {
            if (welcomeModal) {
                welcomeModal.classList.add('active');
            }
        }, 2500); // Muncul setelah 2.5 detik (setelah intro)
    }

    // Handle submit form nama
    if (welcomeForm) {
        welcomeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = userNameInput.value.trim();

            if (name) {
                // Simpan nama ke localStorage
                localStorage.setItem('portfolioUserName', name);

                // Update greeting
                updateGreeting(name);

                // Tutup modal dengan animasi
                welcomeModal.classList.remove('active');

                // Reset form
                welcomeForm.reset();
            }
        });
    }

    // Fungsi update greeting text
    function updateGreeting(name) {
        if (greetingText) {
            // Animasi fade out
            gsap.to(greetingText, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                onComplete: () => {
                    greetingText.textContent = `Halo, ${name}! Welcome to`;
                    // Animasi fade in
                    gsap.to(greetingText, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'back.out(1.7)'
                    });
                }
            });
        }
    }

    // Klik di luar modal untuk skip
    if (welcomeModal) {
        welcomeModal.addEventListener('click', (e) => {
            if (e.target === welcomeModal) {
                welcomeModal.classList.remove('active');
                updateGreeting('Guest');
            }
        });
    }
});