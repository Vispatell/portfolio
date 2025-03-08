var videoContainer = document.querySelector(".page4-bottom");
var video = document.querySelector(".page4-bottom video");
function firstPage() {
  var tl1 = gsap.timeline();

  tl1.from(
    ".wlc-page .wlc-left",
    {
      opacity: 0,
      x: -500,
      duration: 1.5,
      delay: 0.2,
      ease: "power2",
    },
    "start"
  );
  tl1.from(
    ".wlc-page .wlc-right",
    {
      opacity: 0,
      x: 500,
      duration: 1.5,
      delay: 0.2,
      ease: "power2",
    },
    "start"
  );

  tl1.to(".wlc-page", {
    top: "100%",
    duration: 1,
    ease: "power1",
  });

  tl1.to(".wlc-page", {
    display: "none",
  });

  tl1.from(".nav .nav-logo", {
    opacity: 0,
    y: -80,
    duration: 0.6,
    ease: "power3",
  });

  tl1.from(".nav-links li", {
    opacity: 0,
    y: -60,
    stagger: 0.1,
    duration: 0.2,
    ease: "power3",
  });
  tl1.from(
    ".hero-sec-left .first,.hero-sec-left h1,.hero-sec-left h4,.hero-sec-left .second,.hero-sec-left a",
    {
      y: 100,
      opacity: 0,
      ease: "power3",
      duration: 0.7,
      stagger: 0.3,
    },
    "a"
  );
  tl1.from(
    ".hero-sec-right img",
    {
      opacity: 0,
      x: 400,
      duration: 0.8,
    },
    "a"
  );
}
firstPage();

function serviceAnimation() {
  var tl2 = gsap.timeline();

  tl2.from(
    ".moveLeft",
    {
      x: 600,
      opacity: 0,
      duration: 1,
      stagger: 0.7,
      ease: "power4.out",
    },
    "a"
  );

  tl2.from(
    ".moveRight",
    {
      x: -600,
      opacity: 0,
      duration: 1,
      stagger: 0.7,
      ease: "power4.out",
    },
    "a"
  );

  tl2.from(
    ".stripe-1,.stripe-2",
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
  onEnter: serviceAnimation, // Trigger animation
});

function scoreAnimation() {
  var skills = document.querySelectorAll(".skill-box-top h3");
  var skillScore = [
    { score: "85" },
    { score: "90" },
    { score: "80" },
    { score: "90" },
  ];

  skills.forEach((elem, index) => {
    var flag = 0;

    var interval = setInterval(() => {
      if (flag < skillScore[index].score) {
        flag += 1;
        elem.innerHTML = `${flag}%`;
      } else {
        clearInterval(interval); // Stop when target is reached
      }
    }, 25);
  });
}

ScrollTrigger.create({
  trigger: ".page5",
  start: "top 70%",
  onEnter: scoreAnimation, // Trigger animation
});

function aboutAnimation() {
  var tl3 = gsap.timeline();

  tl3.from(
    ".page3-left .img-div",
    {
      x: -700,
      opacity: 0,
      duration: 0.8,
      ease: Power4,
    },
    "s"
  );
  tl3.from(
    ".page3-right",
    {
      x: 700,
      opacity: 0,
      duration: 0.8,
      ease: Power4,
    },
    "s"
  );
}

ScrollTrigger.create({
  trigger: ".page3",
  start: "top 60%",
  onEnter: aboutAnimation, // Trigger animation
});

videoContainer.addEventListener("mouseenter", function () {
  videoContainer.addEventListener("mousemove", function (dets) {
    gsap.to(".video-cursor", {
      opacity: 1,
    });

    gsap.to(".video-cursor", {
      left: dets.x - 370,
      top: dets.y - 150,
    });
  });
});

videoContainer.addEventListener("mouseleave", function () {
  gsap.to(".video-cursor", {
    opacity: 0,
  });
});

var flag = 0;
videoContainer.addEventListener("click", function () {
  if (flag == 0) {
    video.play();
    document.querySelector(
      ".video-cursor"
    ).innerHTML = `<i class="ri-pause-mini-fill"></i>`;
    gsap.to(".video-cursor", {
      scale: 1,
    });
    flag = 1;
  } else {
    video.pause();
    document.querySelector(
      ".video-cursor"
    ).innerHTML = `<i class="ri-play-mini-fill"></i>`;
    gsap.to(".video-cursor", {
      scale: 1.3,
    });
    flag = 0;
  }
});

// Use matchMedia to check screen width
gsap.matchMedia().add("(min-width: 601px)", () => {
  document.querySelectorAll(".project-card").forEach((card) => {
    gsap.to(card, {
      scale: 0.7,
      opacity: 0,
      scrollTrigger: {
        trigger: card,
        start: "top 13%",
        end: "bottom 13%",
        scrub: true,
      },
    });
  });

  return () => {
    // Cleanup function (removes animation when screen size is < 600px)
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
});

// for media quary

var menuIcon = document.querySelector(".nav-content i");
var sideBar = document.querySelector(".sidebar");
var op = 0;
var classI = menuIcon.getAttribute("class");

menuIcon.addEventListener("click", () => {
  if (op === 0) {
    sideBar.style.display = "block";
    menuIcon.classList.remove("ri-menu-line");
    menuIcon.classList.add("ri-close-large-fill");
    op = 1;
  } else {
    sideBar.style.display = "none";
    menuIcon.classList.remove("ri-close-large-fill");
    menuIcon.classList.add("ri-menu-line");

    op = 0;
  }
});

// Initialize EmailJS
emailjs.init("fjd75WyYz3d0kG1_g"); // Replace with your actual Public Key

// Listen for form submission
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const fromName = document.getElementById("from_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    // Validate form fields (Basic validation)
    if (!fromName || !email || !phone || !service || !message) {
        Swal.fire({
            title: "Missing Fields!",
            text: "Please fill in all fields before submitting.",
            icon: "warning",
            confirmButtonText: "OK",
        });
        return;
    }

    // EmailJS parameters
    const templateParams = {
        from_name: fromName,
        email: email,
        phone: phone,
        service: service,
        message: message,
    };

    // Send the email using EmailJS
    emailjs.send("service_0olig9m", "template_wo33ria", templateParams)
        .then(function (response) {
            Swal.fire({
                title: "Success!",
                text: "Your message has been sent successfully.",
                icon: "success",
                confirmButtonText: "OK",
            });
            document.getElementById("contact-form").reset(); // Clear form after submission
        })
        .catch(function (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to send the message. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
            console.error("EmailJS Error:", error);
        });
});
