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
  const { error } = await supabase.from('guestbook').insert([{ name: name.value, message: message.value }]);
  if (error) console.error(error);
  else {
    name.value = '';
    message.value = '';
    fetchGuestbook(); // Refresh the list
  }
};

onMounted(fetchGuestbook);
</script>

<template>
  <div class="container">
    <h1>Guestbook</h1>
    
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