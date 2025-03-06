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
  <div class="container">
    <img :src="'/Mico1.jpg'" alt="Profile" class="profile-img" />
    <h1>Abrech D. Dela Cruz</h1>
    <p>I'm a Computer Science student from Asia Pacific College that is currently residing in Quezon City. I'm also a guitarist of a band called LArdy DArdy and OdeToTheMetz.</p>
    
    <h2>Education & Achievements</h2>
    <ul>
      <li>Graduated JHS</li>
      <li>Graduated SHS</li>
    </ul>

    <h2>IT Experience</h2>
    <ul>
      <li>A love message website</li>
      <li>A Python search engine where a message will pop that says a tree is planted for every 50 searches</li>
    </ul>

    <h2>Hobbies & Interests</h2>
    <ul>
      <li>Guitar, Music, Gym, Watching TV Series & Films</li>
    </ul>

    <h2>Goals</h2>
    <ul>
      <li>I want to be successful in life.</li>
    </ul>

    <h2>Picture Gallery</h2>
    <div class="gallery">
      <img v-for="i in 6" :key="i" :src="`/profile${i+1}.jpg`" alt="Gallery Image" class="gallery-img" />
    </div>

  <div class="container">
    <h2>Guestbook</h2>
    
    <form @submit.prevent="addEntry">
      <input v-model="name" placeholder="Your Name" required />
      <textarea v-model="message" placeholder="Your Message" required></textarea>
      <button type="submit">Sign Guestbook</button>
    </form>

    <ul>
      <li v-for="entry in guestbookEntries" :key="entry.id">
        <strong>{{ entry.name }}</strong>: {{ entry.message }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container { max-width: 600px; margin: auto; padding: 20px; text-align: center; }
input, textarea { width: 100%; margin: 5px 0; padding: 8px; }
button { padding: 8px 15px; cursor: pointer; }
ul { list-style: none; padding: 0; }
li { padding: 10px; border-bottom: 1px solid #ccc; }
</style>