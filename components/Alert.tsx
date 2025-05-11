import { AlertDialogProps } from "@/types/types";
import * as React from "react";
import { Portal, Dialog, Text, Button } from "react-native-paper";

const CustomAlert = ({ visible, onDismiss, message }: AlertDialogProps) => (
  <Portal>
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Notice</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">{message}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>OK</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default CustomAlert;
