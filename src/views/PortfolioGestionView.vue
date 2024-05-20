<script setup lang="ts">
import type { ArtworkModelUpload } from '@/core/models/artworkModel';
import type {Ref} from 'vue'; 
import {onMounted, ref} from 'vue'; 
import error from '@/components/shared/error.vue';
import colorsEnum from '@/core/types/enums/colorsEnum';
import { useUserStore } from '@/store/userUserStore';

let file = ref<File | null | Blob>(null); 

const formData: Ref<ArtworkModelUpload> = ref({
    portfolio_id : 19,
    title : '', 
    description: '', 
    media_type: 'image',
    file_name: '',
    file_type: '',
    file_size: 0,
    file_data: new Uint8Array(), 
})

const errorMessage = ref('');
const errorVisible = ref(false)
const maxFileSize = 2 * 1024 * 1024;
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
const portfolio_id = ref(); 
const userStore = useUserStore(); 
const user = userStore.getUser(); 
const images = ref([])
const loading = ref(false); 

onMounted(() => {
  fetchImages; 
  portfolio_id.value = user?.portfolio_id; 
});

const fetchImages = async () => {
      loading.value = true;
      try {
        const response = await fetch('/api/imageRetrieveService', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( portfolio_id.value)
            })
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        console.log('Je passe après data')
        images.value += data.file_data;
        console.log(images.value)
      } catch (err : string | any) {
        errorMessage.value = err.message;
      } finally {
        loading.value = false;
      }
    }
 

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
      if (target && target.files && target.files[0]) {
        file.value = target.files[0];

        // Validate file type
        if (!allowedFileTypes.includes(file.value.type)) {
          errorMessage.value = 'Invalid file type. Please upload an image or a video file.';
          file.value = null;
          errorVisible.value = true
          setTimeout(() => {
            errorVisible.value = false; 
          },1000)
          return;
        }

        // Validate file size
        if (file.value.size > maxFileSize) {
          errorMessage.value = 'File size exceeds the limit of 2MB.';
          file.value = null;
          errorVisible.value = true
          setTimeout(() => {
            errorVisible.value = false; 
          },1000)
          return;
        }

        // Clear any previous error message
        errorMessage.value = '';

        // Update formData with file details
        formData.value.file_type = file.value.type;
        formData.value.file_size = file.value.size;
        formData.value.file_name = 'NOM ALEATOIRE POUR LA SECURITE'; 
      }
    };

const uploadImage = () => {
  if(file.value){
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file.value);
    fileReader.onload = async () => {
      if(file.value){
        const blob = new Blob([fileReader.result as ArrayBuffer], { type: file.value.type });
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        formData.value.file_data = uint8Array; 
        try {
          const response = await fetch('/api/imageUploadService', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData.value)
            })
            if(!response.ok){

            } else {
              console.log("erreur"); 
            }
        } catch {console.log('bug')}
      }
    }
  }
}

</script>
<template>
  <error :message="errorMessage" :visible="errorVisible" :color="colorsEnum.WARNING"></error>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2>Upload Artwork</h2>
        <v-form @submit.prevent="uploadImage" ref="form">
          <v-text-field
            label="Title"
            v-model="formData.title"
            required
          ></v-text-field>
          <v-textarea
            label="Description"
            v-model="formData.description"
            required
          ></v-textarea>
          <v-file-input
            label="File"
            @change="onFileChange"
            required
          ></v-file-input>
          <v-btn type="submit" color="primary">Upload</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-btn @click="fetchImages">
      Recupérer les imlages
    </v-btn>
  </v-container>
</template>