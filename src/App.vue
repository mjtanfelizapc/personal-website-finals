<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from './lib/supabase';

const guestbookEntries = ref([]);
const name = ref('');
const message = ref('');

const fetchGuestbook = async () => {
  const { data, error } = await supabase.from('guestbook').select('*').order('created_at', { ascending: false });
  if (error) console.error(error);
  else guestbookEntries.value = data;
};

const addEntry = async () => {
  if (!name.value || !message.value) return;
  
  const { data, error } = await supabase.from('guestbook').insert([{ 
    name: name.value, 
    message: message.value 
  }]);

  if (error) {
    console.error('Error inserting comment:', error);
    alert('Failed to submit comment. Check console for details.');
  } else {
    console.log('Comment added:', data);
    name.value = '';
    message.value = '';
    fetchGuestbook(); // Refresh the list
  }
};

onMounted(fetchGuestbook);
</script>

<template>
  <div class="profile-page">
    <!-- Profile Picture -->
    <div class="profile-header">
      <img class="profile-pic" src="/Mico1.jpg" alt="Profile Picture">
      <h1>Micharl Lance Angelo J. Tan Feliz</h1>
      <p>
        I am a 2nd-year college student at APC, residing in Biñan, Laguna.
        I enjoy staying indoors but also love going out occasionally.
        I like watching my girlfriend paint.
      </p>
    </div>

    <!-- Education & Achievements -->
    <div class="section">
      <h2>Education & Achievements</h2>
      <ul>
        <li>Graduated High School from LCC-Biñan</li>
        <li>Graduated Senior High School from APC</li>
        <li>2024 Basketball Champion at APC Sports Fest</li>
        <li>With Honors in First Year College</li>
      </ul>
    </div>

    <!-- Goals -->
    <div class="section">
      <h2>Goals</h2>
      <ul>
        <li>Graduate College</li>
        <li>Become a Cloud Specialist</li>
        <li>Have a Comfortable Life</li>
      </ul>
    </div>

    <!-- Gallery -->
    <div class="section">
      <h2>Gallery</h2>
      <div class="gallery">
        <img v-for="(image, index) in galleryImages" :key="index" :src="image" alt="Gallery Image">
      </div>
    </div>

    <!-- Guestbook -->
    <div class="section">
      <h2>Guestbook</h2>
      <input v-model="guestName" type="text" placeholder="Your Name">
      <textarea v-model="guestMessage" placeholder="Your Message"></textarea>
      <button @click="addGuestbookEntry">Sign Guestbook</button>
      
      <div class="guestbook-entries">
        <div v-for="(entry, index) in guestbook" :key="index" class="guest-entry">
          <strong>{{ entry.name }}</strong>
          <p>{{ entry.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      galleryImages: [
        "https://via.placeholder.com/150", 
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ],
      guestName: "",
      guestMessage: "",
      guestbook: []
    };
  },
  methods: {
    addGuestbookEntry() {
      if (this.guestName && this.guestMessage) {
        this.guestbook.push({ name: this.guestName, message: this.guestMessage });
        this.guestName = "";
        this.guestMessage = "";
      }
    }
  }
};
</script>

<style>
/* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Brighter Theme */
body, html {
  background: linear-gradient(to bottom, #1e2a4a, #2f3e66);
  color: white;
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 20px;
}

/* Profile Header */
.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #4c85ff;
}

h1 {
  font-size: 1.6rem;
  color: #4c85ff;
  margin-top: 10px;
}

/* Section Styles */
.section {
  width: 80%;
  max-width: 600px;
  margin: 20px auto;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

h2 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #77aaff;
}

ul {
  list-style-type: none;
}

ul li {
  font-size: 1rem;
  padding: 5px;
}

/* Gallery */
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.gallery img {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #4c85ff;
}

/* Guestbook */
input, textarea {
  width: 100%;
  margin-top: 10px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
}

textarea {
  height: 80px;
  resize: none;
}

button {
  background: #4c85ff;
  color: white;
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  transition: background 0.3s;
}

button:hover {
  background: #77aaff;
}

/* Guestbook Entries */
.guestbook-entries {
  margin-top: 20px;
}

.guest-entry {
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: left;
}

.guest-entry strong {
  color: #4c85ff;
}

.guest-entry p {
  font-size: 0.9rem;
  margin-top: 5px;
}

/* Responsive Design */
@media (max-width: 600px) {
  h1 {
    font-size: 1.3rem;
  }

  h2 {
    font-size: 1.1rem;
  }

  .gallery img {
    width: 80px;
    height: 80px;
  }
}
</style>
