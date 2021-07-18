import React, { useContext } from 'react';
import { Redirect } from 'react-router';

const styles = (theme) => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

const Login = (props) => {
  // const { classes } = props;
  // const { currentUser, userProfile } = useContext(AuthContext);

  const signOutUser = () => {
    // auth.signOut();
  };

  // if (currentUser && userProfile) {
  //   return <Redirect to='/order' />;
  // }

  return (
    <div>
      <div>
        <h5>
          You do not have a account with us
        </h5>
        <button onClick={signOutUser}>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
