<script setup lang="ts">
    const { signOut, isLoggedIn } = useAuth();
</script>

<template>
        <nav class="Nav">
            <ul class="Nav__list">
                <li>
                    <NuxtLink class="Nav__listElement" to="/">
                        Home
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink class="Nav__listElement" to="/myProfile">
                        My Profile
                    </NuxtLink>
                </li>
                <li v-if="isLoggedIn()" @click="signOut" class="Nav__listElement">
                    Sign out
                </li>
            </ul>
        </nav>
</template>

<style scoped>
.Nav {
    background-color: black;
    height: 10vh;
}

.Nav__list {
    display: flex;
    align-items: center;
    height: 100%;
    color: #fff;
    padding-left: 5rem;
}

.Nav__listElement {
    margin-right: 2rem;
    cursor: pointer;
}

.Nav__listElement:last-of-type {
    margin-left: auto;
}
</style>
