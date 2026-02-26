# Dating App - Project Context

This is a full-stack dating application built with a modern tech stack, focusing on performance, scalability, and modern development practices.

## Project Overview

The project consists of two main parts:
1.  **Backend (API):** An ASP.NET Core 10 Web API providing a RESTful interface for data management and authentication.
2.  **Frontend (Client):** An Angular 20 application providing a responsive and interactive user interface.

### Key Technologies

*   **Backend:**
    *   ASP.NET Core 10
    *   Entity Framework Core (SQL Server)
    *   JWT Authentication
    *   AutoMapper (implied/likely for DTOs)
*   **Frontend:**
    *   Angular 20
    *   Angular Signals (for state management)
    *   Tailwind CSS (for styling)
    *   RxJS (for asynchronous operations)
*   **Database:** SQL Server

## Architecture

### Backend (API)
The backend follows a standard layered architecture:
*   **Controllers:** Handle incoming HTTP requests and map them to service calls.
*   **Services:** Contain business logic and interact with repositories/data layers.
*   **Data:** Contains the `AppDbContext`, Migrations, and entity configurations.
*   **Entities:** Domain models representing database tables.
*   **Dtos:** Data Transfer Objects for communication between the API and Client.
*   **Extensions:** Helper methods for service registration and other utility tasks.

### Frontend (Client)
The frontend is built with Angular and emphasizes modern practices:
*   **Signals:** Used for reactive state management (e.g., `AccountService.currentUser`).
*   **Modern Control Flow:** Uses `@if`, `@else`, and `@for` for templates.
*   **Core Services:** Centralized logic for authentication, API calls, and state.
*   **Feature Modules:** Organized by feature (e.g., `home`, `account`).
*   **Layout:** Shared components like `nav`.

## Building and Running

### Backend (API)
From the `API` directory:
*   **Run:** `dotnet run`
*   **Watch:** `dotnet watch`
*   **Database Update:** `dotnet ef database update`
*   **Add Migration:** `dotnet ef migrations add <MigrationName>`

### Frontend (Client)
From the `client` directory:
*   **Install Dependencies:** `npm install`
*   **Run:** `npm start` (or `ng serve`)
*   **Build:** `npm run build` (or `ng build`)
*   **Test:** `npm test`

## Development Conventions

*   **State Management:** Always prefer **Angular Signals** over Observables for component and service state when appropriate.
*   **Styling:** Use **Tailwind CSS** for all UI components. Avoid custom CSS unless absolutely necessary.
*   **Templates:** Use the **modern Angular control flow** syntax (`@if`, `@for`, etc.).
*   **API Communication:** Use DTOs for all data exchange between the client and the API.
*   **Authentication:** The app uses JWT. Ensure the `Token` is stored in `localStorage` and managed via `AccountService`.
*   **Naming:** Follow standard C# naming conventions for the backend and Angular style guide conventions for the frontend.
*   **Icons:** Prefer **Heroicons** (SVG) or similar modern icon sets.

## Navigation Structure

*   The main navigation is handled by the `Nav` component.
*   The `App` component acts as the main entry point, conditionally rendering the `Home` component or the main content based on authentication status.
*   The `Home` component manages the landing page and toggles the `Register` component.
