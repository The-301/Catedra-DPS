import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';

import appFirebase from '../credenciales';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { ListItem, Avatar } from '@rneui/themed';
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title';
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';

const db = getFirestore(appFirebase);

const backgroundImg = require('../img/medic2.jpg'); 

export default function Pacientes(props) {
  const [listaPacientes, setListaPacientes] = useState([]);

  // Lógica para llamar la lista de documentos de pacientes
  useEffect(() => {
    const getListaPacientes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pacientes'));
        const pacientes = [];
        querySnapshot.forEach((doc) => {
          const { nombre, edad, habitacion, observaciones, estado } = doc.data();
          pacientes.push({
            id: doc.id,
            nombre,
            edad,
            habitacion,
            observaciones,
            estado,
          });
        });
        setListaPacientes(pacientes);
      } catch (error) {
        console.log(error);
      }
    };
    getListaPacientes();
  }, []);

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <ScrollView>
        <View>
          <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('CreatePaciente')}>
            <Text style={styles.textoBoton}>Agregar Paciente</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contenedor}>
          {listaPacientes.map((paciente) => (
            <ListItem
              bottomDivider
              key={paciente.id}
              onPress={() => {
                props.navigation.navigate('DetailsPaciente', {
                  pacienteId: paciente.id,
                });
              }}>
              <ListItemChevron />
              <ListItemContent>
                <ListItemTitle style={styles.titulo}>{paciente.nombre}</ListItemTitle>
                <ListItemSubtitle>{`Edad: ${paciente.edad}, Habitación: ${paciente.habitacion}, Estado: ${paciente.estado}`}</ListItemSubtitle>
              </ListItemContent>
            </ListItem>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  boton: {
    backgroundColor: '#00308F',
    borderColor: '#7CB9E8',
    borderWidth: 3,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textoBoton: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 16,
  },
  contenedor: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
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
  titulo: {
    fontWeight: 'bold',
  },
});
