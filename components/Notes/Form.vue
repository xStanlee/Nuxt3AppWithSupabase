<script setup lang="ts">
    const { supabase } = useSupabase();
    const { user } = useAuth();
    const notesInput = reactive({
        title: "",
        note: ""
    });

    const handleSubmit = async () => {
        if(!notesInput.title || !notesInput.note) {
            return;
        }
        await supabase.from("notes").insert({
            title: notesInput.title,
            note: notesInput.note,
            user_id: user.value.id
        });

        notesInput.note = "";
        notesInput.title = "";
    }
</script>

<template>
    <NCard class="card">
        <input placeholder="NoteTitle" v-model="notesInput.title" />
        <textarea placeholder="Note" v-model="notesInput.note" />
        <NButton @click="handleSubmit">Save note</NButton>
    </NCard>
</template>

<style scoped>
.card {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
}

input,
textarea {
    border: 0.1rem solid rgba(0, 0, 0, .15);
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    padding: .2rem;
}
</style>
