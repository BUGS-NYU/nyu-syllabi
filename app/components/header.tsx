'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { CssBaseline } from '@mui/material';
import Link from 'next/link';

const Header = () => {
	const logo = "/images/dark/logo.svg";

	const openGoogleForm = () => {
		window.open("https://forms.gle/ZEnhtKBxA8rXhhyN9", '_blank');
	}

	const linkStyle = {
		color: 'white',
		textDecoration: 'none',
		marginLeft: '10px',
	}

	return (
		<div>
			<CssBaseline />
			<AppBar position="static" sx={{
				backgroundColor: '#242526',
			}}>
				<Toolbar>
					<div>
						<Link href='/'><img src={logo} alt="BUGS Logo" height="32px" width="32px" /></Link>
					</div>
					<Link href='/'> 
						<Typography variant="h5" component="div" style={linkStyle}>
							NYU Syllabi
						</Typography>
					</Link>
					<IconButton color="inherit" onClick={openGoogleForm} style={linkStyle}>
						Submit a Syllabi
					</IconButton>
					<Link href='/faq'>
						<IconButton color="inherit" style={linkStyle}>
							FAQ
						</IconButton>
					</Link>
				</Toolbar>
			</AppBar>

		</div>
	)
}

export default Header;