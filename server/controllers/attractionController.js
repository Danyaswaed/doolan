const db = require('../db');

exports.getAllAttractions = async (req, res) => {
  try {
    const [attractions] = await db.query('SELECT * FROM attractions');
    res.json(attractions);
  } catch (error) {
    console.error('Error fetching attractions:', error);
    res.status(500).json({ error: 'Failed to fetch attractions' });
  }
};

exports.getAttractionById = async (req, res) => {
  try {
    const [attraction] = await db.query('SELECT * FROM attractions WHERE id = ?', [req.params.id]);
    if (attraction.length === 0) {
      return res.status(404).json({ error: 'Attraction not found' });
    }
    res.json(attraction[0]);
  } catch (error) {
    console.error('Error fetching attraction:', error);
    res.status(500).json({ error: 'Failed to fetch attraction' });
  }
};

exports.addAttraction = async (req, res) => {
  try {
    const { 
      attraction_name,
      attraction_location_name,
      attraction_description,
      attraction_image,
      attraction_duration,
      attraction_difficulty,
      attraction_distance
    } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO attractions (attraction_name, attraction_location_name, attraction_description, attraction_image, attraction_duration, attraction_difficulty, attraction_distance) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [attraction_name, attraction_location_name, attraction_description, attraction_image, attraction_duration, attraction_difficulty, attraction_distance]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('Error adding attraction:', error);
    res.status(500).json({ error: 'Failed to add attraction' });
  }
};

exports.updateAttraction = async (req, res) => {
  try {
    const { 
      attraction_name,
      attraction_location_name,
      attraction_description,
      attraction_image,
      attraction_duration,
      attraction_difficulty,
      attraction_distance
    } = req.body;
    
    const [result] = await db.query(
      'UPDATE attractions SET attraction_name = ?, attraction_location_name = ?, attraction_description = ?, attraction_image = ?, attraction_duration = ?, attraction_difficulty = ?, attraction_distance = ? WHERE id = ?',
      [attraction_name, attraction_location_name, attraction_description, attraction_image, attraction_duration, attraction_difficulty, attraction_distance, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Attraction not found' });
    }
    
    res.json({ message: 'Attraction updated successfully' });
  } catch (error) {
    console.error('Error updating attraction:', error);
    res.status(500).json({ error: 'Failed to update attraction' });
  }
};

exports.deleteAttraction = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM attractions WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Attraction not found' });
    }
    res.json({ message: 'Attraction deleted successfully' });
  } catch (error) {
    console.error('Error deleting attraction:', error);
    res.status(500).json({ error: 'Failed to delete attraction' });
  }
};

exports.updateAttraction = async (req, res) => {
  try {
    const { 
      attraction_name,
      attraction_location_name,
      attraction_description,
      attraction_image,
      attraction_duration,
      attraction_difficulty,
      attraction_distance
    } = req.body;
    
    const [result] = await db.query(
      'UPDATE attractions SET attraction_name = ?, attraction_location_name = ?, attraction_description = ?, attraction_image = ?, attraction_duration = ?, attraction_difficulty = ?, attraction_distance = ? WHERE id = ?',
      [attraction_name, attraction_location_name, attraction_description, attraction_image, attraction_duration, attraction_difficulty, attraction_distance, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Attraction not found' });
    }
    res.json({ message: 'Attraction updated successfully' });
  } catch (error) {
    console.error('Error updating attraction:', error);
    res.status(500).json({ error: 'Failed to update attraction' });
  }
};

exports.deleteAttraction = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM attractions WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Attraction not found' });
    }
    res.json({ message: 'Attraction deleted successfully' });
  } catch (error) {
    console.error('Error deleting attraction:', error);
    res.status(500).json({ error: 'Failed to delete attraction' });
  }
};
