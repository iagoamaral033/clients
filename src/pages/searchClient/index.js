import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClientList } from "../../components/ClientList";

export function searchClient() {
  const [clients, setClients] = useState([]);
  const [list, setList] = useState([]);
  const [idClient, setIdClient] = useState('');
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  async function removeClient(client) {
    setLoading(true);
    const filter = clients.filter(item => item.id !== client.id);
    await AsyncStorage.setItem('clients', JSON.stringify(filter))
    .then(() => {
      setClients(filter);
      setLoading(false);
    });
    setLoading(false);
  };

  useEffect(() => {
    async function searchClients() {
      const response = JSON.parse(await AsyncStorage.getItem('clients'));
      if(response === null) {
        setLoading(false);
        return;
      };

      setClients(response);
      setLoading(false);
    };
    searchClients();
  }, [isFocused]);

  useEffect(() => {
    if (idClient === '') {
      setList([]);
    } else {
      setList(
        clients.filter(item => {
          if (item.id.indexOf(idClient.toLowerCase()) > -1) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [idClient]);

  if(loading) {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator size={40} color="#292929" />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      { clients.length === 0
        ? <>
          <Text style={{fontSize: 20, textAlign: "center", color: '#292929'}}>Não há clientes cadastrados!</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('addClient')}  
          >
            <Text style={styles.buttonText}>CADASTRAR CLIENTES</Text>
          </TouchableOpacity>
        </>
        : <>
          <TextInput
            value={idClient}
            onChangeText={value => setIdClient(value)}
            placeholder="Digite o código do cliente"
            placeholderTextColor="gray"
            maxLength={10}
            style={styles.inputSearch}
          />
          { idClient === ''
            ? <FlatList
              data={clients}
              keyExtractor={item => item.id}
              renderItem={({item}) => <ClientList data={item} removeClient={(client) => removeClient(client)} />}
              showsVerticalScrollIndicator={false}
            />
            : <FlatList
              data={list}
              keyExtractor={item => item.id}
              renderItem={({item}) => <ClientList data={item} removeClient={(client) => removeClient(client)} />}
              showsVerticalScrollIndicator={false}
            />
          }
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingHorizontal: 20
  },
  inputSearch: {
    padding: 10,
    backgroundColor: '#292929',
    color: '#FFF',
    borderRadius: 7,
    width: '100%',
    marginBottom: 30
  },
  containerClients: {
    width: '100%'
  },
  button: {
    backgroundColor: '#292929',
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 7
  },
  buttonText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white'
  }
})