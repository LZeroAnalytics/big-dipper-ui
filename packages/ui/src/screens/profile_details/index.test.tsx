import { useMemo } from 'react';
import renderer from 'react-test-renderer';
import chainConfig from '@/chainConfig';
import ProfileDetails from '@/screens/profile_details';
import MockTheme from '@/tests/mocks/MockTheme';
import wait from '@/tests/utils/wait';

const { prefix } = chainConfig();

// ==================================
// mocks
// ==================================
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => ({
    query: {
      dtag: '@dtag',
    },
    pathname: '/@dtag',
    replace: jest.fn(() => '/'),
    push: jest.fn(() => '/@dtag'),
  }),
}));
jest.mock('@/components/layout', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="Layout" {...props} />
));
jest.mock('@/components/load_and_exist', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="LoadAndExist" {...props} />
));

jest.mock(
  '@/screens/profile_details/components/connections',
  () => (props: JSX.IntrinsicElements['div']) => <div id="Connections" {...props} />
);

// ==================================
// unit tests
// ==================================
describe('screen: ProfileDetails', () => {
  it('matches snapshot', async () => {
    let component: renderer.ReactTestRenderer | undefined;

    renderer.act(() => {
      component = renderer.create(
        <MockTheme>
          <ProfileDetails />
        </MockTheme>
      );
    });
    await wait(renderer.act);

    const tree = component?.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
