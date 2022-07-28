const useAuth = () => {
    const user = useState("user", () => null);
    const router = useRouter();
    const { supabase } = useSupabase();

    supabase.auth.onAuthStateChange((e, session) => {
        user.value = session?.user ?? null;
    })

    const singUp = async ({ email, password, ...metadata}) => {
        const { user: u, error } = await supabase.auth.signUp({
            email,
            password 
        }, { 
            data: metadata,
            redirectTo: `${window.location.origin}/myProfile?source=email`
        });

        if(error) {
            throw error;
        }
        return u;
    }

    const signIn = async ({ email, password }) => {
        const { user: u, error } = await supabase.auth.signIn({ email, password });

        if (error) {
            throw error;
        }
        return u;
    }

    const signOut = async () => {
        // Behind a scene call supabase.auth.onAuthStateChange listener and nested callback.
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
        router.push("/");
    }

    const isLoggedIn = () => {
        return !!user.value;
    }

    return {
        user,
        singUp,
        signIn,
        signOut,
        isLoggedIn
    }
}

export default useAuth;