const BASE_URL = 'http://192.168.55.102:5000';

const API = {
  POSTS: `${BASE_URL}/posts`,
  LOGIN: `${BASE_URL}/login`,
  TEACHERS: `${BASE_URL}/professores`,
  STUDENTS: `${BASE_URL}/alunos`,
  REGISTER: `${BASE_URL}/auth/register`,
  // Adicione outras URLs de API conforme necessário
};

export default API;