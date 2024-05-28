<script setup lang="ts">
import type { ArtworkModelUpload } from '@/core/models/artworkModel';
import type {Ref} from 'vue'; 
import {onMounted, ref} from 'vue'; 
import error from '@/components/shared/error.vue';
import colorsEnum from '@/core/types/enums/colorsEnum';
import { useUserStore } from '@/store/userUserStore';

interface FormDataValue {
  file_data: string;
  [key: string]: any; // Pour couvrir toutes les autres propriétés dynamiques
}

const formData2: { value: FormDataValue } = { value: { file_data: '' } };
const file: { value: File | null } = { value: null };


interface ImageItem {
  imageURL: string;
  title: string;
  description: string;
  artwork_id: number;
  creation_date: string;
  file_name: string;
  file_size: number;
  media_type: string;
  portfolio_id: number;
  visible: number;
}

const formData: Ref<ArtworkModelUpload> = ref({
    portfolio_id : 19,
    title : '', 
    description: '', 
    media_type: 'image',
    file_name: '',
    file_type: '',
    file_size: 0,
    file_data: '', 
})

const errorMessage = ref('');
const errorVisible = ref(false)
const maxFileSize = 2 * 1024 * 1024;
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
const portfolio_id = ref(); 
const userStore = useUserStore(); 
const user = userStore.getUser(); 
const images = ref<ImageItem[]>([]);
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
        console.log(data)
for (const item of data.upload) {
  const imageURL = `data:${item.file_type};base64,${item.file_data}`;
  images.value.push({
    imageURL: imageURL,
    title: item.title,
    description: item.description,
    artwork_id: item.artwork_id,
    creation_date: item.creation_date,
    file_name: item.file_name,
    file_size: item.file_size,
    media_type: item.media_type,
    portfolio_id: item.portfolio_id,
    visible: item.visible
  });
}
      } 
      catch (err : string | any) {
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
  if (file.value) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file.value);
    fileReader.onload = async () => {
      if (file.value) {
        try {
          const arrayBuffer = fileReader.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          const base64String = uint8ArrayToBase64(uint8Array);
          formData.value.file_data = base64String;
          const response = await fetch('/api/imageUploadService', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData.value)
          });
          
          if (!response.ok) {
            console.error('Upload failed');
          } else {
            const result = await response.json();
            console.log('Upload success:', result);
          }
        } catch (error) {
          console.error('Error during upload:', error);
        }
      }
    };
    fileReader.onerror = (error) => {
      console.error('FileReader error:', error);
    };
  }
};

function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  const chunkSize = 0x8000;
  let base64String = '';
  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.subarray(i, i + chunkSize);
    base64String += String.fromCharCode.apply(null, chunk as unknown as number[]);
  }
  return btoa(base64String);
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
    <div v-for="img in images" :key="img.artwork_id">
   {{console.log(img.imageURL)}}
      <img :src="img.imageURL">
        <span>Je suis là</span>
      </img>
    </div>
  </v-container>
</template>