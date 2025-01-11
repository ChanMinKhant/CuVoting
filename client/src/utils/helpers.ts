import FingerprintJS from '@fingerprintjs/fingerprintjs';
export const getFingerprint = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  // setFingerprint(result.visitorId); // Unique fingerprint
  return result.visitorId;
};
