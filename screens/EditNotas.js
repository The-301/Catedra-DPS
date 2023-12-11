import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';

import appFirebase from '../credenciales';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function EditNotas(props) {
  const [nota, setNota] = useState({});

  const getOneNote = async (id) => {
    try {
      const docRef = doc(db, 'notas', id);
      const docSnap = await getDoc(docRef);
      setNota(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOneNote(props.route.params.notaId);
  }, []);

  const updateNote = async () => {
    try {
      const docRef = doc(db, 'notas', props.route.params.notaId);
      await updateDoc(docRef, {
        titulo: nota.titulo,
        detalle: nota.detalle,
        fecha: nota.fecha,
        hora: nota.hora,
        estado: nota.estado, // Agrega el nuevo campo "estado"
      });

      Alert.alert('Éxito', 'Nota actualizada con éxito');
      props.navigation.navigate('Notas', {
        notaId: props.route.params.notaId,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <View style={styles.contenedor}>
        {/* Campos de entrada para editar la nota */}
        <TextInput
          style={styles.input}
          placeholder="Titulo"
          value={nota.titulo}
          onChangeText={(value) => setNota({ ...nota, titulo: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Detalle"
          value={nota.detalle}
          onChangeText={(value) => setNota({ ...nota, detalle: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha"
          value={nota.fecha}
          onChangeText={(value) => setNota({ ...nota, fecha: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora"
          value={nota.hora}
          onChangeText={(value) => setNota({ ...nota, hora: value })}
        />

        {/* Nuevo campo para el estado */}
        <TextInput
          style={styles.input}
          placeholder="Estado"
          value={nota.estado}
          onChangeText={(value) => setNota({ ...nota, estado: value })}
        />

        <TouchableOpacity style={styles.botonGuardar} onPress={updateNote}>
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
