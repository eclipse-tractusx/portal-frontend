export default function getApiBase() {
  return `https://portal-backend.${
    document.location.hostname.includes('.int.') ? 'int' : 'dev'
  }.demo.catena-x.net/`
}
