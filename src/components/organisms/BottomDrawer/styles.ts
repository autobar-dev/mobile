import { StyleSheet } from "react-native";

const borderRadius = 25;

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#333',
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    paddingTop: 28,
  },
  horizontalLine: {
    width: '30%',
    height: 4,
    backgroundColor: 'white',
    position: 'absolute',
    top: 12,
    left: '35%',
    borderRadius: 2,
  },
  content: {
    backgroundColor: '#444',
    width: '100%',
  },
});