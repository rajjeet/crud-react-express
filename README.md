## Notes

### General
* Full CRUD is implemented for employee model
* Most of the field for the employee model are option-based (selected from a pick list)
* Limitations:
    * no integration testing 
    * no linting (Used IDE formatting)
    * ideally should be containerized for ease of portability

### Frontend
* see ```src``` folder under the project root
* components are styled using ```styled-components```
    * css is self-contained in each component
* The employee list and form is broken into container and view
    * container holds state and core logic
    * view has presentation elements and logic 
* used basic HTML form validation
* Limitation: transaction success/failure is not implemented  

### Backend 
* see ```server``` folder under the project root
* ```controller``` holds request/response processing logic
* ```dal```  holds data access code to MySQL DB
* ```route``` holds express routes 
* setting up the db:
    * run the ```server/setup.sql``` on your local MySQL to setup DB 
    * modify ```server/dbconfig.js``` to value specific to your machine  
* using ```morgan``` middleware for logging api requests

