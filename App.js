import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useStorage } from './src/hooks/useStorage';

export default function App() {
  const { uploadMedia, uploading } = useStorage();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Media Storage App</Text>
        <Text style={styles.subtitle}>Cloudinary + Supabase DB</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={[styles.button, uploading && styles.buttonDisabled]} 
          onPress={uploadMedia}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Subir Multimedia</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ingeniería de Sistemas</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  header: { padding: 40, backgroundColor: '#3ecf8e', alignItems: 'center' }, // Color Supabase
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  subtitle: { color: '#e0fcf0', fontSize: 12 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#3ecf8e', padding: 20, borderRadius: 12 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footer: { padding: 20, alignItems: 'center' },
  footerText: { color: '#999', fontSize: 10 }
});