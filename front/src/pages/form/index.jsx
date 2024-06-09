import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import buildReqData from '../../utils/buildRequestData.js';

// import './index.css';

function Form() {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		let data = buildReqData();

		axios
			.post('http://localhost:8080/api/products', data)
			.then((res) => {
				if (res.data.statusCode == 201) navigate('/');
			})
			.catch((err) => console.log(err));

		e.target.reset();
	};

	return (
		<>
			<h2 className='main_title'>CREATE A PRODUCT!</h2>
			<form id='productsForm' className='form' onSubmit={handleSubmit}>
				<div className='field_container'>
					<label htmlFor='title' className='label'>
						Title
					</label>
					<input type='text' className='input' id='title' />
				</div>
				<div className='field_container'>
					<label htmlFor='photo' className='label'>
						Photo
					</label>
					<input type='text' className='input' id='photo' />
				</div>
				<div className='field_container'>
					<label htmlFor='price' className='label'>
						Price
					</label>
					<input type='number' className='input' id='price' />
				</div>
				<div className='field_container'>
					<label htmlFor='stock' className='label'>
						Stock
					</label>
					<input type='number' className='input' id='stock' />
				</div>
				<button id='newProduct' type='submit' className='btn'>
					CREATE!
				</button>
			</form>
		</>
	);
}

export default Form;
