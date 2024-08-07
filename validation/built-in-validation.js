const express = require('express');
const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
    const { name, age, email } = req.body;

    // Kiểm tra name là chuỗi và không rỗng
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name must be a non-empty string' });
    }

    // Kiểm tra age là số nguyên và ít nhất là 18
    if (!Number.isInteger(age) || age < 18) {
        return res.status(400).json({ error: 'Age must be an integer and at least 18' });
    }

    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    res.send('User data is valid');
});

app.listen(3000, () => console.log('Server running on port 3000'));