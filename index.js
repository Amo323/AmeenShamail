document.addEventListener('DOMContentLoaded', () => {
  // ======= Typed Text Animation =======
  const typedTextSpan = document.querySelector('.typed-text');
  if (typedTextSpan) {
    const phrases = [
      'Network Engineer.',
      'Web Developer.',
      'AI prompt engineering.'
    ];
    let phraseIndex = 0;
    let letterIndex = 0;
    let currentPhrase = '';
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;  // Made deleting faster for better effect
    const delayBetweenPhrases = 2000;  // Pause when fully typed
    const delayAfterDelete = 1000;  // Short pause after deleting

    function type() {
      if (!typedTextSpan) return;

      const currentFullPhrase = phrases[phraseIndex];

      if (isDeleting) {
        // Deleting characters
        if (letterIndex > 0) {
          letterIndex--;
          currentPhrase = currentFullPhrase.substring(0, letterIndex);
          typedTextSpan.textContent = currentPhrase;
          setTimeout(type, deletingSpeed);
        } else {
          // Finished deleting, move to next phrase
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, delayAfterDelete);
        }
      } else {
        // Typing characters
        if (letterIndex < currentFullPhrase.length) {
          letterIndex++;
          currentPhrase = currentFullPhrase.substring(0, letterIndex);
          typedTextSpan.textContent = currentPhrase;
          setTimeout(type, typingSpeed);
        } else {
          // Finished typing, start deleting after pause
          isDeleting = true;
          setTimeout(type, delayBetweenPhrases);
        }
      }
    }

    type();
  }

  // ======= Smooth Scroll for Internal Links =======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});