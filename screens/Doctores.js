import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { ListItem, Avatar } from '@rneui/themed';
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title';
import { ListItemSubtitle } from '@rneui/base/dist/ListItem/ListItem.Subtitle';

import appFirebase from '../credenciales';

const db = getFirestore(appFirebase);

const backgroundImg = require('../img/medic2.jpg'); 

export default function Doctores(props) {
  const [listaDoctores, setListaDoctores] = useState([]);

  useEffect(() => {
    const getListaDoctores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'doctores'));
        const doctores = [];
        querySnapshot.forEach((doc) => {
          const { nombre, area, celular, turno } = doc.data();
          doctores.push({
            id: doc.id,
            nombre,
            area,
            celular,
            turno,
          });
        });
        setListaDoctores(doctores);
      } catch (error) {
        console.error(error);
      }
    };
    getListaDoctores();
  }, []);

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <ScrollView>
        <View>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => props.navigation.navigate('CrearDoctor')}>
            <Text style={styles.textoBoton}>Agregar un nuevo doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity
  style={styles.boton}
  onPress={() => props.navigation.navigate('Pacientes')}>
  <Text style={styles.textoBoton}>Ver Pacientes</Text>
</TouchableOpacity>

        </View>

        <View style={styles.contenedor}>
          {listaDoctores.map((doctor) => (
            <ListItem
              bottomDivider
              key={doctor.id}
              onPress={() => {
                props.navigation.navigate('Detailes', {
                  doctorId: doctor.id,
                });
              }}>
              <ListItemChevron />

              <ListItemContent>
                <ListItemTitle style={styles.titulo}>{doctor.nombre}</ListItemTitle>
                <ListItemSubtitle>{`Área: ${doctor.area}, Celular: ${doctor.celular}, Turno: ${doctor.turno}`}</ListItemSubtitle>
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
