import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useStorage } from './src/hooks/useStorage';

export default function App() {
  const { uploadMedia, uploading } = useStorage();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Media Cloud JEF</Text>
        <Text style={styles.subtitle}>Almacenamiento de Imagen y Video</Text>
      </View>

      <View style={styles.content}>
        {uploading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loaderText}>Subiendo a Firebase...</Text>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.uploadButton} 
            onPress={uploadMedia}
          >
            <Text style={styles.buttonText}>Seleccionar Archivo</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ingeniería de Sistemas - 2026</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '6400',
  },
  loaderContainer: {
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007AFF',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#aaa',
    fontSize: 12,
  }
});