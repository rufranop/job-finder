<template>
    <form class="filter-form" @submit.prevent="doSearch()">
        <label for="description">
            <input id="description" type="text" placeholder="Search for a job" v-model="description">
            <svg><use xlink:href="#search"></use></svg>
        </label>
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

            if (this.$route.name !== 'Home') {
                this.$router.push({name: 'Home'});
            }

            let description = encodeURI(this.description);
            let location = encodeURI(this.location);

            this.$axios
            .get(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${description}&location=${location}`)
            .then(response => {
                this.$store.dispatch('updatePositions', response.data);
                this.$store.dispatch('selectPosition', response.data[0]);
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
