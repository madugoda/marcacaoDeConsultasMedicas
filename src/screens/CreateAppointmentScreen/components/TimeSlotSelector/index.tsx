import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import Header from '../../components/Header';
import { Container, Title, SectionTitle, ErrorText, ScrollContainer } from './styles';
import { useCreateAppointment } from './hooks/useCreateAppointment';
import AppointmentForm from './components/AppointmentForm';
import DoctorSelector from './components/DoctorSelector';
import TimeSlotSelector from './components/TimeSlotSelector';

type CreateAppointmentNavProp = NativeStackNavigationProp<RootStackParamList, 'CreateAppointment'>;

type Props = {
  navigation: CreateAppointmentNavProp;
};

const CreateAppointmentScreen: React.FC<Props> = ({ navigation }) => {
  const {
    date, setDate,
    selectedTime, setSelectedTime,
    selectedDoctor, setSelectedDoctor,
    doctors, loadingDoctors,
    error, loading,
    loadDoctors, handleCreateAppointment,
  } = useCreateAppointment(navigation);

  return (
    <Container>
      <Header />
      <ScrollContainer>
        <Title>Agendar Consulta</Title>

        <AppointmentForm
          date={date}
          setDate={setDate}
          loading={loading}
          onSubmit={handleCreateAppointment}
          onCancel={() => navigation.goBack()}
        />

        <SectionTitle>Selecione um Horário</SectionTitle>
        <TimeSlotSelector
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
        />

        <SectionTitle>Selecione um Médico</SectionTitle>
        {loadingDoctors ? (
          <ErrorText>Carregando médicos...</ErrorText>
        ) : (
          <DoctorSelector
            doctors={doctors}
            selectedDoctorId={selectedDoctor?.id}
            onSelectDoctor={setSelectedDoctor}
          />
        )}

        {error ? <ErrorText>{error}</ErrorText> : null}
      </ScrollContainer>
    </Container>
  );
};

export default CreateAppointmentScreen;
