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

export default function Notas(props) {
  const [lista, setLista] = useState([]);

  // Lógica para llamar la lista de documentos
  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'notas'));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { titulo, detalle, fecha, hora } = doc.data();
          docs.push({
            id: doc.id,
            titulo,
            detalle,
            fecha,
            hora,
          });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, [lista]);

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <ScrollView>
        <View>
          <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('Crear')}>
            <Text style={styles.textoBoton}>Agregar Cita</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('Doctores')}>
            <Text style={styles.textoBoton}>Doctores</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contenedor}>
          {lista.map((not) => (
            <ListItem
              bottomDivider
              key={not.id}
              onPress={() => {
                props.navigation.navigate('Detail', {
                  notaId: not.id,
                });
              }}>
              <ListItemChevron />
              <ListItemContent>
                <ListItemTitle style={styles.titulo}>{not.titulo}</ListItemTitle>
                <ListItemSubtitle>{not.fecha} - Estado: {not.estado}</ListItemSubtitle>
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
