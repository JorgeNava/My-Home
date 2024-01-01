import configProvider from "../config-provider";

export async function isTokenExpiringSoon() {
  const expiryTimestamp = await configProvider.get('google.expiryDate');
  const FIVE_MINUTES_MILLISECONDS = 5 * 60 * 1000;
  const currentTime = Date.now();
  const timeDifference : number = expiryTimestamp - currentTime;
  console.log('[NAVA] Date(expirtyTimestamp)', new Date(expiryTimestamp));
  return timeDifference < FIVE_MINUTES_MILLISECONDS;
}