import { useState } from "react";
import { QrReader } from "react-qr-reader";

const DisplayScanQR = () => {
  //   const [showCamera, setShowCamera] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  //   const [qrData, setQrData] = useState(null);

  //   const history = useHistory();

  // QR Code
  const handleScan = (data) => {
    if (data) {
      console.log("Scanned Data:", data);
      setScannedData(data);
      //   setQrData(data);
    }

    // if (qrData) {
    //     const qrDataArray = qrData.split(' ');
    //     const newRam = {
    //       code: qrDataArray[1],
    //       name: qrDataArray[3],
    //     };

    //     createRam(newRam)
    //       .then(response => {
    //         console.log("Data saved successfully:", response.data);
    //         setQrData(null);
    //         history.push("/ram/display");
    //       })
    //       .catch(error => {
    //         console.error("Error saving data:", error);
    //       });
    //   }
  };

  const handleError = (error) => {
    console.log(error);
  };

  //   const toggleCamera = () => {
  //     if (showCamera) {
  //       setShowCamera(false);
  //       setScannedData(null);

  //       const scanner = document.querySelector('video').srcObject;
  //       if (scanner && scanner.getTracks) {
  //         scanner.getTracks().forEach(track => track.stop());
  //       }
  //     } else {
  //       setShowCamera(true);
  //       setScannedData(null);
  //       if (qrData) {
  //         const qrDataArray = qrData.split(' ');
  //         const newRam = {
  //           code: qrDataArray[1],
  //           name: qrDataArray[3],
  //         };

  //         createRam(newRam)
  //           .then(response => {
  //             console.log("Data saved successfully:", response.data);
  //             setQrData(null);
  //             history.push("/ram/display");
  //           })
  //           .catch(error => {
  //             console.error("Error saving data:", error);
  //           });
  //       }
  //     }
  //   };

  return (
    <div className="container">
      <div>
        {/* <button class="btn btn-outline-success" onClick={toggleCamera} style={{ marginBottom: '15px' }}>
              {showCamera ? 'Close QR' : 'Open QR'}
            </button> */}
        {/* {showCamera && ( */}
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "200px" }}
        />
        {/* )} */}
        <h3>DATA SCAN: {scannedData}</h3>
      </div>
    </div>
  );
};

export default DisplayScanQR;