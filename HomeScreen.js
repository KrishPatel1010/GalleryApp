import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FLICKR_API = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=YOUR_API_KEY&format=json&nojsoncallback=1&extras=url_s';
const CACHE_KEY = 'FLICKR_RECENT_IMAGES';

export default function HomeScreen() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch images from API
    const fetchImages = async (showLoader = true) => {
        if (showLoader) setLoading(true);
        try {
            const response = await fetch(FLICKR_API);
            const data = await response.json();
            if (data.photos && data.photos.photo) {
                const urls = data.photos.photo.map(photo => photo.url_s).filter(Boolean);
                // Get cached URLs
                const cached = await AsyncStorage.getItem(CACHE_KEY);
                if (!cached || cached !== JSON.stringify(urls)) {
                    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(urls));
                }
                setImages(urls);
            } else {
                throw new Error('No photos found');
            }
        } catch (error) {
            // On error, try to load from cache
            const cached = await AsyncStorage.getItem(CACHE_KEY);
            if (cached) {
                setImages(JSON.parse(cached));
                Alert.alert('Offline', 'Showing cached images.');
            } else {
                Alert.alert('Error', 'Could not load images.');
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchImages(false);
    };

    const renderItem = ({ item }) => (
        <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 40 }} />
            ) : images.length > 0 ? (
                <FlatList
                    data={images}
                    keyExtractor={(item, idx) => item + idx}
                    numColumns={2}
                    renderItem={renderItem}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            ) : (
                <Text>No images to display.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    image: {
        width: '48%',
        aspectRatio: 1,
        margin: '1%',
        borderRadius: 8,
        backgroundColor: '#eee',
    },
}); 
