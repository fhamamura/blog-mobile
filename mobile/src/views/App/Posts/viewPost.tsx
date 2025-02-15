import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
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
    author: string;
}

export default function ViewPost({ route, navigation }: Props) {
    const { id } = route.params;
    const [post, setPost] = useState<Post | null>(null);
    const UseNavigation = useNavigation();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<{ id: string; name: string; email: string, isAdmin: boolean } | null>(null);

    React.useEffect(() => {
        UseNavigation.setOptions({ title: '' }),
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                    <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        SecureStore.getItemAsync("authToken").then((token) => {
            setToken(token);
        });
        SecureStore.getItemAsync("authUser").then((user) => {
            if (user) {
                setUser(JSON.parse(user));
            }
        });
        fetch(`${API.POSTS}/${id}`)
            .then((res) => res.json())
            .then((data) => setPost(data));
    }, [id]);

    const deletePost = () => {
        //alert('Post excluído com sucesso!');
        //navigation.goBack();
        navigation.navigate('DeletePost', { id: id })
    };

    const updatePost = () => {
        navigation.navigate('UpdatePost', { id });
    };

    if (!post) return <Text>Carregando...</Text>;

    //console.log(post);

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <ScrollView>
                <Text style={{ fontSize: 24 }}>{post.title}</Text>
                <Text style={{ fontSize: 16, marginVertical: 10 }}>{post.content}</Text>
                <Text style={{ fontSize: 14, fontStyle: 'italic' }}>Autor: {post.author}</Text>
                {token && user?.isAdmin ? (
                    <>
                        <TouchableOpacity style={styles.button} onPress={updatePost}>
                            <Text style={styles.buttonText}>Atualizar Post</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonSpacing} />
                        <TouchableOpacity style={styles.button} onPress={deletePost}>
                            <Text style={styles.buttonText}>Excluir Post</Text>
                        </TouchableOpacity>
                    </>
                ) : null}
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
    buttonSpacing: {
        height: 10,
    },
});
