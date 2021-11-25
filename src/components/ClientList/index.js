import React from "react";
import { Alert, Clipboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Feather} from '@expo/vector-icons';

export function ClientList({data, removeClient}) {

  function copy() {
    let information = `nome: '${data.name}\nemail: ${data.email}\nCPF: ${data.cpf}\contato: ${data.phone}\ngênero: ${data.genre}\nCódigo: ${data.id}`
    Clipboard.setString(information);
    Alert.alert('', 'Copiado com sucesso.');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.removeClient}
        onPress={() => removeClient(data)}
      >
        <Feather name="trash-2" size={20} color="red" />
      </TouchableOpacity>
      <Text style={styles.title}>{data.name}-<Text style={{fontSize: 18}}>{data.id}</Text></Text>
      <View style={{marginLeft: 10}}>
        <Text style={styles.information}>{data.email}</Text>
        <Text style={styles.information}>{data.cpf}</Text>
        <Text style={styles.information}>{data.phone}</Text>
        <Text style={styles.information}>{data.genre}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => copy()}
      >
        <Text style={styles.buttonText}>COPIAR INFORMAÇÕES</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#292929',
    borderRadius: 12,
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  information: {
    color: '#fff',
    marginBottom: 3
  },
  button: {
    backgroundColor: '#202020',
    padding: 10,
    borderRadius: 7,
    marginTop: 5,
    alignItems: "center"
  },
  buttonText: {
    color: 'gray',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  removeClient: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#202020'
  }
})