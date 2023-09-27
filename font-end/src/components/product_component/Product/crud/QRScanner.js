import React, {useState} from 'react';
import {useZxing} from "react-zxing"
import data from "bootstrap/js/src/dom/data";

const QrScanner = (props) => {
    const [qrResult, setQrResult] =  useState("");
    const {ref} = useZxing({
        onDecodeResult(result){
            setQrResult(JSON.parse(result.getText()));
            props.data(qrResult)
        }
    })

    return (
        <>
            <video width="300px" height="300px" ref={ref}></video>
        </>
    );
};

export default QrScanner;