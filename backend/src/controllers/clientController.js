const clientRepository = require('./../repository/clientRepository');

const getAllClients = async (req, res) => {
    const { 
      page = 1, 
      sizePerPage = 10, 
      sortField = 'firstName', 
      sortOrder = 'asc',
      searchText = ''
    } = req.query;
  
    try {
      const result = await clientRepository.getAllClients(
        parseInt(page), 
        parseInt(sizePerPage), 
        sortField, 
        sortOrder,
        searchText
      );
  
      return res.json({
        clients: result.clients,
        page: result.page,
        totalSize: result.total,
        totalPages: result.totalPages,
        sizePerPage: result.sizePerPage
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await clientRepository.getClientById(id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    console.error('Error fetching client:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createClient = async (req, res) => {
  const clientData = req.body;
  try {
    const newClient = await clientRepository.createClient(clientData);
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error creating client:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  const clientData = req.body;
  try {
    const updatedClient = await clientRepository.updateClient(id, clientData);
    if (!updatedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(updatedClient);
  } catch (error) {
    console.error('Error updating client:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClient = await clientRepository.deleteClient(id);
    if (!deletedClient) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
