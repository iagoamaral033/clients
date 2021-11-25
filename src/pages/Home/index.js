import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerWelcome}>
        <Image
          source={require('../../../assets/icon.png')}
          style={{
            width: 300,
            height: 300,
            resizeMode: 'contain'
          }}
        />
      </View> 
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('addClient')}>
        <Text style={styles.buttonText}>Cadastrar Cliente</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('searchClient')}>
        <Text style={styles.buttonText}>Procurar Cliente</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
    paddingHorizontal: 20
  },
  containerWelcome: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  },
  welcomeText: {
    fontSize: 22,
    textAlign: "center",
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  button: {
    width: '100%',
    backgroundColor: '#292929',
    marginTop: 20,
    padding: 15,
    borderRadius: 7,
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 1
    },
    textShadowRadius: 0.5,
  }
});