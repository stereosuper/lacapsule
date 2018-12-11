<template>
    <li :class='[item.ref, "item"]'>
        <div :id='item.ref'></div>
        <a :href='item.link.slug ? item.link.slug : item.link.url' :target='item.link.target' class='link'>{{ item.label }}</a>
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
.item{
    position: absolute;
    &:before{
        display: none;
    }
    &:nth-of-type(1){
        top: 30%;
        left: $gutter*2;
    }
}

.link{
    display: none;
    position: absolute;
    font-family: $league;
    font-style: normal;
    color: #fff;
    text-decoration: none;
}

.arrow{
    .link{
        top: 60%;
        left: 68%;
    }
}
</style>
