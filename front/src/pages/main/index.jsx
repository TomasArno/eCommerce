import { useEffect, useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../state";

import Card from "../../components/card";

function Index() {
  const { fetchData } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {

      const data = await fetchData({ url: "products" })

      if (data?.statusCode == 200) {
        const { docs } = data.response;

        setProducts(docs)
      }
    }

    handleFetch()
  }, []);


  return <div className="cards_container">
    {products.map((prod) => (
      <Card
        key={prod._id}
        id={prod._id}
        title={prod.title}
        stock={prod.stock}
        photo={prod.photo}
        price={prod.price}
      />
    ))}
    {/* HACER CARROUSEL */}
  </div>
}

export default Index;
