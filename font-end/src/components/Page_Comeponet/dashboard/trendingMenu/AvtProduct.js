import React, { useEffect, useState } from "react";
import { searchImage } from "../../../../service/image.service";

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
  }, []);

  return (
    <>
      <div>
        <img src={`/imageUpload/` + image} width="50px" height="55px" />
      </div>
    </>
  );
};

export default AvtProduct;
