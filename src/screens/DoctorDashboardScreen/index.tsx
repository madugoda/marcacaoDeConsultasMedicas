import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Header from '../../components/Header';
import { RootStackParamList } from '../../types/navigation';
import { Container, Title } from './styles';
import { useDoctorDashboard } from './hooks/useDoctorDashboard';
import AppointmentCard from './components/AppointmentCard';
import EmptyState from './components/EmptyState';

type DoctorDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DoctorDashboard'>;
};

const DoctorDashboardScreen: React.FC = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation<DoctorDashboardScreenProps['navigation']>();
  const { loading, appointments, handleUpdateStatus } = useDoctorDashboard();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Title>Minhas Consultas</Title>

        <Button
          title="Meu Perfil"
          onPress={() => navigation.navigate('Profile')}
          containerStyle={{ marginBottom: 20, width: '100%' }}
        />

        {loading ? (
          <EmptyState text="Carregando consultas..." />
        ) : appointments.length === 0 ? (
          <EmptyState text="Nenhuma consulta agendada" />
        ) : (
          appointments.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onStatusUpdate={handleUpdateStatus}
            />
          ))
        )}

        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={{ marginTop: 20 }}
          buttonStyle={{ backgroundColor: 'red' }}
        />
      </ScrollView>
    </Container>
  );
};

export default DoctorDashboardScreen;
