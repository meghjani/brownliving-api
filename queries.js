const db = require('./db');
const helper = require('./helper');
const config = require('./config');

async function getUserIncidents(email){
    let query = "SELECT * FROM incidents;";
    // TODO: This query to be role based
    if (email != "mj1737+admin@gmail.com") query = `SELECT * FROM incidents WHERE user = "${email}";`;
    const rows = await db.query(query);
    const data = helper.emptyOrRows(rows);
  
    return { data }
}

async function createUserIncident(data){
    let query = 'INSERT INTO incidents (`title`, `description`, `priority`, `status`, `created_at`, `user`) VALUES';
    query += ` ('${data.title}', '${data.description}', '${data.priority}', '${data.status}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}', "${data.email}");`;
    console.log(query)
    await db.query(query);
    return { data: data, message: "Record Inserted"}
}

async function updateUserIncident(id, data) {
    let query = `UPDATE incidents SET `;
    query += `title = '${data.title}',
    description = '${data.description}',
    priority = '${data.priority}',
    status = '${data.status}'
    ${data.status == "Resolved" ? `, resolved_date = '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`: ""}`;
    query += ` WHERE id = ${id};`;
    
    await db.query(query);
    return { data: data, message: "Record Updated"}
}

async function deleteUserIncident(id) {
    let query = `DELETE FROM incidents WHERE id = ${id};`;
    
    await db.query(query);
    return { message: "Record Delete"}
}

module.exports = {
    getUserIncidents,
    createUserIncident,
    updateUserIncident,
    deleteUserIncident
}