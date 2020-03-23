<template>
    <main class="selected-position" :class="{ 'visible': showMobileModal }">
        <div class="back-arrow" v-if="isMobile" @click="closeModal()">
            <svg><use xlink:href="#back"></use></svg>
            <span>Go back</span>
        </div>

        <h1>{{ position.title }}</h1>
        <div class="details">
            <p><svg><use xlink:href="#company"></use></svg>{{ position.company }}</p>
            <p><svg><use xlink:href="#geo"></use></svg>{{ position.location }}</p>
            <p><svg><use xlink:href="#clock"></use></svg>{{ position.type }}</p>
            <p><svg><use xlink:href="#calendar"></use></svg>{{ position.created_at | moment("DD MMM YYYY") }}</p>
            <a :href="applyLink" target="_blank" class="apply-link">Apply Now</a>
        </div>
        <div class="description" v-html="position.description">
            {{ position.description }}
        </div>
        <!-- <div class="apply-bottom" v-html="position.how_to_apply">
            {{ position.how_to_apply }}
        </div> -->
    </main>
</template>

<script>
    export default {
        props: ['position'],
        computed: {
            isMobile() {
                return this.$store.getters['getMobileStatus']
            },
            applyLink() {
                return this.position.how_to_apply.match(/href="([^"]*)/)[1];
            },
            showMobileModal() {
                return this.$store.getters['getMobileModalStatus']
            }
        },
        methods: {
            closeModal() {
                this.$store.dispatch('updateModalVisibility', false);
            }
        }
    }
</script>
