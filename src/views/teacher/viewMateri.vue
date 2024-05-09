<template>
    <div>
        <navbar></navbar>
        <section class="section main-banner" id="top" data-section="section1">
            <video autoplay muted loop id="bg-video">
                <!-- <source src="#" type="video/mp4" /> -->
            </video>

            <div class="video-overlay" id="bg-video" v-if="materiData.length > 0">
                <div class="caption">
                    <!-- <h6>SMP Labolatorium UNIVERSITAS NEGERI MALANG</h6> -->
                    <br>
                    <br>
                    <br>
                    <br>
                    <h5>{{ materiData[0].title }} | <button class="btn btn-danger" @click="deleteMateri">Hapus</button>
                    </h5>
                    <h6><router-link to="/teacher"><button class="btn btn-info">Kembali</button></router-link> | {{
                materiData[0].mapel }} | {{ materiData[0].displayDate }} | <button class="btn btn-warning"
                            data-toggle="modal" data-target="#updateMateri">Edit</button></h6>
                    <iframe :src="materiData[0].link" frameborder="2" width="90%" height="400px"></iframe>
                    <br>
                    <br>
                    <br>
                    <br>
                </div>
            </div>
        </section>
        <!-- <section class="section courses" data-section="section4">
            <div class="container-fluid">
                <div class="row">

                    <h2>tes</h2>
                    <button>woi</button>
                </div>
            </div>
        </section> -->
        <footerSec></footerSec>
    </div>

    <section>
        <!-- Add Materi -->
        <div v-if="inputMateri.length > 0" class="modal fade" id="updateMateri" data-backdrop="static"
            data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                placeholder="Contoh: Materi Aljabar Pertemuan 1" v-model="inputMateri[0].title"
                                autocomplete="off">

                            <label for="mapel">Mapel: </label>
                            <select id="mapel" class="form-control" required v-model="inputMateri[0].mapel">
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
                            <select id="kelas" class="form-control" required v-model="inputMateri[0].kelas">
                                <option value="7">Kelas 7</option>
                                <option value="8">Kelas 8</option>
                                <option value="9">Kelas 9</option>
                            </select>

                            <label for="status">Status: </label>
                            <select id="status" class="form-control" required v-model="inputMateri[0].status">
                                <option value="penting">Penting</option>
                                <option value="sedang">Sedang</option>
                                <option value="rendah">Rendah</option>
                            </select>

                            <label for="link">Link: </label>
                            <input type="text" id="link" class="form-control" required placeholder="Masukkan Link Drive"
                                v-model="inputMateri[0].link" autocomplete="off">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" @click="updateMateri" class="btn btn-primary"
                                data-dismiss="modal">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Add Materi -->

    </section>

</template>

<script>
import navbar from '../../components/navbar.vue'
import footer from '../../components/footer.vue'

import { db } from '@/firebase.js'
import { collection, deleteDoc, doc, getDoc, updateDoc, } from 'firebase/firestore'
import swal from 'sweetalert'


export default {
    name: 'app',
    components: {
        navbar: navbar,
        footerSec: footer
    },
    data() {
        return {
            materiData: [],
            inputMateri: []
        }
    },
    mounted() {
        this.getMateri(this.$route.params.id)
        console.log(this.inputMateri)
        this.checkRole()
    },
    methods: {
        async getMateri(id) {
            try {
                const data = await getDoc(doc(collection(db, "materi"), id))
                const materi = data.data()
                this.materiData.push({ ...materi, id: id })
                this.inputMateri.push({ ...materi, id: id })
                console.log(this.materiData[0].title)
            } catch (error) {
                console.log(error)
            }
        },
        async deleteMateri() {
            try {
                let alert = await swal({
                    icon: 'warning',
                    title: 'Ingin Menghapus Materi Ini?',
                    buttons: ['Tidak', 'Iya']
                })
                if (alert) {
                    await deleteDoc(doc(collection(db, 'materi'), this.$route.params.id))
                    console.log(`Berhasil menghapus materi dengan id ${this.$route.params.id}`)
                    swal({
                        icon: 'success',
                        title: false,
                        button: false
                    })
                    setTimeout(() => {
                        location.href = '/teacher'
                    }, 1200);
                }
            } catch (r) {
                console.log(r)
            }
        },
        async updateMateri() {
            try {
                let alert = await swal({
                    icon: 'warning',
                    title: 'Update Data?',
                    dangerMode: true,
                    buttons: ['Tidak', 'Iya']
                })
                if (alert) {
                    await updateDoc(doc(db, 'materi', this.materiData[0].id), this.inputMateri[0])
                    swal({
                        icon: 'success',
                        button: 'Tutup',
                    }).then(
                        (reload) => {
                            if (reload) {
                                location.reload()
                            }
                        }
                    )
                }
            } catch (error) {
                console.log(error)
            }
        },
        checkRole() {
            const role = localStorage.getItem('role')
            if (!role || role != 'guru') {
                this.$router.push('/forbidden')
            } else {
                console.log("Selamat Datang")
            }
        }
    },
}
</script>