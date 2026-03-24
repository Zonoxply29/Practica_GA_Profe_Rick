function ReviewSlider() {
    // Config | Public variables
    this.allowArrows = true;
    this.allowBullets = true;
    this.allowAutoplay = true;
    this.autoplayTime = 10000; // 10s

    // Used by the pogram | Private
    const container = document.querySelector('.reviews-container');
    const cards = container.querySelectorAll('.review-card');
    const totalCards = cards.length - 1;
    let currentCard = -1;
    let playState = 0; // 0 = paused | 1 = playing
    let autoplay = setInterval;

    /* *************** */
    /*      Start      */
    /* *************** */

    this.start = () => {
        this.setBullets();
        this.setArrows();
        this.setStars();
        this.setSwipe();
        this.slideRight(); // necessary to start
        if (this.allowAutoplay) this.setAutoplay();
    }

    /* *************** */
    /* Setup Functions */
    /* *************** */

    this.setBullets = () => {
        if (!this.allowBullets) return;
    
        const bulletContainer = document.createElement('div');
        bulletContainer.classList.add('bullet-container');
    
        cards.forEach((card, i) => {
            const bullet = document.createElement('div');
            bullet.classList.add('bullet')
            bullet.id = `bullet-index-${i}`
            bullet.addEventListener('click', () => { 
                if (this.allowAutoplay && playState) this.stopAutoplay();
                this.goToIndex(i);
            })
            bulletContainer.appendChild(bullet);
            card.classList.add('proactivede');
        });
    
        container.appendChild(bulletContainer);
    }
    
    this.setArrows = () => {
        if (!this.allowArrows) return;
    
        // Left arrow
        const leftArrow = document.createElement('button');
        const iLeft = document.createElement('i');
    
        iLeft.classList.add('fas');
        iLeft.classList.add('fa-arrow-left');
    
        leftArrow.classList.add('arrow');
        leftArrow.classList.add('arrow-left');
        leftArrow.setAttribute('aria-label', 'Previous Review');
        leftArrow.appendChild(iLeft);
    
        leftArrow.addEventListener('click', () => {  
            if (this.allowAutoplay && playState) this.stopAutoplay();
            this.slideLeft();
        });
    
        // Right arrow
        const rightArrow = document.createElement('button');
        const iRight = document.createElement('i');
    
        iRight.classList.add('fas');
        iRight.classList.add('fa-arrow-right');
    
        rightArrow.classList.add('arrow');
        rightArrow.classList.add('arrow-right');
        rightArrow.setAttribute('aria-label', 'Next Review');
        rightArrow.appendChild(iRight);
    
        rightArrow.addEventListener('click', () => {
            if (this.allowAutoplay && playState) this.stopAutoplay();
            this.slideRight();
        });
    
        container.appendChild(leftArrow);
        container.appendChild(rightArrow);
    }

    this.setStars = () => {
        cards.forEach(card => {
            const starCount = parseInt(card.getAttribute('data-stars'));
            const starsContainer = document.createElement('div');
            starsContainer.classList.add('review-stars');
            
            if (!starCount) return

            for (let i = 0; i < 5; i++) {
                let star = document.createElement('i');

                if (i < starCount) {
                    star.classList.add('fas'); // full
                } else {
                    star.classList.add('far'); // empty
                }
                
                star.classList.add('fa-star');

                starsContainer.appendChild(star);
            }

            card.querySelector('.review-head').appendChild(starsContainer);
        })
    }

    this.setSwipe = () => {
        let swipeStartX = 0;
        let swipeEndX = 0;
    
        container.addEventListener('touchstart', (e) => {
            swipeStartX = e.changedTouches[0].screenX;
        }, false);
    
        container.addEventListener('touchend', (e) => {
            swipeEndX = e.changedTouches[0].screenX;
            this.updateSwipe(swipeStartX, swipeEndX);
        }, false);
    }

    this.setAutoplay = () => {
        playState = 1;
        autoplay = setInterval( this.slideRight, this.autoplayTime);
    }

    /* **************** */
    /* Core Functions */
    /* **************** */

    this.stopAutoplay = () => {
        playState = 0;
        clearTimeout(autoplay);
    }

    this.updateSwipe = (swipeStartX, swipeEndX) => {
        const swipeThreshold = 50; // Minimum distance to consider a "swipe"
    
        if (swipeEndX < swipeStartX - swipeThreshold) {
            if (this.allowAutoplay && playState) this.stopAutoplay();
            this.slideRight();
        }

        if (swipeEndX > swipeStartX + swipeThreshold) {
            if (this.allowAutoplay && playState) this.stopAutoplay();
            this.slideLeft();
        }
    }
    
    this.updateBullets = () => {
        container.querySelector('.bullet-container').querySelectorAll('.bullet').forEach((bullet, i) => {
            bullet.classList.remove('active');
            if (i === currentCard) {
                bullet.classList.add('active');
            }
        })
    }
    
    this.slideRight = () => {
        if (currentCard < totalCards) {
            currentCard++;
        } else {
            currentCard = 0;
        }
    
        if (currentCard > 0) {
            var preactiveCard = cards[currentCard - 1];
        } else {
            var preactiveCard = cards[totalCards];
        }
    
        if (currentCard < totalCards) {
            var proactiveCard = cards[currentCard + 1];
        } else {
            var proactiveCard = cards[0];
    
        }
    
        cards.forEach(card => {
            card.setAttribute('aria-hidden', 'true');
            
            if (card.classList.contains('preactivede')) {
                this.cleanClasses(card);
                card.classList.add('proactivede');
            }
            if (card.classList.contains('preactive')) {
                this.cleanClasses(card);
                card.classList.add('preactivede');
            }
        });

        this.updateCards(preactiveCard, proactiveCard);
    }
    
    this.slideLeft = () => {
        if (currentCard > 0) {
            currentCard--;
        } else {
            currentCard = totalCards;
        }
    
        if (currentCard < totalCards) {
            var proactiveCard = cards[currentCard + 1];
        } else {
            var proactiveCard = cards[0];
        }
    
        if (currentCard > 0) {
            var preactiveCard = cards[currentCard - 1];
        } else {
            var preactiveCard = cards[totalCards];
        }
    
        cards.forEach(card => {
            card.setAttribute('aria-hidden', 'true');
            
            if (card.classList.contains('proactive')) {
                this.cleanClasses(card);
                card.classList.add('proactivede');
            }
            if (card.classList.contains('proactivede')) {
                this.cleanClasses(card);
                card.classList.add('preactivede');
            }
        });
        
        this.updateCards(preactiveCard, proactiveCard);
    }

    this.goToIndex = thisIndex => {
        const slideTilYouGetThere = (currentCard > thisIndex) ? this.slideRight : this.slideLeft;

        while (currentCard !== thisIndex) {
            slideTilYouGetThere();
        }
    }

    /* **************** */
    /* Helper Functions */
    /* **************** */

    this.updateCards = (preactiveCard, proactiveCard) => {
        var activeCard = cards[currentCard];

        this.cleanClasses(preactiveCard);
        preactiveCard.classList.add('preactive');
    
        this.cleanClasses(activeCard);
        activeCard.removeAttribute('aria-hidden');
        activeCard.classList.add('active');
    
        this.cleanClasses(proactiveCard);
        proactiveCard.classList.add('proactive');
    
        if (this.allowBullets) this.updateBullets();
    }

    this.cleanClasses = el => {
        el.classList.remove('preactivede');
        el.classList.remove('preactive');
        el.classList.remove('active');
        el.classList.remove('proactive');
        el.classList.remove('proactivede');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const reviewSlider = new ReviewSlider();
    reviewSlider.start();
});