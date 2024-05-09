<template>
    <div>
        <header class="main-header clearfix" role="header">
            <div class="logo">
                <a href="#"><em>SMP</em> LABORATORIUM UM</a>
            </div>
            <!-- <a href="#menu" class="menu-link"><i class="fa fa-bars"></i></a> -->
            <nav id="menu" class="main-nav" role="navigation">
                <ul class="main-menu">
                    <li><a href="#" v-if="isLoggedIn" @click="logout">Logout</a></li>
                </ul>
            </nav>
        </header>
    </div>
</template>

<script>
import swal from 'sweetalert';

export default {
    name: 'app',
    data() {
        return {
            isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn'))
        }
    },
    methods: {
        logout() {
            swal({
                icon: 'warning',
                title: 'Ingin LogOut?',
                dangerMode: true,
                buttons: ['Tidak', 'Iya']
            }).then(
                (next) => {
                    if (next) {
                        localStorage.clear()
                        location.href = '/'
                    }
                }
            )
        }
    }
}
</script>