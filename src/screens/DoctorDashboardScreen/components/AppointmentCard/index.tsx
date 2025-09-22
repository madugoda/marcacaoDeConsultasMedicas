import React from 'react';
import { Button, ListItem } from 'react-native-elements';
import { Appointment, AppointmentStatus } from '../../hooks/useDoctorDashboard';
import { getStatusColor, getStatusText } from '../../utils/statusHelpers';
import { Container, StatusBadge, StatusText, ButtonContainer } from './styles';

interface AppointmentCardProps {
  appointment: Appointment;
  onStatusUpdate: (id: string, status: AppointmentStatus) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onStatusUpdate }) => {
  return (
    <Container>
      <ListItem.Content>
        <ListItem.Title>Paciente: {appointment.patientName}</ListItem.Title>
        <ListItem.Subtitle>
          {appointment.date} às {appointment.time}
        </ListItem.Subtitle>

        <StatusBadge status={appointment.status}>
          <StatusText status={appointment.status}>
            {getStatusText(appointment.status)}
          </StatusText>
        </StatusBadge>

        {appointment.status === 'pending' && (
          <ButtonContainer>
            <Button title="Confirmar" onPress={() => onStatusUpdate(appointment.id, 'confirmed')} />
            <Button title="Cancelar" onPress={() => onStatusUpdate(appointment.id, 'cancelled')} />
          </ButtonContainer>
        )}
      </ListItem.Content>
    </Container>
  );
};

export default AppointmentCard;
