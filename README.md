# **Auth Service**

## **Overview**

The **Auth Service** is a microservice responsible for user authentication and authorization in a distributed system.
It handles user registration, login, JWT-based authentication, and secure session management.
This service is designed to be modular, scalable, and production-ready, following microservice best practices.

---

## **Features**

* User registration and login using secure password hashing (bcrypt)
* JWT-based authentication and authorization
* Centralized error handling and response structure
* Environment-based configuration using dotenv
* API rate limiting for brute-force protection
* Clean modular architecture for maintainability
* Ready for containerization and Kubernetes deployment

---

## **Tech Stack**

| Component        | Technology                   | Purpose                                              |
| ---------------- | ---------------------------- | ---------------------------------------------------- |
| Runtime          | Node.js                      | Server-side runtime                                  |
| Framework        | Express.js                   | Building REST APIs                                   |
| Database         | MongoDB                      | Stores user credentials and data                     |
| Security         | bcrypt, JWT                  | Password hashing & token-based authentication        |
| Configuration    | dotenv                       | Manage environment variables                         |
| Rate Limiting    | express-rate-limit           | Prevent brute-force attacks                          |
| Validation       | express-validator (optional) | Request validation                                   |
| Containerization | Docker                       | Service packaging and deployment                     |
| Orchestration    | Kubernetes                   | Auto-scaling, fault tolerance, and service discovery |

---

## **Folder Structure**

```
auth-service/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │   └── constants.js
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── rateLimiter.js
│   │
│   ├── models/
│   │   └── userModel.js
│   │
│   ├── services/
│   │   ├── jwtService.js
│   │   ├── userServices.js
│   │   └── passwordUtils.js       
│   │   
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── app.js
│   ├── server.js
│   └── tests/
│       ├── auth.test.js
│       └── utils.test.js
│
├── .env
├── .dockerignore
├── Dockerfile
├── deployment.yaml
├── service.yaml
├── configmap.yaml
├── package.json
└── README.md
```

---

## **Environment Variables**

Example `.env` file:

```
PORT=5000
MONGO_URI=mongodb://mongo-service:27017/authdb
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
NODE_ENV=development
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

---

## **Setup and Installation**

### 1. Clone the repository

```bash
git clone https://github.com/your-username/auth-service.git
cd auth-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and update the values as per your setup.

### 4. Run the service

```bash
npm run dev
```

By default, the service will start on `http://localhost:5000`.

---

## **API Endpoints**

| Method | Endpoint             | Description            | Protected |
| ------ | -------------------- | ---------------------- | --------- |
| POST   | `/api/auth/register` | Register a new user    | ❌         |
| POST   | `/api/auth/login`    | Login with credentials | ❌         |
| GET    | `/api/auth/profile`  | Get user profile       | ✅         |

---

## **Security Implementations**

1. **Password Hashing**:
   All passwords are hashed using **bcrypt** before being saved in MongoDB.

2. **JWT Authentication**:
   Users receive a signed JWT upon successful login, which is required for accessing protected routes.

3. **Rate Limiting**:
   `express-rate-limit` middleware is used on sensitive routes (e.g., `/login`, `/register`) to prevent brute-force attacks.

4. **Error Handling**:
   Centralized `errorMiddleware.js` ensures consistent error responses across the service.

---

## **Docker Setup**

### 1. Build the Docker image

```bash
docker build -t auth-service .
```

### 2. Run the container

```bash
docker run -p 5000:5000 --env-file .env auth-service
```

---

## **Kubernetes Deployment**

The `deployment.yaml`, `service.yaml`, and `configmap.yaml` files define how this service runs on a Kubernetes cluster.

### Deploy to cluster:

```bash
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

Once deployed, Kubernetes ensures:

* Automatic pod restarts on failure
* Load balancing across replicas
* Easy scaling using `kubectl scale`

---

## **Testing**

To run unit tests:

```bash
npm test
```

Test files include:

* `auth.test.js`: Tests authentication routes and logic
* `utils.test.js`: Tests helper functions like password hashing and token generation

---

## **Scalability Notes**

* Stateless design — can be horizontally scaled easily.
* MongoDB cluster recommended for high availability.
* Rate limiting is memory-based in this version; for production, replace with **Redis-backed rate limiter** to handle distributed scaling.

---

## **Future Improvements**

* Implement Redis-backed rate limiting
* Integrate distributed tracing and observability (e.g., OpenTelemetry)
* Add OAuth2 / SSO support
* Centralized logging and monitoring
* Health check endpoints for Kubernetes probes

