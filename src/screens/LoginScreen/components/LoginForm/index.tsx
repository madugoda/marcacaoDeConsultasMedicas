import React from 'react';
import { ViewStyle } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import theme from '../../../../styles/theme';
import { FormContainer } from '../../../CreateAppointmentScreen/components/AppointmentForm/styles';

type Props = {
  email: string;
  password: string;
  loading: boolean;
  onChangeEmail: (text: string) => void;
  onChangePassword: (text: string) => void;
  onSubmit: () => Promise<void> | void;
  onNavigateRegister: () => void;
};

const LoginForm: React.FC<Props> = ({
  email,
  password,
  loading,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  onNavigateRegister,
}) => {
  return (
    <FormContainer>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={onChangeEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={{ marginBottom: 15 }}
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry
        containerStyle={{ marginBottom: 15 }}
      />

      <Button
        title="Entrar"
        onPress={onSubmit}
        loading={loading}
        containerStyle={{ marginTop: 10, width: '100%' } as ViewStyle}
        buttonStyle={{ backgroundColor: theme.colors.primary, paddingVertical: 12 }}
      />

      <Button
        title="Cadastrar Novo Usuário"
        onPress={onNavigateRegister}
        containerStyle={{ marginTop: 10, width: '100%' } as ViewStyle}
        buttonStyle={{ backgroundColor: theme.colors.secondary, paddingVertical: 12 }}
      />

      <Text style={{ marginTop: 20, textAlign: 'center', color: theme.colors.text }}>
        Primeiro acesso? Cadastre-se como Admin ou Paciente.
      </Text>
    </FormContainer>
  );
};

export default LoginForm;
