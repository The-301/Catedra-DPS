/*import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginWithEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Éxito al iniciar sesión
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        placeholder="Ingrese su correo electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text>Contraseña:</Text>
      <TextInput
        placeholder="Ingrese su contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity onPress={handleLogin}>
        <Text>Iniciar Sesión con Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginWithEmail;
*/
// LoginWithEmail.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const LoginWithEmail = ({ navigation }) => {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Hacer algo con el usuario o navegar a la pantalla de notas
      navigation.navigate('Notas');
    } catch (error) {
      console.error(error.message);
      // Manejar el error de inicio de sesión
    }
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Hacer algo con el usuario o navegar a la pantalla de notas
      navigation.navigate('Notas');
    } catch (error) {
      console.error(error.message);
      // Manejar el error de registro
    }
  };

  const handleSignInScreen = () => {
    // Navigate to SignInScreen.js
    navigation.navigate('SignInScreen');
  };

  return (
    <ImageBackground
      source={require('../img/medic2.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login with Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignInScreen} style={styles.button}>
          <Text style={styles.buttonText}>Go to SignInScreen</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    margin: 10,
    padding: 8,
    width: 200,
    color: 'white',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default LoginWithEmail;
