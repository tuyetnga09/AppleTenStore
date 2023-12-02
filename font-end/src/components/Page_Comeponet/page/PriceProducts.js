import React, { useEffect, useState } from "react";
import { priceMinAndMaxBySKU } from "../../../service/sku.service";

const PriceProduct = (props) => {
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();

  useEffect(() => {
    priceMinAndMaxBySKU(props.product)
      .then((response) => {
        console.log(response.data);
        setPriceMin(response.data[0]);
        setPriceMax(response.data[1]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props]);

  return (
    <strong>
      {priceMax === null && priceMin === null ? (
        <strong>
          {parseFloat(0).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </strong>
      ) : priceMin === undefined || priceMin === NaN || priceMin === null ? (
        <strong>
          {parseFloat(priceMax).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </strong>
      ) : (
        <strong>
          {parseFloat(priceMin).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}{" "}
          -{" "}
          {parseFloat(priceMax).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </strong>
      )}
    </strong>
  );
};

export default PriceProduct;
