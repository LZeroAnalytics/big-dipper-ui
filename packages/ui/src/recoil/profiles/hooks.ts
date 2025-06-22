import { useRecoilValue } from 'recoil';
import chainConfig from '@/chainConfig';
import useShallowMemo from '@/hooks/useShallowMemo';
import {
  readDelegatorAddress,
  readDelegatorAddresses,
  readProfile,
  readProfiles,
} from '@/recoil/profiles/selectors';

const { extra } = chainConfig();

/**
 * Accepts a delegator address and returns the appropriate profile
 * @param address
 */
export const useProfileRecoil = (address: string): AvatarName => {
  const profile = useRecoilValue(readProfile(address));
  const delegatorAddress = useRecoilValue(readDelegatorAddress(address));

  return profile;
};

/**
 * Accepts a list of addresses and returns the appropriate profiles
 * @param address
 */
export const useProfilesRecoil = (
  addresses: string[]
): { profiles: AvatarName[]; loading: boolean; error: unknown } => {
  const profiles = useRecoilValue(readProfiles(addresses));
  const delegatorAddresses = useRecoilValue(readDelegatorAddresses(addresses));
  const delegatorAddressMemo = useShallowMemo(delegatorAddresses);

  return { profiles, loading: false, error: null };
};
