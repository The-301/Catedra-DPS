import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';

import appFirebase from '../credenciales';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function DetailsPaciente(props) {
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

  const deletePaciente = async (id) => {
    await deleteDoc(doc(db, 'pacientes', id));
    Alert.alert('Éxito', 'Paciente eliminado con éxito');
    props.navigation.navigate('Pacientes');
  }

  const editPaciente = () => {
    props.navigation.navigate('EditPaciente', {
      pacienteId: props.route.params.pacienteId,
    });
  }

  return (
    <View>
      <View style={styles.contenedor}>
        <Text style={styles.texto}>Nombre: {paciente.nombre}</Text>
        <Text style={styles.texto}>Edad: {paciente.edad}</Text>
        <Text style={styles.texto}>Habitación: {paciente.habitacion}</Text>
        <Text style={styles.texto}>Observaciones: {paciente.observaciones}</Text>
        <Text style={styles.texto}>Estado: {paciente.estado}</Text>

        <TouchableOpacity style={styles.botonEliminar} onPress={() => deletePaciente(props.route.params.pacienteId)}>
          <Text style={styles.textoEliminar}>Eliminar</Text>
        </TouchableOpacity>

        {/* Agrega el botón de editar */}
        <TouchableOpacity style={styles.botonEditar} onPress={editPaciente}>
          <Text style={styles.textoEditar}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  texto: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10
  },
  botonEliminar: {
    backgroundColor: '#B71375',
    borderColor: '#FC4F00',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  textoEliminar: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16
  },
  // Agrega estilos para el botón de editar
  botonEditar: {
    backgroundColor: '#00308F',
    borderColor: '#7CB9E8',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10
  },
  textoEditar: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16
  }
});
