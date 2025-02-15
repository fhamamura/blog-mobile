import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from "expo-secure-store";
import API from '../../../types/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Posts'>;

interface Post {
    _id: number;
    title: string;
    content: string;
    author: string;
}

export default function Posts({ navigation }: Props) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showHeader, setShowHeader] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<{ id: string; name: string; email: string, isAdmin: boolean } | null>(null);

    useEffect(() => {
        navigation.setOptions({ headerShown: true });
    }, [navigation, showHeader]);

    useEffect(() => {
        SecureStore.getItemAsync("authToken").then((token) => {
            setToken(token);
        });
        SecureStore.getItemAsync("authUser").then((user) => {
            if (user) {
                setUser(JSON.parse(user));
            }
        });
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchPosts();
        }, [])
    );

    const fetchPosts = () => {
        fetch(API.POSTS)
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.slice(0, 12));
                setFilteredPosts(data.slice(0, 12));
                setShowHeader(data.length > 0);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    };

    const handleSearch = (keyword: string) => {
        setSearchKeyword(keyword);
        if (keyword) {
            const filtered = posts.filter(post =>
                post.title.toLowerCase().includes(keyword.toLowerCase()) ||
                post.content.toLowerCase().includes(keyword.toLowerCase())
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por palavra-chave"
                value={searchKeyword}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredPosts}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ViewPost', { id: item._id })}
                    >
                        <Text style={{ fontSize: 20, marginBottom: 10 }}>{item.title}</Text>
                        <Text style={{ fontSize: 16, marginBottom: 10 }}>
                            {item.content.length > 200 ? `${item.content.substring(0, 200)}...` : item.content}
                        </Text>
                        <Text style={{ fontSize: 14, marginBottom: 10, fontStyle: 'italic'  }}>Autor: {item.author}</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                marginBottom: 20,
                            }}
                        />
                    </TouchableOpacity>
                )}
            />
            {token && user?.isAdmin === true ? (
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreatePost')}>
                    <Text style={styles.buttonText}>Criar Novo Post</Text>
                </TouchableOpacity>
            ) : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
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