import React from 'react';
import {jwtDecode} from 'jwt-decode';  // Make sure the import is correct
import Logo from './Logo';

const Navbar = () => {
    const token = localStorage.getItem('token');
    let username = 'Guest'; // Default value if token is not set or invalid
    try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        username = decodedToken.email;  // Use 'email' as the username
    } catch (error) {
        console.error('Failed to decode token:', error);
    }

    return (
        <nav style={styles.navbar}>
            <Logo style={styles.logo} />
            <p style={styles.tagline}>One earth, one community</p>
            <div style={styles.userProfile}>
                <span style={styles.userName}>{username}</span>
                <div style={styles.userIcon}></div>
            </div>
        </nav>
    );
};

const styles = {
  navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1B5E20', // Dark green; adjust the color to match your design
      color: 'white',
      padding: '10px 30px'
  },
  logo: {
      height: '50px', // Adjust based on your logo's dimensions
      width: '50px'
  },
  tagline: {
      flexGrow: 1,
      textAlign: 'center',
      margin: '0 20px'
  },
  userProfile: {
      display: 'flex',
      alignItems: 'center'
  },
  userName: {
      marginRight: '10px'
  },
  userIcon: {
      height: '40px',
      width: '40px',
      borderRadius: '50%',
      backgroundColor: '#fff' // Assuming a white user icon background
  }
};

export default Navbar;
