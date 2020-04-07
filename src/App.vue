<template>
    <div id="app">
        <loader />
        <nav>
            <span>Job Finder</span>
            <filter-form />
        </nav>
        <aside class="sidebar" v-if="positions">
            <sidebar-item v-for="(position, index) in positions"
                :key="index"
                :position="position"
                :active="(position.id === selected.id)"
                @click="selectPosition(index)" />
        </aside>
        <selected-position v-if="selected" :position="selected" />
        <icons />
    </div>
</template>

<script>
    import SelectedPosition from './components/SelectedPosition'
    import SidebarItem from './components/SidebarItem'
    import Icons from './components/Icons'
    import FilterForm from './components/FilterForm'
    import Loader from './components/Loader'

    export default {
        name: 'app',
        components: {
            SelectedPosition,
            SidebarItem,
            Icons,
            FilterForm,
            Loader
        },
        computed: {
            isMobile() {
                return this.$store.getters['getMobileStatus']
            },
            positions() {
                return this.$store.getters['getPositions']
            }
        },
        data() {
            return {
                selected: false
            }
        },
        methods: {
            selectPosition(index) {
                this.selected = this.positions[index];

                if (this.isMobile) {
                    this.$store.dispatch('updateModalVisibility', true);
                }
            }
        },
        created() {
            this.$axios
                .get('https://proxy.paolo.dev/positions?description=&location=')
                .then(response => {
                    this.$store.dispatch('updatePositions', response.data);
                    this.selectPosition(0);
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
