<template>
    <div class="job-list-item" :class="{ 'active': active }" @click="onClick()">
        <img :src="this.position.company_logo" alt="">
        <dl>
            <dt>{{ position.title }}</dt>
            <dd>{{ shortenedLocation }}</dd>
            <dd>{{ date }}</dd>
        </dl>
        <svg @click.stop="toggleSavePosition()" :class="{'saved': isSaved}"><use :xlink:href="isSaved ? '#star-full' : '#star-empty'"></use></svg>
    </div>
</template>

<script>
export default {
    props: ['position', 'active'],
    computed: {
        isSaved() {
            let saved = this.$store.getters['getSavedPositions'];

            let filtered  = saved.filter(position => {
                return this.position.id === position.id
            });

            return !!filtered.length
        },
        shortenedLocation() {
            let location = this.position.location;
            let maxLength = 30;

            return location.length <= maxLength ? location : location.slice(0, maxLength) + '...'
        },
        date() {
            return this.$dayjs(this.position.created_at).format('DD MMM YYYY')
        }
    },
    methods: {
        onClick() {
            this.$emit('click');
        },
        toggleSavePosition() {
            if (this.isSaved) {
                this.$store.dispatch('removeSavedPosition', this.position.id);
                return false;
            }

            this.$store.dispatch('addSavedPosition', this.position)
        }
    }
}
</script>
