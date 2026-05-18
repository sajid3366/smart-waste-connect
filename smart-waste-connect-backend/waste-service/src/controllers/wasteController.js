import WasteRequest from '../models/wasteRequest.js'

// Create request
export const createWasteRequest = async (req, res) => {
  try {
    const waste = new WasteRequest({
      ...req.body,
      user: req.user.id  // This comes from the JWT
    });
    await waste.save();
    res.status(201).json(waste);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all
export const getWasteRequests = async (req, res) => {
  const items = await WasteRequest.find().sort({ createdAt: -1 })
  res.json(items)
}

// Get by ID
export const getWasteRequestById = async (req, res) => {
  const id = req.params.id
  const waste = await WasteRequest.findById(id)
  if (!waste) return res.status(404).json({ error: 'Not found' })
  res.json(waste)
}

// Update status
export const updateWasteStatus = async (req, res) => {
  const { status } = req.body
  const waste = await WasteRequest.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  )
  if (!waste) return res.status(404).json({ error: 'Not found' })
  res.json(waste)
}
