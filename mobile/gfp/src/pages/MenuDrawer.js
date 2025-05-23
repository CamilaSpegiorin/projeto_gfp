import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from "./Principal";
import { ImageBackground } from "react-native";
import Contas from "./Contas";
import Categorias from "./Categorias";

const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
    return (
        <Drawer.Navigator
            screenOptions={{
                hearderStyle: {
                    backgroundColor: '#fff',
                    elevation: 0,
                },
                headerTintColor: '#f4511e',
            }}>
            <Drawer.Screen name="Principal" component={Principal} />    
            <Drawer.Screen name="Contas" component={Contas} />
            <Drawer.Screen name="Categorias" component={Categorias} />
        </Drawer.Navigator>
    )
}