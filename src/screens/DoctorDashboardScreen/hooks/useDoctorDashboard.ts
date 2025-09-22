import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../contexts/AuthContext';

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: AppointmentStatus;
}

export const useDoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (stored) {
        const allAppointments: Appointment[] = JSON.parse(stored);
        const doctorAppointments = allAppointments.filter(a => a.doctorId === user?.id);
        setAppointments(doctorAppointments);
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const handleUpdateStatus = async (id: string, newStatus: AppointmentStatus) => {
    try {
      const stored = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (stored) {
        const allAppointments: Appointment[] = JSON.parse(stored);
        const updatedAppointments = allAppointments.map(app =>
          app.id === id ? { ...app, status: newStatus } : app
        );
        await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(updatedAppointments));
        loadAppointments();
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  return { appointments, loading, handleUpdateStatus, reload: loadAppointments };
};
