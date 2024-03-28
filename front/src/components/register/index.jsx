import axios from 'axios';
import buildReqData from "../../utils/buildRequestData.js";

import "./index.css"


function Form() {

	const handleSubmit = (e) => {
		e.preventDefault()

		let data = buildReqData()

		axios({
			url: 'http://localhost:8080/api/sessions/register',
			data,
			method: "post"
		}, { withCredentials: true })
			.then(() => {
				// if (res.data.statusCode == 201) 
			})
			.catch((err) => console.log(err));


		e.target.reset()
	}

	return (
		<>
			<h2 className='main_title'>REGISTRARSE</h2>

			<form id='registerForm' className='form' onSubmit={handleSubmit}>
				<div className='field_container'>
					<label htmlFor='email' className='label'>Email</label>
					<input type='email' className='input' id='email' />
				</div>
				<div className='field_container'>
					<label htmlFor='name' className='label'>Nombre completo</label>
					<input type='text' className='input' id='name' />
				</div>
				<div className='field_container'>
					<label htmlFor='password' className='label'>Contraseña</label>
					<input type='password' className='input' id='password' />
				</div>
				<div className='field_container'>
					<label htmlFor='photo' className='label'>Foto</label>
					<input type='text' className='input' id='photo' />
				</div>
				<button id='register' type='submit' className='btn'>REGISTRARSE</button>
				<button id='registerGoogle' type='submit' className='btn'>REGISTRARSE CON
					GOOGLE</button>
			</form>
		</>
	);
}

export default Form;
