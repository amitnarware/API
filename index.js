
const {connection} = require('./dbconfig');
const express = require('express');
const app = express();

app.use(express.json());

// API route to sync contacts
app.post('/sync-contacts', (req, res) => {
  const { userId, Contacts } = req.body;
  const values = Contacts.map(contact => [userId, contact.name, encrypt(contact.number)]);
  connection.query('INSERT IGNORE INTO contacts (user_id, name, number) VALUES ?', [values], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'An error occurred while saving contacts' });
    } else {
      res.json({ success: true, message: 'Data saved successfully' });
    }
  });
});

   //api for get common numbers
app.get('/find-common-user', (req, res) => {
  const { searchNumber } = req.query;
  const query = `
    SELECT c.name, GROUP_CONCAT(c.user_id) AS commonUsers
    FROM contacts c
    WHERE c.number = ?
    GROUP BY c.name
  `;
  connection.query(query, [searchNumber], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'An error occurred while searching for common users' });
    } else {
      if (results.length === 0) {
        res.json({ success: true, message: 'No common users found for the given number' });
      } else {
        const { name, commonUsers } = results[0];
        res.json({ success: true, name, commonUsers: commonUsers.split(',') });
      }
    }
  });
});






/*function encrypt(number) {
  return number;
} */

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 