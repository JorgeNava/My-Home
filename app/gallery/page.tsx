import { isTokenExpiringSoon } from "../_libs/google/isTokenExpiringSoon";

export default async function Gallery() {
  console.log('[NAVA] isTokenExpiringSoon', await isTokenExpiringSoon());
  return <main>Gallery page</main>;
}
