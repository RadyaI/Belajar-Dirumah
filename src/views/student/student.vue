<template>
    <navbar></navbar>

    <section class="section main-banner" id="top" data-section="section1">
        <video autoplay muted loop id="bg-video">
            <source src="assets/images/course-video.mp4" type="video/mp4" />
        </video>

        <div class="video-overlay header-text">
            <div class="caption">
                <h6>Selamat Datang {{ loginData[0].name }}</h6>
                <h2><em>Your</em> Classroom</h2>
                <div class="main-button">
                    <div class="scroll-to-section"><a href="">Siswa | Kelas {{ loginData[0].kelas }}</a></div>
                </div>
            </div>
        </div>
    </section>

    <section class="section courses" data-section="section4">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-heading">
                        <h2>Materi</h2>
                    </div>
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Cari Materi..." v-model="filter.title">
                </div>
                <div class="col">
                    <select class="form-control" v-model="filter.mapel">
                        <option value="-">Mapel</option>
                        <option value="Matematika">Matematika</option>
                        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                        <option value="Bahasa Inggris">Bahasa Inggris</option>
                        <option value="IPA">IPA</option>
                        <option value="IPS">IPS</option>
                        <option value="PKN">PKN</option>
                        <option value="Seni Budaya">Seni Budaya</option>
                        <option value="Agama">Agama</option>
                    </select>
                </div>
            </div>
            <br>
            <div class="row">
                <!-- Card -->
                <div class="my-card" v-for="(i, no) in filterMateri" :key="no" @click="viewMateri(i.id)">
                    <div class="my-text">
                        <span>{{ i.title }}</span>
                        <p class="my-subtitle">{{ i.mapel }} | Kelas {{ i.kelas }} <br> {{ i.teacher }}</p>
                    </div>
                    <div class="my-icons">
                        <a class="my-btn" href="">

                        </a>
                        <a class="my-btn" href="">

                        </a>
                        <a class="my-btn" href="">

                        </a>
                    </div>
                </div>
                <!-- Card -->
            </div>
        </div>
    </section>

    <footerSec></footerSec>
</template>

<script>
import navbar from '../../components/navbar.vue'
import footer from '../../components/footer.vue'

import { db } from '../../firebase.js'
import { collection, getDocs, query, where } from 'firebase/firestore'
// import { Timestamp, addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore'
// import swal from 'sweetalert'

export default {
    name: 'app',
    components: {
        navbar: navbar,
        footerSec: footer,
    },
    data() {
        return {
            isLoggedIn: localStorage.getItem('isLoggedIn'),
            loginData: JSON.parse(localStorage.getItem('loginData')),

            inputMateri: {},
            materiData: [],
            filter: {
                title: '',
                mapel: '-'
            }
        }
    },
    mounted() {
        this.checkRole(),
            this.getMateri()
    },
    computed: {
        filterMateri() {
            let filtered = this.materiData
            if (this.filter.title) {
                filtered = filtered.filter(i => i.title.toString().toLowerCase().includes(this.filter.title.toLowerCase().toString()))
                // console.log('Filtering')
            }
            if (this.filter.mapel != '-' && this.filter.mapel) {
                filtered = filtered.filter(i => i.mapel.toString().toLowerCase().includes(this.filter.mapel.toString().toLowerCase()))
            }
            return filtered
        }
    },
    methods: {
        async getMateri() {
            try {
                let get = await getDocs(query(collection(db, 'materi'), where("kelas", '==', this.loginData[0].kelas)))
                get.forEach((materi) => {
                    let materiData = materi.data()
                    this.materiData.push({ ...materiData, id: materi.id })
                    console.log(this.materiData)
                })
            } catch (error) {
                console.log(error)
            }
        },
        checkRole() {
            const role = localStorage.getItem('role')
            if (!role || role != 'murid') {
                this.$router.push('/forbidden')
            } else {
                console.log("Selamat Datang")
            }
        }
    }
}
</script>

<style scoped>
.my-card {
    width: 250px;
    height: 200px;
    border-radius: 15px;
    background: rgba(105, 13, 197, 0.103);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    margin-left: 15px;
    margin-top: 15px
}

.my-card::before {
    content: "";
    height: 100px;
    width: 100px;
    position: absolute;
    top: -40%;
    left: -20%;
    border-radius: 50%;
    border: 35px solid rgba(255, 255, 255, 0.102);
    transition: all .8s ease;
    filter: blur(.5rem);
}

.my-text {
    flex-grow: 1;
    padding: 15px;
    display: flex;
    flex-direction: column;
    color: aliceblue;
    font-weight: 900;
    font-size: 1.2em;
}

.my-subtitle {
    font-size: .6em;
    font-weight: 300;
    color: rgba(240, 248, 255, 0.691);
}

.my-icons {
    display: flex;
    justify-items: center;
    align-items: center;
    width: 250px;
    border-radius: 0px 0px 15px 15px;
    overflow: hidden;
}

.my-btn {
    border: none;
    width: 84px;
    height: 35px;
    background-color: rgba(247, 234, 234, 0.589);
    display: flex;
    align-items: center;
    justify-content: center;
}

.my-svg-icon {
    width: 25px;
    height: 25px;
    stroke: rgb(38, 59, 126);
}

.my-btn:hover {
    background-color: rgb(247, 234, 234);
}

.my-card:hover::before {
    width: 140px;
    height: 140px;
    top: -30%;
    left: 50%;
    filter: blur(0rem);
}
</style>