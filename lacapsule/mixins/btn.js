import { TweenMax } from 'gsap';

export default {
    methods: {
        setBtn() {
            const btn = document.getElementsByClassName('button');

            if (!btn) return;

            let glow,
                glowWrapper,
                i = 0,
                nbBtn = btn.length,
                btnCoordinates,
                glowX,
                glowY,
                distance,
                btnW,
                btnH,
                btnLink;

            for (i; i < nbBtn; i++) {
                btnLink = btn[i].querySelector('a') || btn[i].querySelector('button');
                if (!btnLink) return;

                glowWrapper = document.createElement('i');
                glowWrapper.className = 'glow-wrapper';
                glow = document.createElement('i');
                glow.className = 'glow';

                btnLink.appendChild(glowWrapper);
                btn[i].querySelector('.glow-wrapper').appendChild(glow);

                btn[i].addEventListener('mouseenter', function() {
                    glow = this.querySelector('.glow');
                    btnCoordinates = this.getBoundingClientRect();
                    btnW = this.offsetWidth;
                    btnH = this.offsetHeight;
                    TweenMax.to(glow, 0.3, { opacity: 1 });
                });

                btn[i].addEventListener('mouseleave', function() {
                    glow = this.querySelector('.glow');
                    TweenMax.to(glow, 0.3, { opacity: 0 });
                });

                btn[i].addEventListener('mousemove', function(e) {
                    glow = this.querySelector('.glow');

                    // inverted cursor position in btn
                    glowX = btnW - (e.clientX - btnCoordinates.x);
                    glowY = btnH - (e.clientY - btnCoordinates.y);

                    // distance from glow to cursor
                    distance = 1.3 - Math.abs(e.clientX - btnCoordinates.x - glowX) / btnW;

                    TweenMax.set(glow, { x: glowX, y: glowY, scale: distance });

                    if (!TweenMax.isTweening(glow)) {
                        TweenMax.set(glow, { opacity: distance });
                    }
                });
            }
        }
    }
};
