import { createRoot } from 'react-dom/client'

import QrHunter from '../src'

createRoot(document.getElementById('app')).render(
  <QrHunter
    onScan={result => console.log(result.data)}
    options={{
      highlightScanRegion: true,
      highlightCodeOutline: true,
    }}
  />
)
