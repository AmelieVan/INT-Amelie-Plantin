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
    const scrambledMotto = scrambleLetters(motto); 
    showScrambledLetters(scrambledMotto); 

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

        const inkDropAnimation = {
          trigger: ".chapter--one", 
          start: "-30% top top", 
          end: "bottom top", 
          scrub: true, 
          markers: true, 
        };

        if (conditions.isXs) {
          gsap.to(".header__ink-drop", {
            scale: 3,
            y: "100rem",
            scrollTrigger: inkDropAnimation,
          });

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
              markers: true, 
            },
            xPercent: -200 * (sections.length - 1),
          });


        }
      }
    );
  };

  init();
}