# My Store App

### Run Local Development

- Clone the repository
  ```bash
  git clone https://github.com/dvjadeja/my-store.git
  ```
- Go to project Directory
  ```bash
  cd my-store
  ```
- Select the node version if you have nvm then use the below command to set the node version automatically. This project requires Node.js v20.16.0 as it uses modern JavaScript features and ensures compatibility with all dependencies.
  ```bash
  nvm use
  ```
- Install Dependency
  ```bash
  npm install
  ```
- Start Server
  ```bash
  npm run dev
  ```
- Local Build
  ```bash
  npm run build
  ```
- Starting Server from the Buil
  ```bash
  npm run preview
  ```

### Run Tests

- Run the following command to run the test cases
  ```bash
  npm run test
  ```
- Run the following command to get the components coverage report with respect to the available test cases
  ```bash
  npm run test:coverage
  ```

## Design Decisions

### Technology Stack

- **React + TypeScript**: Chosen for type safety and better developer experience
- **Vite**: Selected for its fast development server and optimized build process
- **ESLint**: Implemented for code quality and consistency
- **Vitest-JEST**: For Implementing Logic & Component Testing
- **Fake Data**: For getting Sore and Products Data

### Architecture

- Component-based architecture following React best practices
- TypeScript for static type checking and better code maintainability
- Modular code structure for better scalability
- Zustand for Managing State across app which includes selection of store, getting products of the store, and mutating cart

## Trade-offs and Assumptions

### Trade-offs

1. **Build Performance vs Development Experience**

   - Using TypeScript adds build time but improves code quality and maintainability
   - Vite's development server prioritizes fast refresh over initial load time

2. **Type Safety vs Development Speed**

   - Strict TypeScript configurations may slow down development but catch errors early
   - Balance between strict type checking and development velocity

3. **Vitest Testing vs Jest Testing**
   - To implement Testing Libraries such as JEST to much configuration is required it to run locally or even on third party server
   - But Vitest configuration gives us Hot reloading feature with a converage report of the pending Components

### Assumptions

1. **Development Environment**

   - Developers are familiar with React and TypeScript
   - Node.js environment is available
   - It is adviced to use Node.js Version _v20.16.0_ to install the dependencies and run the project
   - Modern browser support is required
   - Added local Component Test Cases to inside `src/__tests__/components/{page_name}/{component_name}`

2. **Project Requirements**
   - Browser compatibility with ES6+ features

## Known Issues and Incomplete Features

### Current Limitations

1. **Development**

   - Initial setup might be slower due to TypeScript compilation
   - Some ESLint rules might need fine-tuning based on team preferences

2. **Build and Deployment**
   - Production build optimization might need further configuration only on the `App.tsx` obviously due to its heavy computation nature
   - Environment-specific configurations might need additional setup

3. **API and Authentication**
   - No Authentication system is being created for adding products to the cart of checking out the user.
   - No Server calls are done to fetch the Stores, Products or Cart. Instead `Zustand` is used for storing and persisting the data from `src/api/mockData.ts`

4. **Checkout Processing**
   - No Actual Payment integration is done for completing the order
   - Only user details with validation is asked in the Checkout page as it is just a static page

### Planned Improvements

1. **Performance**

   - Prefecthing the Data
   - Virualization of list can be implemented using `react-window` to reduce size DOM size
   - Add performance monitoring tools such as `Sentry` to monitor user errors best for handling differnt Environments (Develop, Staging, Production)

2. **Developer Experience**

   - Add more component or function level documentations
   - Implement additional development tools and utilities such as `@tanstack/react-query`
   - Add more common Components inside the `src/components/common`

3. **Testing**
   - Add more component testing
   - Implement end-to-end testing framework such as Playright/Cypress

4. **CI/CD**
   - Implement Husky for managing git hooks for running automatic scripts on Github Avtions

## Author 
- [@dvjadeja](https://github.com/dvjadeja)
