import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Button, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import API from '../../../types/api';


type Props = NativeStackScreenProps<RootStackParamList, 'ViewPost'>;

interface Post {
    _id: number;
    title: string;
    content: string;
}

export default function DeletePost({ route, navigation }: Props) {
    const { id } = route.params;
    const [post, setPost] = useState<Post | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        SecureStore.getItemAsync("authToken").then((token) => {
            setToken(token);
        });

        fetch(`${API.POSTS}/${id}`)
            .then((res) => res.json())
            .then((data) => setPost(data))
            .catch((error) => {
                //console.error("Erro:", error);
                Alert.alert('Erro ao carregar post');
            });
    }, [id]);

    useEffect(() => {
        navigation.setOptions({ title: 'Excluir Post' });
    }, [navigation]);

    const handleDeletePost = () => {
        if (!token) {
            Alert.alert('Erro', 'Token de autenticação não encontrado');
            return;
        }

        fetch(`${API.POSTS}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    Alert.alert('Post excluído com sucesso!');
                    navigation.navigate('Posts', { refresh: true });
                } else {
                    throw new Error('Falha ao excluir o post');
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                Alert.alert('Erro ao excluir post');
            });
    };

    if (!post) return <Text>Carregando...</Text>;

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <ScrollView>
                <Text style={{ fontSize: 24 }}>{post.title}</Text>
                <Text style={{ fontSize: 16, marginVertical: 10 }}>{post.content}</Text>
                <TouchableOpacity style={styles.button} onPress={handleDeletePost}>
                    <Text style={styles.buttonText}>Excluir Post</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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