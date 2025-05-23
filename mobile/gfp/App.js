import { NavigationContainer  } from '@react-navigation/native';  
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/Login';
import MenuDrawer from './src/pages/MenuDrawer';
import CadContas from './src/pages/CadContas';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
                hearderStyle: {
                    backgroundColor: '#fff',
                    elevation: 0,
                },
                headerTintColor: '#f4511e',
            }}>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="MenuDrawer" component={MenuDrawer} options={{headerShown: false}}/>
        <Stack.Screen name="CadContas" component={CadContas} 
            options={{ title: 'Cadastro de Contas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
