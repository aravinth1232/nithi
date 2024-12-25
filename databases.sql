CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeId VARCHAR(255),
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    designation VARCHAR(255),
    qualification VARCHAR(255),
    role VARCHAR(255),
    phone VARCHAR(255),
    address TEXT,
    photo VARCHAR(255), -- File path for photo
    aadhar VARCHAR(255), -- File path for aadhar
    pan VARCHAR(255),    -- File path for pan
    bank_passbook VARCHAR(255) -- File path for bank passbook
);

CREATE TABLE pending_employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeId VARCHAR(255),
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    designation VARCHAR(255),
    qualification VARCHAR(255),
    role VARCHAR(255),
    phone VARCHAR(255),
    address TEXT,
    photo VARCHAR(255), -- File path for photo
    aadhar VARCHAR(255), -- File path for aadhar
    pan VARCHAR(255),    -- File path for pan
    bank_passbook VARCHAR(255) -- File path for bank passbook
);

