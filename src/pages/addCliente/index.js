import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, TouchableWithoutFeedback, Alert, Clipboard, Keyboard } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { randomKey } from "../../utils/randomKey";
import AsyncStorage from "@react-native-async-storage/async-storage";

const listGenres = [
  { id: '1', value: 'Gênero' },
  { id: '2', value: 'Masculino(a)' },
  { id: '3', value: 'Feminino(a)' },
  { id: '4', value: 'Prefiro não dizer' },
]

export function addClient() {
  const [clientKey, setClientKey] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showModal, setShowModal] = useState(false);

  async function submitClient() {
    if(name===''||email===''||cpf===''||phone===''||selectedGenre==='Gênero') {
      Alert.alert('Atenção', 'Todos os campos devem ser preenchidos!');
      return;
    };


    let key = randomKey();
    const client = {
      id: key,
      name: name,
      email: email,
      cpf: cpf,
      phone: phone,
      genre: selectedGenre
    };
    const response = JSON.parse(await AsyncStorage.getItem('clients'));

    if(response === null) {
      await AsyncStorage.setItem('clients', JSON.stringify([client]))
      .then(() => {
        setClientKey(key);
        setShowModal(true);
      });
      return;
    };

    const newClientsList = [
      client,
      ...response
    ];
    await AsyncStorage.setItem('clients', JSON.stringify(newClientsList))
    .then(() => {
      setClientKey(key);
      setShowModal(true);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PREENCHA OS CAMPOS</Text>
      <TextInput
        value={name}
        onChangeText={value => setName(value)}
        placeholder="Nome Completo"
        placeholderTextColor="#29292950"
        keyboardType="default"
        style={styles.input}
         
      />
      <TextInput
        value={email}
        onChangeText={value => setEmail(value)}
        placeholder="Email: *@*.com"
        placeholderTextColor="#29292950"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInputMask
        type={'custom'}
        options={{
          mask: '999.999.999-99'
        }}
        value={cpf}
        onChangeText={text => setCpf(text)}
        placeholder="CPF: 000.000.000-00"
        placeholderTextColor="#29292950"
        keyboardType="number-pad"
        style={styles.input}
      />
      <TextInputMask
        type={'custom'}
        options={{
          mask: '(99) 99999-9999'
        }}
        value={phone}
        onChangeText={text => setPhone(text)}
        placeholder="Número: (33) 99999-9999"
        placeholderTextColor="#29292950"
        keyboardType="number-pad"
        style={styles.input}
      />
      <View style={styles.containerPicker}>
        <Picker
          selectedValue={selectedGenre}
          onValueChange={(itemValue, itemIndex) => 
            setSelectedGenre(itemValue)
          }
          style={[styles.picker, {
            color: selectedGenre !== 'Gênero' ? 'black' : 'gray',
          }]}
          mode="dropdown"
          dropdownIconRippleColor="black"
          dropdownIconColor="black"
        >
          {listGenres.map((item, index) => {
            return (
              <Picker.Item 
                key={item.id} 
                label={item.value} 
                value={item.value}
                color="black"
              />
            )
          })}
        </Picker>
      </View>
      <TouchableOpacity 
        style={styles.buttonSubmit}
        onPress={() => {
          Keyboard.dismiss();
          submitClient()
        }}
      >
        <Text style={styles.buttonSubmitText}>CADASTRAR</Text>
      </TouchableOpacity>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
      >
        <TouchableOpacity 
        style={{flex: 1}}
        onPress={() => setShowModal(false)}
        />
        <View style={styles.containerResult}>
          <View style={styles.iphoneTopBottom} />
          <Text style={styles.resultTitle}>Cadastrado com sucesso</Text>
          <Text style={styles.clientInfo}>
            {`Nome: ${name}\n\nEmail: ${email}\n\nCPF: ${cpf}\n\nNúmero: ${phone}\n\nGênero: ${selectedGenre}`}
          </Text>
          <TouchableOpacity 
            style={styles.buttonCopy}
            onPress={() => {
              Clipboard.setString(clientKey);
              Alert.alert(clientKey,'Código copiado para área de transferência.');
              setShowModal(false);
              Keyboard.dismiss();
              setClientKey('');
              setName('');
              setEmail('');
              setCpf('');
              setPhone('');
              setSelectedGenre('Gênero');
            }}
          >
            <Text style={styles.copyText}>{'código do cliente'}</Text>
            <Text style={styles.copyKey}>{clientKey}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#292929',
    fontSize: 15
  },
  buttonSubmit: {
    width: '100%',
    backgroundColor: '#292929',
    alignItems: "center",
    marginTop: 20,
    padding: 15,
    borderRadius: 7,
  },
  buttonSubmitText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 2,
      height: 1
    },
    textShadowRadius: 0.5,
  },
  containerPicker: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  picker: {
    width: '100%',
    marginTop: 20,
  },
  containerResult: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 20,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: "center",
    backgroundColor: '#292929',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9
  },
  iphoneTopBottom: {
    width: 100,
    height: 8,
    backgroundColor: 'white',
    borderRadius: 50,
    marginVertical: 20
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center",
    color: 'white',
    fontStyle: 'italic',
    marginBottom: 10
  },
  clientInfo: {
    color: 'gray',
    fontSize: 17,
    textAlign: 'left'
  },
  buttonCopy: {
    marginTop: 20,
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12
  },
  copyKey: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  copyText: {
    fontWeight: 'bold',
    color: '#292929'
  }
});