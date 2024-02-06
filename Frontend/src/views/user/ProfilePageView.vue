<template>
  <div class="profile">
    <div class="profile-header">
      <h1>Profile</h1>
    </div>
    <div class="profile-content">
      <img :src="user.image" alt="Profile Image" class="profile-image">
      <div class="profile-details">
        <h2 v-if="!isEditing">{{ user.name }}</h2>
        <input v-else v-model="editedUser.name" class="edit-input">
        
        <p v-if="!isEditing">{{ user.email }}</p>
        <input v-else v-model="editedUser.email" class="edit-input">
        
        <p v-if="!isEditing">{{ user.bio }}</p>
        <textarea v-else v-model="editedUser.bio" class="edit-input"></textarea>
        
        <ul>
          <li><strong>Username:</strong> {{ user.username }}</li>
          <li v-if="!isEditing"><strong>Location:</strong> {{ user.location }}</li>
          <li v-else><strong>Location:</strong> <input v-model="editedUser.location" class="edit-input"></li>
          <li><strong>Joined:</strong> {{ user.joined }}</li>
        </ul>
        <button @click="isEditing ? saveProfile() : editProfile">{{ isEditing ? 'Save' : 'Edit' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        location: 'New York, USA',
        joined: 'January 1, 2022',
        image: 'https://via.placeholder.com/250'
      },
      editedUser: {}, // Edited user data
      isEditing: false
    };
  },
  methods: {
    editProfile() {
      // Copy user data to editedUser for editing
      this.editedUser = Object.assign({}, this.user);
      this.isEditing = true;
    },
    saveProfile() {
      // Update user data with editedUser data
      this.user = Object.assign({}, this.editedUser);
      this.isEditing = false;
      // Here you would typically send the updated data to the backend
      // For demonstration purposes, we're logging the updated user data
      console.log('Updated user data:', this.user);
    }
  }
};
</script>


<style scoped>
.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  border: 2px solid #ccc;
  border-radius: 10px;
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
}

.profile-content {
  display: flex;
}

.profile-image {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-details {
  flex: 1;
}

.profile-details h2 {
  margin-top: 0;
}

.profile-details p {
  margin-bottom: 10px;
}

.profile-details ul {
  list-style: none;
  padding: 0;
}

.profile-details ul li {
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.edit-input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}
</style>
