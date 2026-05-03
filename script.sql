CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        deleted_at TIMESTAMPTZ
    );

CREATE TABLE
    clients (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
        phone VARCHAR(20),
        document VARCHAR(20) NOT NULL UNIQUE,
        address VARCHAR(255),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        deleted_at TIMESTAMPTZ
    );

CREATE TABLE
    products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        description TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        deleted_at TIMESTAMPTZ
    );

CREATE TABLE
    warehouses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        address VARCHAR(255) NOT NULL,
        country VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        capacity INT CHECK (capacity > 0),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        deleted_at TIMESTAMPTZ
    );

CREATE TABLE
    ports (
        id SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        country VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        type VARCHAR(20) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        deleted_at TIMESTAMPTZ
    );

CREATE TABLE
    land_shipments (
        id SERIAL PRIMARY KEY,
        client_id INT NOT NULL REFERENCES clients (id),
        client_name VARCHAR(150) NOT NULL,
        client_document VARCHAR(20) NOT NULL,
        product_id INT NOT NULL REFERENCES products (id),
        product_name VARCHAR(150) NOT NULL,
        destination_warehouse_id INT NOT NULL REFERENCES warehouses (id),
        destination_warehouse_name VARCHAR(150) NOT NULL,
        product_quantity INT NOT NULL,
        shipping_price NUMERIC(12, 2) NOT NULL,
        discount_percentage NUMERIC(5, 2) NOT NULL,
        discount_amount NUMERIC(12, 2) NOT NULL,
        final_price NUMERIC(12, 2) NOT NULL,
        vehicle_plate VARCHAR(6) NOT NULL,
        tracking_number VARCHAR(10) NOT NULL UNIQUE,
        registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
        delivery_date DATE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        deleted_at TIMESTAMPTZ
    );

CREATE TABLE
    sea_shipments (
        id SERIAL PRIMARY KEY,
        client_id INT NOT NULL REFERENCES clients (id),
        client_name VARCHAR(150) NOT NULL,
        client_document VARCHAR(20) NOT NULL,
        product_id INT NOT NULL REFERENCES products (id),
        product_name VARCHAR(150) NOT NULL,
        destination_port_id INT NOT NULL REFERENCES ports (id),
        destination_port_name VARCHAR(150) NOT NULL,
        product_quantity INT NOT NULL,
        shipping_price NUMERIC(12, 2) NOT NULL,
        discount_percentage NUMERIC(5, 2) NOT NULL,
        discount_amount NUMERIC(12, 2) NOT NULL,
        final_price NUMERIC(12, 2) NOT NULL,
        fleet_number VARCHAR(8) NOT NULL,
        tracking_number VARCHAR(10) NOT NULL UNIQUE,
        registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
        delivery_date DATE NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW (),
        deleted_at TIMESTAMPTZ
    );
