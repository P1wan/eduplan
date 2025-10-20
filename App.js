// ARQUIVO COMPLETO: Mobile/eduplan/App.js

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { auth } from './config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { LocaleConfig } from 'react-native-calendars'; // 1. Importar a configuração


// --- INÍCIO DA CORREÇÃO ---
// 2. Configurar o calendário aqui, no ponto de entrada do app
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

// Telas
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen/ForgotPasswordScreen'; // << IMPORTE A NOVA TELA
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import QuestionBankScreen from './screens/QuestionBankScreen/QuestionBankScreen';
import AddEditQuestionScreen from './screens/AddEditQuestionScreen/AddEditQuestionScreen';
import QuestionDetailScreen from './screens/QuestionDetailScreen/QuestionDetailScreen';
import ActivityListScreen from './screens/ActivityListScreen/ActivityListScreen';
import CreateActivityScreen from './screens/CreateActivityScreen/CreateActivityScreen';
import ActivityDetailScreen from './screens/ActivityDetailScreen/ActivityDetailScreen';
import QuestionPickerScreen from './screens/QuestionPickerScreen/QuestionPickerScreen';
import RouletteScreen from './screens/RouletteScreen/RouletteScreen';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const QuestionsStack = createStackNavigator();
const ActivitiesStack = createStackNavigator();
const DynamicsStack = createStackNavigator();

function QuestionsNavigator() {
  return (
    <QuestionsStack.Navigator screenOptions={{ headerShown: false }}>
      <QuestionsStack.Screen name="QuestionBank" component={QuestionBankScreen} />
      <QuestionsStack.Screen name="QuestionDetail" component={QuestionDetailScreen} /> 
      <QuestionsStack.Screen name="AddEditQuestion" component={AddEditQuestionScreen} />
    </QuestionsStack.Navigator>
  );
}

function ActivitiesNavigator() {
    return (
      <ActivitiesStack.Navigator screenOptions={{ headerShown: false }}>
        <ActivitiesStack.Screen name="ActivityList" component={ActivityListScreen} />
        <ActivitiesStack.Screen name="ActivityDetail" component={ActivityDetailScreen} />
        <ActivitiesStack.Screen name="CreateActivity" component={CreateActivityScreen} />
        <ActivitiesStack.Screen name="QuestionPicker" component={QuestionPickerScreen} />
      </ActivitiesStack.Navigator>
    );
}

function DynamicsNavigator() {
  return (
    <DynamicsStack.Navigator screenOptions={{ headerShown: false }}>
      <DynamicsStack.Screen name="Roulette" component={RouletteScreen} />
    </DynamicsStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'DashboardTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'QuestionsTab') {
            iconName = focused ? 'library' : 'library-outline';
          } else if (route.name === 'ActivitiesTab') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'DynamicsTab') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <MainTab.Screen name="DashboardTab" component={DashboardScreen} options={{ title: 'Início' }} />
      <MainTab.Screen name="QuestionsTab" component={QuestionsNavigator} options={{ title: 'Questões' }} />
      <MainTab.Screen name="ActivitiesTab" component={ActivitiesNavigator} options={{ title: 'Atividades' }} />
      <MainTab.Screen name="DynamicsTab" component={DynamicsNavigator} options={{ title: 'Dinâmicas' }} />
    </MainTab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? (
          <MainNavigator />
        ) : (
                  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
            <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </AuthStack.Navigator>

        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}