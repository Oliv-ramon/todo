import { createContext, useState } from "react";

interface AlertMessage {
  type: "success" | "error";
  text: string;
}

interface IAlertContext {
  message: AlertMessage | null;
  setMessage: (newMessage: AlertMessage | null) => void;
  handleClose: () => void;
}

export const AlertContext = createContext<IAlertContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export function AlertProvider({ children }: Props) {
  const [message, setMessage] = useState<AlertMessage | null>(null);
  console.log(message);
  function handleClose() {
    setMessage(null);
  }

  return (
    <AlertContext.Provider value={{ message, setMessage, handleClose }}>
      {children}
    </AlertContext.Provider>
  );
}
