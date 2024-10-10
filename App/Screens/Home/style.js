import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F9FA',
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginRight: 10,
    },
    button: {
        height: 50,
        justifyContent: 'center'

    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    item: {
        fontSize: 18,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    list: {
        flex: 1,
    },
    snackbarContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    iconButton: {
        backgroundColor: '#f0f0f0',
        marginHorizontal: 5,
        elevation: 2,
    },
    
    
});

export default styles;
