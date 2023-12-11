import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';

import appFirebase from '../credenciales';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function CreateDoctor(props) {
  const initialState = {
    nombre: '',
    area: '',
    celular: '',
    turno: '',
  };

  const [estado, setEstado] = useState(initialState);

  const handleChangeText = (value, name) => {
    setEstado({ ...estado, [name]: value });
  };

  const saveDoctor = async () => {
    try {
      if (estado.nombre === '' || estado.area === '' || estado.celular === '' || estado.turno === '') {
        Alert.alert('Mensaje importante', 'Debes rellenar todos los campos requeridos');
      } else {
        const doctor = {
          nombre: estado.nombre,
          area: estado.area,
          celular: estado.celular,
          turno: estado.turno,
        };
        await addDoc(collection(db, 'doctores'), {
          ...doctor,
        });
        Alert.alert('Éxito', 'Guardado con éxito');
        props.navigation.navigate('Doctores')
      }
    } catch (error) {
      console.error(error);
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
            placeholder="Ingresa el área"
            style={styles.textoInput}
            value={estado.area}
            onChangeText={(value) => handleChangeText(value, 'area')}
          />
          <TextInput
            placeholder="Ingresa el celular"
            style={styles.textoInput}
            value={estado.celular}
            onChangeText={(value) => handleChangeText(value, 'celular')}
          />
          <TextInput
            placeholder="Ingresa el turno"
            style={styles.textoInput}
            value={estado.turno}
            onChangeText={(value) => handleChangeText(value, 'turno')}
          />

          {/* Botón para enviar los datos */}
          <View>
            <TouchableOpacity style={styles.botonEnviar} onPress={saveDoctor}>
              <Text style={styles.textoBtnEnviar}>Guardar un nuevo doctor</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    contenedorPadre:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    tarjeta:{
        margin:20,
        backgroundColor:'white',
        borderRadius:20,
        width:'90%',
        padding:20,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5
    },
    contenedor:{
        padding:20
    },
    textoInput:{
        borderColor: 'slategray',
        borderWidth:1,
        padding:2,
        marginTop:10,
        borderRadius:8
    },
    inputDate:{
        width:'100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        
    },
    botonDate:{
        backgroundColor:'#B71375',
        borderRadius:5,
        padding:10,
        width:'30%',
        height:'90%',
        marginTop:10,
        marginLeft:10
    },
    textoDate:{
        borderColor: 'slategray',
        borderWidth:1,
        padding:10,
        marginTop:10,
        borderRadius:8
    },
    subtitle:{
        color:'white',
        fontSize:18
    },
    botonEnviar:{
        backgroundColor: '#B71375',
        borderColor: '#FC4F00',
        borderWidth:3,
        borderRadius: 20,
        marginLeft: 20,
        marginRight:20,
        marginTop:20    
    },
    textoBtnEnviar:{
        textAlign:'center',
        padding:10,
        color:'white',
        fontSize:16
    }
})