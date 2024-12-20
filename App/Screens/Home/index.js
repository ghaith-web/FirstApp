import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, FlatList, Alert, Image } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { IconButton } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { addItem, editItem, deleteItem } from "../../Redux/itemsSlice";
import { addFavorite, removeFavorite } from "../../Redux/favoritesSlice";
import emptyStateImage from "../../../assets/images/empty-state.png";
import { useTheme } from "../../Contexts/ThemeContext";
import styles from "./style";

const Home = () => {
  const { colors } = useTheme();
  const [inputValue, setInputValue] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [deletedItem, setDeletedItem] = useState(null);
  const [deletedIndex, setDeletedIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const handleAddOrEditItem = () => {
    if (inputValue.trim()) {
      if (editIndex !== null) {
        dispatch(
          editItem({
            index: editIndex,
            updatedItem: { text: inputValue.trim() },
          })
        );
        setSnackbarMessage("Item updated!");
        setEditIndex(null);
      } else {
        dispatch(addItem({ text: inputValue.trim(), favorite: false }));
        setSnackbarMessage("Item added!");
      }
      setInputValue("");
      setSnackbarVisible(true);
    }
  };

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
    dispatch(deleteItem(index));

    setDeletedItem(itemToDelete);
    setDeletedIndex(index);
    setSnackbarMessage("Item deleted!");
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
  

  const handleEditItem = (index) => {
    if (index < 0 || index >= items.length) return;
    setInputValue(items[index].text);
    setEditIndex(index);
  };

  const toggleFavorite = (index, item) => {
    const newItem = { ...item, favorite: !item.favorite };
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

  return (
    <View
      style={[styles.container, { backgroundColor: colors.headerBackground }]}
    >
      <StatusBar
        backgroundColor={colors.headerBackground}
        style={colors.statusBarStyle}
      />
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
              backgroundColor: inputValue.trim()
                ? colors.primary
                : colors.disabled,
            },
          ]}
          disabled={!inputValue.trim()}
        >
          {editIndex !== null ? "Edit" : "Add"}
        </Button>
      </View>
      {items.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Image
            source={emptyStateImage}
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            No Items yet!
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
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
                  onPress={() => toggleFavorite(index, item)}
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
          action={
            deletedItem
              ? {
                  label: "Undo",
                  onPress: CancelToast,
                }
              : null
          }
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </View>
  );
};

export default Home;
