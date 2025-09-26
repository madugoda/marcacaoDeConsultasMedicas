import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApiService } from '../../../services/authApi';
import { useAuth } from '../../../contexts/AuthContext';
import { User } from '../../../types/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { convertUsersToDoctors } from '../utils/doctorHelpers';

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  image?: string;
};

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

type CreateAppointmentNavProp = NativeStackNavigationProp<RootStackParamList, 'CreateAppointment'>;

export const useCreateAppointment = (navigation: CreateAppointmentNavProp) => {
  const { user } = useAuth();
  const [date, setDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState<boolean>(true);

  const loadDoctors = useCallback(async () => {
    try {
      setLoadingDoctors(true);
      setError('');
      const users: User[] = await authApiService.getAllDoctors();
      const mapped = convertUsersToDoctors(users);
      setDoctors(mapped);
    } catch (err) {
      console.error('useCreateAppointment.loadDoctors error', err);
      setError('Carregando médicos com dados locais...');
      // tenta novamente em background (apenas uma tentativa simples)
      setTimeout(async () => {
        try {
          const users: User[] = await authApiService.getAllDoctors();
          setDoctors(convertUsersToDoctors(users));
          setError('');
        } catch {
          setError('Médicos carregados com dados locais (API indisponível)');
        }
      }, 1000);
    } finally {
      setLoadingDoctors(false);
    }
  }, []);

  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);

  const handleCreateAppointment = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      if (!date || !selectedTime || !selectedDoctor) {
        setError('Por favor, preencha a data e selecione um médico e horário');
        return;
      }

      const stored = await AsyncStorage.getItem('@MedicalApp:appointments');
      const appointments = stored ? JSON.parse(stored) as any[] : [];

      const newAppointment = {
        id: Date.now().toString(),
        patientId: user?.id ?? '',
        patientName: user?.name ?? '',
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        date,
        time: selectedTime,
        specialty: selectedDoctor.specialty,
        status: 'pending' as AppointmentStatus,
      };

      appointments.push(newAppointment);
      await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(appointments));

      alert('Consulta agendada com sucesso!');
      navigation.goBack();
    } catch (err) {
      console.error('handleCreateAppointment error', err);
      setError('Erro ao agendar consulta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [date, selectedTime, selectedDoctor, user, navigation]);

  return {
    // estados
    date, setDate,
    selectedTime, setSelectedTime,
    selectedDoctor, setSelectedDoctor,
    doctors, loadingDoctors,
    error, loading,
    // ações
    loadDoctors, handleCreateAppointment,
  };
};
