// A random ID persisted in localStorage to anonymously identify "this
// browser" to the backend — there's no login system, so this is scoped to
// one device, not one person. Clearing site data resets it (a new "device"
// as far as the server is concerned), same limitation as localStorage today,
// just with a server-side backup that survives *this* browser's cache being
// cleared as long as the ID itself is remembered — which it won't be if the
// cache clear also wipes localStorage. Real cross-device sync needs actual
// accounts; this is only the anonymous building block for that.
const STORAGE_KEY = 'bs_device_id';

export function getDeviceId(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    // localStorage can throw in private-browsing modes on some browsers.
    return null;
  }
}
