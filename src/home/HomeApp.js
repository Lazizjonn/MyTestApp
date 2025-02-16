import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Icon } from 'react-native-elements';
import BackgroundGeolocation from "react-native-background-geolocation";
import HomeView from "./HomeView";
import RegistrationView from "../registration/RegistrationView";

const Stack = createNativeStackNavigator();

const HomeApp = ({ navigation }) => {

    console.log("HomeApp started, TTT")

    React.useEffect(() => {
        // Whenever HomeApp gets focus, stop BackgroundGeolocation
        const unsubscribe = navigation.addListener('focus', (e) => {
            BackgroundGeolocation.removeListeners();
            BackgroundGeolocation.stop();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                title: 'CityMaaSPlatform',
                headerStyle: {
                    backgroundColor: '#fedd1e'
                }
            }}>
            <Stack.Screen
                name="Home"
                component={HomeView}
            />
            <Stack.Group
                screenOptions={({ navigation }) => ({
                    presentation: 'modal',
                    title: 'Registration',
                    headerLeft: () => (
                        <Button
                            type="clear"
                            onPressIn={() => {
                                navigation.goBack()
                            }}
                            icon={<Icon name='close-sharp' type='ionicon' />}
                        />
                    )
                })}>
                <Stack.Screen
                    name="Registration"
                    component={RegistrationView}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default HomeApp;