/*import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';

import appFirebase from '../credenciales';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function CreatePaciente(props) {
  const initialState = {
    nombre: '',
    edad: '',
    habitacion: '',
    observaciones: '',
    estado: '',
  };

  const [paciente, setPaciente] = useState(initialState);

  const handleChangeText = (value, name) => {
    setPaciente({ ...paciente, [name]: value });
  };

  const savePaciente = async () => {
    try {
      if (paciente.nombre === '' || paciente.edad === '' || paciente.habitacion === '') {
        Alert.alert('Mensaje importante', 'Debes rellenar los campos requeridos');
      } else {
        await addDoc(collection(db, 'pacientes'), {
          ...paciente,
        });
        Alert.alert('Éxito', 'Paciente guardado con éxito');
        props.navigation.navigate('Pacientes');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.contenedorPadre}>
      <View style={styles.tarjeta}>
        <View style={styles.contenedor}>
          <TextInput
            placeholder="Nombre Paciente"
            style={styles.textoInput}
            value={paciente.nombre}
            onChangeText={(value) => handleChangeText(value, 'nombre')}
          />
          <TextInput
            placeholder="Edad"
            style={styles.textoInput}
            value={paciente.edad}
            onChangeText={(value) => handleChangeText(value, 'edad')}
          />
          <TextInput
            placeholder="Habitación"
            style={styles.textoInput}
            value={paciente.habitacion}
            onChangeText={(value) => handleChangeText(value, 'habitacion')}
          />
          <TextInput
            placeholder="Observaciones"
            multiline={true}
            numberOfLines={4}
            style={styles.textoInput}
            value={paciente.observaciones}
            onChangeText={(value) => handleChangeText(value, 'observaciones')}
          />
          <TextInput
            placeholder="Estado"
            style={styles.textoInput}
            value={paciente.estado}
            onChangeText={(value) => handleChangeText(value, 'estado')}
          />

          {}
          <View>
            <TouchableOpacity style={styles.botonEnviar} onPress={savePaciente}>
              <Text style={styles.textoBtnEnviar}>Guardar Paciente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorPadre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tarjeta: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contenedor: {
    padding: 20,
  },
  textoInput: {
    borderColor: 'slategray',
    borderWidth: 1,
    padding: 2,
    marginTop: 10,
    borderRadius: 8,
  },
  botonEnviar: {
    backgroundColor: '#B71375',
    borderColor: '#FC4F00',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textoBtnEnviar: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
});
*/
import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

import appFirebase from '../credenciales';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function CreatePaciente(props) {
  const initialState = {
    nombre: '',
    edad: '',
    habitacion: '',
    observaciones: '',
    estado: '',
  };

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [habitacion, setHabitacion] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [estado, setEstado] = useState(initialState);

  const handleChangeText = (value, name) => {
    setEstado({ ...estado, [name]: value });
  };

  const savePaciente = async () => {
    try {
      if (estado.nombre === '' || estado.edad === '' || estado.habitacion === '') {
        Alert.alert('Mensaje importante', 'Debes rellenar los campos requeridos');
      } else {
        const paciente = {
          nombre: estado.nombre,
          edad: estado.edad,
          habitacion: estado.habitacion,
          observaciones: estado.observaciones,
          estado: estado.estado,
        };

        await addDoc(collection(db, 'pacientes'), { ...paciente });

        Alert.alert('Éxito', 'Paciente guardado con éxito');
        props.navigation.navigate('Pacientes');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.contenedorPadre}>
      <View style={styles.tarjeta}>
        <View style={styles.contenedor}>
          <TextInput
            placeholder="Ingresa el nombre"
            style={styles.textoInput}
            value={estado.nombre}
            onChangeText={(value) => handleChangeText(value, 'nombre')}
          />
          <TextInput
            placeholder="Ingresa la edad"
            style={styles.textoInput}
            value={estado.edad}
            onChangeText={(value) => handleChangeText(value, 'edad')}
          />
          <TextInput
            placeholder="Ingresa la habitación"
            style={styles.textoInput}
            value={estado.habitacion}
            onChangeText={(value) => handleChangeText(value, 'habitacion')}
          />
          <TextInput
            placeholder="Ingresa observaciones"
            multiline={true}
            numberOfLines={4}
            style={styles.textoInput}
            value={estado.observaciones}
            onChangeText={(value) => handleChangeText(value, 'observaciones')}
          />
          <TextInput
            placeholder="Ingresa el estado"
            style={styles.textoInput}
            value={estado.estado}
            onChangeText={(value) => handleChangeText(value, 'estado')}
          />

          {/* Agrega el botón para enviar los datos */}
          <View>
            <TouchableOpacity style={styles.botonEnviar} onPress={savePaciente}>
              <Text style={styles.textoBtnEnviar}>Guardar Paciente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorPadre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tarjeta: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contenedor: {
    padding: 20,
  },
  textoInput: {
    borderColor: 'slategray',
    borderWidth: 1,
    padding: 2,
    marginTop: 10,
    borderRadius: 8,
  },
  botonEnviar: {
    backgroundColor: '#B71375',
    borderColor: '#FC4F00',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textoBtnEnviar: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
});
