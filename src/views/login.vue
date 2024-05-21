<template>
    <div>
        <h2>INI LOGIN</h2>
        <form action="">
            Email:
            <input type="email" v-model="email">
            password
            <input type="password" v-model="password">
            <input type="submit" @click="login">
        </form>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            email: '',
            password: '',
            date: new Date().toLocaleDateString()
        }
    },
    methods: {
        login() {
            if (this.email == 'guru@gmail.com' && this.password == '123') {
                this.$router.push('/guru')
                localStorage.setItem('isLoggedIn', true)
            } else {
                alert('Email/password salah')
            }
        },
        check(){
            if(!localStorage.getItem('isLoggedIn')){
                this.$router.push('/login')
            } else {
                console.log('selamat datang')
            }
        }
    }
}
</script>