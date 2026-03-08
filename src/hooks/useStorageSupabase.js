import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'; //
import { decode } from 'base64-arraybuffer'; //
import { supabase } from '../database/supabaseConfig'; //

export const useStorageSupabase = () => {
  const [uploading, setUploading] = useState(false);

  const uploadMedia = async () => {
    try {
      // 1. Verificación de permisos
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Se requiere acceso a la galería para continuar.');
        return;
      }

      // 2. Selección de archivo multimedia
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'], //
        allowsEditing: true,
        quality: 0.7, //
      });

      if (result.canceled || !result.assets) return;

      const file = result.assets[0];
      const fileExtension = file.uri.split('.').pop();
      const fileName = `${Date.now()}.${fileExtension}`;
      
      setUploading(true);

      // 3. Lectura del archivo como Base64 (Solución a errores de null y undefined)
      // Usamos FileSystem.EncodingType.Base64 directamente para evitar errores de resolución
      const base64Data = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (!base64Data) {
        throw new Error("No se pudo leer el contenido del archivo.");
      }

      // 4. Subida al Bucket 'multimedia' de Supabase
      const { data: storageData, error: storageError } = await supabase.storage
        .from('multimedia') //
        .upload(fileName, decode(base64Data), {
          contentType: file.type === 'video' ? `video/${fileExtension}` : `image/${fileExtension}`, //
          upsert: true
        });

      if (storageError) throw storageError;

      // 5. Generar URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('multimedia')
        .getPublicUrl(fileName);

      // 6. Registro en la tabla 'uploads'
      const { error: dbError } = await supabase
        .from('uploads') //
        .insert([
          { 
            name: fileName, 
            url: publicUrl, 
            type: file.type 
          }
        ]);

      if (dbError) throw dbError;

      Alert.alert('¡Éxito!', 'Archivo multimedia guardado en Supabase.');

    } catch (error) {
      console.error("Detalle del error:", error);
      Alert.alert('Error en la subida', error.message || 'Verifica la configuración de Supabase.');
    } finally {
      setUploading(false);
    }
  };

  return { uploadMedia, uploading };
};