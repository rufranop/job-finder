<template>
    <div class="view">
        <job-list :positions="positions" />
        <selected-position />
    </div>
</template>

<script>
    import JobList from '../components/JobList'
    import SelectedPosition from '../components/SelectedPosition'

    export default {
        components: {
            JobList,
            SelectedPosition
        },
        computed: {
            positions() {
                return this.$store.getters['getSavedPositions']
            }
        },
        mounted() {
            this.$store.dispatch('selectPosition', this.positions[0])
        }
    }
</script>
