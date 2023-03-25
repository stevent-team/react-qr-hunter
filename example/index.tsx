import { createRoot } from 'react-dom/client'
import QrHunter from 'react-qr-hunter'

createRoot(document.getElementById('app')!).render(
  <QrHunter
    onScan={result => console.log(result.data)}
    options={{
      highlightScanRegion: true,
      highlightCodeOutline: true,
    }}
  />
)
