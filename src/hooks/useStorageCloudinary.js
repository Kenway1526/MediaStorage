import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../database/firebaseConfig';

export const useStorageCloudinary = () => {
  const [uploading, setUploading] = useState(false);

  // Tus credenciales reales de Cloudinary
  const CLOUD_NAME = "dzwwsstnn"; 
  const UPLOAD_PRESET = "mediastorage"; 

  const uploadMedia = async () => {
    try {
      // 1. Selección de archivo multimedia
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        quality: 0.7,
      });

      if (result.canceled || !result.assets) return;
      setUploading(true);

      const file = result.assets[0];
      
      // 2. Preparar FormData para la API de Cloudinary
      const data = new FormData();
      data.append('file', {
        uri: file.uri,
        type: file.type === 'video' ? 'video/mp4' : 'image/jpeg',
        name: file.uri.split('/').pop(),
      });
      data.append('upload_preset', UPLOAD_PRESET);

      // 3. Petición a Cloudinary
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      const cloudinaryData = await response.json();

      if (!response.ok) {
        throw new Error(cloudinaryData.error?.message || "Error en Cloudinary");
      }

      // 4. Guardar la URL en Firebase Firestore
      await addDoc(collection(db, 'uploads'), {
        name: cloudinaryData.original_filename || "file",
        url: cloudinaryData.secure_url, 
        type: file.type,
        createdAt: new Date().toISOString(),
      });

      Alert.alert('¡Éxito!', 'Archivo guardado en Cloudinary y registrado en Firebase.');

    } catch (error) {
      console.error("Error Híbrido:", error);
      Alert.alert('Error', 'No se pudo completar la subida. Revisa el preset mediastorage.');
    } finally {
      setUploading(false);
    }
  };

  return { uploadMedia, uploading };
};