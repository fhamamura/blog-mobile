import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import AppStackRoutes from "./stack.routes";

import Login from "../../views/App/Login";
import Posts1 from "../../views/App/Posts";

const Tab = createBottomTabNavigator();

const AppTabRoutes: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Posts"
        component={Posts1}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="book-open" size={20} color={color} />
            
          ),
          tabBarLabel: 'Posts',
        }}

      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="log-in" size={20} color={color} />
          ),
          tabBarLabel: 'Entrar'
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabRoutes;