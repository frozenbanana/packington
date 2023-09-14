import request from 'supertest';
import jest, {describe, expect, it, mock} from '@jest/globals';
import * as userController from '../controllers/userController';

jest.mock('../controllers/userController');

const mockRegister = userController.register as jest.MockedFunction<typeof userController.register>;

describe('POST /register', () => {
  it('should register a new user', async () => {
    mockRegister.mockImplementation((_: any, res: any, __:any) => {
      res.status(201).json({ message: 'User registered successfully' });
    });

    const response = await request("/api/users/register")
      .post('/register')
      .send({ username: 'testuser', email: 'testuser@test.com', password: 'testpassword' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should validate username and password', async () => {
    mockRegister.mockImplementation((req, res, next) => {
      if (req.body.username.match(/^[A-Za-z0-9]+$/) && req.body.password.length > 6) {
        res.status(201).json({ message: 'User registered successfully' });
      } else {
        res.status(400).json({ message: 'Invalid username or password' });
      }
    });

    const response = await request(app)
      .post('/register')
      .send({ username: 'testuser!', email: 'testuser@test.com', password: 'test' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid username or password');
  });
});