import theme from '../../../styles/theme';
import { AppointmentStatus } from '../hooks/useDoctorDashboard';

export const getStatusColor = (status: AppointmentStatus): string => {
  switch (status) {
    case 'confirmed': return theme.colors.success;
    case 'cancelled': return theme.colors.error;
    default: return theme.colors.warning;
  }
};

export const getStatusText = (status: AppointmentStatus): string => {
  switch (status) {
    case 'confirmed': return 'Confirmada';
    case 'cancelled': return 'Cancelada';
    default: return 'Pendente';
  }
};
