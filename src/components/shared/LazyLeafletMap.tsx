import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./LeafletMap'), { ssr: false })
const Marker = dynamic(async () => (await import('react-leaflet')).Marker, { ssr: false })
const Popup = dynamic(async () => (await import('react-leaflet')).Popup, { ssr: false })

export { Marker, Popup };
export default Map;
