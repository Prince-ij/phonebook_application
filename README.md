# 📞 Phonebook Application

A modern, full-stack phonebook application that allows users to manage their personal contacts with ease. Built with React frontend and Node.js backend, featuring MongoDB for data persistence.

## ✨ Features

- **Add Contacts**: Add new contacts with name and phone number
- **Search Contacts**: Filter contacts by name in real-time
- **Update Contacts**: Modify existing contact information
- **Delete Contacts**: Remove contacts with confirmation
- **Data Validation**: Phone number format validation (XX-XXXXX or XXX-XXXXX)
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Feedback**: Success and error notifications for user actions

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with modern design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Morgan** - HTTP request logger middleware
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas account)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Prince-ij/phonebook_application.git
cd phonebook_application
```

### 2. Backend Setup
```bash
# Install backend dependencies
npm install

# Create environment file
cp .env.example .env
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URL=mongodb://localhost:27017/phonebook
PORT=3001
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install
```

### 5. Database Setup
Make sure MongoDB is running on your system, or update the `MONGODB_URL` in your `.env` file to point to your MongoDB Atlas cluster.

## 🎯 Running the Application

### Development Mode

1. **Start the Backend Server**
```bash
# From the root directory
npm run dev
```
The backend server will start on `http://localhost:3001`

2. **Start the Frontend Development Server**
```bash
# From the frontend directory
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

### Production Mode

1. **Build the Frontend**
```bash
npm run build:ui
```

2. **Start the Production Server**
```bash
npm start
```

The application will be available at `http://localhost:3001`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/persons` | Get all contacts |
| GET | `/api/persons/:id` | Get a specific contact |
| POST | `/api/persons` | Create a new contact |
| PUT | `/api/persons/:id` | Update an existing contact |
| DELETE | `/api/persons/:id` | Delete a contact |
| GET | `/info` | Get phonebook info and timestamp |

### API Examples

#### Create a Contact
```json
POST /api/persons
Content-Type: application/json

{
  "name": "John Doe",
  "number": "123-45678"
}
```

#### Update a Contact
```json
PUT /api/persons/:id
Content-Type: application/json

{
  "name": "John Smith",
  "number": "123-56789"
}
```

## 🧪 Testing

Test API endpoints using the provided REST files in the `requests/` directory:

- `create_person.rest` - Test contact creation
- `delete_person.rest` - Test contact deletion

You can use VS Code with the REST Client extension to run these tests.

## 📁 Project Structure

```
phonebook_application/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   ├── main.jsx         # Application entry point
│   │   ├── index.css        # Global styles
│   │   └── services/
│   │       └── persons.js   # API service functions
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── models/
│   └── persons.js           # MongoDB/Mongoose person model
├── requests/                # REST API test files
├── index.js                 # Express server setup
├── package.json             # Backend dependencies
└── README.md               # Project documentation
```

## 🔧 Available Scripts

### Root Directory
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run build:ui` - Build frontend and copy to backend
- `npm run deploy:full` - Build UI, commit, and push to git

### Frontend Directory
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run server` - Start JSON server for development

## 🎨 Features in Detail

### Contact Validation
- Names must be at least 3 characters long
- Phone numbers must follow the format: `XX-XXXXX` or `XXX-XXXXX`
- Duplicate names are handled gracefully

### Error Handling
- Malformed MongoDB IDs return appropriate error messages
- Validation errors are displayed to users
- Network errors are caught and displayed

### User Experience
- Real-time search filtering
- Success/error notifications
- Responsive design for mobile devices
- Clean, modern interface

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 🐛 Known Issues

- Phone number validation is strict - ensure format compliance
- Database connection errors may occur if MongoDB is not running

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Contact grouping and categories
- [ ] Import/export functionality
- [ ] Advanced search filters
- [ ] Contact photos
- [ ] Email field support
- [ ] Dark mode theme

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Made with ❤️ by [Prince-ij](https://github.com/Prince-ij)**
