const express = require('express');
const router = express.Router();
const clientController = require('./controllers/clientController');
const supportController = require('./controllers/supportController');
const employeeController = require('./controllers/employeeController');
const logController = require('./controllers/logsController');
const validateClient = require('./middlewares/clientValidation');
const validateEmployee = require('./middlewares/employeeValidation');

router.post('/update-status', logController.saveLog);
router.get('/logs', logController.logs);

router.get('/clients', clientController.getAllClients);
router.get('/clients/:id', clientController.getClientById);
router.post('/clients', validateClient, clientController.createClient);
router.put('/clients/:id', validateClient, clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);

router.get('/supports', supportController.getAllSupports);
router.get('/supports/:id', supportController.getSupportById);
router.post('/supports', supportController.createSupport);
router.put('/supports/:id', supportController.updateSupport);
router.delete('/supports/:id', supportController.deleteSupport);

router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.post('/employees', validateEmployee, employeeController.createEmployee);
router.put('/employees/:id', validateEmployee, employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router;
