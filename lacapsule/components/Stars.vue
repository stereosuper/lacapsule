<template>
    <canvas :class='[{"menuHovered": isBurgerHovered}, {"menuClicked": isBurgerClicked}, "stars"]' ref='stars'/>
</template>

<script>
import ranger from '@zadvorsky/ranger';

export default {
    computed: {
        isBurgerHovered() {
            return this.$store.state.menuHTML.hoverBurger;
        },
        isBurgerClicked() {
            return this.$store.state.menuHTML.clickBurger;
        }
    },
    watch: {
        $route(){
            this.transitionStart = Date.now();
            this.isTransitioning = true;
            this.$store.commit('setPageTransitioning', true);
        }
    },
    data(){
        return {
            transitionStart: 0,
            isTransitioning: false
        }
    },
    mounted() {
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        const self = this,
              canvas = this.$refs.stars,
              ctx = canvas.getContext('2d');

        let windowW,
            windowH,
            stars,
            nbStars,
            comets,
            nbComets,
            currentComet = 0,
            drawingComet = true,
            randomComet = 0;

        function Star() {
            this.x = Math.random() * windowW;
            this.afterSmooth = 0;
            this.y = Math.random() * windowH;
            this.on = Math.random() > 0.1;
            this.size = Math.round((Math.random() * (13 - 1) + 1)*10)/10;
            this.oSize = this.size;
            this.opacity = this.on ? Math.random() * 0.7 : 0;
            this.clign = Math.random() > 0.5;
            this.satellite = Math.random() > 0.98;
            this.distanceDone = 0;
        }

        function CometElt(i, x, y, speed) {
            this.x = x - i * 2.5;
            this.y = y + i * 2.5;
            this.opacity = 0.1 * i;
            this.speed = speed;
        }

        function Comet() {
            let i = 0;

            this.elts = [];
            this.x = Math.random() * windowW;
            this.y = Math.random() * (windowH / 2);
            this.speed = Math.random() * (15 - 10) + 10;

            for (i; i < 30; i++) {
                this.elts[i] = new CometElt(i, this.x, this.y, this.speed);
            }
        }

        function easeOutCubic(t) {
            return (--t)*t*t+1;
        }

        function lerp(value1, value2, amount) {
            amount = amount < 0 ? 0 : amount;
            amount = amount > 1 ? 1 : amount;
            return value1 + (value2 - value1) * amount;
        }

        Star.prototype.draw = function() {
            if(self.isTransitioning){
                let movingSpeedX, movingSpeedY, movingSize;

                self.isTransitioning = this.distanceDone < 1000;

                if(this.x > windowW/2){
                    movingSpeedX = Math.floor(ranger.mapFloat(this.x, windowW/2, windowW, 25, 15, easeOutCubic));
                    movingSpeedY = Math.floor(ranger.mapFloat(this.y, windowW/2, windowW, 0, 1, easeOutCubic)); 
                    movingSize = -ranger.mapFloat(this.x, windowW/2, windowW, 0.1, 0.3, easeOutCubic);
                }else{
                    movingSpeedX = Math.floor(ranger.mapFloat(this.x, 0, windowW/2, 15, 25, easeOutCubic));
                    movingSpeedY = Math.floor(ranger.mapFloat(this.y, 0, windowW/2, 1, 0, easeOutCubic));
                    movingSize = ranger.mapFloat(this.x, 0, windowW/2, 0.3, 0.1, easeOutCubic);       
                }
                
                this.x -= movingSpeedX;
                this.y += movingSpeedY/10;
                this.size += movingSize;

                this.distanceDone += movingSpeedX;
                this.afterSmooth = movingSpeedX;
            }else{
                this.afterSmooth = lerp(this.afterSmooth, 0, 0.097);
                this.x -= this.afterSmooth;

                if(this.afterSmooth < 0.4){
                    self.$store.commit('setPageTransitioning', false);
                }

                if(this.size > this.oSize){
                    this.size -= 0.1;
                }else if(this.size < this.oSize){
                    this.size += 0.1;
                }
                this.distanceDone = 0;
            }

            this.size = this.size < 0 ? 0 : this.size;
            this.x = this.x < 0 ? windowW : this.x;
            this.y = this.y < 0 ? windowH : this.y;
            
            let halfSize = this.size / 2,
                curve = this.size / 2.75,
                maxX = this.x + halfSize,
                maxY = this.y + halfSize,
                random = Math.random(),
                speed = random > 0.99 ? random * (0.01 - 0.005) + 0.005 : random * (0.001 - 0.005) + 0.005;

            if (this.satellite) {
                speed = 0.01;
                this.on = true;
            }

            if (this.on) {
                if (this.opacity > random * (0.8 - 0.6) + 0.6 || this.opacity < random * 0.3) {
                    this.clign = !this.clign;
                }
                this.opacity = this.clign ? this.opacity + speed : this.opacity - speed;
                this.on = random > 0.005;
            } else { 
                this.opacity = this.opacity < 0 ? 0 : this.opacity - speed;
                this.on = random > 0.5;
            }

            ctx.fillStyle = '#fff';

            // fix - canvas desn't understand negative values
            if (this.opacity < 0) {
                ctx.globalAlpha = 0;
            } else if (this.opacity > 1) {
                ctx.globalAlpha = 1;
            } else {
                ctx.globalAlpha = this.opacity;
            }

            ctx.beginPath();
            ctx.moveTo(maxX, this.y);
            ctx.bezierCurveTo(this.x + curve, maxY, this.x + curve, maxY, maxX, this.y + this.size);
            ctx.bezierCurveTo(this.x + this.size - curve, maxY, this.x + this.size - curve, maxY, maxX, this.y);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(this.x, maxY);
            ctx.bezierCurveTo(maxX, this.y + curve, maxX, this.y + curve, this.x + this.size, maxY);
            ctx.bezierCurveTo(maxX, this.y + this.size - curve, maxX, this.y + this.size - curve, this.x, maxY);
            ctx.fill();
            ctx.closePath();
        };

        CometElt.prototype.draw = function() {
            if (this.opacity <= 0) return false;

            ctx.globalAlpha = this.opacity > 1 ? 1 : this.opacity;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, Math.PI * 2, false);
            ctx.fill();

            this.opacity -= 0.07;
            this.x -= this.speed;
            this.y += this.speed;
            this.speed *= 0.97;

            return true;
        };

        Comet.prototype.draw = function() {
            this.elts.forEach(elt => {
                drawingComet = elt.draw();
            });
        };

        function drawSky() {
            ctx.clearRect(0, 0, windowW, windowH);

            stars.forEach(elt => { elt.draw(); });

            randomComet = self.isTransitioning ? 0 : 0.9985;

            if (drawingComet) {
                comets[currentComet].draw();
            } else {
                if (Math.random() > randomComet) {
                    currentComet = currentComet === nbComets - 1 ? 0 : currentComet + 1;
                    comets[currentComet].draw();
                }
            }

            requestAnimationFrame(drawSky);
        }

        function init() {
            windowW = window.innerWidth;
            windowH = window.innerHeight;

            canvas.width = windowW;
            canvas.height = windowH;

            stars = [];
            nbStars = windowW / 5;
            for (let i = 0; i < nbStars; i++) {
                stars[i] = new Star();
            }

            comets = [];
            nbComets = 50;
            currentComet = 0;
            for (let i = 0; i < nbComets; i++) {
                comets[i] = new Comet();
            }
            comets[currentComet].draw();
        }

        init();
        drawSky();

        window.addEventListener('resize', init);
    }
};
</script>

<style lang='scss' scoped>
.stars {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    //z-index: -1;
    transition: opacity $transition;
    &.menuHovered, &.menuClicked {
        opacity: 0.5;
    }
}
</style>