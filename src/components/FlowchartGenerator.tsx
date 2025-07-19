import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Download, Presentation, Share2, Code2, Copy, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectAnalysis {
  goals: string[];
  features: string[];
  techStack: { category: string; technologies: string[]; reason: string }[];
  timeline: string;
  complexity: 'Low' | 'Medium' | 'High';
  teamSize: string;
}

interface FlowchartGeneratorProps {
  analysis: ProjectAnalysis;
  projectIdea: string;
}

const FlowchartGenerator: React.FC<FlowchartGeneratorProps> = ({ analysis, projectIdea }) => {
  const flowchartRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [flowchartSvg, setFlowchartSvg] = useState<string>('');
  const [showCode, setShowCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [showPPTPreview, setShowPPTPreview] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pptSlides, setPptSlides] = useState<any[]>([]);

  useEffect(() => {
    generateFlowchart();
    generateProjectCode();
    generatePPTSlides();
  }, [analysis]);

  const generateFlowchart = async () => {
    if (!flowchartRef.current) return;

    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#06b6d4',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#0891b2',
        lineColor: '#64748b',
        sectionBkgColor: '#1e293b',
        altSectionBkgColor: '#334155',
        gridColor: '#475569',
        secondaryColor: '#8b5cf6',
        tertiaryColor: '#10b981',
      },
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
      },
    });

    const flowchartCode = generateMermaidCode();
    
    try {
      const { svg } = await mermaid.render('flowchart', flowchartCode);
      setFlowchartSvg(svg);
      if (flowchartRef.current) {
        flowchartRef.current.innerHTML = svg;
      }
    } catch (error) {
      console.error('Error generating flowchart:', error);
    }
  };

  const generateMermaidCode = (): string => {
    const sanitize = (text: string) => text.replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
    
    return `
flowchart TD
    A[Project Idea:<br/>"${sanitize(projectIdea.substring(0, 50))}..."] --> B{Analysis Phase}
    
    B --> C[Goals Definition]
    B --> D[Feature Planning]
    B --> E[Tech Stack Selection]
    B --> F[Timeline Planning]
    
    C --> C1["${sanitize(analysis.goals[0]?.substring(0, 30) || 'Goal 1')}"]
    C --> C2["${sanitize(analysis.goals[1]?.substring(0, 30) || 'Goal 2')}"]
    C --> C3["${sanitize(analysis.goals[2]?.substring(0, 30) || 'Goal 3')}"]
    
    D --> D1["${sanitize(analysis.features[0]?.substring(0, 25) || 'Feature 1')}"]
    D --> D2["${sanitize(analysis.features[1]?.substring(0, 25) || 'Feature 2')}"]
    D --> D3["${sanitize(analysis.features[2]?.substring(0, 25) || 'Feature 3')}"]
    D --> D4["${sanitize(analysis.features[3]?.substring(0, 25) || 'Feature 4')}"]
    
    E --> E1["Frontend:<br/>${analysis.techStack[0]?.technologies.slice(0, 2).join(', ') || 'React, TypeScript'}"]
    E --> E2["Backend:<br/>${analysis.techStack[1]?.technologies.slice(0, 2).join(', ') || 'Node.js, Express'}"]
    E --> E3["Database:<br/>${analysis.techStack[2]?.technologies.slice(0, 2).join(', ') || 'PostgreSQL, Redis'}"]
    
    F --> F1["Timeline: ${analysis.timeline}"]
    F --> F2["Complexity: ${analysis.complexity}"]
    F --> F3["Team: ${analysis.teamSize}"]
    
    C1 --> G[Development Phase]
    C2 --> G
    C3 --> G
    D1 --> G
    D2 --> G
    D3 --> G
    D4 --> G
    E1 --> G
    E2 --> G
    E3 --> G
    
    G --> H[MVP Development]
    G --> I[Testing & QA]
    G --> J[Deployment]
    
    H --> K[Launch]
    I --> K
    J --> K
    
    K --> L[Post-Launch]
    L --> M[Monitoring]
    L --> N[Iterations]
    L --> O[Scaling]
    
    classDef goalClass fill:#06b6d4,stroke:#0891b2,stroke-width:2px,color:#fff
    classDef featureClass fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px,color:#fff
    classDef techClass fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff
    classDef timelineClass fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff
    classDef phaseClass fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff
    
    class C1,C2,C3 goalClass
    class D1,D2,D3,D4 featureClass
    class E1,E2,E3 techClass
    class F1,F2,F3 timelineClass
    class G,H,I,J,K,L,M,N,O phaseClass
    `;
  };

  const generateProjectCode = () => {
    const frontendTech = analysis.techStack.find(stack => stack.category.toLowerCase().includes('frontend'))?.technologies[0] || 'React';
    const backendTech = analysis.techStack.find(stack => stack.category.toLowerCase().includes('backend'))?.technologies[0] || 'Node.js';
    
    const code = `// ${projectIdea} - Project Structure

// Package.json
{
  "name": "${projectIdea.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "description": "${projectIdea}",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "start": "node server.js",
    "test": "jest"
  },
  "dependencies": {
    ${frontendTech.toLowerCase() === 'react' ? '"react": "^18.2.0",\n    "react-dom": "^18.2.0",' : ''}
    ${backendTech.toLowerCase().includes('node') ? '"express": "^4.18.2",\n    "cors": "^2.8.5",' : ''}
    "axios": "^1.4.0"
  },
  "devDependencies": {
    ${frontendTech.toLowerCase() === 'react' ? '"@vitejs/plugin-react": "^4.0.0",\n    "vite": "^4.4.0",' : ''}
    "jest": "^29.5.0"
  }
}

// Frontend Component Structure (${frontendTech})
${generateFrontendCode(frontendTech)}

// Backend Structure (${backendTech})
${generateBackendCode(backendTech)}

// Database Schema
${generateDatabaseSchema()}

// API Endpoints
${generateAPIEndpoints()}

// Deployment Configuration
${generateDeploymentConfig()}`;

    setGeneratedCode(code);
  };

  const generateFrontendCode = (tech: string) => {
    if (tech.toLowerCase() === 'react') {
      return `
// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>${projectIdea}</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="content">
            {/* Main application content */}
            ${analysis.features.map(feature => `
            <div className="feature-section">
              <h2>${feature}</h2>
              {/* ${feature} implementation */}
            </div>`).join('')}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

// src/components/FeatureComponent.jsx
import React from 'react';

const FeatureComponent = ({ title, description }) => {
  return (
    <div className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureComponent;`;
    }
    return `// ${tech} frontend implementation would go here`;
  };

  const generateBackendCode = (tech: string) => {
    if (tech.toLowerCase().includes('node')) {
      return `
// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
${analysis.features.map(feature => `
app.get('/api/${feature.toLowerCase().replace(/\s+/g, '-')}', (req, res) => {
  // ${feature} endpoint
  res.json({ message: '${feature} data' });
});`).join('')}

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

// routes/api.js
const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = router;`;
    }
    return `// ${tech} backend implementation would go here`;
  };

  const generateDatabaseSchema = () => {
    return `
-- Database Schema
CREATE DATABASE ${projectIdea.toLowerCase().replace(/\s+/g, '_')}_db;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Main entity tables based on features
${analysis.features.map(feature => `
CREATE TABLE ${feature.toLowerCase().replace(/\s+/g, '_')} (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`).join('')}

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_data ON ${analysis.features[0]?.toLowerCase().replace(/\s+/g, '_') || 'main_table'}(user_id);`;
  };

  const generateAPIEndpoints = () => {
    return `
// API Documentation

Base URL: https://api.${projectIdea.toLowerCase().replace(/\s+/g, '-')}.com

Authentication:
POST /auth/login
POST /auth/register
POST /auth/logout

${analysis.features.map(feature => `
${feature} Endpoints:
GET /api/${feature.toLowerCase().replace(/\s+/g, '-')} - Get all ${feature.toLowerCase()}
POST /api/${feature.toLowerCase().replace(/\s+/g, '-')} - Create new ${feature.toLowerCase()}
GET /api/${feature.toLowerCase().replace(/\s+/g, '-')}/:id - Get specific ${feature.toLowerCase()}
PUT /api/${feature.toLowerCase().replace(/\s+/g, '-')}/:id - Update ${feature.toLowerCase()}
DELETE /api/${feature.toLowerCase().replace(/\s+/g, '-')}/:id - Delete ${feature.toLowerCase()}`).join('\n')}

// Example API Response
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Sample Data",
    "description": "Sample description",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "Operation successful"
}`;
  };

  const generateDeploymentConfig = () => {
    return `
// Docker Configuration
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/mydb
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:

// Vercel Configuration (vercel.json)
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}`;
  };

  const generatePPTSlides = () => {
    const slides = [
      {
        title: `${projectIdea}`,
        subtitle: 'Complete Project Analysis & Implementation Plan',
        type: 'title',
        content: `Generated by BrainstormBuddy AI • ${new Date().toLocaleDateString()}`
      },
      {
        title: 'Executive Summary',
        type: 'summary',
        content: [
          ['Project Timeline', analysis.timeline],
          ['Complexity Level', analysis.complexity],
          ['Recommended Team Size', analysis.teamSize],
          ['Primary Technology', analysis.techStack[0]?.technologies[0] || 'React'],
          ['Key Features Count', analysis.features.length.toString()],
          ['Main Goals', analysis.goals.length.toString()]
        ]
      },
      {
        title: 'Project Goals & Objectives',
        type: 'goals',
        content: analysis.goals
      },
      {
        title: 'Key Features & Functionality',
        type: 'features',
        content: analysis.features
      },
      {
        title: 'Recommended Technical Architecture',
        type: 'techstack',
        content: analysis.techStack
      },
      {
        title: 'Development Timeline & Milestones',
        type: 'timeline',
        content: [
          'Project Setup & Environment Configuration',
          'Core Architecture & Database Design',
          'MVP Development (Core Features)',
          'User Interface & Experience Design',
          'Testing & Quality Assurance',
          'Deployment & Production Setup',
          'Launch & User Feedback Collection',
          'Iteration & Feature Enhancement'
        ]
      },
      {
        title: 'Project Code Structure',
        type: 'code',
        content: {
          frontend: analysis.techStack[0]?.technologies[0] || 'React',
          backend: analysis.techStack[1]?.technologies[0] || 'Node.js',
          structure: `Frontend (${analysis.techStack[0]?.technologies[0] || 'React'})
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── utils/

Backend (${analysis.techStack[1]?.technologies[0] || 'Node.js'})
├── routes/
├── models/
├── middleware/
└── controllers/

Database Schema
├── Users table
├── Core entities
└── Relationships`
        }
      },
      {
        title: 'Implementation Roadmap',
        type: 'roadmap',
        content: [
          'Environment Setup: Configure development tools and repositories',
          'Database Design: Create schema and establish data relationships',
          'API Development: Build backend services and endpoints',
          'Frontend Development: Create user interface and components',
          'Integration Testing: Ensure all systems work together',
          'User Acceptance Testing: Validate with target users',
          'Production Deployment: Launch to live environment',
          'Monitoring & Optimization: Track performance and iterate'
        ]
      },
      {
        title: 'Risk Assessment & Mitigation',
        type: 'risks',
        content: [
          ['Technical Complexity', 'Medium', 'Use proven technologies and frameworks'],
          ['Timeline Overrun', 'Low', 'Agile development with regular milestones'],
          ['Budget Constraints', 'Medium', 'Prioritize MVP features first'],
          ['User Adoption', 'Medium', 'Conduct user research and testing'],
          ['Scalability Issues', 'Low', 'Design with scalability in mind']
        ]
      },
      {
        title: 'Immediate Next Steps',
        type: 'nextsteps',
        content: [
          'Assemble development team and assign roles',
          'Set up project management tools (Jira, Trello, etc.)',
          'Create detailed technical specifications',
          'Establish development environment and CI/CD pipeline',
          'Begin with database design and API architecture',
          'Create wireframes and UI/UX mockups',
          'Set up monitoring and analytics tools',
          'Plan user testing and feedback collection strategy'
        ]
      },
      {
        title: 'Resources & Documentation',
        type: 'resources',
        content: {
          subtitle: 'Generated by BrainstormBuddy AI',
          includes: [
            '• Complete project analysis and recommendations',
            '• Technical architecture and technology stack',
            '• Development timeline and milestone planning',
            '• Risk assessment and mitigation strategies',
            '• Implementation roadmap and next steps',
            '• Code structure and development guidelines'
          ]
        }
      }
    ];
    
    setPptSlides(slides);
  };

  const generatePowerPoint = async () => {
    setIsGenerating(true);
    try {
      const PptxGenJS = (await import('pptxgenjs')).default;
      const pres = new PptxGenJS();
      
      // Set presentation properties
      pres.author = 'BrainstormBuddy AI';
      pres.company = 'BrainstormBuddy';
      pres.subject = `${projectIdea} - Project Analysis`;
      pres.title = `${projectIdea} - Complete Project Plan`;

      // Title Slide
      const titleSlide = pres.addSlide();
      titleSlide.background = { color: '0F172A' };
      titleSlide.addText(`${projectIdea}`, {
        x: 1, y: 1.5, w: 8, h: 1.5,
        fontSize: 36, bold: true, color: 'FFFFFF',
        align: 'center'
      });
      titleSlide.addText('Complete Project Analysis & Implementation Plan', {
        x: 1, y: 3, w: 8, h: 1,
        fontSize: 20, color: '06B6D4',
        align: 'center'
      });
      titleSlide.addText(`Generated by BrainstormBuddy AI • ${new Date().toLocaleDateString()}`, {
        x: 1, y: 6, w: 8, h: 0.5,
        fontSize: 14, color: '64748B',
        align: 'center'
      });

      // Executive Summary Slide
      const summarySlide = pres.addSlide();
      summarySlide.background = { color: '0F172A' };
      summarySlide.addText('Executive Summary', {
        x: 0.5, y: 0.5, w: 9, h: 1,
        fontSize: 28, bold: true, color: 'FFFFFF'
      });
      
      const summaryData = [
        ['Project Timeline', analysis.timeline],
        ['Complexity Level', analysis.complexity],
        ['Recommended Team Size', analysis.teamSize],
        ['Primary Technology', analysis.techStack[0]?.technologies[0] || 'React'],
        ['Key Features Count', analysis.features.length.toString()],
        ['Main Goals', analysis.goals.length.toString()]
      ];
      
      summarySlide.addTable(summaryData, {
        x: 1, y: 1.5, w: 8, h: 4,
        fontSize: 16, color: 'FFFFFF',
        fill: '1E293B',
        border: { pt: 1, color: '475569' },
        margin: 0.1
      });

      // Project Goals Slide
      const goalsSlide = pres.addSlide();
      goalsSlide.background = { color: '0F172A' };
      goalsSlide.addText('Project Goals & Objectives', {
        x: 0.5, y: 0.5, w: 9, h: 1,
        fontSize: 28, bold: true, color: '06B6D4'
      });
      
      analysis.goals.forEach((goal, index) => {
        goalsSlide.addText(`${index + 1}. ${goal}`, {
          x: 1, y: 1.5 + (index * 0.8), w: 8, h: 0.7,
          fontSize: 16, color: 'FFFFFF',
          bullet: { type: 'number' }
        });
      });

      // Key Features Slide
      const featuresSlide = pres.addSlide();
      featuresSlide.background = { color: '0F172A' };
      featuresSlide.addText('Key Features & Functionality', {
        x: 0.5, y: 0.5, w: 9, h: 1,
        fontSize: 28, bold: true, color: '8B5CF6'
      });
      
      const halfFeatures = Math.ceil(analysis.features.length / 2);
      analysis.features.slice(0, halfFeatures).forEach((feature, index) => {
        featuresSlide.addText(`• ${feature}`, {
          x: 0.5, y: 1.5 + (index * 0.6), w: 4.5, h: 0.5,
          fontSize: 14, color: 'FFFFFF'
        });
      });
      
      analysis.features.slice(halfFeatures).forEach((feature, index) => {
        featuresSlide.addText(`• ${feature}`, {
          x: 5, y: 1.5 + (index * 0.6), w: 4.5, h: 0.5,
          fontSize: 14, color: 'FFFFFF'
        });
      });

      // Technical Architecture Slide
      const techSlide = pres.addSlide();
      techSlide.background = { color: '0F172A' };
      techSlide.addText('Recommended Technical Architecture', {
        x: 0.5, y: 0.5, w: 9, h: 1,
        fontSize: 28, bold: true, color: '10B981'
      });
      
      analysis.techStack.forEach((stack, index) => {
        techSlide.addText(stack.category, {
          x: 1, y: 1.5 + (index * 1.2), w: 8, h: 0.4,
          fontSize: 18, bold: true, color: '10B981'
        });
        techSlide.addText(stack.technologies.join(', '), {
          x: 1.5, y: 1.9 + (index * 1.2), w: 7.5, h: 0.3,
          fontSize: 14, color: 'FFFFFF'
        });
        techSlide.addText(`Rationale: ${stack.reason}`, {
          x: 1.5, y: 2.2 + (index * 1.2), w: 7.5, h: 0.3,
          fontSize: 12, color: '94A3B8', italic: true
        });
      });

      // Development Timeline Slide
      const timelineSlide = pres.addSlide();
      timelineSlide.background = { color: '0F172A' };
      timelineSlide.addText('Development Timeline & Milestones', {
        x: 0.5, y: 0.5, w: 9, h: 1,
        fontSize: 28, bold: true, color: 'F59E0B'
      });
      
      const milestones = [
        'Project Setup & Environment Configuration',
        'Core Architecture & Database Design',
        'MVP Development (Core Features)',
        'User Interface & Experience Design',
        'Testing & Quality Assurance',
        'Deployment & Production Setup',
        'Launch & User Feedback Collection',
        'Iteration & Feature Enhancement'
      ];
      
      milestones.forEach((milestone, index) => {
        timelineSlide.addText(`Phase ${index + 1}: ${milestone}`, {
          x: 1, y: 1.5 + (index * 0.6), w: 8, h: 0.5,
          fontSize: 14, color: 'FFFFFF'
        });
      });

      // Code Structure Slide
      const codeSlide = pres.addSlide();
      codeSlide.background = { color: '0F172A' };
      codeSlide.addText('Project Code Structure', {
        x: 0.5, y: 0.5, w: 9, h: 1,
        fontSize: 28, bold: true, color: 'EF4444'
      });
      
      const codeStructure = `
Frontend (${analysis.techStack[0]?.technologies[0] || 'React'})
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── utils/

Backend (${analysis.techStack[1]?.technologies[0] || 'Node.js'})
├── routes/
├── models/
├── middleware/
└── controllers/

Database Schema
├── Users table
├── Core entities
└── Relationships`;

      codeSlide.addText(codeStructure, {
        x: 1, y: 1.5, w: 8, h: 4,
        fontSize: 12, color: 'FFFFFF',
        fontFace: 'Courier New'
      });

      // Implementation Roadmap Slide
      const roadmapSlide = pres.addSlide();
      roadmapSlide.background = { color: '0F172A' };
      roadmapSlide.addText('Implementation Roadmap', {
        x: 0.5, y: 0.5, w: 9, h: 1,
        fontSize: 28, bold: true, color: 'F59E0B'
      });
      
      const roadmapSteps = [
        'Environment Setup: Configure development tools and repositories',
        'Database Design: Create schema and establish data relationships',
        'API Development: Build backend services and endpoints',
        'Frontend Development: Create user interface and components',
        'Integration Testing: Ensure all systems work together',
        'User Acceptance Testing: Validate with target users',
        'Production Deployment: Launch to live environment',
        'Monitoring & Optimization: Track performance and iterate'
      ];
      
      roadmapSteps.forEach((step, index) => {
        roadmapSlide.addText(`${index + 1}. ${step}`, {
          x: 1, y: 1.5 + (index * 0.6), w: 8, h: 0.5,
          fontSize: 14, color: 'FFFFFF'
        });
      });

      // Risk Assessment Slide
      const riskSlide = pres.addSlide();
      riskSlide.background = { color: '0F172A' };
      riskSlide.addText('Risk Assessment & Mitigation', {
        x: 0.5, y: 0.5, w: 9, h: 1,
        fontSize: 28, bold: true, color: 'EF4444'
      });
      
      const risks = [
        ['Technical Complexity', 'Medium', 'Use proven technologies and frameworks'],
        ['Timeline Overrun', 'Low', 'Agile development with regular milestones'],
        ['Budget Constraints', 'Medium', 'Prioritize MVP features first'],
        ['User Adoption', 'Medium', 'Conduct user research and testing'],
        ['Scalability Issues', 'Low', 'Design with scalability in mind']
      ];
      
      riskSlide.addTable([['Risk', 'Level', 'Mitigation Strategy'], ...risks], {
        x: 1, y: 1.5, w: 8, h: 4,
        fontSize: 14, color: 'FFFFFF',
        fill: '1E293B',
        border: { pt: 1, color: '475569' }
      });

      // Next Steps Slide
      const nextStepsSlide = pres.addSlide();
      nextStepsSlide.background = { color: '0F172A' };
      nextStepsSlide.addText('Immediate Next Steps', {
        x: 0.5, y: 0.5, w: 9, h: 1,
        fontSize: 28, bold: true, color: '06B6D4'
      });
      
      const nextSteps = [
        'Assemble development team and assign roles',
        'Set up project management tools (Jira, Trello, etc.)',
        'Create detailed technical specifications',
        'Establish development environment and CI/CD pipeline',
        'Begin with database design and API architecture',
        'Create wireframes and UI/UX mockups',
        'Set up monitoring and analytics tools',
        'Plan user testing and feedback collection strategy'
      ];
      
      nextSteps.forEach((step, index) => {
        nextStepsSlide.addText(`${index + 1}. ${step}`, {
          x: 1, y: 1.5 + (index * 0.6), w: 8, h: 0.5,
          fontSize: 16, color: 'FFFFFF'
        });
      });

      // Contact & Resources Slide
      const contactSlide = pres.addSlide();
      contactSlide.background = { color: '0F172A' };
      contactSlide.addText('Resources & Documentation', {
        x: 0.5, y: 0.5, w: 9, h: 1,
        fontSize: 28, bold: true, color: '10B981'
      });
      
      contactSlide.addText('Generated by BrainstormBuddy AI', {
        x: 1, y: 2, w: 8, h: 0.5,
        fontSize: 18, bold: true, color: 'FFFFFF'
      });
      
      contactSlide.addText('This presentation includes:', {
        x: 1, y: 2.8, w: 8, h: 0.5,
        fontSize: 16, color: '06B6D4'
      });
      
      const resources = [
        '• Complete project analysis and recommendations',
        '• Technical architecture and technology stack',
        '• Development timeline and milestone planning',
        '• Risk assessment and mitigation strategies',
        '• Implementation roadmap and next steps',
        '• Code structure and development guidelines'
      ];
      
      resources.forEach((resource, index) => {
        contactSlide.addText(resource, {
          x: 1.5, y: 3.3 + (index * 0.4), w: 7, h: 0.3,
          fontSize: 14, color: 'FFFFFF'
        });
      });

      const fileName = `${projectIdea.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-project-analysis.pptx`;
      await pres.writeFile({ fileName });
    } catch (error) {
      console.error('Error generating PowerPoint:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  const renderSlidePreview = (slide: any, index: number) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{slide.title}</h1>
            <h2 className="text-xl text-cyan-400 mb-8">{slide.subtitle}</h2>
            <p className="text-gray-400">{slide.content}</p>
          </div>
        );
      
      case 'summary':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">{slide.title}</h2>
            <div className="grid grid-cols-2 gap-4">
              {slide.content.map(([key, value]: [string, string], idx: number) => (
                <div key={idx} className="bg-slate-800 p-4 rounded-lg">
                  <div className="text-cyan-400 font-semibold">{key}</div>
                  <div className="text-white text-lg">{value}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'goals':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">{slide.title}</h2>
            <div className="space-y-4">
              {slide.content.map((goal: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                    {idx + 1}
                  </div>
                  <p className="text-white text-lg">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'features':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6">{slide.title}</h2>
            <div className="grid grid-cols-2 gap-4">
              {slide.content.map((feature: string, idx: number) => (
                <div key={idx} className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <p className="text-white">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'techstack':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-emerald-400 mb-6">{slide.title}</h2>
            <div className="space-y-6">
              {slide.content.map((stack: any, idx: number) => (
                <div key={idx} className="bg-emerald-900/30 p-6 rounded-lg border border-emerald-500/30">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold text-emerald-400">{stack.category}</h3>
                    <div className="flex space-x-2">
                      {stack.technologies.map((tech: string, techIdx: number) => (
                        <span key={techIdx} className="px-3 py-1 bg-emerald-500/20 text-emerald-200 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-emerald-200">{stack.reason}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'timeline':
      case 'roadmap':
      case 'nextsteps':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">{slide.title}</h2>
            <div className="space-y-4">
              {slide.content.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black text-sm font-bold mt-1">
                    {idx + 1}
                  </div>
                  <p className="text-white text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'code':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-6">{slide.title}</h2>
            <div className="bg-slate-900 p-6 rounded-lg">
              <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                {slide.content.structure}
              </pre>
            </div>
          </div>
        );
      
      case 'risks':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-6">{slide.title}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-4 text-red-400 font-semibold">
                <div>Risk</div>
                <div>Level</div>
                <div>Mitigation Strategy</div>
              </div>
              {slide.content.map(([risk, level, mitigation]: [string, string, string], idx: number) => (
                <div key={idx} className="grid grid-cols-3 gap-4 bg-red-900/30 p-4 rounded-lg border border-red-500/30">
                  <div className="text-white">{risk}</div>
                  <div className={`font-semibold ${level === 'High' ? 'text-red-400' : level === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                    {level}
                  </div>
                  <div className="text-gray-300">{mitigation}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'resources':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-emerald-400 mb-6">{slide.title}</h2>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">{slide.content.subtitle}</h3>
              <p className="text-cyan-400 mb-6">This presentation includes:</p>
              <div className="space-y-3">
                {slide.content.includes.map((item: string, idx: number) => (
                  <p key={idx} className="text-white text-lg">{item}</p>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">{slide.title}</h2>
            <p className="text-gray-300">Slide content preview</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Flowchart Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Share2 className="h-6 w-6 text-cyan-400 mr-3" />
            Project Development Flowchart
          </h3>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowPPTPreview(!showPPTPreview)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
              <span>{showPPTPreview ? 'Hide Preview' : 'Preview PPT'}</span>
            </button>
            <button
              onClick={generatePowerPoint}
              disabled={isGenerating}
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50"
            >
              <Presentation className="h-4 w-4" />
              <span>Download PPT</span>
            </button>
          </div>
        </div>
        
        {isGenerating && (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-cyan-200">Generating PowerPoint presentation...</p>
          </div>
        )}
        
        {!showPPTPreview && (
          <div 
            ref={flowchartRef}
            className="bg-slate-900 rounded-lg p-4 min-h-[400px] overflow-auto"
            style={{ fontSize: '12px' }}
          />
        )}
        
        {showPPTPreview && (
          <div className="bg-slate-900 rounded-lg overflow-hidden">
            {/* PPT Preview Header */}
            <div className="bg-slate-800 p-4 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center space-x-4">
                <h4 className="text-white font-semibold">PowerPoint Preview</h4>
                <span className="text-gray-400">
                  Slide {currentSlide + 1} of {pptSlides.length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                  className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentSlide(Math.min(pptSlides.length - 1, currentSlide + 1))}
                  disabled={currentSlide === pptSlides.length - 1}
                  className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* PPT Slide Content */}
            <div className="h-96 bg-slate-900 overflow-auto">
              {pptSlides[currentSlide] && renderSlidePreview(pptSlides[currentSlide], currentSlide)}
            </div>
            
            {/* Slide Navigation */}
            <div className="bg-slate-800 p-4 border-t border-slate-700">
              <div className="flex space-x-2 overflow-x-auto">
                {pptSlides.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentSlide === index
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    {index + 1}. {slide.title.length > 20 ? slide.title.substring(0, 20) + '...' : slide.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {!showPPTPreview && (
          <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
            <h4 className="text-cyan-400 font-semibold mb-2">Flowchart Legend</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-cyan-500 rounded"></div>
                <span className="text-white">Goals</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-white">Features</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                <span className="text-white">Tech Stack</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-white">Phases</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Code Generation Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Code2 className="h-6 w-6 text-emerald-400 mr-3" />
            Generated Project Code Structure
          </h3>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200"
            >
              <Code2 className="h-4 w-4" />
              <span>{showCode ? 'Hide Code' : 'Show Code'}</span>
            </button>
            {showCode && (
              <button
                onClick={copyCode}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                <Copy className="h-4 w-4" />
                <span>Copy Code</span>
              </button>
            )}
          </div>
        </div>

        {showCode && (
          <div className="bg-slate-900 rounded-lg p-4 overflow-auto max-h-96">
            <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono">
              {generatedCode}
            </pre>
          </div>
        )}

        {!showCode && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/20">
              <h4 className="text-emerald-400 font-semibold mb-2">Frontend Structure</h4>
              <p className="text-sm text-emerald-200">Complete React component architecture with routing and state management</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg border border-blue-500/20">
              <h4 className="text-blue-400 font-semibold mb-2">Backend API</h4>
              <p className="text-sm text-blue-200">RESTful API endpoints with authentication and data validation</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
              <h4 className="text-purple-400 font-semibold mb-2">Database Schema</h4>
              <p className="text-sm text-purple-200">Optimized database structure with relationships and indexes</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
              <h4 className="text-orange-400 font-semibold mb-2">Deployment Config</h4>
              <p className="text-sm text-orange-200">Docker containers and cloud deployment configurations</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
              <h4 className="text-cyan-400 font-semibold mb-2">API Documentation</h4>
              <p className="text-sm text-cyan-200">Complete endpoint documentation with examples and responses</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20">
              <h4 className="text-yellow-400 font-semibold mb-2">Package Configuration</h4>
              <p className="text-sm text-yellow-200">Dependencies, scripts, and build configurations</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowchartGenerator;