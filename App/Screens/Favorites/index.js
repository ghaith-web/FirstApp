import React, { useState } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Text, Snackbar } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import emptyStateImage from '../../../assets/images/empty-state.png';
import styles from './style';

const Favorites = ({ items, setItems }) => {
    const favoriteItems = items.filter(item => item.favorite);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const hideSnackbar = () => setSnackbarVisible(false);

    const toggleFavorite = (index) => {
        const actualIndex = items.findIndex(item => item.text === favoriteItems[index].text);
        setItems(prevItems => {
            const newItems = [...prevItems];
            newItems[actualIndex].favorite = !newItems[actualIndex].favorite;
            setSnackbarMessage(
                newItems[index].favorite ? 'Added to favorites!' : 'Removed from favorites!'
            );
            setSnackbarVisible(true);
            return newItems;
        });
    };
    

    return (
        <View style={styles.container}>
            {favoriteItems.length === 0 ? (
                <View style={styles.emptyStateContainer}>
                    <Image
                        source={emptyStateImage}
                        style={styles.emptyImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.emptyText}>No favorites yet!</Text>
                </View>
            ) : (
                <FlatList
                    data={favoriteItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.item}>{item.text}</Text>
                            <View style={styles.iconsContainer}>
                                <Icon 
                                    name={item.favorite ? "star" : "star-outline"} 
                                    size={24} 
                                    color={item.favorite ? "gold" : "gray"} 
                                    onPress={() => toggleFavorite(index)} 
                                    style={styles.favoriteIcon}
                                />
                            </View>
                        </View>
                    )}
                    style={styles.list}
                />
                
            )}
            <View style={styles.snackbarContainer}>
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={hideSnackbar}
                    duration={3000}
                >
                    {snackbarMessage}
                </Snackbar>
            </View>
        </View>
    );
};

export default Favorites;
