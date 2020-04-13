<template>
    <main class="selected-position" :class="{'visible': position}" v-if="position">
        <!-- <div class="back-arrow" v-if="isMobile" @click="closeModal()">
            <svg><use xlink:href="#back"></use></svg>
            <span>Go back</span>
        </div> -->
        <h1>{{ position.title }}</h1>
        <div class="details">
            <p><svg><use xlink:href="#company"></use></svg>{{ position.company }}</p>
            <p><svg><use xlink:href="#geo"></use></svg>{{ position.location }}</p>
            <p><svg><use xlink:href="#clock"></use></svg>{{ position.type }}</p>
            <p><svg><use xlink:href="#calendar"></use></svg>{{ date }}</p>
            <a :href="applyLink" target="_blank" class="apply-link">Apply Now</a>
        </div>
        <div class="description" v-html="position.description">
            {{ position.description }}
        </div>
    </main>
</template>

<script>
    export default {
        computed: {
            position() {
                return this.$store.getters['getSelectedPosition']
            },
            applyLink() {
                let link = this.position.how_to_apply;

                return link ? link.match(/href="([^"]*)/)[1] : ''
            },
            date() {
                return this.$dayjs(this.position.created_at).format('DD MMM YYYY')
            }
        },
        methods: {
            closeModal() {
                this.$store.dispatch('updateModalVisibility', false)
            }
        }
    }
</script>
