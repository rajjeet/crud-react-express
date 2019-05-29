const employees = [
    {
        "id": 1,
        "name": "Rajjeet!",
        "code": "F101",
        "profession": 'Carpenter',
        "city": "Toronto",
        "branch": "Abacus",
        "assigned": 1
    },
    {
        "id": 2,
        "name": "Jasmine!",
        "code": "F102",
        "profession": "Developer",
        "city": "Brampton",
        "branch": "Abacus",
        "assigned": 1
    }
];

const employee1 = {
    "id": 1,
    "name": "Rajjeet!",
    "code": 1,
    "profession": 1,
    "city": 1,
    "branch": 1,
    "assigned": true
};

const codes = [
    {
        "id": 1,
        "name": "F100"
    },
    {
        "id": 2,
        "name": "F101"
    },
    {
        "id": 3,
        "name": "F102"
    },
    {
        "id": 4,
        "name": "F103"
    },
    {
        "id": 5,
        "name": "F104"
    }
];
const professions = [
    {
        "id": 1,
        "name": "Carpenter"
    },
    {
        "id": 2,
        "name": "Plumber"
    },
    {
        "id": 3,
        "name": "Engineer"
    },
    {
        "id": 4,
        "name": "Architect"
    },
    {
        "id": 5,
        "name": "Developer"
    }
];
const cities = [
    {
        "id": 1,
        "name": "Toronto"
    },
    {
        "id": 2,
        "name": "Mississauga"
    },
    {
        "id": 3,
        "name": "Brampton"
    },
    {
        "id": 4,
        "name": "Oakville"
    },
    {
        "id": 5,
        "name": "Vaughan"
    }
];
const branches = [
    {
        "id": 1,
        "name": "Abacus"
    },
    {
        "id": 2,
        "name": "Pillsworth"
    }
];

export default {
    get: jest.fn((url) => {
        switch (url) {
            case 'http://localhost:8080/api/employees':
                return Promise.resolve({data: employees});
            case 'http://localhost:8080/api/employees/1':
                return Promise.resolve({data: employee1});
            case 'http://localhost:8080/api/options/codes':
                return Promise.resolve({data: codes});
            case 'http://localhost:8080/api/options/professions':
                return Promise.resolve({data: professions});
            case 'http://localhost:8080/api/options/cities':
                return Promise.resolve({data: cities});
            case 'http://localhost:8080/api/options/branches':
                return Promise.resolve({data: branches});
            default:
                return null;
        }
    }),
    create: jest.fn(function () {
        return this;
    }),
    default: jest.fn(function () {
        return this;
    })
};
