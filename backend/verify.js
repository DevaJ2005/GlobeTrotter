const http = require('http');

const post = (path, data, token) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(data)),
            }
        };
        if (token) options.headers['Authorization'] = `Bearer ${token}`;

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(body) }));
        });
        req.on('error', reject);
        req.write(JSON.stringify(data));
        req.end();
    });
};

const get = (path, token) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: 'GET',
            headers: {}
        };
        if (token) options.headers['Authorization'] = `Bearer ${token}`;

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(body) }));
        });
        req.on('error', reject);
        req.end();
    });
};

async function run() {
    console.log('--- Starting Verification ---');

    // 1. Register
    const user = { name: "Test User", email: `test${Date.now()}@user.com`, password: "password123", phone: "123" };
    console.log('Registering user:', user.email);
    const regRes = await post('/auth/register', user);
    console.log('Register:', regRes.status, regRes.body);

    if (regRes.status !== 201) return;

    // 2. Login
    console.log('Logging in...');
    const loginRes = await post('/auth/login', { username: user.email, password: user.password });
    console.log('Login:', loginRes.status);
    const token = loginRes.body.token;

    if (!token) {
        console.error('No token received');
        return;
    }

    // 3. Get Profile
    console.log('Getting Profile...');
    const profileRes = await get('/user/profile', token);
    console.log('Profile:', profileRes.status, profileRes.body.email);

    // 4. Create Trip
    console.log('Creating Trip...');
    const tripRes = await post('/trips', { destination: "Mars", startDate: "2030-01-01", endDate: "2030-01-10" }, token);
    console.log('Create Trip:', tripRes.status, tripRes.body.id);

    // 5. Get Trips
    console.log('Getting Trips...');
    const tripsRes = await get('/trips', token);
    console.log('Trips:', tripsRes.status, 'Count:', tripsRes.body.length);

    console.log('--- Verification Complete ---');
}

run().catch(console.error);
