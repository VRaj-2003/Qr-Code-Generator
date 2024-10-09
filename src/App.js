// import logo from './logo.svg';
import "./App.css";
import { Button } from 'primereact/button';
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import QRCode from 'qrcode';
import { Card } from "primereact/card";

function App() {
  // User input
  // Generate the code
  // download the Qr

  const [query, setQuery] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const generateQrCode = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(query);
      setQrUrl(dataUrl);
    } catch (e) {
      console.log(e);
    }
  }
    const downloadQrCode = () => {
      try {
        const link = document.createElement('a')
        link.href = qrUrl
        link.download = encodeURIComponent('qr code')
        link.style.display = 'none'
        link.click()
        document.removeChild(link)
      } catch (e) {
        alert("Download Sucessfully")
      }
    }

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <InputTextarea
        autoResize
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={5}
        cols={30}
      />
      <br />
     
      <Button label="Generate QR Code" onClick={generateQrCode} />

      {
        qrUrl.length ? (
          <>
            <Card title="QR Code" style={{minWidth: '20vw', width: 'fit-content', margin: '10vh auto'}}>
              <img src = {qrUrl} alt="qrcode" width={300}></img>
              <br/>
              <Button label="Download" onClick={downloadQrCode} />
            </Card>
          </>
        ) : " "
      }
    </div>
  );
}


export default App;
