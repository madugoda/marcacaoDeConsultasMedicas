import React from 'react';
import { Doctor } from '../../hooks/useCreateAppointment';
import DoctorList from '../../../../components/DoctorList';
import { Wrapper } from './styles';

type Props = {
  doctors: Doctor[];
  selectedDoctorId?: string;
  onSelectDoctor: (d: Doctor | null) => void;
};

const DoctorSelector: React.FC<Props> = ({ doctors, selectedDoctorId, onSelectDoctor }) => {
  return (
    <Wrapper>
      {/* Reaproveita o componente existente DoctorList do projeto.
          Se preferir, substitua pela sua implementação interna aqui. */}
      <DoctorList
        doctors={doctors}
        selectedDoctorId={selectedDoctorId}
        onSelectDoctor={(id: string) => {
          const doc = doctors.find(d => d.id === id) ?? null;
          onSelectDoctor(doc);
        }}
      />
    </Wrapper>
  );
};

export default DoctorSelector;
