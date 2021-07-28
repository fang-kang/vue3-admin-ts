/*
 * @Descripttion:
 * @Author: 房康
 * @Date: 2021-07-23 15:39:42
 */
export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm extends LoginForm{
  confirmPassword: string;
}