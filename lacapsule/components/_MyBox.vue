<script>
// Helper functions to convert a percentage of canvas area to pixels.
// const percentWidthToPix = (percent, ctx) => Math.floor((ctx.canvas.width / 100) * percent)
// const percentHeightToPix = (percent, ctx) => Math.floor((ctx.canvas.height / 100) * percent)

export default {
    // Gets us the provider property from the parent <my-canvas> component.
    //inject: ['provider'],

    props: {
        // id: {
        //     type: Number,
        //     default: 0
        // },
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        },
        on: {
            type: Boolean,
            default: true
        },
        size: {
            type: Number,
            default: 10
        },
        opacity: {
            type: Number,
            default: 0.7
        },
        clign: {
            type: Boolean,
            default: true
        },
        satellite: {
            type: Boolean,
            default: false
        }
        // context: {
        //     type: CanvasRenderingContext2D,
        //     default: function() {
        //         return {};
        //     }
        // }
    },

    data() {
        return {
            // We cache the dimensions of the previous
            // render so that we can clear the area later.
            // oldBox: {
            //     x: null,
            //     y: null,
            //     w: null,
            //     h: null
            // }
        };
    },

    computed: {
        // calculatedBox () {
        //     const ctx = this.provider.context;
        //     // Turn start / end percentages into x, y, width, height in pixels.
        //     const calculated = {
        //         x: percentWidthToPix(this.x1, ctx),
        //         y: percentHeightToPix(this.y1, ctx),
        //         w: percentWidthToPix(this.x2 - this.x1, ctx),
        //         h: percentHeightToPix(this.y2 - this.y1, ctx)
        //     }
        //     // Yes yes, side-effects. This lets us cache the box dimensions of the previous render.
        //     // before we re-calculate calculatedBox the next render.
        //     this.oldBox = calculated
        //     return calculated
        // }
    },

    created() {
        // Since the parent canvas has to mount first, it's *possible* that the ctx may not be
        // injected by the time this render function runs the first time.
        const ctx = this.context;
        console.log(this);

        if (!ctx) return;

        const halfSize = this.size / 2;
        const curve = this.size / 2.75;
        const maxX = this.x + halfSize;
        const maxY = this.y + halfSize;
        const random = Math.random();
        let speed = random > 0.99 ? random * (0.01 - 0.005) + 0.005 : random * (0.001 - 0.005) + 0.005;

        // if (this.satellite) {
        //     speed = 0.01;
        //     this.on = true;
        // }

        // if (this.on) {
        //     if (this.opacity > random * (0.8 - 0.6) + 0.6 || this.opacity < random * 0.3) {
        //         this.clign = !this.clign;
        //     }
        //     this.opacity = this.clign ? this.opacity + speed : this.opacity - speed;
        //     this.on = random > 0.005;
        // } else {
        //     this.opacity = this.opacity < 0 ? 0 : this.opacity - speed;
        //     this.on = random > 0.5;
        // }

        ctx.fillStyle = '#fff';

        // fix - canvas desn't understand negative values
        ctx.globalAlpha = this.opacity < 0 ? 0 : this.opacity;
        ctx.globalAlpha = this.opacity > 1 ? 1 : this.opacity;

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
    },
    render() {
        console.log(this);
        return this.$slot.default;
    }
};
</script>
