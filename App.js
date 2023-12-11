import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
//import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Notas from "./screens/Notas";
import CreateNote from "./screens/CreateNote";
import DetailsNote from "./screens/DetailsNote";
import CreateDoctor from "./screens/CreateDoctor";
import Doctores from "./screens/Doctores";
import DetailsDoctores from "./screens/DetailsDoctores";
import EditNotas from "./screens/EditNotas";
import LoginWithEmail from './screens/LoginWithEmail';
import Pacientes from './screens/Pacientes';
import CreatePaciente from './screens/CreatePaciente'
import EditPaciente from "./screens/EditPaciente";
import DetailsPaciente from "./screens/DetailsPaciente";
import SignInScreen from "./screens/SignInScreen"
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const Stack = createStackNavigator();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  function MyStack() {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      );
    }
  
    return (
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Notas"
              component={Notas}
              options={{
                title: 'Acilo Esperanza',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#00308F' },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="Crear"
              component={CreateNote}
              options={{
                title: 'CREAR CITA',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#00308F' },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="CrearDoctor"
              component={CreateDoctor}
              options={{
                title: 'CREAR DOCTOR',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#00308F' },
                headerTintColor: 'white',
              }}
            />

        <Stack.Screen
          name="Detail"
          component={DetailsNote}
          options={{
            title: "DETALLES DE CITA",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#00308F" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Doctores"  // Agrega la entrada para la pantalla de Doctores
          component={Doctores}
          options={{
            title: "DOCTORES",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#00308F" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Detailes"
          component={DetailsDoctores}
          options={{
            title: "DETALLES DE DOCTORES",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#00308F" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="EditNotas"
          component={EditNotas}
          options={{
            title: "EDITAR CITA",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#00308F" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Pacientes"
          component={Pacientes}
          options={{
            title: "PACIENTES",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#00308F" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="DetailsPaciente"
          component={DetailsPaciente}
          options={{
            title: "DETALLES DE PACIENTE",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#00308F" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="EditPaciente"
          component={EditPaciente}
          options={{
            title: "EDITAR DATOS DE PACIENTE",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#00308F" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="CreatePaciente"
          component={CreatePaciente}
          options={{
            title: "CREAR PACIENTE",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#00308F" },
            headerTintColor: "white",
          }}
        />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginWithEmail}
              options={{
                title: 'Iniciar Sesión',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#00308F' },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{
                title: 'Registrarse',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#00308F' },
                headerTintColor: 'white',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    );
  }
  

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/*import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleAuthProvider } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import appFirebase from "./credenciales";
import SignInScreen from "./screens/SignInScreen";
import Notas from "./screens/Notas";
import CreateNote from "./screens/CreateNote";
import DetailsNote from "./screens/DetailsNote";
import CreateDoctor from "./screens/CreateDoctor";
import Doctores from "./screens/Doctores";
import DetailsDoctores from "./screens/DetailsDoctores";
import EditNotas from "./screens/EditNotas";
import LoginWithEmail from './screens/LoginWithEmail';
import Pacientes from './screens/Pacientes';
import CreatePaciente from './screens/CreatePaciente';
import EditPaciente from "./screens/EditPaciente";
import DetailsPaciente from "./screens/DetailsPaciente";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
/*import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged, signInWithCredential } from 'firebase/auth';  // Debes importar 'signInWithCredential' de 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleAuthProvider } from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth } from "./credenciales";
import SignInScreen from "./screens/SignInScreen";
import Notas from "./screens/Notas";
import CreateNote from "./screens/CreateNote";
import DetailsNote from "./screens/DetailsNote";
import CreateDoctor from "./screens/CreateDoctor";
import Doctores from "./screens/Doctores";
import DetailsDoctores from "./screens/DetailsDoctores";
import EditNotas from "./screens/EditNotas";
import LoginWithEmail from './screens/LoginWithEmail';
import Pacientes from './screens/Pacientes';
import CreatePaciente from './screens/CreatePaciente';
import EditPaciente from "./screens/EditPaciente";
import DetailsPaciente from "./screens/DetailsPaciente";
import * as Google from "expo-auth-session/providers/google";
import {
  // Debes eliminar la importación duplicada de 'getAuth', 'GoogleAuthProvider', 'onAuthStateChanged', 'signInWithCredential'
  getAuth as getFirebaseAuth,  // Renombrar la importación de 'getAuth' para evitar conflictos de nombres
  GoogleAuthProvider as FirebaseGoogleAuthProvider,  // Renombrar la importación de 'GoogleAuthProvider'
  onAuthStateChanged as onFirebaseAuthStateChanged,  // Renombrar la importación de 'onAuthStateChanged'
  signInWithCredential as signInWithFirebaseCredential,  // Renombrar la importación de 'signInWithCredential'
} from "firebase/auth";

export default function App() {
  const Stack = createStackNavigator();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "470266815091-3856v8s1sl7curkmnkcg2ij923o4s6cn.apps.googleusercontent.com",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [response, auth]);

  function MyStack() {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <Stack.Navigator>
        {user ? (
          <>
          <Stack.Screen
            name="Notas"
            component={Notas}
            options={{
              title: 'Acilo Esperanza',
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#00308F' },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="Crear"
            component={CreateNote}
            options={{
              title: 'CREAR CITA',
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#00308F' },
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="CrearDoctor"
            component={CreateDoctor}
            options={{
              title: 'CREAR DOCTOR',
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#00308F' },
              headerTintColor: 'white',
            }}
          />

      <Stack.Screen
        name="Detail"
        component={DetailsNote}
        options={{
          title: "DETALLES DE CITA",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#00308F" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Doctores"  
        component={Doctores}
        options={{
          title: "DOCTORES",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#00308F" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Detailes"
        component={DetailsDoctores}
        options={{
          title: "DETALLES DE DOCTORES",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#00308F" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="EditNotas"
        component={EditNotas}
        options={{
          title: "EDITAR CITA",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#00308F" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Pacientes"
        component={Pacientes}
        options={{
          title: "PACIENTES",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#00308F" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="DetailsPaciente"
        component={DetailsPaciente}
        options={{
          title: "DETALLES DE PACIENTE",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#00308F" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="EditPaciente"
        component={EditPaciente}
        options={{
          title: "EDITAR DATOS DE PACIENTE",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#00308F" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="CreatePaciente"
        component={CreatePaciente}
        options={{
          title: "CREAR PACIENTE",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#00308F" },
          headerTintColor: "white",
        }}
      />
        </>
        ) : (
          // Screens for non-authenticated users
          <>
            <Stack.Screen
              name="Login"
              component={LoginWithEmail}
              options={{
                title: 'Iniciar Sesión',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#00308F' },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{
                title: 'Registrarse',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#00308F' },
                headerTintColor: 'white',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
*/