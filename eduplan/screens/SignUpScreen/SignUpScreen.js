// Local: eduplan/screens/SignUpScreen/SignUpScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './SignUpScreen.styles';
import { auth, db } from '../../config/firebaseConfig';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        
        // Se a autenticação funcionou, criamos o perfil no Firestore
        return db.collection("users").doc(user.uid).set({
          name: name.trim(),
          email: email.trim(),
        });
      })
      .then(() => {
        Alert.alert("Sucesso!", "Conta criada com sucesso! Agora você pode fazer o login.");
        navigation.navigate('Login'); // Envia o usuário para a tela de login
      })
      .catch((error) => {
        let errorMessage = "Ocorreu um erro ao criar a conta.";
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = "Este e-mail já está em uso.";
        } else if (error.code === 'auth/weak-password') {
          errorMessage = "A senha deve ter no mínimo 6 caracteres.";
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = "O e-mail informado é inválido.";
        }
        Alert.alert("Erro de Cadastro", errorMessage);
        console.error("Erro no cadastro: ", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Crie sua Conta</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail do professor"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha (mín. 6 caracteres)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginLink}>Já tem uma conta? Faça Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;