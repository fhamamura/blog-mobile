import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import AppTabRoutes from "./tab.routes";
import Login from "../../views/App/Login";
import Posts1 from "../../views/App/Posts";
import ViewPost from "../../views/App/Posts/viewPost";
import RegisterStudent from "../../views/App/Students/registerStudent";

const Drawer = createDrawerNavigator();

const AuthDrawerRoutes: React.FC = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={AppTabRoutes}
        options={{
          drawerIcon: () => <Feather name="home" size={24} color="black" />,
          drawerLabel: "Home"
        }}
      />
      <Drawer.Screen
        name="Posts"
        component={Posts1}
        options={{
          drawerIcon: () => <Feather name="book-open" size={24} color="black" />,
          drawerLabel: "Posts"
        }}
      />
      <Drawer.Screen
        name="ViewPost"
        component={ViewPost}
        options={{
          drawerIcon: () => <Feather name="book" size={24} color="black" />,
          drawerLabel: "Detalhes",
          drawerItemStyle: { display: "none" }
        }}
      />
      <Drawer.Screen
        name="RegisterStudent"
        component={RegisterStudent}
        options={{
          drawerIcon: () => <Feather name="edit" size={24} color="black" />,
          drawerLabel: "Registrar",
          drawerItemStyle: { display: "none" }
        }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          drawerIcon: () => <Feather name="log-out" size={24} color="black" />,
          drawerLabel: "Entrar"
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthDrawerRoutes;