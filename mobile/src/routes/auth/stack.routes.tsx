import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Posts from "../../views/App/Posts";
import Post from "../../views/App/Posts/viewPost";

const Stack = createNativeStackNavigator();

const AuthStackRoutes: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Posts" component={Posts} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
};

export default AuthStackRoutes;