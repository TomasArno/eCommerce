import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { GlobalContext } from "../../state";

import FullCard from '../../components/full-card';

function ProducView() {
	const navigate = useNavigate()

	window.addEventListener("load", () => { // solucion momentanea. Ver como pedir informacion y que re-renderize correctamente el componente
		navigate("/")
	})

	const { getState } = useContext(GlobalContext)

	const { photo, title, price, stock } = getState().productSelected

	return <FullCard photo={photo} title={title} price={price} stock={stock} />
}
// <>
// 	<Card title={title} stock={stock} photo={photo} price={price} />
// 	{/* <div className='card_container'>
// 	</div> */}
// </>

export default ProducView;
