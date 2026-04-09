export default function Redirect() { return null }

export async function getServerSideProps() {
  return { redirect: { destination: '/', permanent: true } }
}
