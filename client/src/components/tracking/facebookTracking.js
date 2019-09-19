import ReactPixel from 'react-facebook-pixel'

const advancedMatching = { em: 'sales@vacay.co.ke' }
const options = {
  autoConfig: true,
  debug: false
}

export const initPixel = pixelId => {
  ReactPixel.init(pixelId, advancedMatching, options)
}

export const TrackPageView = () => {
  ReactPixel.pageView()
}

export const TrackEvent = (event, data) => {
  ReactPixel.trackCustom(event, data)
}
