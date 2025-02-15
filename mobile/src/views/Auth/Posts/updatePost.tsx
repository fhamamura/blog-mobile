import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AuthContext from "../../../contexts/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from "expo-secure-store";
import API from '../../../types/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    textAlignVertical: 'top', // Ensures text starts at the top of the TextInput
  },
  button: {
    backgroundColor: '#666',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
},
buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
},
});

const UpdatePost: React.FC = () => {
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync("authToken").then((token) => {
      setToken(token);
    });

    fetch(`${API.POSTS}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        Alert.alert('Erro ao carregar post');
      });
  }, [id]);

  useEffect(() => {
    navigation.setOptions({ title: 'Atualizar Post' });
  }, [navigation]);

  const handleUpdatePost = () => {
    if (!token) {
      Alert.alert('Erro', 'Token de autenticação não encontrado');
      return;
    }

    fetch(`${API.POSTS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, author }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Falha ao atualizar o post');
        }
      })
      .then((data) => {
        Alert.alert('Post atualizado com sucesso!');
        navigation.navigate('Posts', { refresh: true });
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        Alert.alert('Erro ao atualizar post');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View><Text>Título:</Text></View>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <View><Text>Conteúdo:</Text></View>
      <TextInput
        style={styles.textArea}
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <View><Text>Autor:</Text></View>
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={author}
        onChangeText={setAuthor}
      />
      <Button title="Atualizar Post" onPress={handleUpdatePost}  color="#666" />
    </SafeAreaView>
  );
};


export default UpdatePost;