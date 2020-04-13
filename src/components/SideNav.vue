<template>
    <aside class="side-nav">
        <ul>
            <li :class="{'active': route.name === 'Home'}" @click="goToRoute('Home')">
                <svg><use xlink:href="#home"></use></svg>
                Home
            </li>
            <li :class="{'active': route.name === 'Saved'}" @click="goToRoute('Saved')">
                <svg><use xlink:href="#star-empty"></use></svg>
                Saved Jobs <span v-if="savedCount">{{ savedCount }}</span>
            </li>
        </ul>
    </aside>
</template>

<script>
    export default {
        computed: {
            savedCount() {
                let saved = this.$store.getters['getSavedPositions'];

                return saved.length
            },
            route() {
                return this.$route
            }
        },
        methods: {
            goToRoute(path) {
                this.$router.push({ name: path })
            }
        }
    }
</script>
