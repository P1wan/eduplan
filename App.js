// Local: Mobile/eduplan/App.js

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { auth } from './config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { LocaleConfig } from 'react-native-calendars';

// --- CONFIGURAÇÃO DO CALENDÁRIO AQUI ---
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';
// --- FIM DA CONFIGURAÇÃO ---

// Telas
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen/ForgotPasswordScreen';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import QuestionOriginListScreen from './screens/QuestionOriginListScreen/QuestionOriginListScreen';
import QuestionBankScreen from './screens/QuestionBankScreen/QuestionBankScreen';
import AddEditQuestionScreen from './screens/AddEditQuestionScreen/AddEditQuestionScreen';
import QuestionDetailScreen from './screens/QuestionDetailScreen/QuestionDetailScreen';
import ActivityListScreen from './screens/ActivityListScreen/ActivityListScreen';
import CreateActivityScreen from './screens/CreateActivityScreen/CreateActivityScreen';
import ActivityDetailScreen from './screens/ActivityDetailScreen/ActivityDetailScreen';
import QuestionPickerScreen from './screens/QuestionPickerScreen/QuestionPickerScreen';
import DynamicsHubScreen from './screens/DynamicsHubScreen/DynamicsHubScreen'; // Importação correta
import RouletteScreen from './screens/RouletteScreen/RouletteScreen';
import TimerScreen from './screens/TimerScreen/TimerScreen';
import DiceRollerScreen from './screens/DiceRollerScreen/DiceRollerScreen';
import FlashcardsScreen from './screens/FlashcardsScreen/FlashcardsScreen';
import SyncScreen from './screens/SyncScreen/SyncScreen';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const QuestionsStack = createStackNavigator();
const ActivitiesStack = createStackNavigator();
const DynamicsStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const AppStack = createStackNavigator();

function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="SyncScreen" component={SyncScreen} />
      <AppStack.Screen name="MainNavigator" component={MainNavigator} />
    </AppStack.Navigator>
  );
}

// Navegador para Dashboard e Perfil
function DashboardNavigator() {
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name="DashboardHome" component={DashboardScreen} />
      <DashboardStack.Screen name="Profile" component={ProfileScreen} />
    </DashboardStack.Navigator>
  );
}

// Navegador para Questões
function QuestionsNavigator() {
  return (
    <QuestionsStack.Navigator
      initialRouteName="QuestionOriginList"
      screenOptions={{ headerShown: false }}
    >
      <QuestionsStack.Screen name="QuestionOriginList" component={QuestionOriginListScreen} />
      <QuestionsStack.Screen name="QuestionBank" component={QuestionBankScreen} />
      <QuestionsStack.Screen name="QuestionDetail" component={QuestionDetailScreen} />
      <QuestionsStack.Screen name="AddEditQuestion" component={AddEditQuestionScreen} />
    </QuestionsStack.Navigator>
  );
}

// Navegador para Atividades
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

// Navegador para Dinâmicas
function DynamicsNavigator() {
  return (
    <DynamicsStack.Navigator
      initialRouteName="DynamicsHub" // Garante que começa no Hub
      screenOptions={{ headerShown: false }}
    >
      <DynamicsStack.Screen name="DynamicsHub" component={DynamicsHubScreen} />
      <DynamicsStack.Screen name="Roulette" component={RouletteScreen} />
      <DynamicsStack.Screen name="Timer" component={TimerScreen} />
      <DynamicsStack.Screen name="DiceRoller" component={DiceRollerScreen} />
      <DynamicsStack.Screen name="Flashcards" component={FlashcardsScreen} />
    </DynamicsStack.Navigator>
  );
}

// Navegador Principal com Abas
function MainNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'DashboardTab') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'QuestionsTab') iconName = focused ? 'library' : 'library-outline';
          else if (route.name === 'ActivitiesTab') iconName = focused ? 'document-text' : 'document-text-outline';
          else if (route.name === 'DynamicsTab') iconName = focused ? 'game-controller' : 'game-controller-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <MainTab.Screen name="DashboardTab" component={DashboardNavigator} options={{ title: 'Início' }} />
      <MainTab.Screen name="QuestionsTab" component={QuestionsNavigator} options={{ title: 'Questões' }} />
      <MainTab.Screen name="ActivitiesTab" component={ActivitiesNavigator} options={{ title: 'Atividades' }} />
      <MainTab.Screen name="DynamicsTab" component={DynamicsNavigator} options={{ title: 'Dinâmicas' }} />
    </MainTab.Navigator>
  );
}

// Componente Raiz
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

  if (loading) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? (
          <AppNavigator />
        ) : (
          // Navegador de Autenticação (sem alterações)
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