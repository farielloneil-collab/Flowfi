// Text Scramble Effect from Motion Primitives
class TextScramble {
    constructor(element) {
        this.element = element;
        this.originalText = element.getAttribute('data-original-text') || element.innerText;
        this.duration = 0.8; // seconds, matching user request
        this.speed = 0.04; // seconds
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        this.isAnimating = false;

        // Store original text in attribute if not already there
        if (!element.getAttribute('data-original-text')) {
            element.setAttribute('data-original-text', this.originalText);
        }

        this.init();
    }

    init() {
        // Trigger on intersection (when scrolled into view)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimating) {
                    this.scramble();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(this.element);
    }

    scramble() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const steps = this.duration / this.speed;
        let step = 0;

        // Use the stored original text to ensure consistency
        const targetText = this.originalText;

        const interval = setInterval(() => {
            let scrambled = '';
            const progress = step / steps;

            for (let i = 0; i < targetText.length; i++) {
                if (targetText[i] === ' ' || targetText[i] === '\n') {
                    scrambled += targetText[i];
                    continue;
                }

                if (progress * targetText.length > i) {
                    scrambled += targetText[i];
                } else {
                    scrambled += this.chars[Math.floor(Math.random() * this.chars.length)];
                }
            }

            this.element.innerText = scrambled;
            step++;

            if (step > steps) {
                clearInterval(interval);
                this.element.innerText = targetText;
                this.isAnimating = false;
            }
        }, this.speed * 1000); // interval is in ms
    }
}

// Global initialization function
window.initTextScramble = () => {
    const elements = document.querySelectorAll('.text-scramble');
    elements.forEach(el => new TextScramble(el));
};
