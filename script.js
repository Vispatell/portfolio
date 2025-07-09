// Optimized JavaScript for Portfolio Website

// 1. Scroll Reset and Intro
window.onbeforeunload = () => window.scrollTo(0, 0);
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  document.body.style.overflow = "hidden";
  startIntroAnimation();

  ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
  });
});

function startIntroAnimation() {
  const tl = gsap.timeline();
  tl.from(
    ".wlc-page .wlc-left",
    {
      opacity: 0,
      x: -500,
      duration: 1.2,
      ease: "power2",
    },
    "start"
  )
    .from(
      ".wlc-page .wlc-right",
      {
        opacity: 0,
        x: 500,
        duration: 1.2,
        ease: "power2",
      },
      "start"
    )
    .to(".wlc-page", {
      top: "100%",
      duration: 0.7,
      ease: "power1",
      onComplete: () => (document.body.style.overflow = ""),
    })
    .to(".wlc-page", { display: "none" })
    .from(".nav .nav-logo", {
      opacity: 0,
      y: -80,
      duration: 0.6,
      ease: "power3",
    })
    .from(".nav-links li", {
      opacity: 0,
      y: -60,
      stagger: 0.1,
      duration: 0.2,
      ease: "power3",
    })
    .from(
      ".hero-sec-left .first, .hero-sec-left h1, .hero-sec-left h4, .hero-sec-left .second, .hero-sec-left a",
      {
        y: 100,
        opacity: 0,
        ease: "power3",
        duration: 0.7,
        stagger: 0.3,
      },
      "hero"
    )
    .from(
      ".hero-sec-right img",
      {
        opacity: 0,
        x: 400,
        duration: 0.8,
      },
      "hero"
    );
}

// 2. GSAP Scroll Animations
function serviceAnimation() {
  gsap
    .timeline()
    .from(
      ".moveLeft",
      {
        x: 600,
        opacity: 0,
        duration: 1,
        stagger: 0.7,
        ease: "power4.out",
      },
      "a"
    )
    .from(
      ".moveRight",
      {
        x: -600,
        opacity: 0,
        duration: 1,
        stagger: 0.7,
        ease: "power4.out",
      },
      "a"
    )
    .from(
      ".stripe-1, .stripe-2",
      {
        opacity: 0,
        width: 0,
        duration: 2,
        delay: 0.1,
        ease: "power4.out",
      },
      "a"
    );
}
ScrollTrigger.create({
  trigger: ".page2",
  start: "top 80%",
  onEnter: serviceAnimation,
});

function scoreAnimation() {
  const skills = document.querySelectorAll(".skill-box-top h3");
  const scores = [85, 90, 80, 90];
  skills.forEach((elem, i) => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < scores[i]) {
        elem.textContent = `${++count}%`;
      } else clearInterval(interval);
    }, 25);
  });
}
ScrollTrigger.create({
  trigger: ".page5",
  start: "top 70%",
  onEnter: scoreAnimation,
});

// 3. Video Interaction
const videoContainer = document.querySelector(".page4-bottom");
const video = videoContainer.querySelector("video");
const videoCursor = document.querySelector(".video-cursor");
const videoBg = document.querySelector(".video-bg");
let isPlaying = false;

videoContainer.addEventListener("mouseenter", () => {
  videoContainer.addEventListener("mousemove", (e) => {
    gsap.to(videoCursor, {
      opacity: 1,
      left: e.x - 370,
      top: e.y - 150,
    });
  });
});

videoContainer.addEventListener("mouseleave", () => {
  gsap.to(videoCursor, { opacity: 0 });
});

videoContainer.addEventListener("click", () => {
  if (!isPlaying) {
    video.play();
    videoBg.style.opacity = 0;
    videoCursor.innerHTML = `<i class="ri-pause-mini-fill"></i>`;
    gsap.to(videoCursor, { scale: 1 });
  } else {
    video.pause();
    videoCursor.innerHTML = `<i class="ri-play-mini-fill"></i>`;
    gsap.to(videoCursor, { scale: 1.3 });
  }
  isPlaying = !isPlaying;
});

// 4. Project Card Scroll Animations
const projectCards = document.querySelectorAll(".project-card");

// Loop through each card and apply animation
projectCards.forEach((card) => {
  gsap.fromTo(
    card,
    { scale: 1, opacity: 1 }, // Set default visible state
    {
      scale: 0.7,
      opacity: 0,
      scrollTrigger: {
        trigger: card,
        start: "top 15%", // Trigger later for smooth effect
        end: "bottom 15%",
        scrub: true,
      },
    }
  );
});

// 5. Sidebar Toggle
const menuIcon = document.querySelector(".nav-content i");
const sidebar = document.querySelector(".sidebar");
let sidebarOpen = false;

menuIcon.addEventListener("click", () => {
  sidebar.style.display = sidebarOpen ? "none" : "block";
  menuIcon.classList.toggle("ri-menu-line");
  menuIcon.classList.toggle("ri-close-large-fill");
  sidebarOpen = !sidebarOpen;
});

const navLinks = document.querySelectorAll(".nav-item");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Only scroll if it's an internal anchor
    if (href.startsWith("#")) {
      e.preventDefault();
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: href,
          offsetY: -15, // Adjust this offset to match your fixed nav height
        },
        ease: "power2.out",
      });
    }
  });
});

emailjs.init("fjd75WyYz3d0kG1_g");
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const from_name = document.getElementById("from_name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  if (!from_name || !email || !phone || !service || !message) {
    return Swal.fire({
      title: "Missing Fields!",
      text: "Please fill in all fields before submitting.",
      icon: "warning",
      confirmButtonText: "OK",
      background: "#151515",
      color: "#fff",
      confirmButtonColor: "#A14EC4",
    });
  }

  Swal.fire({
    title: "Sending...",
    text: "Please wait while we process your request.",
    icon: "info",
    background: "#151515",
    color: "#fff",
    confirmButtonColor: "#A14EC4",
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: Swal.showLoading,
  });

  const templateParams = { from_name, email, phone, service, message };

  emailjs
    .send("service_0olig9m", "template_wo33ria", templateParams)
    .then(() => {
      Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully.",
        icon: "success",
        background: "#151515",
        color: "#fff",
        confirmButtonColor: "#A14EC4",
      });
      e.target.reset();
    })
    .catch(() => {
      Swal.fire({
        title: "Error!",
        text: "Failed to send the message. Please try again later.",
        icon: "error",
        background: "#151515",
        color: "#fff",
        confirmButtonColor: "#A14EC4",
      });
    });
});
