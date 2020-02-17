<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container">
            <router-link class="nav-link" to="/">
                <a class="navbar-brand">
                    <img style="width:180px; height: 26px;" src="../assets/aiesec.png" >
                </a>
            </router-link>
            <a href="/log">
                <router-link class="nav-link" to="/log">
                    <button class="btn btn-light" style="color: blue !important; font-family: 'Lato medium';">Log</button>
                </router-link>
            </a>
        </div>
    </nav>
</template>

<script>
export default {
    data(){
        return{
            message: 'hello'
        }
    }
}
</script>
<style>
a{
    text-decoration: none;
}
</style>