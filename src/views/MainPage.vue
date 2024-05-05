<template>
    <div v-if="name">
        {{ name }}
        <button @click="signOutHandle">Sign out</button>
    </div>
    <span v-else>No user, go to login</span>
</template>

<script>
import { ref } from 'vue';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';

export default {
    setup() {
        const name = ref('');

        const auth = getAuth();
        onAuthStateChanged(auth, function (user) {
            if (user) {
                name.value = user.displayName;
            } else {
                name.value = '';
            }
        });

        const signOutHandle = () => {
            signOut(auth);
        };

        return {
            name,
            signOutHandle,
        };
    },
};
</script>
