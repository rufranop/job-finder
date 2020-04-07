<template>
    <div class="sidebar-item" :class="{ 'active': active }" @click="onClick()">
        <dl>
            <dt>{{ position.title }}</dt>
            <dd>{{ position.company }}</dd>
        </dl>
        <dl>
            <dt>{{ position.location }}</dt>
            <dd>Location</dd>
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
