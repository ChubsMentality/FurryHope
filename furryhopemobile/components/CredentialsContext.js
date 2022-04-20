import { createContext } from 'react';

// In order for all the components to access the value of the stored credentials
// we use createContext
export const CredentialsContext = createContext({storedCredentials: {}, setStoredCredentials: () => {}});