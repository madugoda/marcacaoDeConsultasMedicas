import React from 'react';
import { ViewStyle } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { FormContainer, ButtonRow } from './styles';
import theme from '../../../../styles/theme';

type Props = {
  date: string;
  setDate: (v: string) => void;
  loading: boolean;
  onSubmit: () => Promise<void> | void;
  onCancel: () => void;
};

const AppointmentForm: React.FC<Props> = ({ date, setDate, loading, onSubmit, onCancel }) => {
  return (
    <FormContainer>
      <Input
        placeholder="Data (DD/MM/AAAA)"
        value={date}
        onChangeText={setDate}
        keyboardType="numeric"
        containerStyle={{ marginBottom: 15 }}
      />

      <ButtonRow>
        <Button
          title="Agendar"
          onPress={onSubmit}
          loading={loading}
          containerStyle={{ flex: 1, marginRight: 8 } as ViewStyle}
          buttonStyle={{ backgroundColor: theme.colors.primary, paddingVertical: 12 }}
        />
        <Button
          title="Cancelar"
          onPress={onCancel}
          containerStyle={{ flex: 1 } as ViewStyle}
          buttonStyle={{ backgroundColor: theme.colors.secondary, paddingVertical: 12 }}
        />
      </ButtonRow>
    </FormContainer>
  );
};

export default AppointmentForm;
