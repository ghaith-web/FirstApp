import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, FlatList, Alert, Image } from "react-native";
import { Text, Snackbar } from "react-native-paper";
import { IconButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { addItem, editItem, deleteItem } from "../../Redux/itemsSlice";
import { addFavorite, removeFavorite } from "../../Redux/favoritesSlice";
import emptyStateImage from "../../../assets/images/empty-state.png";
import { useTheme } from "../../Contexts/ThemeContext";
import styles from "./style";

const Favorites = () => {
  const { colors } = useTheme();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deletedItem, setDeletedItem] = useState(null);
  const [deletedIndex, setDeletedIndex] = useState(null);

  // Get items and favorites from Redux
  const items = useSelector((state) => state.items);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const favoriteItems = items.filter((item) => item.favorite); // Filter favorite items

  const showDeleteConfirmation = (index) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => handleDeleteItem(index) },
      ]
    );
  };

  const handleDeleteItem = (index) => {
    if (index < 0 || index >= items.length) return;
    const itemToDelete = items[index];
    dispatch(deleteItem(index)); // Dispatch delete action

    // If the deleted item was a favorite, remove from the favorites list
    if (itemToDelete.favorite) {
      dispatch(removeFavorite(itemToDelete));
    }

    setDeletedItem(itemToDelete);
    setDeletedIndex(index);
    setSnackbarMessage("Item deleted!");
    setSnackbarVisible(true);
  };

  const handleToggleFavorite = (index, item) => {
    const newItem = { ...item, favorite: !item.favorite };

    // Update the item in the items list
    dispatch(editItem({ index, updatedItem: newItem }));

    if (newItem.favorite) {
      dispatch(addFavorite(newItem));
      setSnackbarMessage("Added to favorites!");
    } else {
      dispatch(removeFavorite(newItem));
      setSnackbarMessage("Removed from favorites!");
    }

    setSnackbarVisible(true);
  };

  const hideSnackbar = () => setSnackbarVisible(false);

  const CancelToast = () => {
    if (deletedItem) {
      dispatch(addItem(deletedItem));
      setDeletedItem(null);
      setDeletedIndex(null);
      hideSnackbar();
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.headerBackground }]}
    >
      <StatusBar
        backgroundColor={colors.headerBackground}
        style={colors.statusBarStyle}
      />
      {favoriteItems.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Image
            source={emptyStateImage}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            No favorites yet!
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.itemContainer,
                { backgroundColor: colors.background },
              ]}
            >
              <Text style={[styles.item, { color: colors.text }]}>
                {item.text}
              </Text>
              <View style={styles.iconsContainer}>
                <IconButton
                  icon={item.favorite ? "star" : "star-outline"}
                  iconColor={item.favorite ? "gold" : "gray"}
                  onPress={() => handleToggleFavorite(index, item)}
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
            label: "Undo",
            onPress: CancelToast,
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </View>
  );
};

export default Favorites;
