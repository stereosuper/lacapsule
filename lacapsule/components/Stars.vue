<template>
    <canvas :class='[{"menuHovered": isBurgerHovered}, {"menuClicked": isBurgerClicked}, "stars"]' ref='stars'/>
</template>

<script>
export default {
    computed: {
        isBurgerHovered() {
            return this.$store.state.menuHTML.hoverBurger;
        },
        isBurgerClicked() {
            return this.$store.state.menuHTML.clickBurger;
        }
    },
    mounted() {
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        const canvas = this.$refs.stars;
        const ctx = canvas.getContext('2d');

        let windowW,
            windowH,
            stars,
            nbStars,
            comets,
            nbComets,
            currentComet = 0,
            drawingComet = true;

        function Star() {
            this.x = Math.random() * windowW;
            this.y = Math.random() * windowH;
            this.on = Math.random() > 0.1;
            this.size = Math.random() * (13 - 1) + 1;
            this.opacity = this.on ? Math.random() * 0.7 : 0;
            this.clign = Math.random() > 0.5;
            this.satellite = Math.random() > 0.98;
        }

        function CometElt(i, x, y, speed) {
            this.x = x - i * 2.5;
            this.y = y + i * 2.5;
            this.opacity = 0.1 * i;
            this.speed = speed;
        }

        function Comet() {
            this.elts = [];
            this.x = Math.random() * windowW;
            this.y = Math.random() * (windowH / 2);
            this.speed = Math.random() * (15 - 10) + 10;

            for (let i = 0; i < 30; i++) {
                this.elts[i] = new CometElt(i, this.x, this.y, this.speed);
            }
        }

        Star.prototype.draw = function() {
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

            stars.forEach(elt => {
                elt.draw();
            });

            if (drawingComet) {
                comets[currentComet].draw();
            } else {
                if (Math.random() > 0.9985) {
                    currentComet = currentComet === nbComets - 1 ? 0 : currentComet + 1;
                    comets[currentComet].draw();
                }
            }

            requestAnimationFrame(drawSky);
        }

        function init() {
            windowW = window.outerWidth;
            windowH = window.outerHeight;

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
    z-index: -1;
    transition: opacity $transition;
    &.menuHovered, &.menuClicked {
        opacity: 0.5;
    }
}
</style>