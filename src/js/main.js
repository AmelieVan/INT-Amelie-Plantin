{
  gsap.registerPlugin(TextPlugin, ScrollTrigger);

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

      $letter.addEventListener('touchstart', (event) => {
        event.target.style.opacity = '0.5';
        event.dataTransfer = { setData: (_, value) => event.target.dataset.letter = value };
      });

      $letter.addEventListener('touchend', (event) => {
        event.target.style.opacity = '1';
      });

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

    box.addEventListener('drop', (event) => {
      event.preventDefault();
      handleDrop(event, box, index);
    });

    // Touch support
    box.addEventListener('touchend', (event) => {
      const letter = document.querySelector(`[data-letter="${event.target.dataset.letter}"]`);
      if (letter) handleDrop({ dataTransfer: { getData: () => letter.dataset.letter } }, box, index);
    });
  });

  const handleDrop = (event, box, index) => {
    const letter = event.dataTransfer.getData('text');
    const draggedLetter = document.querySelector(`[data-letter="${letter}"]`);

    if (draggedLetter) {
      if (motto[index] === letter && !box.textContent) {
        box.textContent = letter;
        currentOrder[index] = letter;
        draggedLetter.classList.add('chapter-two__hidden');
        box.classList.add('chapter-two__hidden');
        checkOrder();
      } else {
        box.classList.add('chapter-two__drop-box--incorrect');
        setTimeout(() => {
          box.classList.remove('chapter-two__drop-box--incorrect');
        }, 1000);
      }
    }
  };
  const checkOrder = () => {
    if (currentOrder.join('') === motto.join('')) {
      document.querySelector('.chapter-two__story').classList.remove('chapter-two__hidden');
    }
  };

  //GSAP
  const init = () => {
    const scrambledMotto = scrambleLetters(motto);
    showScrambledLetters(scrambledMotto);


    const chapterDivider1 = document.querySelectorAll(".chapter__divider1");
    const chapter_content = document.querySelectorAll(".chapter__content1");

    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

    tl.from(".chapter--one", { opacity: 0, y: 50 })
      .from(".chapter__number1", { x: -100, opacity: 0 }, "-=0.05")
      .from(".chapter__title--one", { opacity: 0, scale: 0.8 }, "-=0.03")
      .from(chapterDivider1, { height: 0, stagger: 0.5 }, "-=0.03")
      .from(chapter_content, { y: 20, opacity: 0, stagger: 0.5 }, "-=0.05");

    gsap.to(".chapter__interaction--image", {
      x: -20,
      duration: 1,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1,
    });

    gsap.from(".chapter__number--four", {
      opacity: 0,
      y: -50,
      duration: 1,
      scrollTrigger: {
        trigger: ".chapter--four",
        start: "top 80%",
        end: "top 60%",
        scrub: true,
      },
    });

    gsap.utils.toArray(".text-reveal").forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%", 
          end: "top 60%", 
          scrub: true, 
        },
      });
    });

    document.querySelectorAll(".chapter-two__letter").forEach((letter) => {
      letter.addEventListener("mouseenter", () => {
        gsap.to(letter, { scale: 1.2, backgroundColor: "#EC8E54", duration: 0.3 });
      });
      letter.addEventListener("mouseleave", () => {
        gsap.to(letter, { scale: 1, backgroundColor: "#f0f0f0", duration: 0.3 });
      });
    });

    gsap.from(".chapter-two__drop-box", {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "bounce.out",
      scrollTrigger: {
        trigger: ".chapter-two__drop-zone",
        start: "top 90%",
        end: "top 70%",
        scrub: true,
      },
    });

    // Highlight animation for correct letter drop
    const highlightDropZone = (dropBox) => {
      gsap.fromTo(
        dropBox,
        { boxShadow: "0px 0px 0px rgba(236, 142, 84, 0.8)" },
        { boxShadow: "0px 0px 20px rgba(236, 142, 84, 0.8)", duration: 0.5, yoyo: true, repeat: 1 }
      );
    };

    document.querySelectorAll(".chapter-two__drop-box").forEach((dropBox) => {
      dropBox.addEventListener("drop", () => highlightDropZone(dropBox));
    });

    const mm = gsap.matchMedia();
    mm.add(
      {
        isXs: "(max-width: 592px)",
        isMd: "(min-width: 600px) and (max-width: 1024px)",
        isLg: "(min-width: 1025px)",
        hasReducedMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { conditions } = context;

        const inkDropAnimation = {
          trigger: ".chapter--one",
          start: "-30% top top",
          end: "bottom top",
          scrub: true,
          markers: false,
        };

        if (conditions.isXs) {
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
          gsap.to(".header__ink-drop", {
            scale: 3,
            y: "125rem",
            x: "3rem",
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
          gsap.to(".header__ink-drop", {
            scale: 3,
            y: "128rem",
            x: "3rem",
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
              x: "-10%",
              rotation: -20,
              opacity: 0,
            },
            {
              y: "0%",
              x: "0%",
              rotation: 0,
              opacity: 1,
              duration: 2.5,
              ease: "power2.out",
            }
          );

          const sections = document.querySelectorAll(".chapter-three__content > div");
          gsap.to(".chapter-three__content", {
            scrollTrigger: {
              trigger: ".chapter--three",
              start: "top top",
              end: "+=" + sections.length * window.innerWidth,
              scrub: true,
              pin: true,
              markers: false,
            },
            xPercent: -50 * (sections.length - 1),
          });


        }
      }
    );
  };

  init();
}