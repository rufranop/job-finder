<template>
    <form class="filter-form" @submit.prevent="doSearch()">
        <label for="description">
            <input id="description" type="text" placeholder="Description" v-model="description">
        </label>
        <label for="location">
            <input id="location" type="text" placeholder="Location" v-model="location">
        </label>
        <button type="sumbit">
            <svg><use xlink:href="#search"></use></svg>
        </button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            description: '',
            location: ''
        }
    },
    methods: {
        doSearch() {
            this.$store.dispatch('toggleLoading', true);

            let description = encodeURI(this.description);
            let location = encodeURI(this.location);

            this.$axios
            .get(`https://proxy.paolo.dev/positions?description=${description}&location=${location}`)
            .then(response => {
                this.$store.dispatch('updatePositions', response.data);
                this.$parent.selectPosition(0);
                this.$store.dispatch('updateModalVisibility', false);
                this.$store.dispatch('toggleLoading', false);
            })
            .catch(() => {
                // handle errors
            });
        }
    }
}
</script>
