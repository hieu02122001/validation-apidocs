const express = require("express");
const { z } = require("zod");
const app = express();
app.use(express.json());

// Định nghĩa schema validation bằng Zod
const userSchema = z.object({
  name: z.string().minLength(1, { message: "Name must be a non-empty string" }),
  age: z.number().int().min(18, { message: "Age must be an integer and at least 18" }),
  email: z.string().email({ message: "Invalid email address" }),
});

app.post("/users", (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    // Lấy lỗi từ kết quả validation
    const errors = result.error.errors.map((err) => ({
      path: err.path[0],
      message: err.message,
    }));
    return res.status(400).json({ errors });
  }

  res.send("User data is valid");
});

app.listen(3000, () => console.log("Server running on port 3000"));

// // Custom Validators
// const isValidPassword = z.string().min(8).regex(/[A-Z]/);

// const passwordSchema = z.object({
//   password: isValidPassword,
// });

// // Merging và Extending Schemas
// const baseSchema = z.object({
//   id: z.string().uuid(),
// });

// const extendedSchema = baseSchema.extend({
//   name: z.string(),
//   email: z.string().email(),
// });

// // Chuyển Đổi Dữ Liệu và Infer TypeScript Types
// const userSchema = z.object({
//   name: z.string(),
//   age: z.number().int().min(18),
//   email: z.string().email()
// });

// type User = z.infer<typeof userSchema>;

// // Async Validators
// const emailExistsSchema = z.string().email().refine(async (email) => {
//   const user = await User.findOne({ email });
//   return !user;
// }, { message: 'Email already exists' });