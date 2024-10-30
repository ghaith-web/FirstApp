import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, FlatList, Alert, Image } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import styles from './style';
import { useTheme } from '../../Contexts/ThemeContext';
import emptyStateImage from '../../../assets/images/empty-state.png';

const Home = ({ items, setItems }) => {
    const { colors } = useTheme();
    const [inputValue, setInputValue] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [deletedItem, setDeletedItem] = useState(null);
    const [deletedIndex, setDeletedIndex] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    const handleAddOrEditItem = () => {
        if (inputValue.trim()) {
            if (editIndex !== null) {
                setItems(prevItems => {
                    const newItems = [...prevItems];
                    newItems[editIndex] = {
                        text: inputValue.trim(),
                        favorite: newItems[editIndex].favorite
                    };
                    return newItems;
                });
                setSnackbarMessage('Item updated!');
                setEditIndex(null);
            } else {
                setItems(prevItems => [
                    ...prevItems,
                    { text: inputValue.trim(), favorite: false }
                ]);
                setSnackbarMessage('Item added!');
            }
            setInputValue('');
            setSnackbarVisible(true);
        }
    };

    const showDeleteConfirmation = (index) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this item?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => handleDeleteItem(index) }
            ]
        );
    };

    const handleDeleteItem = (index) => {
        if (index < 0 || index >= items.length) return;
        const itemToDelete = items[index];
        setItems(prevItems => {
            const newItems = prevItems.filter((_, i) => i !== index);
            if (editIndex === index) {
                setInputValue('');
                setEditIndex(null);
            }
            return newItems;
        });

        setDeletedItem(itemToDelete);
        setDeletedIndex(index);
        setSnackbarMessage('Item deleted!');
        setSnackbarVisible(true);
    };

    const hideSnackbar = () => setSnackbarVisible(false);

    const CancelToast = () => {
        if (deletedItem) {
            setItems(prevItems => {
                const newItems = [...prevItems];
                newItems.splice(deletedIndex, 0, deletedItem);
                setInputValue(deletedItem.text);
                return newItems;
            });
            setDeletedItem(null);
            setDeletedIndex(null);
            hideSnackbar();
        }
    };

    const handleEditItem = (index) => {
        if (index < 0 || index >= items.length) return;
        setInputValue(items[index].text);
        setEditIndex(index);
    };

    const toggleFavorite = (index) => {
        if (index < 0 || index >= items.length) return;
        setItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index].favorite = !newItems[index].favorite;
            setSnackbarMessage(
                newItems[index].favorite ? 'Added to favorites!' : 'Removed from favorites!'
            );
            setSnackbarVisible(true);
            return newItems;
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.headerBackground }]}>
            <StatusBar backgroundColor={colors.headerBackground} style={colors.statusBarStyle} />
            <View style={styles.header}>
                <TextInput
                    value={inputValue}
                    onChangeText={setInputValue}
                    style={[styles.input]}
                    mode="outlined"
                />
                <Button
                    mode="contained"
                    onPress={handleAddOrEditItem}
                    style={[
                        styles.button,
                        {
                          backgroundColor: inputValue.trim() ? colors.primary : colors.disabled,
                        },
                      ]}
                    disabled={!inputValue.trim()}
                >
                    {editIndex !== null ? 'Edit' : 'Add'}
                </Button>
            </View>
            {items.length === 0 ? (
                <View style={styles.emptyStateContainer}>
                    <Image
                        source={emptyStateImage}
                        style={styles.emptyImage}
                        resizeMode="contain"
                    />
                    <Text style={[styles.emptyText, { color: colors.text }]}>No Items yet!</Text> 
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={[styles.itemContainer, { backgroundColor: colors.background }]}>
                            <Text style={[styles.item, { color: colors.text }]}>{item.text}</Text> 
                            <View style={styles.iconsContainer}>
                                <IconButton
                                    icon={item.favorite ? "star" : "star-outline"}
                                    iconColor={item.favorite ? "gold" : "gray"}
                                    onPress={() => toggleFavorite(index)}
                                    style={styles.iconButton}
                                />
                                <IconButton
                                    icon="pencil"
                                    size={24}
                                    iconColor="#2196F3"
                                    onPress={() => handleEditItem(index)}
                                    style={styles.iconButton}
                                />
                                <IconButton
                                    icon="trash-can"
                                    size={24}
                                    iconColor="red"
                                    onPress={() => showDeleteConfirmation(index)}
                                    style={styles.iconButton}
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
                    action={{
                        label: 'Undo',
                        onPress: CancelToast,
                    }}
                >
                    {snackbarMessage}
                </Snackbar>
            </View>
           
        </View>
    );
};

export default Home;
