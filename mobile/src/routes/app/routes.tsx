import React from "react";
import AppTabRoutes from "./tab.routes";
import AppDrawerRoutes from "./drawer.routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  return (
    //<AppTabRoutes />
    <AppDrawerRoutes />
  );
};

export default AppRoutes;