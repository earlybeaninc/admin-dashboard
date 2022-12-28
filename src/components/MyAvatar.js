import { useSelector } from 'react-redux';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {

  const { user } = useSelector((state) => ({
    user: state.profile
  }));

  return (
    <Avatar
      src=''
      alt='profile-image'
      color={user?.admin_profile?.profile_image ? 'default' : createAvatar(`${user?.admin_profile?.first_name} ${user?.admin_profile?.last_name}`).color}
      {...other}
    >
      {createAvatar(`${user?.admin_profile?.first_name} ${user?.admin_profile?.last_name}`).name}
    </Avatar>
  );
}
