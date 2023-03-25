import { useEffect, useRef } from 'react'
import QrScanner from 'qr-scanner'

type QrHunterOptions = {
  onDecodeError?: (error: Error | string) => void;
  calculateScanRegion?: (video: HTMLVideoElement) => QrScanner.ScanRegion;
  preferredCamera?: QrScanner.FacingMode | QrScanner.DeviceId;
  maxScansPerSecond?: number;
  highlightScanRegion?: boolean;
  highlightCodeOutline?: boolean;
  overlay?: HTMLDivElement;
  returnDetailedScanResult?: true;
}

type QrHunterProps = {
  onScan: (result: QrScanner.ScanResult) => void,
  onError?: (error: Error | string) => void,
  options: QrHunterOptions,
}

const QrHunter = ({
  onScan,
  onError = () => {},
  options = {},
  ...props
}: QrHunterProps) => {
  const scanner = useRef<QrScanner>()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && !scanner.current) {
      scanner.current = new QrScanner(videoRef.current, onScan, {
        returnDetailedScanResult: true,
        ...options,
        onDecodeError: onError,
      })
      scanner.current.start()
    }

    // Clean up on unmount
    return () => {
      if (!scanner.current) return
      scanner.current.destroy()
      scanner.current = undefined
    }
  }, [videoRef.current, onScan, onError, options])

  return <video ref={videoRef} {...props}></video>
}

export default QrHunter
