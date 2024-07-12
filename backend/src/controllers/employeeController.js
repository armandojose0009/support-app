const employeeRepository = require('./../repository/employeeRepository');

const getAllEmployees = async (req, res) => {
  try {
    const { 
      page = 1, 
      sizePerPage = 10, 
      sortField = 'lastName', 
      sortOrder = 'asc',
      searchText = ''
    } = req.query;

    const result = await employeeRepository.getAllEmployees(
      page,
      sizePerPage,
      sortField,
      sortOrder,
      searchText
    );

    res.json(result);
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await employeeRepository.getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createEmployee = async (req, res) => {
  const employeeData = req.body;
  try {
    const newEmployee = await employeeRepository.createEmployee(employeeData);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const employeeData = req.body;
  try {
    const updatedEmployee = await employeeRepository.updateEmployee(id, employeeData);
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await employeeRepository.deleteEmployee(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
