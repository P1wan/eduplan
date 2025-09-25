import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen';
import QuestionListScreen from '../screens/QuestionListScreen/QuestionListScreen';
import CreateQuestionScreen from '../screens/CreateQuestionScreen/CreateQuestionScreen';
import ActivityListScreen from '../screens/ActivityListScreen/ActivityListScreen';
import CreateActivityScreen from '../screens/CreateActivityScreen/CreateActivityScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'EduPlan - Dashboard' }}
        />
        <Stack.Screen
          name="QuestionList"
          component={QuestionListScreen}
          options={{ title: 'Questões' }}
        />
        <Stack.Screen
          name="CreateQuestion"
          component={CreateQuestionScreen}
          options={{ title: 'Nova Questão' }}
        />
        <Stack.Screen
          name="ActivityList"
          component={ActivityListScreen}
          options={{ title: 'Atividades' }}
        />
        <Stack.Screen
          name="CreateActivity"
          component={CreateActivityScreen}
          options={{ title: 'Nova Atividade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
