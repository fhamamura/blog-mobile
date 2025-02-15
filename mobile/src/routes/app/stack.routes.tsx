import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Posts from "../../views/App/Posts";
import PostDetails from "../../views/App/Posts/viewPost";

const Stack = createNativeStackNavigator();

const AppStackRoutes: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Posts" component={Posts} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
    </Stack.Navigator>
  );
};

export default AppStackRoutes;