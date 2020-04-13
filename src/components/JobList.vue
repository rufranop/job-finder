<template>
    <div class="job-list" :class="{'no-pagination': $route.name === 'Saved'}" v-if="positions">
        <job-list-item v-for="(position, index) in positions"
            :key="index"
            :position="position"
            :active="(position.id === selectedPosition.id)"
            @click="selectPosition(position)" />

            <div class="pagination">
                <button @click="back()" :disabled="pageCount <= 1">Back</button>
                <button @click="next()">Next</button>
            </div>
    </div>
</template>

<script>
    import JobListItem from './JobListItem'

    export default {
        props: ['positions'],
        components: {
            JobListItem
        },
        computed: {
            selectedPosition() {
                return this.$store.getters['getSelectedPosition']
            },
            pageCount() {
                return this.$store.getters['getPageCount']
            }
        },
        methods: {
            selectPosition(position) {
                this.$store.dispatch('selectPosition', position)
            },
            next() {
                this.$store.dispatch('updatePageCount', this.pageCount + 1);
                this.lookup();
            },
            back() {
                this.$store.dispatch('updatePageCount', this.pageCount - 1);
                this.lookup();
            },
            lookup() {
                this.$store.dispatch('toggleLoading', true);

                this.$axios
                .get(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?page=${this.pageCount}`)
                    .then(response => {
                        this.$store.dispatch('updatePositions', response.data);
                        this.$store.dispatch('selectPosition', response.data[0]);
                        this.$store.dispatch('toggleLoading', false);
                    })
                    .catch(() => {
                        // handle errors
                        this.$store.dispatch('toggleLoading', false);
                    });
            }
        }
    }
</script>
