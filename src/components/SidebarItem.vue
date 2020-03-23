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
        <dl>
            <dt>{{ position.type }}</dt>
            <dd>{{ position.created_at | moment("DD MMM YYYY") }}</dd>
        </dl>
    </div>
</template>

<script>
export default {
    props: ['position', 'active'],
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
}
</script>
