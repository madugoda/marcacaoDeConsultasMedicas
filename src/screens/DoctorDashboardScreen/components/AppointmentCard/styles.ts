import styled from 'styled-components/native';
import { ListItem } from 'react-native-elements';
import { AppointmentStatus } from '../../hooks/useDoctorDashboard';
import { getStatusColor } from '../../utils/statusHelpers';

export const Container = styled(ListItem)`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

export const StatusBadge = styled.View<{ status: AppointmentStatus }>`
  background-color: ${({ status }) => getStatusColor(status) + '20'};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

export const StatusText = styled.Text<{ status: AppointmentStatus }>`
  color: ${({ status }) => getStatusColor(status)};
  font-size: 12px;
  font-weight: 500;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;
