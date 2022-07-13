export default function Redirect({ path }: { path: string }) {
  document.location.href = `${document.location.origin}/${path}/`
  return null
}
