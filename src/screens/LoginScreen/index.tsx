import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { Container, Title, ErrorText } from './styles';
import { useLogin } from './hooks/useLogin';
import LoginForm from './components/LoginForm';

type LoginNavProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavProp>();
  const {
    email, setEmail,
    password, setPassword,
    loading, error,
    handleLogin,
  } = useLogin();

  return (
    <Container>
      <Title>App Marcação de Consultas</Title>

      <LoginForm
        email={email}
        password={password}
        onChangeEmail={setEmail}
        onChangePassword={setPassword}
        loading={loading}
        onSubmit={handleLogin}
        onNavigateRegister={() => navigation.navigate('Register')}
      />

      {error ? <ErrorText>{error}</ErrorText> : null}
    </Container>
  );
};

export default LoginScreen;
