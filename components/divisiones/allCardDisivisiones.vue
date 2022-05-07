<template>
    <v-layout row wrap justify-space-around>
        <v-flex xs12 md6>
            <CardData :typeData="typeOfData[0]" :division="division"/>
        </v-flex>
        <v-flex xs12 md6>
            <CardData :typeData="typeOfData[1]" :division="division"/>
        </v-flex>
        <v-flex xs12 md6 mt-2>
            <CardData :typeData="typeOfData[2]" :division="division"/>
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
    }
</script>

<style>

</style>