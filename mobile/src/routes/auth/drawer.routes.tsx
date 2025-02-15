import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import AuthTabRoutes from "./tab.routes";

import Posts2 from "../../views/App/Posts";
import ViewPost from "../../views/App/Posts/viewPost";
import CreatePost from "../../views/Auth/Posts/createPost";
import Logout from "../../views/Auth/Logout";
import * as SecureStore from "expo-secure-store";
import DeletePost from "../../views/Auth/Posts/deletePost";
import UpdatePost from "../../views/Auth/Posts/updatePost";

import Teachers from "../../views/Auth/Teachers";
import ViewTeacher from "../../views/Auth/Teachers/viewTeacher";
import CreateTeacher from "../../views/Auth/Teachers/createTeacher";
import UpdateTeacher from "../../views/Auth/Teachers/updateTeacher";
import DeleteTeacher from "../../views/Auth/Teachers/deleteTeacher";

import Students from "../../views/Auth/Students";
import ViewStudent from "../../views/Auth/Students/viewStudent";
import CreateStudent from "../../views/Auth/Students/createStudent";
import UpdateStudent from "../../views/Auth/Students/updateStudent";
import DeleteStudent from "../../views/Auth/Students/deleteStudent";

const Drawer = createDrawerNavigator();



const AuthDrawerRoutes: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; name: string; email: string, isAdmin: boolean } | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync("authToken").then((token) => {
      setToken(token);
    });
    SecureStore.getItemAsync("authUser").then((user) => {
      if (user) {
        setUser(JSON.parse(user));
      }
    });
  }
    , []);

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={AuthTabRoutes}
        options={{
          drawerIcon: () => <Feather name="home" size={24} color="black" />,
          drawerLabel: "Home"
        }}
      />
      <Drawer.Screen
        name="Posts"
        component={Posts2}
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
        name="CreatePost"
        component={CreatePost}
        options={{
          drawerIcon: () => <Feather name="edit" size={24} color="black" />,
          drawerLabel: "Criar Post",
          drawerItemStyle: token && user?.isAdmin ? undefined : { display: "none" }
        }}
      />
      <Drawer.Screen
        name="DeletePost"
        component={DeletePost}
        options={{
          drawerIcon: () => <Feather name="trash" size={24} color="black" />,
          drawerLabel: "Excluir Post",
          drawerItemStyle: { display: "none" }
        }}
      />
      <Drawer.Screen
        name="UpdatePost"
        component={UpdatePost}
        options={{
          drawerIcon: () => <Feather name="edit" size={24} color="black" />,
          drawerLabel: "Atualizar Post",
          drawerItemStyle: { display: "none" }
        }}
      />

      <Drawer.Screen
        name="Teachers"
        component={Teachers}
        options={{
          drawerIcon: () => <Feather name="users" size={24} color="black" />,
          drawerLabel: "Professores",
          drawerItemStyle: token && user?.isAdmin ? undefined : { display: "none" }
        }}
      />
      <Drawer.Screen
        name="ViewTeacher"
        component={ViewTeacher}
        options={{
          drawerIcon: () => <Feather name="user" size={24} color="black" />,
          drawerLabel: "Detalhes",
          drawerItemStyle: { display: "none" }
        }}
      />
      <Drawer.Screen
        name="CreateTeacher"
        component={CreateTeacher}
        options={{
          drawerIcon: () => <Feather name="edit" size={24} color="black" />,
          drawerLabel: "Criar Professor",
          drawerItemStyle: token && user?.isAdmin ? undefined : { display: "none" }
        }}
      />
      <Drawer.Screen
        name="UpdateTeacher"
        component={UpdateTeacher}
        options={{
          drawerIcon: () => <Feather name="edit" size={24} color="black" />,
          drawerLabel: "Atualizar Professor",
          drawerItemStyle: { display: "none" }
        }}
      />
      <Drawer.Screen
        name="DeleteTeacher"
        component={DeleteTeacher}
        options={{
          drawerIcon: () => <Feather name="trash" size={24} color="black" />,
          drawerLabel: "Excluir Professor",
          drawerItemStyle: { display: "none" }
        }}
      />

      <Drawer.Screen
        name="Students"
        component={Students}
        options={{
          drawerIcon: () => <Feather name="users" size={24} color="black" />,
          drawerLabel: "Alunos"
        }}
      />
      <Drawer.Screen
        name="ViewStudent"
        component={ViewStudent}
        options={{
          drawerIcon: () => <Feather name="user" size={24} color="black" />,
          drawerLabel: "Detalhes",
          drawerItemStyle: { display: "none" }
        }}
      />
      <Drawer.Screen
        name="CreateStudent"
        component={CreateStudent}
        options={{
          drawerIcon: () => <Feather name="edit" size={24} color="black" />,
          drawerLabel: "Criar Aluno",
          drawerItemStyle: token && user?.isAdmin ? undefined : { display: "none" }
        }}
      />
      <Drawer.Screen
        name="UpdateStudent"
        component={UpdateStudent}
        options={{
          drawerIcon: () => <Feather name="edit" size={24} color="black" />,
          drawerLabel: "Atualizar Aluno",
          drawerItemStyle: { display: "none" }
        }}
      />
      <Drawer.Screen
        name="DeleteStudent"
        component={DeleteStudent}
        options={{
          drawerIcon: () => <Feather name="trash" size={24} color="black" />,
          drawerLabel: "Excluir Aluno",
          drawerItemStyle: { display: "none" }
        }}
      />

      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: () => <Feather name="log-out" size={24} color="black" />,
          drawerLabel: "Sair"
        }}
      />


    </Drawer.Navigator>
  );
};

export default AuthDrawerRoutes;