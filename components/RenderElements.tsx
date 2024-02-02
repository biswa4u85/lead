import React, { useState, useRef } from "react";
import SignatureCanvas from 'react-signature-canvas';

const SignatureBox = (props: any) => {
  const [open, setOpen] = useState(false)
  const signatureRef: any = useRef();
  const handleClear = () => {
    signatureRef.current.clear();
  };
  const handleSave = () => {
    const dataUrl = signatureRef.current.toDataURL();
    props.setSignature(dataUrl)
    // setOpen(false)
  };
  return (
    <div>
      {open ? <><SignatureCanvas ref={signatureRef} penColor="black" canvasProps={{ width: 400, height: 200, className: 'sigCanvas' }} />
        <button className="font-normal text-gray-700 ml-30 font-poppins hover:text-blue-800 text-2xs" onClick={handleClear}>Clear</button>
        <button className="ml-4 font-normal text-graylight-800 font-poppins text-2xs" onClick={handleSave}>Save</button>
        <button className="ml-4 font-normal text-gray-700 font-poppins hover:text-blue-800 text-2xs" onClick={() => setOpen(!open)}>Close</button>
      </> :
        <button onClick={() => setOpen(!open)} className="ml-4 font-normal text-gray-700 font-poppins hover:text-blue-800 text-2xs">Create signature</button>
      }
    </div>
  );
};

export {
  SignatureBox
};
