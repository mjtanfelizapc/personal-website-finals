<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from './lib/supabase';

const guestbookEntries = ref([]);
const guestName = ref('');
const guestMessage = ref('');
const galleryImages = ref([
  '/Org Fair M PIC 1.jpg',
  '/Org Fair M PIC 2.jpg',
  '/Random.jpg'
]);

const fetchGuestbook = async () => {
  const { data, error } = await supabase.from('guestbook').select('*').order('created_at', { ascending: false });
  if (error) console.error(error);
  else guestbookEntries.value = data;
};

const addGuestbookEntry = async () => {
  if (!guestName.value || !guestMessage.value) return;
  
  const { data, error } = await supabase.from('guestbook').insert([{ 
    name: guestName.value, 
    message: guestMessage.value 
  }]);

  if (error) {
    console.error('Error inserting comment:', error);
    alert('Failed to submit comment. Check console for details.');
  } else {
    console.log('Comment added:', data);
    guestName.value = '';
    guestMessage.value = '';
    fetchGuestbook();
  }
};

onMounted(fetchGuestbook);
</script>

<template>
  <div class="profile-page">
    <div class="profile-header">
      <img class="profile-pic" src="/Mico1.jpg" alt="Profile Picture">
      <h1>Micharl Lance Angelo J. Tan Feliz</h1>
      <p>
        I am a 2nd-year college student at APC, residing in Biñan, Laguna.
        I enjoy staying indoors but also love going out occasionally.
        I like watching my girlfriend paint.
      </p>
    </div>

    <div class="section">
      <h2>Education & Achievements</h2>
      <ul>
        <li>Graduated High School from LCC-Biñan</li>
        <li>Graduated Senior High School from APC</li>
        <li>2024 Basketball Champion at APC Sports Fest</li>
        <li>With Honors in First Year College</li>
      </ul>
    </div>

    <div class="section">
      <h2>Goals</h2>
      <ul>
        <li>Graduate College</li>
        <li>Become a Cloud Specialist</li>
        <li>Have a Comfortable Life</li>
      </ul>
    </div>

    <div class="section gallery-section">
      <h2>Gallery</h2>
      <div class="gallery">
        <img v-for="(image, index) in galleryImages" :key="index" :src="image" alt="Gallery Image">
      </div>
    </div>

    <div class="section">
      <h2>Guestbook</h2>
      <input v-model="guestName" type="text" placeholder="Your Name">
      <textarea v-model="guestMessage" placeholder="Your Message"></textarea>
      <button @click="addGuestbookEntry">Sign Guestbook</button>
      
      <div class="guestbook-entries">
        <div v-for="(entry, index) in guestbookEntries" :key="index" class="guest-entry">
          <strong>{{ entry.name }}</strong>
          <p>{{ entry.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  background: linear-gradient(to bottom, #2b2d42, #8d99ae);
  color: #edf2f4;
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 20px;
}

.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #ef233c;
  box-shadow: 0 0 10px rgba(239, 35, 60, 0.8);
}

h1 {
  font-size: 1.8rem;
  color: #ef233c;
  margin-top: 10px;
}

.section {
  width: 90%;
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #ff6b6b;
}

ul {
  list-style-type: none;
}

ul li {
  font-size: 1.1rem;
  padding: 5px;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.gallery img {
  width: 150px;
  height: 150px;
  border-radius: 12px;
  object-fit: cover;
  border: 3px solid #ef233c;
  transition: transform 0.3s ease;
}

.gallery img:hover {
  transform: scale(1.1);
}

input, textarea {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
}

button {
  background: #ef233c;
  color: white;
  border: none;
  padding: 12px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: background 0.3s;
}

button:hover {
  background: #d90429;
}

.guest-entry {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: left;
}

.guest-entry strong {
  color: #ff6b6b;
}
</style>