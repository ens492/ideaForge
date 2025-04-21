
# Idea Forge AI Mentor

A full-stack, responsive web application designed to assist entrepreneurs, university students, and innovation teams in decision-making under uncertainty. This platform guides users through structured Design Thinking and Lean Startup processes, integrating AI feedback to help validate hypotheses and iteratively improve entrepreneurial ideas.

## Features

### Core Functionality

1. **Step-by-Step Learning Journey**:
   - 7 sequential stages based on Design Thinking methodology
   - Structured progression requiring completion of each step
   - Embedded educational content, reflection questions, and hands-on tasks

2. **AI Feedback System**:
   - Provides positive and constructive feedback on user submissions
   - Suggests tailored learning resources and next steps
   - Enables iterative improvement of ideas

3. **Business Model Validation**:
   - Tools for testing and refining business hypotheses
   - Business Model Canvas integration
   - Exportable business model documentation

4. **User Experience**:
   - Responsive design for desktop and mobile
   - Progress tracking and visualization
   - Interactive dashboard

## Technology Stack

- **Frontend**: React.js with TypeScript, Tailwind CSS, Shadcn UI components
- **State Management**: React Context API with localStorage persistence
- **AI Feedback**: Simulated AI responses (ready for integration with GPT-4 or other LLMs)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open http://localhost:8080 in your browser

## Application Structure

The application follows a modular component architecture:

- `src/components/stages/`: Components for each stage of the journey
- `src/components/layout/`: Layout components like MainLayout and Navbar
- `src/components/dashboard/`: Dashboard and welcome components
- `src/components/business/`: Business modeling tools
- `src/context/`: Application state management
- `src/services/`: Services for AI feedback
- `src/types/`: TypeScript type definitions
- `src/data/`: Content and data for the application

## Design Thinking & Lean Startup Integration

This platform integrates Design Thinking's human-centered approach with Lean Startup's validation methodology:

1. **Understand** → Research and empathize with user needs
2. **Observe** → Collect user insights and data
3. **Define** → Create a clear problem statement
4. **Ideate** → Generate potential solutions
5. **Prototype** → Build testable representations (Build phase of Build-Measure-Learn)
6. **Test** → Validate with users (Measure phase of Build-Measure-Learn)
7. **Reflect** → Review and iterate (Learn phase of Build-Measure-Learn)

## AI Feedback System

The feedback system is designed to:

1. Analyze user submissions for each stage
2. Provide constructive feedback highlighting strengths and areas for improvement
3. Suggest relevant resources based on user needs
4. Approve progression or guide iteration based on submission quality

## Future Enhancements

- **Team Collaboration**: Enable multiple users to work on the same project
- **Custom Innovation Paths**: Tailor the journey for different user personas
- **Extended Resource Library**: Expanded educational content and templates
- **Real AI Integration**: Connect to OpenAI or other LLM providers for genuine AI feedback
