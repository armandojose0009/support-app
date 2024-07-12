const Client = require('./../models/Client');

const getAllClients = async (page, sizePerPage, sortField, sortOrder, searchText) => {
  const sortOptions = {};
  sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
  let query = {};
  if (searchText) {
    query = {
      $or: [
        { firstName: { $regex: searchText, $options: 'i' } },
        { lastName: { $regex: searchText, $options: 'i' } },
        { address: { $regex: searchText, $options: 'i' } },
        { cellPhone: { $regex: searchText, $options: 'i' } }
      ]
    };
  }

  const clients = await Client.find(query)
    .sort(sortOptions)
    .skip((page - 1) * sizePerPage)
    .limit(sizePerPage);

  const total = await Client.countDocuments(query);

  return { 
    clients, 
    total,
    page,
    totalPages: Math.ceil(total / sizePerPage),
    sizePerPage
  };
};

const getClientById = async (id) => {
  return await Client.findById(id);
};

const createClient = async (clientData) => {
  const newClient = new Client(clientData);
  return await newClient.save();
};

const updateClient = async (id, clientData) => {
  return await Client.findByIdAndUpdate(id, clientData, { new: true });
};

const deleteClient = async (id) => {
  return await Client.findByIdAndDelete(id);
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
