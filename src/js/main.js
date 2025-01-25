{
  gsap.registerPlugin(ScrollTrigger);

  //ham menu
  const handleHamClick = () => {
    $hamMenu.classList.toggle('active');
    $offScreenMenu.classList.toggle('active');
  }

  const $hamMenu = document.querySelector('.ham-menu');
  const $offScreenMenu = document.querySelector('.off-screen-menu');
  const $menuLinks = document.querySelectorAll('.header__menu-link');

  const handleLinkClick = () => {
    $hamMenu.classList.remove('active');
    $offScreenMenu.classList.remove('active');
  };

  $hamMenu.addEventListener('click', handleHamClick);

  $menuLinks.forEach(link => {
    link.addEventListener('click', handleLinkClick);
  });

  //unscramble section
  const motto = ['L', 'A', 'B', 'O', 'R', 'E', 'E', 'T', 'C', 'O', 'N', 'S', 'T', 'A', 'N', 'T', 'I', 'A'];
  const $dropBoxes = document.querySelectorAll('.chapter-two__drop-box');
  let currentOrder = Array($dropBoxes.length).fill(null);

  const scrambleLetters = (letters) => {
    return letters
      .map((letter) => ({ letter, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item) => item.letter);
  };

  const showScrambledLetters = (letters) => {
    const $scrambledContainer = document.querySelector('.chapter-two__scrambled-letters');
    $scrambledContainer.innerHTML = '';

    letters.forEach((letter) => {
      const $letter = document.createElement('div');
      $letter.className = 'chapter-two__letter';
      $letter.setAttribute('draggable', true);
      $letter.setAttribute('data-letter', letter);
      $letter.textContent = letter;

      $letter.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text', event.target.dataset.letter);
      });

      $scrambledContainer.appendChild($letter);
    });
  };

  $dropBoxes.forEach((box, index) => {
    box.addEventListener('dragover', event => {
      event.preventDefault();
    });

    box.addEventListener('drop', event => {
      event.preventDefault();

      const letter = event.dataTransfer.getData('text');
      const draggedLetter = document.querySelector(`[data-letter="${letter}"]`);

      if (draggedLetter) {
        if (motto[index] === letter && !box.textContent) {
          box.textContent = letter;
          currentOrder[index] = letter;
          draggedLetter.classList.add('chapter-two__hidden');
          box.classList.add("chapter-two__hidden");
          checkOrder();
        } else {
          box.classList.add('chapter-two__drop-box--incorrect');
          setTimeout(() => {
            box.classList.remove('chapter-two__drop-box--incorrect');
          }, 1000);
        }
      }
    });
  });

  const checkOrder = () => {
    if (currentOrder.join('') === motto.join('')) {
      document.querySelector('.chapter-two__story').classList.remove('chapter-two__hidden');
    }
  };

  //GSAP

  const init = () => {
    const scrambledMotto = scrambleLetters(motto); // Scramble the motto
    showScrambledLetters(scrambledMotto); // Render the scrambled letters

    const mm = gsap.matchMedia();

    mm.add(
      {
        isXs: "(-width: 320px)",
        isMd: "(min-width: 600px) and (max-width: 1024px)",
        isLg: "(min-width: 1025px)",
        hasReducedMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { conditions } = context;

        // General ScrollTrigger animation setup for ink drop
        const inkDropAnimation = {
          trigger: ".chapter--one", // Trigger element
          start: "-30% top top", // Start when the section enters the viewport
          end: "bottom top", // End when the section exits the viewport
          scrub: true, // Smoothly scrubs the animation based on scroll
          markers: true, // Show markers for debugging
        };

        // Ink drop animations based on screen size
        if (conditions.isXs) {
          // Animation for extra small screens
          gsap.to(".header__ink-drop", {
            scale: 3,
            y: "100rem",
            scrollTrigger: inkDropAnimation,
          });

          // Header animations
          gsap.from(".header__hero-plantin", {
            x: "100%",
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.5,
          });

          gsap.from(".header__hero-title", {
            x: "-100%",
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
          });

          gsap.from(".header__hero-banner", {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.8,
          });
        } else if (conditions.isMd) {
          // Animation for medium screens
          gsap.to(".header__ink-drop", {
            scale: 3,
            y: "100rem",
            scrollTrigger: inkDropAnimation,
          });

          gsap.from(".header__hero-plantin", {
            x: "120%",
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            delay: 0.3,
          });

          gsap.from(".header__hero-title", {
            x: "-120%",
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
          });

          gsap.from(".header__hero-banner", {
            scale: 0.9,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.6,
          });
        } else if (conditions.isLg) {
          // Animation for large screens
          gsap.to(".header__ink-drop", {
            scale: 3,
            y: "110rem",
            scrollTrigger: inkDropAnimation,
          });

          const tl = gsap.timeline();

          tl.from(".header__hero-plantin", {
            x: "150%",
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
          })
            .from(
              ".header__hero-title",
              {
                x: "-150%",
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
              },
              "<"
            )
            .from(
              ".header__hero-banner",
              {
                scale: 0.7,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
              },
              "<+0.2"

            );
          gsap.fromTo(
            ".header__hero-quil",
            {
              y: "-100%",
              x: "-10%", // Initial position
              rotation: -20, // Slight tilt for a "feather-like" effect
              opacity: 0,
            },
            {
              y: "0%", // Drops into place
              x: "0%", // Moves slightly horizontally
              rotation: 0, // Ends in a neutral orientation
              opacity: 1,
              duration: 2.5, // Slow drop
              ease: "power2.out", // Smooth easing
            }
          );
          gsap.to(".chapter-three__content", {
            xPercent: -100, // Moves the content horizontally
            ease: "none",
            scrollTrigger: {
              trigger: ".chapter--three",
              start: "top top",
              end: "+=9000", // Adjust based on content length
              scrub: true,
              pin: true, // Pins the section in place
              anticipatePin: 1,
            },
          });

          // Image color change during scroll
          const colorChangeImages = [
            ".chapter-three__image-1",
            ".chapter-three__image-2",
          ];

          colorChangeImages.forEach((selector) => {
            gsap.to(selector, {
              filter: "grayscale(0%)", // Changes to full color
              scrollTrigger: {
                trigger: selector,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
              },
            });
          });
        }
      }
    );
  };

  init();
}