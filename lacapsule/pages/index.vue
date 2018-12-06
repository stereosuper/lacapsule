<template>
    <div>
        <siteHeader/>
        
        <div class='container'>
            <div class='text'>
                <h1 class='title'>{{ home.title[0].text }}</h1>
                <div v-html='homeText'/>
            </div>
        </div>

        <div class='earth'></div>
        <div class='ovni'></div>
    </div>
</template>

<script>
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

import { TweenMax } from 'gsap';

import SiteHeader from '~/components/Header.vue';

export default {
    components: {
        SiteHeader
    },
    mounted: function() {
        const btn = document.getElementsByClassName('button');
        let glow,
            i = 0,
            nbBtn = btn.length,
            btnCoordinates,
            mouseX,
            mouseY,
            glowX,
            glowY,
            distanceMax,
            distance;

        for (i; i < nbBtn; i++) {
            glow = document.createElement('i');
            glow.className = 'glow';

            btn[i].querySelector('a').appendChild(glow);

            btn[i].addEventListener('mouseenter', function(e) {
                TweenMax.to(glow, 0.2, { opacity: 1 });

                btnCoordinates = this.getBoundingClientRect();
                mouseX = this.offsetWidth - (e.clientX - btnCoordinates.x); // inverted position x in btn
                mouseY = this.offsetHeight - (e.clientY - btnCoordinates.y); // inverted position y in btn

                if (mouseX <= 0) {
                    glowX = 0;
                } else if (mouseX >= this.offsetWidth) {
                    glowX = this.offsetWidth;
                } else {
                    glowX = mouseX;
                }

                if (mouseY <= 0) {
                    glowY = 0;
                } else if (mouseY >= this.offsetHeight) {
                    glowY = this.offsetHeight;
                } else {
                    glowY = mouseY;
                }

                distance = 1 - Math.abs(e.clientX - btnCoordinates.x - glowX)/this.offsetWidth;

                TweenMax.set(glow, { x: glowX, y: glowY, scale: distance });
            });

            btn[i].addEventListener('mousemove', function(e) {
                mouseX = this.offsetWidth - (e.clientX - btnCoordinates.x); // inverted position x in btn
                mouseY = this.offsetHeight - (e.clientY - btnCoordinates.y); // inverted position y in btn

                if (mouseX <= 0) {
                    glowX = 0;
                } else if (mouseX >= this.offsetWidth) {
                    glowX = this.offsetWidth;
                } else {
                    glowX = mouseX;
                }

                if (mouseY <= 0) {
                    glowY = 0;
                } else if (mouseY >= this.offsetHeight) {
                    glowY = this.offsetHeight;
                } else {
                    glowY = mouseY;
                }

                distance = 1 - Math.abs(e.clientX - btnCoordinates.x - glowX)/this.offsetWidth;

                TweenMax.set(glow, { x: glowX, y: glowY, scale: distance });
            });
        }
    },
    async asyncData() {
        const apiEndpoint = 'https://lacapsule.cdn.prismic.io/api/v2';
        const api = await Prismic.getApi(apiEndpoint);

        let home = {},
            homeText;

        await api
            .query(Prismic.Predicates.at('document.type', 'frontpage'))
            .then(function(response) {
                home = response.results[0].data;
                homeText = PrismicDOM.RichText.asHtml(home.text);
            });

        return { home, homeText };
    }
};
</script>

<style lang='scss' scoped>
h1 {
    margin-top: 0;
}

.container {
    position: relative;
    top: -50%;
    margin-top: 35vh;
    z-index: 1;
}

.text {
    width: 40%;
}

.earth {
    width: 358px;
    height: 357px;
    position: absolute;
    top: 0;
    left: 25%;
    background: url(../static/img/earth.png) no-repeat 0 0 / 100%;
}
.ovni {
    width: 1038px;
    height: 677px;
    position: absolute;
    top: 25%;
    left: 54%;
    background: url(../static/img/ovni.png) no-repeat 0 0 / 100%;
}
</style>
