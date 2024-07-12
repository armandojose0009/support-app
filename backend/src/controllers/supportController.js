const supportRepository = require('./../repository/supportRepository');
const clientRepository = require('./../repository/clientRepository');
const googleHelper = require('./../helpers/googleHelper');
const _ = require('lodash');

const getAllSupports = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const sizePerPage = parseInt(req.query.sizePerPage) || 10;
    const sortField = req.query.sortField || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';
    const searchText = req.query.searchText || '';
  
    try {
      const result = await supportRepository.getAllSupports(page, sizePerPage, sortField, sortOrder, searchText);
      return res.json(result);
    } catch (error) {
      console.error('Error fetching supports:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getSupportById = async (req, res) => {
  const { id } = req.params;
  try {
    const support = await supportRepository.getSupportById(id);
    if (!support) {
      return res.status(404).json({ error: 'Support entry not found' });
    }
    res.json(support);
  } catch (error) {
    console.error('Error fetching support entry:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createSupport = async (req, res) => {
  const supportData = req.body;
  supportData.client = supportData.clientId;
  supportData.clientDescription = supportData.description;
  try {
    const newSupport = await supportRepository.createSupport(supportData);
    const clientData = await clientRepository.getClientById(newSupport.client);

    const sheet = await googleHelper.getOrCreateSheet();
    const timestamp = new Date().toISOString();
    const data = {    
      title: newSupport.title, 
      code: newSupport.supportCode, 
      client_firstName: clientData.firstName,
      client_lastName: clientData.lastName,
      employee_firstName:'',
      employee_lastName:'',
      support_status: newSupport.isActive, 
      support_completed: newSupport.isCompleted, 
      date: newSupport.DateTime, 
      clientDescription: newSupport.clientDescription, 
      createdAt: timestamp
    };
    await googleHelper.addNewRow({sheet, data});

    res.status(201).json(newSupport);
  } catch (error) {
    console.error('Error creating support entry:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateSupport = async (req, res) => {
  const { id } = req.params;
  const supportData = req.body;
  try {
    const updatedSupport = await supportRepository.updateSupport(id, supportData);
    if (!updatedSupport) {
      return res.status(404).json({ error: 'Support entry not found' });
    }
    const sheet = await googleHelper.getOrCreateSheet();
    const rows = await sheet.getRows();
    const rowToUpdate = rows.find(row => row._rawData[0] === supportData.supportCode);

    if (rowToUpdate) {
      rowToUpdate._rawData[0] = updatedSupport.supportCode;
      rowToUpdate._rawData[1] = updatedSupport.title;
      rowToUpdate._rawData[2] = updatedSupport.client.firstName;
      rowToUpdate._rawData[3] = updatedSupport.client.lastName;
      rowToUpdate._rawData[4] = updatedSupport.employee.firstName;
      rowToUpdate._rawData[5] = updatedSupport.employee.lastName;
      rowToUpdate._rawData[6] = updatedSupport.isActive;
      rowToUpdate._rawData[7] = updatedSupport.isCompleted;
      rowToUpdate._rawData[8] = updatedSupport.DateTime;
      rowToUpdate._rawData[9] = updatedSupport.clientDescription;
      rowToUpdate._rawData[10] = updatedSupport.employeeDescription;
      await rowToUpdate.save();
    }
    return res.json(updatedSupport);
  } catch (error) {
    console.error('Error updating support entry:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteSupport = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSupport = await supportRepository.deleteSupport(id);
    if (!deletedSupport) {
      return res.status(404).json({ error: 'Support entry not found' });
    }
    res.json({ message: 'Support entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting support entry:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllSupports,
  getSupportById,
  createSupport,
  updateSupport,
  deleteSupport
};
