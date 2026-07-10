let count = 0;
let lastIPs = [];

export default async function handler(req, res) {
  const isRealRequest = req.query.thisisnotabot === "true";

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRealRequest && ip !== "unknown") {
    count++;

    try {
      // Fetch geo info
      const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
      const geo = await geoRes.json();

      const entry = {
        ip: ip,
        country: geo.country_name || "Unknown",
        flag: geo.country_code
          ? `https://flagcdn.com/24x18/${geo.country_code.toLowerCase()}.png`
          : ""
      };

      // Add to list
      lastIPs.unshift(entry);
      lastIPs = lastIPs.slice(0, 10);

    } catch (e) {
      // fallback if API fails
      lastIPs.unshift({ ip, country: "Unknown", flag: "" });
      lastIPs = lastIPs.slice(0, 10);
    }
  }

  res.json({
    liveRequests: count,
    lastIPs
  });
}
