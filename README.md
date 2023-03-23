# API Documentation

| Method       | Path           | Description   |
| :---         | :---           |  :---         |
| POST         | /users/login   | Logs in a user if username and password match database    |
| POST         | /users/register | Registers user if user dosn't already exist      |
| PUT          | /transaction/editBalance | Adds a new transaction to the total balance of a user      |
| PUT          | /admin/editUserUpdates | Changes the amount of free API requests a user has to update the current price of BTC      |
| DELETE          | /admin/deleteUser | Deletes a user      |

POST request to /users is sent with a body object cointaining username and password {username:, password:}.
PUT request sent to /transaction contains username and the transaction amount {username:, balance:}.
PUT request to /admin/editUserUpdates contains the new amount of calls a user has and the username {username:, updates:}.
DELETE request to /admin cointains a object in the body with the username of the deleted user {username:}
