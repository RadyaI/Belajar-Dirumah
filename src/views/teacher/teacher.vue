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
                    <div class="scroll-to-section"><a href="">Guru</a></div>
                </div>
            </div>
        </div>
    </section>

    <section class="section courses" data-section="section4">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-heading">
                        <h2>Materi Anda</h2>
                        <h2 style="cursor: pointer;" data-toggle="modal" data-target="#createMateri">Upload Materi</h2>
                    </div>
                </div>
                <div class="col">
                    <select class="form-control" v-model="filter.kelas">
                        <option value="-">Kelas</option>
                        <option value="7">Kelas 7</option>
                        <option value="8">Kelas 8</option>
                        <option value="9">Kelas 9</option>
                    </select> |
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
            <div class="row">
                <!-- Card -->
                <div class="my-card" v-for="(i, no) in filteredData" :key="no" @click="viewMateri(i.id)">
                    <div class="my-text">
                        <span>{{ i.title }}</span>
                        <p class="my-subtitle">{{ i.mapel }} | Kelas {{ i.kelas }}</p>
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

    <section>
        <!-- Add Materi -->
        <div class="modal fade" id="createMateri" data-backdrop="static" data-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Upload Materi</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                        <div class="modal-body">
                            <label for="judul">Judul</label>
                            <input type="text" id="judul" class="form-control" required
                                placeholder="Contoh: Materi Aljabar Pertemuan 1" v-model="inputMateri.title">

                            <label for="mapel">Mapel: </label>
                            <select id="mapel" class="form-control" required v-model="inputMateri.mapel">
                                <option value="Matematika">Matematika</option>
                                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                                <option value="Bahasa Inggris">Bahasa Inggris</option>
                                <option value="IPA">IPA</option>
                                <option value="IPS">IPS</option>
                                <option value="PKN">PKN</option>
                                <option value="Seni Budaya">Seni Budaya</option>
                                <option value="Agama">Agama</option>
                            </select>

                            <label for="kelas">Kelas: </label>
                            <select id="kelas" class="form-control" required v-model="inputMateri.kelas">
                                <option value="7">Kelas 7</option>
                                <option value="8">Kelas 8</option>
                                <option value="9">Kelas 9</option>
                            </select>

                            <label for="status">Status: </label>
                            <select id="status" class="form-control" required v-model="inputMateri.status">
                                <option value="penting">Penting</option>
                                <option value="sedang">Sedang</option>
                                <option value="rendah">Rendah</option>
                            </select>

                            <label for="link">Link: </label>
                            <input type="text" id="link" class="form-control" required placeholder="Masukkan Link Drive"
                                v-model="inputMateri.link" autocomplete="off">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" @click="uploadMateri" class="btn btn-primary">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Add Materi -->

    </section>

    <footerSec></footerSec>
</template>

<script>
import navbar from '../../components/navbar.vue'
import footer from '../../components/footer.vue'

import { db } from '../../firebase.js'
import { Timestamp, addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import swal from 'sweetalert'

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
                kelas: '-',
                mapel: '-'
            }
        }
    },
    mounted() {
        console.log(this.loginData[0].name)
        this.getMateri()
    },
    computed: {
        filteredData() {
            let filterData = this.materiData
            if (this.filter.title) {
                filterData = filterData.filter(i => i.title.toLowerCase().toString().includes(this.filter.title.toLowerCase()))
            }
            if (this.filter.kelas && this.filter.kelas !== "-") {
                filterData = filterData.filter(i => i.kelas == this.filter.kelas);
            }

            // Filter berdasarkan mapel
            if (this.filter.mapel && this.filter.mapel !== "-") {
                filterData = filterData.filter(i => i.mapel == this.filter.mapel);
            }
            filterData = filterData.filter(i => i.teacher == this.loginData[0].name)
            return filterData
        }
    },
    methods: {
        viewMateri(i) {
            this.$router.push(`/teacher/materi/${i}`)
        },
        async getMateri() {
            try {
                const materi = await getDocs(query(collection(db, "materi")), where('teacher', '==', "Ibu Guru"), orderBy('date', 'asc'))
                materi.forEach((data) => {
                    const materiData = data.data()
                    this.materiData.push({ ...materiData, id: data.id })
                    console.log(this.materiData)
                    console.log(`Sedang mengambil materi dari guru bernama ${this.loginData[0].name}`)
                })
            } catch (error) {
                console.log(error)
            }
        },
        getDriveId(link) {
            const regex = /\/d\/([a-zA-Z0-9_-]+)(?:\/|$)/;
            const match = link.match(regex);
            return match ? match[1] : null;
        },
        async uploadMateri() {
            try {
                const id = this.getDriveId(this.inputMateri.link)
                const data = {
                    title: this.inputMateri.title,
                    mapel: this.inputMateri.mapel,
                    kelas: this.inputMateri.kelas,
                    status: this.inputMateri.status,
                    link: `https://drive.google.com/file/d/${id}/preview`,
                    teacher: this.loginData[0].name,
                    displayDate: new Date().toLocaleDateString(),
                    date: Timestamp.now().toMillis()
                }
                console.log(data)
                await addDoc(collection(db, 'materi'), data)
                swal({
                    icon: 'success',
                    title: false,
                    button: false,
                    timer: 1000
                })
                setTimeout(() => {
                    location.reload()
                }, 1000);
            } catch (error) {
                console.log(error)
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