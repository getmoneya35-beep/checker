let count = 0;

export default function handler(req, res) {
  const isRealRequest = req.query.thisisnotabot === "true";

  if (isRealRequest) {
    count++;
  }

  res.json({
    liveRequests: count,
    totalHits: count,           // you can remove this if you want
    counted: isRealRequest,
    timestamp: new Date().toISOString()
  });
}
