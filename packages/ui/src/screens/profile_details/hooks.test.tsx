import { act, cleanup, renderHook } from '@testing-library/react';
import { useMemo } from 'react';
import chainConfig from '@/chainConfig';

import { useProfileDetails } from '@/screens/profile_details/hooks';

const { extra, prefix } = chainConfig();

const mockRouter = {
  query: {
    dtag: '@happieSa',
  },
  replace: jest.fn(() => '/'),
  push: jest.fn(),
};

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => mockRouter,
}));

describe('hook: useProfileDetails', () => {
  it('correctly handles profile details', async () => {
    const { result } = renderHook(() => useProfileDetails());
    expect(result.current.state).toBeDefined();
  });
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
