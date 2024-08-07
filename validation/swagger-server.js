const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions');
const app = express();
app.use(express.json());

// Swagger UI

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Tạo người dùng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Người dùng đã được tạo
*/

app.post('/users', (req, res) => {
  const { name, age, email } = req.body;
  
  res.status(201).json({ message: 'User created', data: req.body });
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => console.log('Server running on port 3000'));