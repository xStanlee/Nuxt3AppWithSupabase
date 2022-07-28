<script setup lang="ts">
    enum LoginStates {
        LOGIN = "Login",
        SIGN_UP = "Singup"
    }
    const { singUp, signIn, signOut, user } = useAuth();
    const router = useRouter();

    const authState = ref<LoginStates>(LoginStates.LOGIN);
    const authError = ref("");
    const showConfirmUserMessage = ref(false);
    const input = reactive({
        password: "",
        email: ""
    });

    const toggleAuthState = () => {
        authState.value = authState.value === LoginStates.LOGIN ? LoginStates.SIGN_UP : LoginStates.LOGIN;
    }

    const handleSubmit = async () => {
        //{ email: "stachura.patryk@yahoo.com", password: "someGenericPassword" });
        try {
            if(authState.value === LoginStates.LOGIN) {
                await signIn({email: input.email, password: input.password });
                router.push("/myProfile");
            } else {
                await singUp({email: input.email, password: input.password });
                showConfirmUserMessage.value = true;
            }
        } catch(e) {
            authError.value = e.message;
        }
        input.email = "";
        input.password = "";
    }
</script>

<template>
        <NCard class="card">
            <div v-if="!showConfirmUserMessage">
                <h3>{{ authState }}</h3>
                <div class="input-container">
                    {{ input.password }}
                    <input placeholder="Email" type="email" v-model="input.email" />
                    <input placeholder="Password" type="password" v-model=input.password />
                </div>
                <NButton @click="handleSubmit">Submit</NButton>
                <p v-if="authError" class="auth-error">{{ authError }}</p>
                <p class="auth-info" @click="toggleAuthState">{{ authState === LoginStates.LOGIN ? "Don\'t have an account? Create one now." : "Already have an account? Just log in."}}</p>
            </div>
            <div v-else>
                <h3>Check email for confirmation message.</h3>
            </div>
        </NCard>
</template>

<style scoped>
p {
    color: rgba(0, 0, 0, .5);
    font-size: 0.5rem;
    cursor: pointer;
}
.card {
    padding: 1rem;
}
.card h3 {
    font-size: 1.5rem;
}
.input-container {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
}
.input-container input {
    margin: 1rem 0;
    outline: none;
    border: 0.1rem solid rgba(0, 0, 0, .05);
    border-radius: .5rem;
}
.input-container input::placeholder {
    padding: .2rem 0 .2rem .5rem;
    color: rgba(0, 0, 0, .5);
}

.auth-error {
    color: red;
}   
.auth-info {
    color: #0000EE;
}
</style>
