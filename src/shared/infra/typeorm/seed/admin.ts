import { genSalt, hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidv4();
  const salt = await genSalt(8);
  const password = await hash('admin', salt);

  await connection.query(
    `INSERT INTO users (id, name, password, email, driver_license, "isAdmin", created_at) 
    VALUES ($1, 'admin', $2, 'admin@admin.com.br', 'abcde', true, 'now()')`,
    [id, password]
  );

  await connection.close();
}

create().then(() => console.log('User admin created'));
