<template>
    <v-layout row wrap justify-space-around>
        <v-flex xs12 md6>
            <CardData :typeData="typeOfData[0]" :division="division" ref="divisionChange"/>
        </v-flex>
        <v-flex xs12 md6>
            <CardData :typeData="typeOfData[1]" :division="division" ref="division1"/>
        </v-flex>
        <v-flex xs12 md6 mt-2>
            <CardData :typeData="typeOfData[2]" :division="division" ref="division2"/>
        </v-flex>
    </v-layout>
</template>

<script>
    import CardData from '@/components/helpers/cardData.vue'
    export default {
        components: {
            CardData
        },
        data() {
            return {
                typeOfData: [
                    'IT',
                    'Automobil',
                    'HousingSector'
                ],
            }
        },
        props: {
            division: {
                type: Object,
                require: true
            }
        },
        methods: {
            changeData(){
                this.$refs.divisionChange.changeData()
                this.$refs.division1.changeData()
                this.$refs.division2.changeData()
            }
        }
    }
</script>

<style>

</style>