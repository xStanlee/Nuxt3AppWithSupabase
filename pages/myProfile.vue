<script setup lang="ts">
    const { supabase } = useSupabase();
    const { user } = useAuth();

    const notesResponse = ref();
    if(process.client) {
        notesResponse.value = await supabase.from("notes").select().eq("user_id", user.value.id) as unknown;
    }
    definePageMeta({
        middleware: "auth"
    });
</script>

<template>
    <div class="container">
        <h3>My Notes</h3>
        <NotesForm></NotesForm>
        <div class="card-container" v-if="notesResponse?.data">
            <NCard class="card" v-for="note in notesResponse.data" :key="note.id">
                <h2>{{ note.title }}</h2>
                <p>{{ note.note }}</p>
            </NCard>
        </div>
    </div>
</template>

<style scoped>
h3 {
    font-size: 2rem;
}
.container {
    max-width: 50%;
    margin: 0 auto;
    padding: 3rem 0;
    height: 90vh;
}

.card-container {
    margin-top: 2.5rem;
}

.card {
    padding: 1rem;
    margin-top: 1.5rem;
}

.card h2 {
    font-weight: 700;
    font-size: 1.5rem;
}
</style>