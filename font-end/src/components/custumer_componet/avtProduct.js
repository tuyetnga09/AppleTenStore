import React, { useEffect, useState } from "react";
import { searchImage } from "../../service/image.service";

const AvtProduct = (props) => {
  const [image, setImage] = useState({});

  useEffect(() => {
    searchImage(props.product)
      .then((response) => {
        const dataImage = response.data;
        setImage(dataImage.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props]);

  return (
    <>
      <div className="picture">
        <img src={`/imageUpload/` + image} />
      </div>
    </>
  );
};

export default AvtProduct;
