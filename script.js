/* =========================================================
   RATAN.SEC
   INTERACTIONS / ANIMATIONS / APPOINTMENT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const isOpen =
            navMenu.classList.contains("open");

        menuToggle.textContent =
            isOpen ? "×" : "☰";

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation"
                : "Open navigation"
        );

    });


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.textContent = "☰";

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId =
                        entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       HERO TYPING EFFECT
    ===================================================== */

    const typingElement =
        document.getElementById("typingText");

    if (typingElement) {

        const commands = [
            "whoami",
            "./start_cyberlab",
            "cat security.txt",
            "./build_future"
        ];

        let commandIndex = 0;
        let characterIndex = 0;
        let deleting = false;


        function typeCommand() {

            const currentCommand =
                commands[commandIndex];


            if (!deleting) {

                typingElement.textContent =
                    currentCommand.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;


                if (
                    characterIndex ===
                    currentCommand.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeCommand,
                        1800
                    );

                    return;
                }

            } else {

                typingElement.textContent =
                    currentCommand.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;


                if (characterIndex === 0) {

                    deleting = false;

                    commandIndex =
                        (commandIndex + 1)
                        % commands.length;

                }

            }


            setTimeout(
                typeCommand,
                deleting ? 45 : 80
            );

        }


        typeCommand();

    }


    /* =====================================================
       PARTICLES
    ===================================================== */

    const particles =
        document.getElementById("particles");


    if (particles) {

        const particleCount =
            window.innerWidth < 600
                ? 25
                : 55;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const particle =
                document.createElement("span");

            particle.className =
                "particle";


            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.animationDuration =
                `${8 + Math.random() * 15}s`;

            particle.style.animationDelay =
                `${Math.random() * 10}s`;

            particle.style.opacity =
                `${0.15 + Math.random() * 0.35}`;


            particles.appendChild(
                particle
            );

        }

    }


    /* =====================================================
       CARD MOUSE GLOW / TILT
    ===================================================== */

    const interactiveCards =
        document.querySelectorAll(
            ".skill-card, .project-card, .cert-card, .writeup-card, .lab-card"
        );


    interactiveCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 700) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) * -2;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 2;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-7px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       PROFILE MOUSE EFFECT
    ===================================================== */

    const profile =
        document.querySelector(
            ".profile-terminal"
        );


    if (profile) {

        profile.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900) {
                    return;
                }

                const rect =
                    profile.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const rotateY =
                    ((x - rect.width / 2) /
                        rect.width) * 5;


                const rotateX =
                    ((y - rect.height / 2) /
                        rect.height) * -5;


                profile.style.transform =
                    `perspective(1200px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        profile.addEventListener(
            "mouseleave",
            () => {

                profile.style.transform =
                    `perspective(1200px)
                     rotateY(-3deg)`;

            }
        );

    }


    /* =====================================================
       APPOINTMENT FORM
    ===================================================== */

    const bookingForm =
        document.getElementById(
            "bookingForm"
        );

    const bookingStatus =
        document.getElementById(
            "bookingStatus"
        );

    const bookingSubmit =
        document.getElementById(
            "bookingSubmit"
        );

    const bookingSuccess =
        document.getElementById(
            "bookingSuccess"
        );

    const newBooking =
        document.getElementById(
            "newBooking"
        );


    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                if (!bookingForm.checkValidity()) {

                    bookingForm.reportValidity();

                    return;

                }


                const originalButton =
                    bookingSubmit.innerHTML;


                bookingSubmit.disabled = true;

                bookingSubmit.innerHTML =
                    `
                    <span>
                        TRANSMITTING...
                    </span>
                    <b>↗</b>
                    `;


                bookingStatus.textContent =
                    "SYSTEM // SENDING REQUEST...";

                bookingStatus.classList.remove(
                    "error"
                );


                try {

                    const formData =
                        new FormData(
                            bookingForm
                        );


                    const response =
                        await fetch(
                            bookingForm.action,
                            {
                                method: "POST",

                                body: formData,

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    if (response.ok) {

                        bookingStatus.textContent =
                            "";

                        bookingForm
                            .querySelectorAll(
                                ".form-group, .form-status-bar, .submit-button"
                            )
                            .forEach(element => {

                                element.style.display =
                                    "none";

                            });


                        bookingSuccess.classList.add(
                            "show"
                        );

                        bookingSuccess.setAttribute(
                            "aria-hidden",
                            "false"
                        );


                        bookingForm
                            .scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });


                    } else {

                        throw new Error(
                            "Form submission failed."
                        );

                    }


                } catch (error) {

                    console.error(error);


                    bookingStatus.textContent =
                        "ERROR // REQUEST COULD NOT BE SENT. PLEASE TRY AGAIN.";

                    bookingStatus.classList.add(
                        "error"
                    );


                    bookingSubmit.disabled =
                        false;

                    bookingSubmit.innerHTML =
                        originalButton;

                }

            }
        );

    }


    /* =====================================================
       NEW APPOINTMENT
    ===================================================== */

    if (newBooking) {

        newBooking.addEventListener(
            "click",
            () => {

                bookingSuccess.classList.remove(
                    "show"
                );

                bookingSuccess.setAttribute(
                    "aria-hidden",
                    "true"
                );


                bookingForm
                    .querySelectorAll(
                        ".form-group, .form-status-bar, .submit-button"
                    )
                    .forEach(element => {

                        element.style.display =
                            "";

                    });


                bookingForm.reset();


                bookingSubmit.disabled =
                    false;


                bookingSubmit.innerHTML =
                    `
                    <span>
                        REQUEST APPOINTMENT
                    </span>
                    <b>→</b>
                    `;


                bookingStatus.textContent =
                    "";


                document
                    .getElementById(
                        "booking"
                    )
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }


    /* =====================================================
       MINIMUM DATE = TODAY
    ===================================================== */

    const bookingDate =
        document.getElementById(
            "bookingDate"
        );


    if (bookingDate) {

        const today =
            new Date();


        const year =
            today.getFullYear();


        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                today.getDate()
            ).padStart(2, "0");


        bookingDate.min =
            `${year}-${month}-${day}`;

    }


    /* =====================================================
       EXTERNAL LINK CONFIRMATION EFFECT
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                link.classList.add(
                    "link-clicked"
                );

                setTimeout(() => {

                    link.classList.remove(
                        "link-clicked"
                    );

                }, 500);

            }
        );

    });


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%c RATAN.SEC ",
        "background:#20ff78;color:#020604;font-weight:bold;padding:8px;"
    );

    console.log(
        "%c SYSTEM ONLINE // CYBERSECURITY PORTFOLIO ",
        "color:#20ff78;font-family:monospace;"
    );

    console.log(
        "%c Ethical hacking. Security. Learning. ",
        "color:#8b9b91;font-family:monospace;"
    );

});