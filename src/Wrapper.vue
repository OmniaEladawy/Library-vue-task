<template>
    <div class="container">
        <div class="row">
            <Header />
        </div>
        <div class="row">
            <div class="col-4">
                <Links />
            </div>

            <div class="col-8">
                <Content />
            </div>
        </div>
        <div class="row">
            <Footer />
        </div>
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    import Links from './components/Links.vue'
    import Content from './components/Content.vue'
    import Footer from './components/Footer.vue'
    export default {
        components: {
            Header,
            Links,
            Content,
            Footer
        }
    }
</script>
