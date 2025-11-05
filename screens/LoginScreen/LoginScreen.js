import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './LoginScreen.styles';
import { auth } from '../../config/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Atenção", "Por favor, preencha o e-mail e a senha.");
      return;
    }
    
    // A única responsabilidade desta tela é autenticar.
    auth.signInWithEmailAndPassword(email, password)
      .catch(authError => {
        let errorMessage = "Ocorreu um erro ao fazer login.";
        if (authError.code === 'auth/user-not-found' || authError.code === 'auth/wrong-password' || authError.code === 'auth/invalid-credential') {
          errorMessage = "E-mail ou senha inválidos.";
        }
        Alert.alert("Erro de Login", errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>EduPlan</Text>
          <Text style={styles.slogan}>Planejamento Pedagógico Inteligente</Text>
        </View>
        <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
        <View style={styles.passwordContainer}>
    <TextInput
      style={styles.passwordInput}
      placeholder="Senha"
      value={password}
      onChangeText={setPassword}
      secureTextEntry={!isPasswordVisible} // A visibilidade agora é dinâmica
    />
    <TouchableOpacity 
      onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Ao clicar, inverte o estado
      style={styles.eyeIcon}
    >
      <Ionicons 
        name={isPasswordVisible ? "eye-off" : "eye"} // O ícone muda de acordo com o estado
        size={24} 
        color="#888" 
      />
    </TouchableOpacity>
  </View>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      
    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
    </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;