<template>
    <div class="loader" v-if="isLoading">
        <div class="lds-dual-ring"></div>
    </div>
</template>

<script>
export default {
    computed: {
        isLoading() {
            return this.$store.getters['getLoading']
        }
    }
}
</script>
