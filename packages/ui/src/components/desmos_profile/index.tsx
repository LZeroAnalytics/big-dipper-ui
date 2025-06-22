import { FC } from 'react';
import Avatar from '@/components/avatar';
import Box from '@/components/box';
import useStyles from '@/components/desmos_profile/styles';
import Loading from '@/components/loading';

type DesmosProfileProps = {
  className?: string;
  loading?: boolean;
  dtag?: string;
  nickname?: string;
  imageUrl?: string;
  coverUrl?: string;
  bio?: string;
  connections?: any[];
};

const DesmosProfile: FC<DesmosProfileProps> = (props) => {
  const { classes, cx } = useStyles({ coverUrl: props.coverUrl });

  return (
    <Box className={cx(classes.root, props.className)}>
      {props.loading ? (
        <Loading />
      ) : (
        <>
          <div className={classes.cover}>
            <div className="cover" />
          </div>
          <div className={classes.avatarContainer}>
            <Avatar
              address={props.dtag || ''}
              imageUrl={props.imageUrl}
              className={classes.avatar}
            />
          </div>
          <div className={classes.nicknameWrapper}>
            <h2>{props.nickname || props.dtag}</h2>
            <p className="tag">@{props.dtag}</p>
          </div>
        </>
      )}
    </Box>
  );
};

export default DesmosProfile;
