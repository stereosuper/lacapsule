<template>
    <div>
        <canvas ref='stars' id='stars'></canvas>
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // By creating the provider in the data property, it becomes reactive,
            // so child components will update when `context` changes.
            provider: {
                // This is the CanvasRenderingContext that children will draw to.
                context: null
            }
        };
    },

    // Allows any child component to `inject: ['provider']` and have access to it.
    provide() {
        return {
            provider: this.provider
        };
    },

    mounted() {
        // We can't access the rendering context until the canvas is mounted to the DOM.
        // Once we have it, provide it to all child components.
        this.provider.context = this.$refs['stars'].getContext('2d');

        // Resize the canvas to fit the window
        this.$refs['stars'].width = window.outerWidth;
        this.$refs['stars'].height = window.outerHeight;
    }
};
</script>