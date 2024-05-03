<template>
      <div class="home">
        <h1>Welcome to Leguan Academy!</h1>
        <div class="cards">
          <router-link to="/keyboard" class="card">
            <div class="card-image keyboard-image"></div>
            <div class="card-title">Keyboard Fun</div>
            <div class="card-description">Learn and type with our interactive keyboard!</div>
          </router-link>
          <router-link to="/treasurehunt" class="card">
            <div class="card-image treasure-image"></div>
            <div class="card-title">Treasure Hunt</div>
            <div class="card-description">Go on a treasure hunting adventure and solve puzzles!</div>
          </router-link>
          <router-link to="/crocoslunch" class="card">
            <div class="card-image crocos-image"></div>
            <div class="card-title">Crocos Lunch</div>
            <div class="card-description">Croco is hungry</div>
          </router-link>
        </div>
      </div>
    </template>
    
    <script>
    
    </script>
    
    <style scoped>
    .home {
      text-align: center;
    }
    
    .cards {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
    
    .card {
      width: 300px;
      border: 2px solid #eee;
      border-radius: 10px;
      padding: 10px;
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s ease-in-out;
    }
    
    .card:hover {
      transform: scale(1.05);
    }
    
    .card-image {
      height: 200px;
      background-size: cover;
      background-position: center;
      border-radius: 8px;
    }
    
    .keyboard-image {
      background-image: url('/src/assets/images/keyboardteaser.png');
    }
    
    .treasure-image {
      background-image: url('/src/assets/images/treasurehuntteaser.png');
    }

    .crocos-image {
      background-image: url('/src/assets/images/crocoslunch.png');
    }
    
    .card-title {
      font-size: 24px;
      margin-top: 8px;
    }
    
    .card-description {
      font-size: 16px;
      color: #666;
    }
    </style>
    