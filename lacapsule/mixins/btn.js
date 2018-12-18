import { TweenMax } from 'gsap';

export default {
    methods: {
        setBtn(){
            const btn = document.getElementsByClassName('button');

            if(!btn.length) return;

            let glow,
                glowWrapper,
                i = 0,
                nbBtn = btn.length,
                btnCoordinates,
                glowX,
                glowY,
                distance,
                btnW,
                btnH;

            for (i; i < nbBtn; i++) {
                glowWrapper = document.createElement('i');
                glowWrapper.className = 'glow-wrapper';
                glow = document.createElement('i');
                glow.className = 'glow';

                btn[i].querySelector('a').appendChild(glowWrapper);
                btn[i].querySelector('.glow-wrapper').appendChild(glow);

                btn[i].addEventListener('mouseenter', function() {
                    btnCoordinates = this.getBoundingClientRect();
                    btnW = this.offsetWidth;
                    btnH = this.offsetHeight;
                    TweenMax.to(glow, 0.3, { opacity: 1 });
                });

                btn[i].addEventListener('mouseleave', function() {
                    TweenMax.to(glow, 0.3, { opacity: 0 });
                });

                btn[i].addEventListener('mousemove', function(e) {
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
