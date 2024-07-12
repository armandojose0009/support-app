const Employee = require('./../models/Employee');

const getAllEmployees = async (page, sizePerPage, sortField, sortOrder, searchText) => {
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(sizePerPage) || 10;
  const skip = (pageNumber - 1) * pageSize;

  let sortCriteria = {};
  sortCriteria[sortField || 'lastName'] = sortOrder === 'desc' ? -1 : 1;

  let filterCriteria = {};
  if (searchText) {
    filterCriteria = {
      $or: [
        { firstName: { $regex: searchText, $options: 'i' } },
        { lastName: { $regex: searchText, $options: 'i' } },
        { email: { $regex: searchText, $options: 'i' } },
        { phoneNumber: { $regex: searchText, $options: 'i' } }
      ]
    };
  }
  
  const totalCount = await Employee.countDocuments(filterCriteria);
  const employees = await Employee.find(filterCriteria)
    .sort(sortCriteria)
    .skip(skip)
    .limit(pageSize);

  return {
    employees: employees,
    page: pageNumber,
    totalSize: totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    sizePerPage: pageSize
  };
};

const getEmployeeById = async (id) => {
  return await Employee.findById(id);
};

const createEmployee = async (employeeData) => {
  const newEmployee = new Employee(employeeData);
  return await newEmployee.save();
};

const updateEmployee = async (id, employeeData) => {
  return await Employee.findByIdAndUpdate(id, employeeData, { new: true });
};

const deleteEmployee = async (id) => {
  return await Employee.findByIdAndDelete(id);
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
