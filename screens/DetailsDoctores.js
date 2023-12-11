import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert, Picker } from 'react-native';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../credenciales';

const db = getFirestore(appFirebase);

export default function DetailsDoctores(props) {
  const [doctor, setDoctor] = useState({});

  const getOneDoctor = async (id) => {
    try {
      const docRef = doc(db, 'doctores', id);
      const docSnap = await getDoc(docRef);
      setDoctor(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOneDoctor(props.route.params.doctorId);
  }, []);

  const deleteDoctor = async (id) => {
    try {
      await deleteDoc(doc(db, 'doctores', id));
      Alert.alert('Éxito', 'Doctor eliminado con éxito');
      props.navigation.navigate('Doctores');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <View style={styles.contenedor}>
        <Text style={styles.texto}>Nombre: {doctor.nombre}</Text>
        <Text style={styles.texto}>Área: {doctor.area}</Text>
        <Text style={styles.texto}>Celular: {doctor.celular}</Text>
        <Text style={styles.texto}>Turno: {doctor.turno}</Text>

        <TouchableOpacity style={styles.botonEliminar} onPress={() => deleteDoctor(props.route.params.doctorId)}>
          <Text style={styles.textoEliminar}>Eliminar</Text>
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  texto: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  botonEliminar: {
    backgroundColor: '#B71375',
    borderColor: '#FC4F00',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textoEliminar: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
});
