import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from './Screen/HomeScreen';
import Due from './Screen/Due';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Complet from './Screen/Complet';
import Upcoming from './Screen/Upcoming ';
import AddTodo from './Screen/AddTodo';
import { Provider } from 'react-redux';
import { configureStore } from './redux copy/store';
import { PersistGate } from 'redux-persist/integration/react';


const Tab = () => {
    const Tab = createMaterialTopTabNavigator();
    return (
        <Tab.Navigator initialRouteName='Upcoming'
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: 'white',
                },
                tabBarLabelStyle: {
                    fontSize: 13,
                    width: '100%'
                },
                transitionSpec: {
                    open: { animation: 'timing', config: { duration: 300 } },
                    close: { animation: 'timing', config: { duration: 300 } },
                },
            }}
        >
            <Tab.Screen
                name='Upcoming'
                component={HomeScreen} />
            <Tab.Screen name='Due' component={Due} />
            <Tab.Screen name='Complete' component={Complet} />
            <Tab.Screen name='Cancle' component={Upcoming} />
        </Tab.Navigator>
    )
}





function App() {
    const Stack = createStackNavigator();
    const { store, persistor } = configureStore();

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // or your custom interpolation function
                        }}
                    >
                        <Stack.Screen name='Dashboard' component={Tab} options={{ headerTitleAlign: 'center', headerTitle: 'HomeScreen' }} />
                        <Stack.Screen name='AddTodo' component={AddTodo} />
                    </Stack.Navigator>

                </NavigationContainer>
            </PersistGate>
        </Provider>

    )
}

export default App;
