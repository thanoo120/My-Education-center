const db = require('../models/db');

const ensureContentTables = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS study_materials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      subject_name VARCHAR(120) NOT NULL,
      description TEXT,
      material_url VARCHAR(500),
      updated_by VARCHAR(120),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS university_entrances (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      year INT NOT NULL,
      description TEXT,
      application_deadline DATE,
      exam_date DATE,
      link_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

exports.getStudyMaterials = async (req, res) => {
  try {
    await ensureContentTables();
    const [rows] = await db.query(
      'SELECT id, title, subject_name, description, material_url, updated_by, created_at FROM study_materials ORDER BY id DESC'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching study materials:', error);
    res.status(500).json({ message: 'Failed to fetch study materials' });
  }
};

exports.createStudyMaterial = async (req, res) => {
  try {
    await ensureContentTables();
    const { title, subject_name, description, material_url, updated_by } = req.body;
    if (!title || !subject_name) {
      return res.status(400).json({ message: 'Title and subject are required' });
    }

    await db.query(
      'INSERT INTO study_materials (title, subject_name, description, material_url, updated_by) VALUES (?, ?, ?, ?, ?)',
      [title, subject_name, description || '', material_url || '', updated_by || 'admin']
    );
    res.status(201).json({ message: 'Study material added successfully' });
  } catch (error) {
    console.error('Error creating study material:', error);
    res.status(500).json({ message: 'Failed to add study material' });
  }
};

exports.updateStudyMaterial = async (req, res) => {
  try {
    await ensureContentTables();
    const { id } = req.params;
    const { title, subject_name, description, material_url, updated_by } = req.body;
    if (!title || !subject_name) {
      return res.status(400).json({ message: 'Title and subject are required' });
    }

    const [result] = await db.query(
      'UPDATE study_materials SET title = ?, subject_name = ?, description = ?, material_url = ?, updated_by = ? WHERE id = ?',
      [title, subject_name, description || '', material_url || '', updated_by || 'admin', id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Study material not found' });
    }

    res.status(200).json({ message: 'Study material updated successfully' });
  } catch (error) {
    console.error('Error updating study material:', error);
    res.status(500).json({ message: 'Failed to update study material' });
  }
};

exports.deleteStudyMaterial = async (req, res) => {
  try {
    await ensureContentTables();
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM study_materials WHERE id = ?', [id]);
    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Study material not found' });
    }
    res.status(200).json({ message: 'Study material deleted successfully' });
  } catch (error) {
    console.error('Error deleting study material:', error);
    res.status(500).json({ message: 'Failed to delete study material' });
  }
};

exports.getUniversityEntrances = async (req, res) => {
  try {
    await ensureContentTables();
    const [rows] = await db.query(
      'SELECT id, title, year, description, application_deadline, exam_date, link_url, created_at FROM university_entrances ORDER BY year DESC, id DESC'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching university entrances:', error);
    res.status(500).json({ message: 'Failed to fetch university entrance details' });
  }
};

exports.createUniversityEntrance = async (req, res) => {
  try {
    await ensureContentTables();
    const { title, year, description, application_deadline, exam_date, link_url } = req.body;
    if (!title || !year) {
      return res.status(400).json({ message: 'Title and year are required' });
    }

    await db.query(
      'INSERT INTO university_entrances (title, year, description, application_deadline, exam_date, link_url) VALUES (?, ?, ?, ?, ?, ?)',
      [title, Number(year), description || '', application_deadline || null, exam_date || null, link_url || '']
    );
    res.status(201).json({ message: 'University entrance detail added successfully' });
  } catch (error) {
    console.error('Error creating university entrance detail:', error);
    res.status(500).json({ message: 'Failed to add university entrance detail' });
  }
};

exports.updateUniversityEntrance = async (req, res) => {
  try {
    await ensureContentTables();
    const { id } = req.params;
    const { title, year, description, application_deadline, exam_date, link_url } = req.body;
    if (!title || !year) {
      return res.status(400).json({ message: 'Title and year are required' });
    }

    const [result] = await db.query(
      'UPDATE university_entrances SET title = ?, year = ?, description = ?, application_deadline = ?, exam_date = ?, link_url = ? WHERE id = ?',
      [title, Number(year), description || '', application_deadline || null, exam_date || null, link_url || '', id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ message: 'University entrance detail not found' });
    }

    res.status(200).json({ message: 'University entrance detail updated successfully' });
  } catch (error) {
    console.error('Error updating university entrance detail:', error);
    res.status(500).json({ message: 'Failed to update university entrance detail' });
  }
};

exports.deleteUniversityEntrance = async (req, res) => {
  try {
    await ensureContentTables();
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM university_entrances WHERE id = ?', [id]);
    if (!result.affectedRows) {
      return res.status(404).json({ message: 'University entrance detail not found' });
    }
    res.status(200).json({ message: 'University entrance detail deleted successfully' });
  } catch (error) {
    console.error('Error deleting university entrance detail:', error);
    res.status(500).json({ message: 'Failed to delete university entrance detail' });
  }
};
