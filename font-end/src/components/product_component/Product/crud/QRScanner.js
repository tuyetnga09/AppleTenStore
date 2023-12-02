import React, {useState} from 'react';
import {useZxing} from "react-zxing"

const QrScanner = (props) => {
    const [qrResult, setQrResult] =  useState("");
    const {ref} = useZxing({
        onDecodeResult(result){
            setQrResult(JSON.parse(result.getText()));
            console.log(JSON.parse(result.getText()))
            props.data(JSON.parse(result.getText()))
        }
    })

    return (
        <>
            <video width="300px" height="300px" ref={ref}></video>
        </>
    );
};

export default QrScanner;