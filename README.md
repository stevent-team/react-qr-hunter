# 🏹 React QR Hunter
[![npm version](https://img.shields.io/npm/v/@stevent-team/react-qr-hunter)](https://www.npmjs.com/package/@stevent-team/react-qr-hunter)
[![minzip size](https://img.shields.io/bundlephobia/minzip/@stevent-team/react-qr-hunter)](https://bundlephobia.com/package/@stevent-team/react-qr-hunter)

Simple and fast QR code scanner for React, based on the JavaScript library [qr-scanner](https://github.com/nimiq/qr-scanner).

Runs in a web worker to improve performance on slower devices.

## Usage

Install the package

```bash
yarn add @stevent-team/react-qr-hunter
```

And use it

```jsx
import { createRoot } from 'react-dom/client'
import QrHunter from '@stevent-team/react-qr-hunter'

createRoot(document.getElementById('app')).render(
  <QrHunter
    onScan={result => console.log(result.data)}
    options={{
      highlightScanRegion: true,
      highlightCodeOutline: true,
    }}
  />
)
```

## Options

The `QrHunter` component accepts 3 properties, `onScan`, `onError`, and `options`. The first two are functions that are called every frame. If no QR code is detected, the `onError` function will fire. By default it won't do anything. If a QR code is detected, the data and corner positions will be passed to the `onScan` function.

The `options` prop is an object that supports the following options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `preferredCamera` | string | `environment` | Can be a device ID or a facing mode (`environment` or `user`) |
| `maxScansPerSecond` | number | `25` | This is capped by the camera's frame rate. You can change this to reduce battery consumption if you don't need as many scans. |
| `calculateScanRegion` | function | None | A function that is passed the `video` element, and should return an object with `x`, `y`, `width`, and `height`. This defines the region of the video that is processed, and can be reduced in size to improve performance. By default, the scan region is restricted to a centered square of two thirds of the video width or height, whichever is smaller, and scaled down to a 400x400 square. Optionally you can also provide `downScaledWidth` and `downScaledHeight` in the return object to scale down the input before processing to improve performance. Note that these must be the same aspect ratio as `width` and `height`. |
| `highlightScanRegion` | boolean | `false` | Renders a box around the scan region. Can be styled by selecting the `scan-region-highlight` css class, and the `scan-region-highlight-svg` class for the svg box inside. |
| `highlightCodeOutline` | boolean | `false` | Renders an svg polygon where it detects a QR code. Can be styled by selecting the `code-outline-highlight` css class. |

## Contributing

You can install dependencies by running `yarn` after cloning this repo, and `yarn dev` to start the demo.

This library uses [changesets](https://github.com/changesets/changesets), if the changes you've made would constitute a version bump, run `yarn changeset` and follow the prompts to document the changes you've made. Changesets are consumed on releases, and used to generate a changelog and bump version number.

## License

Created by Stevent and licensed under MIT
