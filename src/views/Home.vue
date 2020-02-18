<template>
    <div>
        <div class="main-bg col-lg-12" style='background-image: url("https://cdn-expa.aiesec.org/assets/images/aiesec_org/search-cover.jpg");'>
            <div class="main-bg-title">
                <h1>Your experience begins here...</h1>
            </div>
            <div class="filters-nav bg-light">
            </div>
        </div>
        <div class="container content">
            <span class="nb-opp"><i>{{opportunities.length}} opportunities found</i></span>
            <hr>
            <div class="col-lg-12 opp" v-for="opp in opportunities" v-bind:key="opp.id" >
                <a style="cursor: pointer;" @click="modalContext(opp)">
                    <Opportunity v-bind:opp="opp"/>
                </a>
                <!--Modal-->
                <div v-if="showModal">
                    <Modal v-bind:opp ="opportunity" :visible="showModal" @close="showModal = false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../api.js'
import Modal from '../components/Modal'
import Opportunity from '../components/Opportunity'

const dataUrl = '/v2/opportunities'
const access_token = "dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c"

export default {
  name: 'App',
  data(){
    return{
        opportunities: [],
        opportunity : [],
        showModal: false
    }
  },
  components: {
    Modal, Opportunity
  },
  mounted(){
    API
    .get(dataUrl, {
        params: {
          "access_token": access_token
        }
    })
    .then(response => {
            this.opportunities = response.data.data
    });
  },
  methods:{
    modalContext: function(opp){
        this.showModal=true
        //Emptying the Array before filling it
        while(this.opportunity.length > 0) 
            this.opportunity.pop()
        //Filling the Array with opp info
        this.opportunity.push(opp.id)
        this.opportunity.push(opp.title)
        this.opportunity.push(opp.office['country'])
        this.opportunity.push(opp.cover_photo_urls.record.description)
    }
  }
}
</script>

<style>
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
.content{
    margin-top: 40px;
}
.nb-opp{
    font-size: 15px;
    padding: 5px;
    color:rgb(68, 68, 68) !important;
}
.opp{
    transition: all 0.3s ease;
}
.opp:hover{
    background-color: #F5F5F5;
    box-shadow: 0 8px 6px -6px #F0F0F0;
    transition: all 0.5s ease;
}
.opp-tile{
    height: 120px;
    margin-left: -20px;
}
.opp-tag{
    position: absolute;
    z-index: 999;
}
.opp-bg{
    height: 120px;
    width: 100%;
    margin-left: -15px;
    position: relative;
    z-index: 1;
}
.org-img{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    /*top - right- bot - left*/
    padding: 5px 5px 5px 5px;
}
.opp-title{
    color: #383838 !important;
}
.opp-title:first-letter {
    text-transform: uppercase;
}
.applicants{
   margin-top: 40px;
}
.applicants-nb{
    color: #404040;
}
.applicants-logo svg{
    height: 20px;
    width: 20px;
}
</style>