const words = [
    "Fullstack application development",
    "Responsive React interfaces",
    "Secure Node.js services",
    "Efficient database architecture"
];

const experienceStart = new Date("2026-09-26T00:00:00");

function calculateCompletedMonths(startDate) {
    const today = new Date();
    let months = (today.getFullYear() - startDate.getFullYear()) * 12;
    months += today.getMonth() - startDate.getMonth();

    if (today.getDate() < startDate.getDate()) {
        months -= 1;
    }

    return Math.max(2, months);
}

function updateExperienceDuration() {
    const months = calculateCompletedMonths(experienceStart);
    const monthText = `${months} ${months === 1 ? "month" : "months"}`;

    ["experience-months", "fullstack-duration", "analyst-duration"].forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = element.id === "experience-months" ? monthText : String(months);
        }
    });

    const heroExperience = document.querySelector(".hero-meta div:nth-child(3)");
    if (heroExperience) {
        const label = heroExperience.querySelector("strong");
        if (label) label.textContent = monthText;
    }
}

updateExperienceDuration();

setInterval(updateExperienceDuration, 24 * 60 * 60 * 1000);

const typingElement = document.getElementById("typing");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingElement) return;

    const currentWord = words[wordIndex];
    typingElement.textContent = deleting
        ? currentWord.substring(0, charIndex--)
        : currentWord.substring(0, ++charIndex);

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1200);
        return;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, deleting ? 45 : 75);
}

typeEffect();

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
    });
});

const cursorGlow = document.querySelector(".cursor-glow");
let pointerX = 0;
let pointerY = 0;
let glowX = 0;
let glowY = 0;

window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
}, { passive: true });

function animateCursorGlow() {
    glowX += (pointerX - glowX) * 0.12;
    glowY += (pointerY - glowY) * 0.12;

    if (cursorGlow) {
        cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
    }

    requestAnimationFrame(animateCursorGlow);
}

if (window.matchMedia("(pointer: fine)").matches) {
    animateCursorGlow();
}

const scrollProgress = document.querySelector(".scroll-progress");

function updateScrollEffects() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    if (scrollProgress) {
        scrollProgress.style.transform = `scaleX(${progress / 100})`;
    }
}

window.addEventListener("scroll", updateScrollEffects, { passive: true });
updateScrollEffects();

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a[href^='#']");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${entry.target.id}`
            );
        });
    });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

const skillsGrid = document.querySelector(".skills-grid");

if (skillsGrid) {
    const skillsObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observerInstance.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    skillsObserver.observe(skillsGrid);
}

if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".skill-card, .project-card, .education-card").forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const bounds = card.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) translateY(-5px)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });

}
