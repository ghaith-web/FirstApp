// styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',       // Full screen width
    height: '100%',      // Full screen height
    resizeMode: 'stretch', // Keeps the original aspect ratio within the view
  },
  textContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal:25,
   
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  Startbutton: {
    paddingVertical: 10,
    paddingHorizontal:15,
   
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});
