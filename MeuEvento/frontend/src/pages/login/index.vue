<template>
  <div class="login-content">
      <div class="login-modal">
          <h3>Meu Evento</h3>
          <h4>Seu evento preferido está aqui!</h4>
          <hr>
          <div class="login-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

          <input v-if="showSignup" v-model="user.nome" type="text" placeholder="Nome">
          <input v-model="user.email" type="text" placeholder="E-mail">
          <input v-model="user.password" type="password" placeholder="Senha">
          <input v-if="showSignup" v-model="user.confirmPassword" type="password" placeholder="Confirme a senha">

          <button v-if="showSignup" @click="signup">Registrar</button>
          <button v-else @click="signin">Entrar</button>

          <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro ? Acesse o Login!</span>
                <span v-else>Não tem cadastro ? Registre-se aqui!</span>

          </a>

      </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Login",
  data: function() {
    return {
      showSignup: false,
      user: {},
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.login-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-modal {
  background-color: #fff;
  width: 500px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-title {
    font-size: 1.2rem;
    font-weight: 100;
    margin-top: 10px;
    margin-bottom:  15px
}

.login-modal input {
    border: 1px solid #BBB;
    width: 100%;
    margin-bottom: 15px;
    padding: 3px 8px;
    outline: none;
}


.login-modal button {
    align-self: flex-end;
    background-color: #2460ae;
    color: #FFF;
    padding: 5px 15px;
}

.login-modal a {
    margin-top: 35px
}

.login-modal hr {
    border: 0;
    width: 100%;
    height: 1px;
    background-image:  linear-gradient(to right,
             rgba(120, 120, 120, 0),
                rgba(120, 120, 120, 0.75),
                rgba(120, 120, 120, 0));
}

.login-modal h3 {
    color: #2460ae;
 }

</style>
