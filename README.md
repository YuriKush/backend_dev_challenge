**Backend Dev Challenge**
===================================
The challenge shows how to design a project which consists of self-contained business components. 
This architecture allows to avoid any dependency hell situations and easily reorganize monolith project into microservices.

This project is a tool that loads data from a CSV file, schedules some email communications, and then allows to execute 
automated tests to ensure that everything is correct.


Quick Start
---------------
**Clone this project and install dependencies**

```shell
$ npm install
```

**Setup configuration**

You can edit existing configuration file config/default.json or create your own according to [config instructions](https://www.npmjs.com/package/config)
(For example local.json)

```js
{
  "mongoDb": {
      //Connection string to your database instance
      "connectionString": ""
    },
    "dataFile": {
      //Path to your patients CSV file
      "filePath": "data/patients.csv"
    },
    "emails": [
      //Set of email templates
      {
        "name": "Day 1",
        "daysDelay": 1
      },
      {
        "name": "Day 2",
        "daysDelay": 2
      },
      {
        "name": "Day 3",
        "daysDelay": 3
      },
      {
        "name": "Day 4",
        "daysDelay": 4
      }
    ]
}
```

**Run**

To import patients from a CSV file use the following command 
(patients with the same member ID will be updated):
```shell
$ npm import_patients
```

To schedule emails for patients who have CONSENT = 'Y' use the following command:
```shell
$ npm schedule_emails
```

To run tests use the following command:
```shell
$ npm test
```

Enjoy ;)
