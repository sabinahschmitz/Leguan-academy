<script setup>
import { RouterLink, RouterView } from 'vue-router'
import toolbar from '/src/components/main-toolbar.vue'
</script>

<template>
  <header>
    <img alt="Leguan Academy logo" src="@/assets/logo2.png" width="125" height="125" />
    <p>Hi my name is Iggy, Iggy the Iguana</p>
    <div><h1>Leguan Academy</h1></div>
    <div><h2>Digital Education for Children</h2></div>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/Keyboard">Keyboard</RouterLink>
        <RouterLink to="/treasurehunt">Treasure Hunt</RouterLink>
        <RouterLink to="/crocoslunch">Crocos Lunch</RouterLink>
        <RouterLink to="/cybersec">Cyber Security Training</RouterLink>
        <RouterLink to="/opensource">Open Source Contribution</RouterLink>
        <RouterLink to="/privacy">Privacy</RouterLink>
      </nav>
      <RouterView></RouterView>
    </div>
    <footer>
      <form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="hosted_button_id" value="HEJDHAV6GQ8QL" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
          border="0"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
        />
        <img
          alt=""
          border="0"
          src="https://www.paypal.com/en_DE/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>

      <a href="#">Impressum</a>
      <router-link to="/privacy">Privacy</router-link>
    </footer>
  </header>
</template>

<style scoped>
.fund-me-button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
}

header {
  background-color: #f7f7f7;
  padding: 20px;
  text-align: center;
}

.logo {
  margin-bottom: 20px;
}

nav {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

nav a {
  color: #333;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  background-color: #ddd;
  transition: background-color 0.3s ease;
}

nav a:hover {
  background-color: #bbb;
}

@media (min-width: 768px) {
  header {
    padding: 20px 40px;
  }

  nav {
    margin-top: 0;
  }
}
</style>
