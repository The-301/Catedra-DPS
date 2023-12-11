import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';

import appFirebase from '../credenciales';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function EditPaciente(props) {
  const [paciente, setPaciente] = useState({});

  const getOnePaciente = async (id) => {
    try {
      const docRef = doc(db, 'pacientes', id);
      const docSnap = await getDoc(docRef);
      setPaciente(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOnePaciente(props.route.params.pacienteId);
  }, []);

  const updatePaciente = async () => {
    try {
      const docRef = doc(db, 'pacientes', props.route.params.pacienteId);
      await updateDoc(docRef, {
        nombre: paciente.nombre,
        edad: paciente.edad,
        habitacion: paciente.habitacion,
        observaciones: paciente.observaciones,
        estado: paciente.estado,
      });

      Alert.alert('Éxito', 'Paciente actualizado con éxito');
      props.navigation.navigate('Pacientes', {
        pacienteId: props.route.params.pacienteId,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <View style={styles.contenedor}>
        {/* Campos de entrada para editar el paciente */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={paciente.nombre}
          onChangeText={(value) => setPaciente({ ...paciente, nombre: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          value={paciente.edad}
          onChangeText={(value) => setPaciente({ ...paciente, edad: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Habitación"
          value={paciente.habitacion}
          onChangeText={(value) => setPaciente({ ...paciente, habitacion: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Observaciones"
          value={paciente.observaciones}
          onChangeText={(value) => setPaciente({ ...paciente, observaciones: value })}
        />

        {/* Nuevo campo para el estado */}
        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={paciente.estado}
          onChangeText={(value) => setPaciente({ ...paciente, estado: value })}
        />

        <TouchableOpacity style={styles.botonGuardar} onPress={updatePaciente}>
          <Text style={styles.textoBoton}>Guardar cambios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
  },
  input: {
    borderColor: 'slategray',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  botonGuardar: {
    backgroundColor: '#B71375',
    borderColor: '#FC4F00',
    borderWidth: 3,
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
  },
  textoBoton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});
