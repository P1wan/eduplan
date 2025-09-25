import React from 'react';

// Importa o Provider da biblioteca de safe area
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importa o navigator principal
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}