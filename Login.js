import React, {useMemo, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import BottomSheet, {BottomSheetTextInput} from '@gorhom/bottom-sheet';

const {height} = Dimensions.get('window');
const duration = 500;

const Login = () => {
  const snapPoints = useMemo(() => [height / 2], []);
  const bottomSheetRef = useRef(null);
  const isOpen = useSharedValue(true);

  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, {duration}),
  );

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value
      ? 1
      : withDelay(duration, withTiming(-1, {duration: 0})),
  }));

  const handlePress = () => {
    isOpen.value = true;
    bottomSheetRef.current?.expand();
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
    isOpen.value = false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.backdrop, backdropStyle]} />
      <BottomSheet
        containerStyle={{zIndex: 1}}
        backgroundStyle={{borderTopRightRadius: 40, borderTopLeftRadius: 40}}
        onClose={handleClose}
        enablePanDownToClose
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}>
        <View style={styles.bottomSheetContainer}>
          <Text style={styles.headerText}>Hello world!</Text>
          <View style={styles.inputContainer}>
            <BottomSheetTextInput
              textContentType="username"
              placeholder="Username"
              placeholderTextColor="rgba(0, 0, 0, 0.6)"
              shouldCancelWhenOutside
              style={styles.input}
            />
            <BottomSheetTextInput
              textContentType="password"
              placeholderTextColor="rgba(0, 0, 0, 0.6)"
              placeholder="********"
              secureTextEntry
              style={styles.input}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>You don't have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.link}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheetContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    width: '100%',
    color: 'black',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    width: '100%',
    gap: 8,
    padding: 20,
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    marginBottom: 20,
    padding: 10,
    fontWeight: '700',
    color: 'black',
  },
  button: {
    padding: 8,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 50,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '900',
    color: 'black',
    textAlign: 'center',
  },
  link: {
    fontSize: 14,
    fontWeight: '700',
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
