import { User } from '../../../types/auth';
import { Doctor } from '../hooks/useCreateAppointment';

export const convertUsersToDoctors = (users: User[]): Doctor[] =>
  users.map(user => ({
    id: user.id,
    name: user.name,
    specialty: (user as any).role === 'doctor' && 'specialty' in user
      ? (user as any).specialty
      : 'Especialidade não informada',
    image: (user as any).image ?? undefined,
  }));
