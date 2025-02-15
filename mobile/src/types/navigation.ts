export type RootStackParamList = {
  Posts: undefined;
  ViewPost: { id: number, refresh?: boolean };
  CreatePost: undefined;
  UpdatePost: { id: number };
  DeletePost: { id: number };
  Teachers: { refresh?: boolean };
  ViewTeacher: { id: number, refresh?: boolean };
  UpdateTeacher: { id: number };
  DeleteTeacher: { id: number };
  Students: { refresh?: boolean };
  ViewStudent: { id: number, refresh?: boolean };
  UpdateStudent: { id: number };
  DeleteStudent: { id: number };
  RegisterStudent: undefined;
};