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
                    <div class="scroll-to-section"><a href="#">Guru</a></div>
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
                        <h2 style="cursor: pointer;">Upload Materi</h2>
                    </div>
                </div>

                <!-- Card -->
                <div class="my-card">
                    <div class="my-text">
                        <span>Materi Aljabar persiapan UH</span>
                        <p class="my-subtitle">Matematika</p>
                    </div>
                    <div class="my-icons">
                        <a class="my-btn" href="#">
                            <svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100"
                                preserveAspectRatio="xMidYMid meet" height="100" class="my-svg-icon">
                                <path stroke-width="8" stroke-linejoin="round" stroke-linecap="round" fill="none"
                                    d="M31.8,64.5a14.5,14.5,0,0,1-3.2-28.7,17.5,17.5,0,0,1-.4-4,18.2,18.2,0,0,1,36-3.6h.3a18.2,18.2,0,0,1,3.7,36M39.1,75.4,50,86.3m0,0L60.9,75.4M50,86.3V42.7">
                                </path>
                            </svg>
                        </a>
                        <a class="my-btn" href="#">

                        </a>
                        <a class="my-btn" href="#">

                        </a>
                    </div>
                </div>
                <!-- Card -->

            </div>
        </div>
    </section>

    <section>
        <!-- Add Materi -->
        <div class="modal fade" id="createMateri" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Upload Materi</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
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

export default {
    name: 'app',
    components: {
        navbar: navbar,
        footerSec: footer,
    },
    data() {
        return {
            isLoggedIn: localStorage.getItem('isLoggedIn'),
            loginData: JSON.parse(localStorage.getItem('loginData'))
        }
    },
    mounted() {
        console.log(this.loginData[0].name)
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