import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { strg, db } from '../database/firebaseConfig';
import { Alert } from 'react-native';

export const useStorage = () => {
  const [uploading, setUploading] = useState(false);

  const uploadMedia = async () => {
    // 1. Permisos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Error', 'Necesitamos acceso a la galería.');
      return;
    }

    // 2. Selección
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const fileName = asset.uri.substring(asset.uri.lastIndexOf('/') + 1);
      
      setUploading(true);

      try {
        // 3. Conversión de URI a Blob (Crucial para Expo Go)
        const response = await fetch(asset.uri);
        const blob = await response.blob();

        // 4. Subida a Storage
        const storageRef = ref(strg, `multimedia/${fileName}`);
        await uploadBytes(storageRef, blob);
        
        // 5. URL y Registro en Firestore
        const url = await getDownloadURL(storageRef);
        await addDoc(collection(db, 'uploads'), {
          name: fileName,
          url: url,
          type: asset.type,
          createdAt: new Date().toISOString(),
        });

        Alert.alert('Éxito', 'Archivo guardado en la nube.');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Falló la subida. Revisa las reglas de Firebase.');
      } finally {
        setUploading(false);
      }
    }
  };

  return { uploadMedia, uploading };
};