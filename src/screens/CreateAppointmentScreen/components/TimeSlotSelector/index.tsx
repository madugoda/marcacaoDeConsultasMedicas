import React from 'react';
import TimeSlotList from '../../../../components/TimeSlotList';
import { Wrapper } from './styles';

type Props = {
  selectedTime: string;
  onSelectTime: (time: string) => void;
};

const TimeSlotSelector: React.FC<Props> = ({ selectedTime, onSelectTime }) => {
  return (
    <Wrapper>
      {/* Reaproveita TimeSlotList existente */}
      <TimeSlotList selectedTime={selectedTime} onSelectTime={onSelectTime} />
    </Wrapper>
  );
};

export default TimeSlotSelector;
