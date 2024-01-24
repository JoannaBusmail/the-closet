<template>
    <div class="avatar">
        <img
            src="https://picsum.photos/800/600?random=1"
            alt="Random Avatar"
            :style="{ objectFit: 'cover', width: '100%', height: '100%' }"
        />
    </div>
</template>

<style scoped>
.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 50px;

}
</style>