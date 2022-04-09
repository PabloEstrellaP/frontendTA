<template>
  <div>
    <v-card flat>
      <v-card-title>
        <v-toolbar color="primary">
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-spacer />
          <div class="hidden-sm-and-down">
            <v-btn class="info" @click="cleanForm()">Limpiar</v-btn>
            <v-btn v-if="isEdit" class="error ml-1" @click="cancelEdit()">Cancelar</v-btn>
            <v-btn class="success ml-1" @click="validate()">{{ isEdit ? 'Editar' : 'Agregar' }}</v-btn>
          </div>
        </v-toolbar>
      </v-card-title>
      <v-card-text class="hidden-sm-and-up">
        <v-col>
            <v-btn block class="info" @click="cleanForm()">Limpiar</v-btn>
            <v-btn block v-if="isEdit" class="error mt-1" @click="cancelEdit()">Cancelar</v-btn>
            <v-btn block class="success mt-1" @click="validate()">{{ isEdit ? 'Editar' : 'Agregar' }}</v-btn>
        </v-col>
      </v-card-text>
    </v-card>
    <v-layout row wrap :class="isLoading ? 'isHiden' : ''">
      <v-flex xs12 md6>
        <AddUserAuthCard ref="addUserAuthCard" :userName="userEmail" />
      </v-flex>
      <v-flex xs12 md6>
        <AddUserCard ref="addUserCard"/>
      </v-flex>
      <v-flex xs12>
        <UserAuthCard ref="userAuthCard" />
      </v-flex>
      <LoadingCardDialog ref="loadingCardDialog" />
    </v-layout>
    <v-dialog v-model="addDialog" max-width="340" persistent>
      <v-card>
        <v-card-title class="text-h5 lighten mb-5">
            {{ isEdit ? editDescription : addDescription }}
        </v-card-title>
        <v-card-text>
            <v-layout row wrap>
                <v-spacer />
                <v-btn color="primary" class="mr-3" @click="addUser()">Aceptar</v-btn>
                <v-btn color="secondary" @click="addDialog = false">Cancelar</v-btn>
            </v-layout>
        </v-card-text>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import UserAuthCard from '@/components/userAuth/userAuthCard.vue'
  import AddUserAuthCard from '@/components/userAuth/addUserAuthCard.vue'
  import AddUserCard from '@/components/user/addUserCard.vue'
  import LoadingCardDialog from '@/components/helpers/loadingCardDialog.vue'
  export default {
    components: {
      UserAuthCard,
      AddUserAuthCard,
      AddUserCard,
      LoadingCardDialog
    },
    data() {
      return {
        addDialog: false,
        addDescription: '¿Está seguro de guardar la información?',
        editDescription: '¿Está seguro de actualizar la información?',
        user: null,
        userId: null,
        userEmail: null,
        userAuth: null,
        isLoading: true,
        isEdit: false
      }
    },
    methods: {
      async getUserAuth() {
        await this.$refs.userAuthCard.getUserAuth()
      },
      openDialog() {
        this.$refs.loadingCardDialog.openDialog()
      },
      closeDialog() {
        this.$refs.loadingCardDialog.closeDialog()
      },
      async validate() {
        try {
          if(this.$refs.addUserCard.$refs.form.validate() && this.$refs.addUserAuthCard.$refs.form.validate()) {
            this.addDialog = true
          }
        } catch (error) {
          
        }
      },
      async addUser() {
        try {
          this.addDialog = false
          await this.$refs.addUserCard.addUser()
          await this.$refs.addUserAuthCard.addUserAuth()
          this.cleanForm()
        } catch (error) {
          console.log(error)
        }
      },
      cleanForm() {
        this.$refs.addUserAuthCard.cleanForm()
        this.$refs.addUserCard.cleanForm()
      },
      cancelEdit() {
        this.$refs.addUserAuthCard.cancelEdit()
        this.$refs.addUserCard.cancelEdit()
      }
    },
    async mounted() {
      if(process.browser){
        this.openDialog()
        await this.getUserAuth()
        this.closeDialog()
        this.isLoading = false
      }
    },
    watch: {
      userAuth(newvalue) {
        if(newvalue){
          this.$refs.addUserAuthCard.getUserAuth(newvalue)
          this.isEdit = true
        }else {
          this.$refs.addUserAuthCard.$refs.form.reset()
          this.isEdit = false
        }
      },
      user(newvalue) {
        if(newvalue){
          this.$refs.addUserCard.getUser(newvalue)
        }else {
          this.$refs.addUserCard.$refs.form.reset()
        }
      }
    }
  }
</script>

<style scoped>
  .isHiden {
    visibility: hidden;
  }
  .v-toolbar {
    border-radius: 10px;
  }
  .v-toolbar__title {
    color: white;
  }
</style>