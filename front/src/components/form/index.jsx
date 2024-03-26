function Form() {
	return (
		<>
			<h2 className='main_title'>CREATE A PRODUCT!</h2>
			<form id='productsForm' className='form'>
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
				<button id='newProduct' type='button' className='btn'>
					CREATE!
				</button>
			</form>
		</>
	);
}

export default Form;
