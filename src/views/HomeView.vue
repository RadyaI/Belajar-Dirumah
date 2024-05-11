<template>
  <navbar></navbar>
  <!-- ***** Main Banner Area Start ***** -->
  <section class="section main-banner" id="top" data-section="section1">
    <video autoplay muted loop id="bg-video">
      <source src="assets/images/course-video.mp4" type="video/mp4" />
    </video>

    <div class="video-overlay header-text">
      <div class="caption">
        <!-- <h6>SMP Labolatorium UNIVERSITAS NEGERI MALANG</h6> -->
        <h2><em>Belajar</em> Dirumah</h2>
        <div class="main-button">
          <div class="scroll-to-section" v-if="isLoggedIn" @click="alreadyLogin"><a href="#">Mulai Belajar</a></div>
          <div class="scroll-to-section" v-else data-toggle="modal" data-target="#login"><a href="#">Mulai Belajar</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footerSec></footerSec>

  <!-- POPUP AREA -->
  <!-- REGISTER -->
  <div class="modal fade" id="login" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Login</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="login">
          <div class="modal-body">
            <label for="email" class="form-label">Email: </label>
            <input type="email" class="form-control" required placeholder="Masukkan Email..." v-model="loginData.email">

            <label for="password">Password</label>
            <input type="password" required placeholder="Masukkan Password..." class="form-control"
              v-model="loginData.password">
            <small>Belum punya akun? <span style="color: blue ; cursor: pointer;" data-toggle="modal"
                data-dismiss="modal" data-target="#register">*Register disini</span></small>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- REGISTER -->
  <!-- LOGIN -->
  <div class="modal fade" id="register" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Register</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="register">
          <div class="modal-body">
            <label for="name" class="form-name">Nama: </label>
            <input type="text" class="form-control" required placeholder="Masukkan Nama" v-model="registerData.name">

            <label for="email" class="form-label">Email: </label>
            <input type="email" class="form-control" required placeholder="Masukkan Email..."
              v-model="registerData.email">

            <label for="kelas" class="form-label">Kelas: </label>
            <select v-model="registerData.kelas" class="form-control" required>
              <option value="7">Kelas 7</option>
              <option value="8">Kelas 8</option>
              <option value="9">Kelas 9</option>
            </select>

            <label for="password">Password</label>
            <input type="password" required placeholder="Masukkan Password..." class="form-control"
              v-model="registerData.password">
            <small>Sudah punya akun? <span style="color: blue ; cursor: pointer;" data-toggle="modal"
                data-dismiss="modal" data-target="#login">*Login disini</span></small>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- LOGIN -->
  <!-- POPUP AREA -->


</template>

<script>
import navbar from '@/components/navbar.vue'
import footer from '@/components/footer.vue'
import swal from 'sweetalert'

import { db } from '../firebase.js'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

export default {
  components: {
    navbar: navbar,
    footerSec: footer
  },
  data() {
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn'),

      allUser: [],
      loginData: {},
      registerData: {
        role: 'murid'
      },
    }
  },
  methods: {
    alreadyLogin() {
      const role = JSON.parse(localStorage.getItem('loginData'))
      console.log(role)
      if (role[0].role == "murid") {
        this.$router.push('/student')
      } else if (role[0].role == "guru") {
        this.$router.push('/teacher')
      }
    },
    async login() {
      try {
        const check = await getDocs(query(collection(db, 'user'),
          where('email', '==', this.loginData.email),
          where('password', '==', this.loginData.password)))
        console.log(check)
        if (check.empty) {
          swal({
            icon: 'error',
            title: 'Email/Password Salah',
            button: 'Tutup'
          })
        } else {
          const dataLogin = await getDocs(query(collection(db, 'user'), where('email', '==', this.loginData.email)))
          dataLogin.forEach((data) => {
            const userData = data.data()
            const save = []
            save.push({ ...userData, id: data.id })
            localStorage.setItem('loginData', JSON.stringify(save))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', save[0].role)
            localStorage.setItem('name', save[0].name)
            if (save[0].role == 'guru') {
              location.href = '/teacher'
            } else if (save[0].role == 'murid') {
              location.href = '/student'
            }
          })
        }
      } catch (r) {
        console.log(r)
      }
    },
    async register() {
      try {
        const checkEmail = await getDocs(query(collection(db, 'user'), where('email', '==', this.registerData.email)))
        if (!checkEmail.empty) {
          swal({
            icon: 'error',
            title: 'Email sudah digunakan',
            button: 'Ok'
          })
          return
        }

        await addDoc(collection(db, 'user'), this.registerData)
        swal({
          icon: 'success',
          title: 'Berhasil Login',
          button: false
        })
        localStorage.setItem('isLoggedIn', true)
        let data = {
          name: this.registerData.name,
          email: this.registerData.email,
          role: this.registerData.role,
        }
        localStorage.setItem('loginData', JSON.stringify(this.registerData))
        localStorage.setItem('role', data.role)
        localStorage.setItem('role', data.name)
        setTimeout(() => {
          location.href = '/student'
        }, 1200);
      } catch (r) {
        console.log(r)
      }
    },
    async getUser() {
      try {
        const tasksCollection = await getDocs(collection(db, 'user'));
        tasksCollection.forEach((users) => {
          const userData = users.data();
          this.allUser.push({ ...userData, id: users.id });
        });
        console.log(this.allUser)
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }

    },
  },
  mounted() {
    this.getUser()
    console.log(this.isLoggedIn)
  },
}
</script>
