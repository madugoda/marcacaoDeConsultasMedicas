import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 20px;
`;

export const Message = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
`;
