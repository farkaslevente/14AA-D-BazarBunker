<!-- Filters.vue -->
<template>
    <div>
        <h1 class="display-3 m-2 text-center">Hirdetések</h1>
      <div class="filters-container justify-content-center">
        <input type="text" v-model="searchQuery" placeholder="Search by title" class="search-input">
  
        <select v-model="selectedCounty" class="select-dropdown">
          <option value="">No filter by county</option>
          <option v-for="county in hungaryCounties" :key="county">{{ county }}</option>
        </select>
  
        <select v-model="selectedPrice" class="select-dropdown">
          <option value="">No filter by price</option>
          <option value="asc">Price Ascending</option>
          <option value="desc">Price Descending</option>
        </select>
  
        <!-- Add other filter options here -->
  
        <button @click="applyFilters" class="apply-button">Apply Filters</button>
      </div>
  
      <!-- Demo Advertisements -->
      <div class="demo-ads-container">
        <div v-for="(ad, index) in demoAds" :key="index" class="demo-ad">
          <img :src="ad.image" alt="Ad Image" class="ad-image">
          <div class="ad-info">
            <h3>{{ ad.title }}</h3>
            <p>Price: {{ ad.price }}</p>
            <p>County: {{ ad.county }}</p>
            <p>Description: {{ ad.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import adservices from '../../services/adservices';
  import { useUserStore } from '../../stores/userstore';
  import {storeToRefs} from 'pinia';

  const { user } = storeToRefs( useUserStore() );

  const ads = ref();

  adservices.getAllAd()
      .then(resp => {
          // console.log(resp.data);
          ads.value = resp.data;
      });
      
  export default {
    data() {
      return {
        searchQuery: '',
        selectedCounty: '',
        selectedPrice: '',
        // Add other filter options here
        demoAds: [
          { title: 'Example Advertisement 1', price: '$100', county: 'Budapest', image: 'https://via.placeholder.com/150' },
          { title: 'Example Advertisement 2', price: '$150', county: 'Pest', image: 'https://via.placeholder.com/150' },
          { title: 'Example Advertisement 3', price: '$80', county: 'Szabolcs-Szatmár-Bereg', image: 'https://via.placeholder.com/150' }
          // Add more demo ads as needed
        ]
      };
    },
    props: ['counties'],
    computed: {
      hungaryCounties() {
        // You can load Hungary's counties from a static list or an API
        // For this example, I'm using a static list
        return [
          'Bács-Kiskun', 'Baranya', 'Békés', 'Borsod-Abaúj-Zemplén', 'Csongrád-Csanád',
          'Fejér', 'Győr-Moson-Sopron', 'Hajdú-Bihar', 'Heves', 'Jász-Nagykun-Szolnok',
          'Komárom-Esztergom', 'Nógrád', 'Pest', 'Somogy', 'Szabolcs-Szatmár-Bereg',
          'Tolna', 'Vas', 'Veszprém', 'Zala'
        ];
      }
    },
    methods: {
      applyFilters() {
        this.$emit('apply', {
          searchQuery: this.searchQuery,
          county: this.selectedCounty,
          price: this.selectedPrice,
          // Add other filter options here
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .filters-container {
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-left: 10px;
    margin-bottom: 20px;
  }
  
  .search-input {
    margin-right: 10px;
    padding: 5px;
  }
  
  .select-dropdown {
    margin-right: 10px;
    padding: 5px;
  }
  
  .apply-button {
    padding: 8px 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .apply-button:hover {
    background-color: #0056b3;
  }
  
  .demo-ads-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .demo-ad {
    width: 80%; /* Adjust width as needed */
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
    display: flex;
  }
  
  .ad-image {
    max-width: 150px;
    height: auto;
    margin-right: 20px;
  }
  
  .ad-info {
    flex: 1;
    text-align: left;
  }
  </style>
  