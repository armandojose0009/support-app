const googleHelper = require('./../helpers/googleHelper');
const Joi = require('joi');
const _ = require('lodash');

const updateStatusSchema = Joi.object({
  leadId: Joi.string().required(),
  newStatus: Joi.string().valid('Contactado', 'Esperando respuesta', 'En llamada', 'Win', 'Lose').required(),
});

const saveLog = async (req, res) => {
  
  const { error, value } = updateStatusSchema.validate(req.body);
  
  if (error) {
    return res.status(400).send(error.details);
  }

  const { 
    title, 
    newStatus, 
    code, 
    client_firstName,
    client_lastName,
    employee_lastName,
    support_status,
    support_completed,
    date
  } = value;
  const sheet = await googleHelper.getOrCreateSheet();
  const timestamp = new Date().toISOString();
  const data = {    
    title, 
    newStatus, 
    code, 
    client_firstName,
    client_lastName,
    employee_lastName,
    support_status,
    support_completed,
    date, 
    createdAt: timestamp
  };
  await googleHelper.addNewRow({sheet, data});

  return res.status(200).send();
};

const logs = async (req, res) => {
  try {
    const {
      page = 1,
      sizePerPage = 10,
      sortField = 'createdAt',
      sortOrder = 'desc',
      searchText = ''
    } = req.query;

    const sheet = await googleHelper.getOrCreateSheet();
    await sheet.loadCells();

    let logs = await googleHelper.getData(sheet);
    
    const fields = [
      'code',
      'title',
      'client_firstName',
      'client_lastName',
      'employee_firstName',
      'employee_lastName',
      'support_status',
      'support_completed',
      'date',
      'clientDescription',
      'employeeDescription',
      'createdAt'
    ];

    if (searchText) {
      logs = _.filter(logs, log => 
        _.some(log, value => 
          _.includes(_.toLower(value), _.toLower(searchText))
        )
      );
    }
   
    const validSortFields = [...fields];
    const safeSortField = validSortFields.includes(sortField) ? sortField : 'createdAt';
    const safeSortOrder = ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'desc';
    
    logs = _.orderBy(logs, [safeSortField], [safeSortOrder]);

    const totalSize = logs.length;
    const totalPages = Math.ceil(totalSize / sizePerPage);
    const paginatedLogs = _.slice(logs, (page - 1) * sizePerPage, page * sizePerPage);

    return res.status(200).json({
      logs: paginatedLogs,
      page: _.toNumber(page),
      sizePerPage: _.toNumber(sizePerPage),
      totalSize,
      totalPages
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    return res.status(500).json({ error: 'An error occurred while fetching logs' });
  }
};

module.exports = { saveLog, logs }