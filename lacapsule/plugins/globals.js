import Vue from 'vue';

export default (context, inject) => {
  inject('busPageMounted', new Vue());
}
