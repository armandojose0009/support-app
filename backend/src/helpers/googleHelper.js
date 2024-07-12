const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const credentials = require('../../credentials.json');
const _ = require('lodash');

const spreadsheetId = '1H6-XexWzTJeEiYEKIv9oKPNNqTk15oHgO4_Wt-oN-IE'

const authorize = async () => {
  const serviceAccountAuth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
  });
  const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);
  return doc;
}

const addNewRow = async ({ sheet,data }) => {
  const sheetLogs = await getOrCreateSheet();
  await sheetLogs.addRow(data, {insert: true})
}

const getOrCreateSheet = async () => {
  try {
    const doc = await authorize();
    await doc.loadInfo();

    const today = new Date().toISOString().split('T')[0];
    const tabName = `Logs-${today}`;
    let sheet = doc.sheetsByTitle[tabName];

    if (!sheet) {
      sheet = await doc.addSheet({ title: tabName });
      await sheet.setHeaderRow([
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
      ]);
    }

    return sheet;
  } catch (error) {
    console.error('Error getting or creating sheet:', error);
    throw error;
  }
};

const getData = async (sheet) => {
  let rows = await sheet.getRows();
  let rawData = rows.map(row => row._rawData);

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
  rows = _.flatMap(rows, 'GoogleSpreadsheetRow');
  rows = _.flatMap(rows, '_rawData');

  return rawData.map(row => {
    return _.zipObject(fields, row.map(cell => _.toString(cell || '')));
  });
}

module.exports = { authorize, addNewRow, getOrCreateSheet, getData }