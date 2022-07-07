import { useEffect, useRef } from 'react'
import QrScanner from 'qr-scanner'

const QrHunter = ({
  onScan,
  onError = () => {},
  options = {},
  ...props
}) => {
  const scanner = useRef()
  const videoRef = useRef()

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
