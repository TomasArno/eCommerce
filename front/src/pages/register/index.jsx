import axios from 'axios';
import buildReqData from '../../utils/buildRequestData.js';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

function Register() {
	const [isRegistered, setIsRegistered] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		let data = buildReqData();

		axios('http:localhost:8080/api/sessions/register', data)
			.then((res) => {
				if (res.data.statusCode == 201) setIsRegistered(true);
				else alert(res.data.message);
			})
			.catch((err) => console.log(err));

		e.target.reset();
	};

	const handleVerification = (e) => {
		e.preventDefault();

		let data = buildReqData();

		axios(
			{
				url: 'http://localhost:8080/api/sessions/',
				data,
				method: 'post',
			},
			{ withCredentials: true }
		)
			.then((res) => {
				if (res.data.statusCode == 200) navigate('/login');
				else alert(res.data.message);
			})
			.catch((err) => console.log(err));

		e.target.reset();
	};

	return (
		<>
			<h2 className='main_title'>REGISTRARSE</h2>

			{!isRegistered ? (
				<form
					id='registerForm'
					className='form'
					onSubmit={handleSubmit}
				>
					<div className='field_container'>
						<label htmlFor='email' className='label'>
							Email
						</label>
						<input type='email' className='input' id='email' />
					</div>
					<div className='field_container'>
						<label htmlFor='name' className='label'>
							Nombre completo
						</label>
						<input type='text' className='input' id='name' />
					</div>
					<div className='field_container'>
						<label htmlFor='password' className='label'>
							Contraseña
						</label>
						<input
							type='password'
							className='input'
							id='password'
						/>
					</div>
					<div className='field_container'>
						<label htmlFor='photo' className='label'>
							Foto
						</label>
						<input type='text' className='input' id='photo' />
					</div>
					<button id='register' type='submit' className='btn'>
						REGISTRARSE
					</button>
					<button id='registerGoogle' type='submit' className='btn'>
						REGISTRARSE CON GOOGLE
					</button>
				</form>
			) : (
				<form
					id='registerForm'
					className='form'
					onSubmit={handleVerification}
				>
					<div className='field_container'>
						<label htmlFor='email' className='label'>
							Email
						</label>
						<input type='email' className='input' id='email' />
					</div>
					<div className='field_container'>
						<label htmlFor='verifyCode' className='label'>
							CODIGO VERIFICACIÓN
						</label>
						<input type='text' className='input' id='verifyCode' />
					</div>

					<button id='register' type='submit' className='btn'>
						ENVÍAR
					</button>
				</form>
			)}
		</>
	);
}

export default Register;
