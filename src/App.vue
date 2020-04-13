<template>
    <div id="app">
        <div class="top-bar">
            <span class="brand">Job Finder</span>
            <filter-form />
        </div>
        <side-nav />
        <router-view />
        <loader />
        <icons />
    </div>
</template>

<script>
    import Icons from './components/Icons'
    import Loader from './components/Loader'
    import FilterForm from './components/FilterForm'
    import SideNav from './components/SideNav'

    export default {
        name: 'app',
        components: {
            SideNav,
            Icons,
            Loader,
            FilterForm
        },
        computed: {
            isMobile() {
                return this.$store.getters['getMobileStatus']
            },
            pageCount() {
                return this.$store.getters['getPageCount']
            }
        },
        created() {
            this.$axios
                .get(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?page=${this.pageCount}`)
                    .then(response => {
                        this.$store.dispatch('updatePositions', response.data);
                        this.$store.dispatch('selectPosition', response.data[0]);
                        this.$store.dispatch('updateModalVisibility', false);
                        this.$store.dispatch('toggleLoading', false);
                    })
                    .catch(() => {
                        // handle errors
                    });

            let localData = window.localStorage.getItem('savedPositions');

            // check if the local storage item exists
            // then assign the data
            if (window.localStorage && localData) {
                this.$store.dispatch('populateSavedPositions', JSON.parse(localData));
            }

        }
    }
</script>

<style lang="scss">
    @import "./scss/styles.scss";
</style>
