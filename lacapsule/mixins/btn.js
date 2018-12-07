import { TweenMax } from 'gsap';

export default {
    mounted() {
        const btn = document.getElementsByClassName('button');
        let glow,
            glowWrapper,
            i = 0,
            nbBtn = btn.length,
            btnCoordinates,
            mouseX,
            mouseY,
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
                mouseX = btnW - (e.clientX - btnCoordinates.x);
                mouseY = btnH - (e.clientY - btnCoordinates.y);

                if (mouseX <= 0) {
                    glowX = 0;
                } else if (mouseX >= btnW) {
                    glowX = btnW;
                } else {
                    glowX = mouseX;
                }

                if (mouseY <= 0) {
                    glowY = 0;
                } else if (mouseY >= btnH) {
                    glowY = btnH;
                } else {
                    glowY = mouseY;
                }

                // distance from glow to cursor
                distance = 1.3 - Math.abs(e.clientX - btnCoordinates.x - glowX)/btnW;

                TweenMax.set(glow, { x: glowX, y: glowY, scale: distance });

                if(!TweenMax.isTweening(glow)){
                    TweenMax.set(glow, { opacity: distance });
                }
            });
        }
    }
};