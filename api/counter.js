let count = 0;
let lastIPs = [];

export default function handler(req, res) {
  const isRealRequest = req.query.thisisnotabot === "true";

  // Get real IP (works on Vercel)
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRealRequest) {
    count++;

    // Add IP to the front
    lastIPs.unshift(ip);

    // Keep only last 10
    lastIPs = lastIPs.slice(0, 10);
  }

  res.json({
    liveRequests: count,
    totalHits: count,
    counted: isRealRequest,
    lastIPs,
    timestamp: new Date().toISOString()
  });
}
