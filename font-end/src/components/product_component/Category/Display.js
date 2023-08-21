import { useEffect, useState } from "react";
import { readAll } from "../../../components/product_component/Category";

const Display = () => {
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    readAll()
      .then((response) => {
        console.log(`${response.data}`);
        setDisplay(response.data);
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  }, []);
  return (
    <table border={1}>
      <tr>
        <th>Name</th>
      </tr>
      {display.map((cat) => (
        <tr key={cat.id}>
          <td>{cat.name}</td>
        </tr>
      ))}
    </table>
  );
};
export default Display;
