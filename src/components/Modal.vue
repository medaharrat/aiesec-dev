<template>
    <b-modal v-model="show" hide-footer>
      <div class="d-block text-center">
        <div class="bg-modal" style='background-image: url("https://cdn-expa.aiesec.org/gis-img/gv_default.png");'>
            <h4 class="bg-modal-title">{{ opportunity.title }}</h4>
            <div class="bg-modal-country">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 172 172" style=" fill:#FFFFFF;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M86,3.44c-30.34187,0 -55.04,24.69813 -55.04,55.04c0,48.54969 50.32344,106.45188 52.46,108.8975c0.65844,0.7525 1.58563,1.1825 2.58,1.1825c1.06156,-0.06719 1.92156,-0.43 2.58,-1.1825c2.13656,-2.48594 52.46,-61.3825 52.46,-108.8975c0,-30.34187 -24.69812,-55.04 -55.04,-55.04zM86,41.28c11.395,0 20.64,9.245 20.64,20.64c0,11.395 -9.245,20.64 -20.64,20.64c-11.395,0 -20.64,-9.245 -20.64,-20.64c0,-11.395 9.245,-20.64 20.64,-20.64z"></path></g></g></svg>            
                <span style="color: #FFF;">{{ opportunity.country }}</span><br>
            </div>
        </div>
        <div class="info-modal">
            <b-form v-if="show" v-on:submit="onSubmit" v-on:reset="onReset">
                <b-form-group id="input-group-1" label="Title:" label-for="opp-title">
                    <b-form-input
                        id="opp-title"
                        v-model="opportunity.title"
                        type="text"
                        required
                        placeholder="Title"
                    ></b-form-input>
                </b-form-group>
                <label for="textarea-small">Description:</label>
                <b-form-textarea
                    id="opp-description"
                    v-model="opportunity.description"
                    placeholder="No description !"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
                <b-button class="mt-3" variant="outline-success" type="submit" block >Submit</b-button>
                <b-button class="mt-3" variant="outline-danger" type="reset" block @click="show=false">Cancel</b-button>
            </b-form>
        </div>
      </div>
    </b-modal>
</template>

<script>
import API from '../api.js'

const dataUrl = '/v2/opportunities/'
const access_token = "dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c"
const LOG_URL = 'http://localhost:4000/log'

export default {        
    props: {
        'opp': Array, 
        'visible' : Boolean
    },
    data(){
      return{
        opportunity:{
            id: this.opp[0],
            title: this.opp[1],
            country: this.opp[2],
            description: this.opp[3]
        },
        modification:{
            opp_id: 0
        }
      }
    },
    methods:{
        updateOpportunity: function(){
            this.modification.opp_id = this.opportunity.id
            API.patch(dataUrl+this.opportunity.id, {
                "access_token": access_token,
                "opportunity":{
                    "opportunity_id" : this.opportunity.id,
                    "title" : this.opportunity.title,
                    "skills" : [],
                    "measure_of_impacts" : [],
                    "nationalities" : [],
                    "backgrounds" : [],
                    "languages":  [],
                    "description": this.opportunity.description
                }
            })
            .then( response => {
                console.log(response.data.data);
            })
            .catch(err => console.log(err.response));                
        },
        submitLog(){
            fetch(LOG_URL, {
                method: "POST",
                body: JSON.stringify(this.modification),
                headers: {
                    "content-type": "application/json"
                }
            })
            .then( response => {
                 console.log(response.data.data);
             })
            .catch(err => console.log(err.response));
        },
        onSubmit(evt) {
            //evt.preventDefault()
            this.updateOpportunity()
            this.submitLog()
        },
        onReset(evt) {
            evt.preventDefault()
            this.show = false
            this.$nextTick(() => {
            this.show = true
            })
        }
    },
    computed:{
      show:{
        get(){
            return this.visible
        },
        set (value) {
            if (!value) {
            this.$emit('close')
            }
        }   
      }
    }
}

</script>

<style>
.bg-modal{
    position: absolute;
    left: 0; right: 0; top: 0;
    height: 200px;
    width: 100%;
    color: white !important;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.bg-modal:after{
    content :'\A';
    position: absolute;
    width: 100%; height:200px;
    top:0; left:0; top: 0;
    background:rgba(0, 0, 0, 0.6);
    opacity: 0.8;
}
.bg-modal-title{
    padding-top: 50px;
    color: white;
}

.bg-modal-title, .bg-modal-country{
    position: relative;
    z-index: 99;
}
.info-modal{
    text-align: left;
    margin-top: 200px;
}
</style>