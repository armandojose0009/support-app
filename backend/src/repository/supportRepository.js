const Support = require('./../models/Support');

const getAllSupports = async (page, sizePerPage, sortField, sortOrder, searchText) => {
  const sortOptions = {};
  sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;

  let query = {};
  if (searchText) {
    query = {
      $or: [
        { 'clientId.firstName': { $regex: searchText, $options: 'i' } },
        { 'clientId.lastName': { $regex: searchText, $options: 'i' } },
        { 'workerId.firstName': { $regex: searchText, $options: 'i' } },
        { 'workerId.lastName': { $regex: searchText, $options: 'i' } },
        { description: { $regex: searchText, $options: 'i' } }
      ]
    };
  }
  
  const supports = await Support.find(query)
    .populate('client')
    .populate('employee')
    .sort(sortOptions)
    .skip((page - 1) * sizePerPage)
    .limit(sizePerPage);

  const total = await Support.countDocuments(query);

  return {
    supports,
    total,
    page,
    totalPages: Math.ceil(total / sizePerPage),
    sizePerPage
  };
};

const getSupportById = async (id) => {
  return await Support.findById(id).populate('client').populate('employee');
};

const createSupport = async (supportData) => {
  const newSupport = new Support(supportData);
  return await newSupport.save();
};

const updateSupport = async (id, supportData) => {
  return await Support.findByIdAndUpdate(id, supportData, { new: true }).populate('client').populate('employee');
};

const deleteSupport = async (id) => {
  return await Support.findByIdAndDelete(id);
};

module.exports = {
  getAllSupports,
  getSupportById,
  createSupport,
  updateSupport,
  deleteSupport
};
