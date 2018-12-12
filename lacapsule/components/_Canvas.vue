<template>
    <div>
        <canvas ref='stars' id='stars'/>
        <star
            v-for='(star, index) in stars'
            :key='index'
            :x='star.x'
            :y='star.y'
            :on='star.on'
            :size='star.size'
            :opacity='star.on ? star.opacity : 0'
            :clign='star.clign'
            :satellite='star.satellite'
            :context='context'></star>
    </div>
</template>

<script>
//import StarsCanvas from './MyCanvas.vue';
import Star from './MyBox.vue';

export default {
    components: {
        //StarsCanvas,
        Star
    },

    methods: {
        handleResize() {
            this.windowW = window.outerWidth;
            this.windowH = window.outerHeight;
            this.nbStars = this.windowW / 5;
        },
        generateStarData() {
            return {
                x: Math.random() * this.windowW,
                y: Math.random() * this.windowH,
                on: Math.random() > 0.1,
                size: Math.random() * (13 - 1) + 1,
                opacity: Math.random() * 0.7,
                clign: Math.random() > 0.5,
                satellite: Math.random() > 0.98
            };
        },
        drawSky() {
            //context.clearRect(0, 0, canvas.width, canvas.height);
            // for (let i = 0; i < this.nbStars; i++) {
            //     this.stars[i] = this.generateStarData();
            // }
            //requestAnimationFrame(drawSky);
        }
    },

    data() {
        return {
            // chartValues: [
            //     {val: 24, color: 'red'},
            //     {val: 32, color: '#0f0'},
            //     {val: 66, color: 'rebeccapurple'},
            //     {val: 1, color: 'green'},
            //     {val: 28, color: 'blue'},
            //     {val: 60, color: 'rgba(150, 100, 0, 0.2)'},
            // ]
            windowW: 0,
            windowH: 0,
            stars: [],
            nbStars: 0,
            context: null
        };
    },

    // provide() {
    //     return {
    //         provider: this.provider
    //     };
    // },

    beforeMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();

        for (let i = 0; i < this.nbStars; i++) {
            this.stars[i] = this.generateStarData();
        }
    },

    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },

    // Randomly selects a value to randomly increment or decrement every 16 ms.
    // Not really important, just demonstrates that reactivity still works.
    mounted() {
        // let dir = 1;
        // let selectedVal = Math.floor(Math.random() * this.chartValues.length);
        // setInterval(() => {
        //     if (Math.random() > 0.995) dir *= -1;
        //     if (Math.random() > 0.99) selectedVal = Math.floor(Math.random() * this.chartValues.length);
        //     this.chartValues[selectedVal].val = Math.min(Math.max(this.chartValues[selectedVal].val + dir * 0.5, 0), 100);
        // }, 16);

        // We can't access the rendering context until the canvas is mounted to the DOM.
        // Once we have it, provide it to all child components.
        this.context = this.$refs.stars.getContext('2d');

        // Resize the canvas to fit the window
        this.$refs.stars.width = window.outerWidth;
        this.$refs.stars.height = window.outerHeight;

        //this.drawSky();
    }
};
</script>