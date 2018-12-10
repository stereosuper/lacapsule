<template>
    <li>
        <a :href='item.link.slug ? item.link.slug : item.link.url' :target='item.link.target'>{{ item.label }}</a>
    </li>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang='scss' scoped>
</style>
