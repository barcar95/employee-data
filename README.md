# employee-data
​
## Description

The employee database presents a prompt to access company network information, whether it be departments, roles, and employee information. 
​
## Table of Contents 
​
* [Installation](#installation)
​
* [Usage](#usage)
​
* [License](#license)
​
​
​
## Installation
​
To install necessary dependencies, run the following command:
​
```
npm i
```

Then, 

```
mysql -u root -p
```

"Tlajomulco" for password,

```
SOURCE db/schema.sql;
```
then,
```
SOURCE db/seeds.sql;
```
after that type "exit",

​
## Usage
​To use this employee data tracker, the dependencies must first be installed (refer to section above). Once this is done, the user will run the following command " node index.js ". The user will be prompted with a list of options on what they want to view/add/ or edit. The user can view all departments, roles, and employees in a table. The user can also add any one of the previous options, as well as update an employee's info.

​[walk through video link](https://drive.google.com/file/d/1Vmk3Ju5eAEyPCErJ6XDvDPzm389YoaIm/view)

## License
​
This project is licensed under the MIT license.
  

​