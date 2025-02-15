import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import AuthDrawerRoutes from "./drawer.routes";

import Posts from "../../views/App/Posts";
import CreatePost from "../../views/Auth/Posts/createPost";
import Logout from "../../views/Auth/Logout";

const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthRoutes: React.FC = () => {
  return (
    //<AuthStack.Navigator>
    //  <AuthStack.Screen name="CreatePost" component={CreatePost} />
    //</AuthStack.Navigator>
    <AuthDrawerRoutes />
  );
};

export default AuthRoutes;