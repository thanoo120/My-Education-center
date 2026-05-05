import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialMaterial = { title: '', subject_name: '', description: '', material_url: '' };
const initialEntrance = { title: '', year: new Date().getFullYear(), description: '', application_deadline: '', exam_date: '', link_url: '' };

const ContentManager = () => {
  const [materials, setMaterials] = useState([]);
  const [entrances, setEntrances] = useState([]);
  const [materialForm, setMaterialForm] = useState(initialMaterial);
  const [entranceForm, setEntranceForm] = useState(initialEntrance);
  const [editingMaterialId, setEditingMaterialId] = useState(null);
  const [editingEntranceId, setEditingEntranceId] = useState(null);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    try {
      const [matRes, entRes] = await Promise.all([
        axios.get('http://localhost:5000/api/content/study-materials'),
        axios.get('http://localhost:5000/api/content/entrance-details')
      ]);
      setMaterials(matRes.data);
      setEntrances(entRes.data);
    } catch (error) {
      setMessage('Failed to load content data.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitMaterial = async (event) => {
    event.preventDefault();
    try {
      if (editingMaterialId) {
        await axios.put(`http://localhost:5000/api/content/study-materials/${editingMaterialId}`, materialForm);
        setMessage('Study material updated.');
      } else {
        await axios.post('http://localhost:5000/api/content/study-materials', materialForm);
        setMessage('Study material added.');
      }
      setMaterialForm(initialMaterial);
      setEditingMaterialId(null);
      loadData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to save study material.');
    }
  };

  const submitEntrance = async (event) => {
    event.preventDefault();
    try {
      if (editingEntranceId) {
        await axios.put(`http://localhost:5000/api/content/entrance-details/${editingEntranceId}`, entranceForm);
        setMessage('University entrance detail updated.');
      } else {
        await axios.post('http://localhost:5000/api/content/entrance-details', entranceForm);
        setMessage('University entrance detail added.');
      }
      setEntranceForm(initialEntrance);
      setEditingEntranceId(null);
      loadData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to save university entrance detail.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="text-primary mb-3">Study Materials & Entrance Details</h4>
      {message && <div className="alert alert-info py-2">{message}</div>}

      <div className="row g-4">
        <div className="col-lg-6">
          <h5>{editingMaterialId ? 'Edit Study Material' : 'Add Study Material'}</h5>
          <form onSubmit={submitMaterial} className="row g-2">
            <div className="col-12">
              <input className="form-control" placeholder="Title" value={materialForm.title} onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })} required />
            </div>
            <div className="col-12">
              <input className="form-control" placeholder="Subject" value={materialForm.subject_name} onChange={(e) => setMaterialForm({ ...materialForm, subject_name: e.target.value })} required />
            </div>
            <div className="col-12">
              <textarea className="form-control" placeholder="Description" value={materialForm.description} onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })} />
            </div>
            <div className="col-12">
              <input className="form-control" placeholder="Material URL (optional)" value={materialForm.material_url} onChange={(e) => setMaterialForm({ ...materialForm, material_url: e.target.value })} />
            </div>
            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary" type="submit">{editingMaterialId ? 'Update' : 'Add'}</button>
              {editingMaterialId && <button type="button" className="btn btn-secondary" onClick={() => { setEditingMaterialId(null); setMaterialForm(initialMaterial); }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="col-lg-6">
          <h5>{editingEntranceId ? 'Edit Entrance Detail' : 'Add Entrance Detail'}</h5>
          <form onSubmit={submitEntrance} className="row g-2">
            <div className="col-12">
              <input className="form-control" placeholder="Title" value={entranceForm.title} onChange={(e) => setEntranceForm({ ...entranceForm, title: e.target.value })} required />
            </div>
            <div className="col-12">
              <input className="form-control" type="number" placeholder="Year" value={entranceForm.year} onChange={(e) => setEntranceForm({ ...entranceForm, year: e.target.value })} required />
            </div>
            <div className="col-6">
              <input className="form-control" type="date" value={entranceForm.application_deadline} onChange={(e) => setEntranceForm({ ...entranceForm, application_deadline: e.target.value })} />
            </div>
            <div className="col-6">
              <input className="form-control" type="date" value={entranceForm.exam_date} onChange={(e) => setEntranceForm({ ...entranceForm, exam_date: e.target.value })} />
            </div>
            <div className="col-12">
              <textarea className="form-control" placeholder="Description" value={entranceForm.description} onChange={(e) => setEntranceForm({ ...entranceForm, description: e.target.value })} />
            </div>
            <div className="col-12">
              <input className="form-control" placeholder="Reference URL (optional)" value={entranceForm.link_url} onChange={(e) => setEntranceForm({ ...entranceForm, link_url: e.target.value })} />
            </div>
            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary" type="submit">{editingEntranceId ? 'Update' : 'Add'}</button>
              {editingEntranceId && <button type="button" className="btn btn-secondary" onClick={() => { setEditingEntranceId(null); setEntranceForm(initialEntrance); }}>Cancel</button>}
            </div>
          </form>
        </div>
      </div>

      <hr className="my-4" />

      <div className="row g-4">
        <div className="col-lg-6">
          <h6>Study Materials</h6>
          <ul className="list-group">
            {materials.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-start">
                <div>
                  <strong>{item.title}</strong> ({item.subject_name})
                  <div className="small text-muted">{item.description}</div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-warning" onClick={() => { setEditingMaterialId(item.id); setMaterialForm({ title: item.title, subject_name: item.subject_name, description: item.description || '', material_url: item.material_url || '' }); }}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={async () => { await axios.delete(`http://localhost:5000/api/content/study-materials/${item.id}`); loadData(); }}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-lg-6">
          <h6>University Entrance Details</h6>
          <ul className="list-group">
            {entrances.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-start">
                <div>
                  <strong>{item.title}</strong> ({item.year})
                  <div className="small text-muted">{item.description}</div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-warning" onClick={() => { setEditingEntranceId(item.id); setEntranceForm({ title: item.title, year: item.year, description: item.description || '', application_deadline: item.application_deadline ? item.application_deadline.slice(0, 10) : '', exam_date: item.exam_date ? item.exam_date.slice(0, 10) : '', link_url: item.link_url || '' }); }}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={async () => { await axios.delete(`http://localhost:5000/api/content/entrance-details/${item.id}`); loadData(); }}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContentManager;
