import { createContext } from 'react';

export const SnackbarContext = createContext({ status: false, message: '', severity: '' });
