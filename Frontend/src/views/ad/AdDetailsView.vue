<template>
  <div class="container border mt-5 mb-5">
    <div class="ad-details">
      <div class="ad-image-slider">
        <button class="slider-arrow left" @click="prevImage">&lt;</button>
        <img :src="currentImage" alt="Ad Image">
        <button class="slider-arrow right" @click="nextImage">&gt;</button>
      </div>
      <div class="ad-info">
        <h1>{{ ad.title }}</h1>
        <p>{{ ad.description }}</p>
        <button @click="openChat">Chat with Advertiser</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ad: {
        title: "Furniture Set",
        description: "A beautiful furniture set for your living room.",
        images: [
          "https://via.placeholder.com/400x300/ff0000",
          "https://via.placeholder.com/400x300/00ff00",
          "https://via.placeholder.com/400x300/0000ff"
        ],
        advertiserId: "123456789" // Assuming advertiserId is required for opening chat
      },
      currentImageIndex: 0
    };
  },
  computed: {
    currentImage() {
      return this.ad.images[this.currentImageIndex];
    }
  },
  methods: {
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.ad.images.length) % this.ad.images.length;
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.ad.images.length;
    },
    openChat() {
      // Logic to open chat with advertiser
      // For demonstration, let's log a message
      console.log('Opening chat with advertiser:', this.ad.advertiserId);
      router.push('/chat');
    }
  }
};
</script>

<style scoped>
.ad-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.ad-image-slider {
  position: relative;
  margin-bottom: 20px;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1;
}

.slider-arrow.left {
  left: 10px;
}

.slider-arrow.right {
  right: 10px;
}

.ad-image-slider img {
  max-width: 100%;
  height: auto;
}

.ad-info h1 {
  margin-top: 0;
}

.ad-info button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.ad-info button:hover {
  background-color: #0056b3;
}

.border {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  border: 2px solid #ccc;
  border-radius: 10px;
}
</style>
