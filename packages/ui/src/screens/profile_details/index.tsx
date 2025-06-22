import { NextSeo } from 'next-seo';
import useAppTranslation from '@/hooks/useAppTranslation';
import Layout from '@/components/layout';
import LoadAndExist from '@/components/load_and_exist';
import Connections from '@/screens/profile_details/components/connections';
import { useProfileDetails } from '@/screens/profile_details/hooks';
import useStyles from '@/screens/profile_details/styles';

const ProfileDetails = () => {
  const { t } = useAppTranslation('profiles');
  const { classes } = useStyles();
  const { state, loading } = useProfileDetails();
  return (
    <>
      <NextSeo
        title={t('profileDetails') ?? undefined}
        openGraph={{
          title: t('profileDetails') ?? undefined,
        }}
      />
      <Layout navTitle={t('profileDetails') ?? undefined}>
        <LoadAndExist loading={loading} exists={state.exists}>
          <span className={classes.root}>
            <div>Profile details not available for THORChain</div>
          </span>
        </LoadAndExist>
      </Layout>
    </>
  );
};

export default ProfileDetails;
