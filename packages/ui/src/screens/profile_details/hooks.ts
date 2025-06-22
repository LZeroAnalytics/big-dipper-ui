import { useRouter } from 'next/router';
import * as R from 'ramda';
import { useCallback, useEffect, useState } from 'react';
import chainConfig from '@/chainConfig';
import type { ProfileDetailState } from '@/screens/profile_details/types';

const { extra, prefix } = chainConfig();

const initialState: ProfileDetailState = {
  exists: false,
  desmosProfile: null,
};

export const useProfileDetails = () => {
  const router = useRouter();
  const [state, setState] = useState<ProfileDetailState>(initialState);
  const handleSetState = useCallback(
    (stateChange: (prevState: ProfileDetailState) => ProfileDetailState) => {
      setState((prevState) => {
        const newState = stateChange(prevState);
        return R.equals(prevState, newState) ? prevState : newState;
      });
    },
    []
  );

  const profileDtag: string =
    (Array.isArray(router?.query?.dtag) ? router?.query?.dtag[0] : router?.query?.dtag) ?? '';

  const loading = false;

  useEffect(() => {
    handleSetState((prevState) => ({ ...prevState, desmosProfile: null, exists: false }));
  }, [handleSetState]);

  return { state, loading };
};
