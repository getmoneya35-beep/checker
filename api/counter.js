let count = 0;
let lastIPs = [];

// SUPER simple fallback country guess (you can expand this)
function getCountryFromIP(ip) {
  if (ip.startsWith("192.") || ip.startsWith("127.") || ip.startsWith("::1")) {
    return { code: "us", name: "Local" };
  }

  // fallback default
  return { code: "us", name: "Unknown" };
}

export default function handler(req, res) {
  const isRealRequest = req.query.thisisnotabot === "true";

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRealRequest) {
    count++;

    const country = getCountryFromIP(ip);

    const entry = {
      ip,
      country: country.name,
      flag: `https://flagcdn.com/24x18/${country.code}.png`
    };

    lastIPs.unshift(entry);
    lastIPs = lastIPs.slice(0, 10);
  }

  res.json({
    liveRequests: count,
    lastIPs
  });
}
