import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import Logout from "../../views/Auth/Logout";
import Posts from "../../views/App/Posts";

const Tab = createBottomTabNavigator();

const AuthTabRoutes: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Posts"
        component={Posts}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="book-open" size={20} color={color} />
            
          ),
          tabBarLabel: 'Posts'
        }}

      />
      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="log-out" size={20} color={color} />
          ),
          tabBarLabel: 'Sair'
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthTabRoutes;