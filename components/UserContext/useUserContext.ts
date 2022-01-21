import { useContext } from 'react';

import { UserContext } from './UserProvider';

export const useUserContext = () => {
  return useContext(UserContext);
}
