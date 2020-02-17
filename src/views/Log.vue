<template>
    <div>
        <div class="main-bg col-lg-12" style='background-image: url("https://cdn-expa.aiesec.org/assets/images/aiesec_org/search-cover.jpg");'>
            <div class="main-bg-title">
                <h1>Modifications Log</h1>
            </div>
            <div class="filters-nav bg-light">
            </div>
        </div>
        <div class="container">
            <div style="margin-top: 50px;"></div>
            <div v-if="logs.length > 0">
                <div class="row">
                    <div class="col-lg-4 col-4">
                        <h6>Opp ID </h6>
                    </div>
                    <div class="col-lg-4 col-4">
                        <h6>NbEdits</h6>
                    </div>
                    <div class="col-lg-4 col-4">
                        <h6>Time of Last edit</h6>
                    </div>
                </div>
                <div v-for="log in logs" v-bind:key="log._id">
                    <b-card class="mb-2">
                        <div class="row">
                            <div class="col-lg-4 col-4">
                                {{log.opp_id}}
                            </div>
                            <div class="col-lg-4 col-4">
                                <p>1</p>
                            </div>
                            <div class="col-lg-4 col-4">
                                {{dateParser(log.created)}}
                            </div>
                        </div>
                    </b-card>
                </div>
            </div>
            <div v-else class="no-log">
                <p><i>Sorry ! No Log to show</i></p>
            </div>
        </div> 
    </div> 
</template>

<script>
const API_URL = 'http://localhost:4000/log'

export default {
    data: () => ({
        error: "",
        logs: []
    }),
    mounted() {
    fetch(API_URL)
      .then(response => response.json() )
      .then(result => {
        this.logs = result;
      });
    },
    methods: {
        dateParser: function(_date){
            var date = new Date(_date);
            var day   = date.getDate();
            var month = date.getMonth();
            var year  = date.getFullYear();
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            var hours = date.getHours();
            var minutes = date.getMinutes();
            return (`${day} ${months[month]} ${year} at ${hours}h:${minutes}min`);
        }
    }
}
</script>

<style>
.no-log{
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    text-align: center; 
    color: #606060;
    width: 50%;
    margin: auto;
}
a{
    text-decoration: none !important;
}
ul li{
    list-style-type: none;
    color: black !important;
}
small{
    color: #707070;
}
.main-bg {
    margin-top: 50px;
    height: 270px;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100vw 55vh;
}
.main-bg:after {
    content: '\A';
    position: absolute;
    width: 100%; height:270px;
    top:0; left:0;
    background:rgba(0, 0, 0, 0.6);
    opacity: 0.8;
}
.main-bg-title{
    position: relative;
    text-align: center;
    color: white;
    z-index: 99;
    margin: auto;
    width: 100%;
    padding: 10px;
    display: block;
    font-family: 'Lato Light', sans-serif !important;
}
.main-bg-title h1{
    font-family: 'Lato Thin' sans-serif;
    font-size: 4vw;
    line-height: 200px;
}
.filters-nav{
    position: absolute;
    left: 0;
    right: 0;
    z-index: 99;
    height: 65px;
    box-shadow: 0 8px 6px -6px rgb(136, 136, 136);
}
</style>