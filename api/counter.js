let count = 0;
let lastIPs = [];

export default function handler(req, res) {
  const isRealRequest = req.query.thisisnotabot === "true";

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRealRequest) {
    count++;

    lastIPs.unshift(ip);
    lastIPs = lastIPs.slice(0, 10);
  }

  res.json({
    liveRequests: count,
    lastIPs,
    timestamp: new Date().toISOString()
  });
}
