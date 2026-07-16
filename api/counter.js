export default async function handler(req, res) {
  const { method } = req;

  // Store commands and outputs in memory (for simplicity)
  if (!global.commands) global.commands = [];
  if (!global.outputs) global.outputs = {};

  if (method === 'POST') {
    const { command, id } = req.body;
    if (command && id) {
      global.commands.push({ id, command, timestamp: Date.now() });
      res.status(200).json({ success: true, message: "Command received" });
    } else {
      res.status(400).json({ success: false, message: "Missing command or id" });
    }
  } 
  else if (method === 'GET') {
    const latestId = req.query.latestId || 0;
    const newCommands = global.commands.filter(c => c.id > latestId);
    
    res.status(200).json({
      commands: newCommands,
      outputs: global.outputs
    });
  } 
  else if (method === 'PUT') {
    // Receive output from the client
    const { id, output } = req.body;
    if (id) {
      global.outputs[id] = output;
      res.status(200).json({ success: true });
    }
  } 
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
