import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

function Home() {
  const [qr, setQr] = useState("111");

  async function click() {
    const resp = await axios.get("http://localhost:8888/api");
    setQr(resp.data.qr);
  }
  return (
    <>
      <input
        type={'button'}
        value={"test"}
        onClick={click}
      />
      <div style={{ height: "auto", margin: "0 auto", width: "50%" }}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={qr}
          viewBox={`0 0 256 256`}
        />
      </div>
    </>
  );
}

export default Home;
