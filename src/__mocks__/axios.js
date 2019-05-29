export default {
    get: jest.fn(() => Promise.resolve({
        data:
            [
                {
                    "id": 1,
                    "name": "Rajjeet!",
                    "code": "F101",
                    "profession": null,
                    "city": "Mississauga",
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
            ]
    }))
};