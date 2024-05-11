<template>
    <div>
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
                    <h5>{{ materiData[0].title }}</h5>
                    <h6><router-link to="/student"><button class="btn btn-info">Kembali</button></router-link> | {{
                materiData[0].mapel }} | {{ materiData[0].displayDate }} | <button class="btn btn-success"
                            @click="finish">Selesai</button> </h6>
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

</template>

<script>
// import navbar from '@/components/navbar.vue'
import footer from '@/components/footer.vue'

import { db } from '@/firebase.js'
import { arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import swal from 'sweetalert'

export default {
    name: 'app',
    components: {
        // navbar: navbar,
        footerSec: footer
    },
    data() {
        return {
            materiData: []
        }
    },
    mounted() {
        this.getMateri(this.$route.params.id)
    },
    methods: {
        async getMateri(id) {
            try {
                const get = await getDoc(doc(collection(db, 'materi'), id))
                const materiData = get.data()
                this.materiData.push({ ...materiData, id: id })
                console.log(this.materiData)
            } catch (r) {
                console.log(r)
            }
        },
        async finish() {
            try {
                const alert = await swal({
                    icon: 'warning',
                    title: 'Sudah Selesai?',
                    buttons: ['Belum', 'Sudah']
                })
                if (alert) {
                    const get = await doc(db, 'materi', this.$route.params.id)
                    const siswa = JSON.parse(localStorage.getItem('loginData'))[0].name
                    await updateDoc(get, {
                        siswa_sudah_lihat_materi: arrayUnion(siswa)
                    })
                    swal({
                        icon: 'success',
                        title: 'Selesai',
                        button: 'Ok',
                        dangerMode: true
                    }).then(
                        (lanjut) => {
                            if (lanjut) {
                                this.$router.push('/student')
                            }
                        }
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }

    },
}
</script>