export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface UpdateUserData {
  username?: string;
  userName?: string; // Альтернативна назва поля
  name?: string; // Ще одна альтернативна назва
  avatar?: string;
  photoUrl?: string; // Альтернативна назва для аватара
}
