// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {

  return (
    <Avatar
      src=''
      alt='profile-image'
      color={createAvatar('Early Bean').color}
      // color={user?.photoURL ? 'default' : createAvatar('Early Bean').color}
      {...other}
    >
      {createAvatar('Early Bean').name}
    </Avatar>
  );
}
