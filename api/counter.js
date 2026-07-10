let count = 0;   // In-memory (resets on deploy). For persistence use KV later.

export default function handler(req, res) {
  count++;   // Increment on every request to this endpoint

  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.json({
    liveRequests: count,
    timestamp: new Date().toISOString()
  });
}
