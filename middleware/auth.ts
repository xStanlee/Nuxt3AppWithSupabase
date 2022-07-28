export default defineNuxtRouteMiddleware(() => {
    // Check if we are logged in.
    const { isLoggedIn } = useAuth();

    if(!isLoggedIn()) {
        return navigateTo('/');
    }
})
