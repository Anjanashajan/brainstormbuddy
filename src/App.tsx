import React, { useState } from 'react';
import { Lightbulb, Target, Code, Workflow, Download, Sparkles, ArrowRight, CheckCircle, Clock, Users } from 'lucide-react';
import FlowchartGenerator from './components/FlowchartGenerator';

interface ProjectAnalysis {
  goals: string[];
  features: string[];
  techStack: { category: string; technologies: string[]; reason: string }[];
  timeline: string;
  complexity: 'Low' | 'Medium' | 'High';
  teamSize: string;
}

function App() {
  const [idea, setIdea] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ProjectAnalysis | null>(null);
  const [currentStep, setCurrentStep] = useState<'input' | 'analyzing' | 'results'>('input');

  const analyzeIdea = async () => {
    if (!idea.trim()) return;
    
    setIsAnalyzing(true);
    setCurrentStep('analyzing');
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generate realistic suggestions based on idea content
    const mockAnalysis: ProjectAnalysis = generateAnalysis(idea);
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    setCurrentStep('results');
  };

  const generateAnalysis = (projectIdea: string): ProjectAnalysis => {
    const lowerIdea = projectIdea.toLowerCase();
    
    // Determine project type and generate appropriate suggestions
    let goals: string[] = [];
    let features: string[] = [];
    let techStack: { category: string; technologies: string[]; reason: string }[] = [];
    let timeline = '3-6 months';
    let complexity: 'Low' | 'Medium' | 'High' = 'Medium';
    let teamSize = '2-3 developers';

    if (lowerIdea.includes('ecommerce') || lowerIdea.includes('shop') || lowerIdea.includes('store')) {
      goals = [
        'Create seamless online shopping experience',
        'Implement secure payment processing',
        'Build inventory management system',
        'Optimize for mobile commerce'
      ];
      features = [
        'Product catalog with search and filters',
        'Shopping cart and checkout flow',
        'User authentication and profiles',
        'Payment gateway integration',
        'Order tracking and history',
        'Admin dashboard for inventory',
        'Reviews and ratings system',
        'Email notifications'
      ];
      techStack = [
        { category: 'Frontend', technologies: ['React', 'Next.js', 'Tailwind CSS'], reason: 'Modern UI with SSR for SEO' },
        { category: 'Backend', technologies: ['Node.js', 'Express', 'PostgreSQL'], reason: 'Scalable API with relational data' },
        { category: 'Payments', technologies: ['Stripe', 'PayPal'], reason: 'Secure payment processing' },
        { category: 'Hosting', technologies: ['Vercel', 'AWS'], reason: 'Reliable deployment and scaling' }
      ];
      complexity = 'High';
      timeline = '6-12 months';
      teamSize = '4-6 developers';
    } else if (lowerIdea.includes('social') || lowerIdea.includes('chat') || lowerIdea.includes('community')) {
      goals = [
        'Foster meaningful user connections',
        'Create engaging content sharing platform',
        'Implement real-time communication',
        'Build scalable user management'
      ];
      features = [
        'User profiles and authentication',
        'Real-time messaging and chat',
        'Content feed and posting',
        'Friend/follower system',
        'Notifications and alerts',
        'Media sharing (photos, videos)',
        'Privacy and security controls',
        'Content moderation tools'
      ];
      techStack = [
        { category: 'Frontend', technologies: ['React', 'TypeScript', 'Socket.io'], reason: 'Real-time updates and type safety' },
        { category: 'Backend', technologies: ['Node.js', 'Express', 'MongoDB'], reason: 'Flexible data structure for social features' },
        { category: 'Real-time', technologies: ['WebSocket', 'Redis'], reason: 'Live messaging and caching' },
        { category: 'Media', technologies: ['Cloudinary', 'AWS S3'], reason: 'Efficient media storage and delivery' }
      ];
      complexity = 'High';
      timeline = '8-15 months';
      teamSize = '5-8 developers';
    } else if (lowerIdea.includes('dashboard') || lowerIdea.includes('analytics') || lowerIdea.includes('data')) {
      goals = [
        'Provide clear data visualization',
        'Enable data-driven decision making',
        'Create intuitive user interface',
        'Ensure real-time data updates'
      ];
      features = [
        'Interactive charts and graphs',
        'Custom dashboard creation',
        'Data filtering and sorting',
        'Export and reporting tools',
        'User role management',
        'Real-time data refresh',
        'Mobile-responsive design',
        'API integrations'
      ];
      techStack = [
        { category: 'Frontend', technologies: ['React', 'D3.js', 'Chart.js'], reason: 'Rich data visualization capabilities' },
        { category: 'Backend', technologies: ['Python', 'FastAPI', 'PostgreSQL'], reason: 'Excellent data processing and analysis' },
        { category: 'Visualization', technologies: ['Plotly', 'Recharts'], reason: 'Interactive charts and graphs' },
        { category: 'Deployment', technologies: ['Docker', 'AWS'], reason: 'Containerized deployment and scaling' }
      ];
      complexity = 'Medium';
      timeline = '4-8 months';
      teamSize = '3-4 developers';
    } else {
      // Generic web application
      goals = [
        'Create user-friendly interface',
        'Implement core functionality',
        'Ensure scalable architecture',
        'Optimize for performance'
      ];
      features = [
        'User authentication and profiles',
        'Core feature implementation',
        'Responsive design',
        'Search and filtering',
        'Data management',
        'Settings and preferences',
        'Email notifications',
        'API integrations'
      ];
      techStack = [
        { category: 'Frontend', technologies: ['React', 'TypeScript', 'Tailwind CSS'], reason: 'Modern development with type safety' },
        { category: 'Backend', technologies: ['Node.js', 'Express', 'MongoDB'], reason: 'JavaScript full-stack for rapid development' },
        { category: 'Authentication', technologies: ['Auth0', 'JWT'], reason: 'Secure user management' },
        { category: 'Hosting', technologies: ['Netlify', 'Heroku'], reason: 'Easy deployment and scaling' }
      ];
    }

    return { goals, features, techStack, timeline, complexity, teamSize };
  };

  const resetAnalysis = () => {
    setIdea('');
    setAnalysis(null);
    setCurrentStep('input');
  };

  const exportFlowchart = () => {
    // Simulate flowchart export
    const element = document.createElement('a');
    const file = new Blob([generateFlowchartData()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'project-flowchart.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateFlowchartData = () => {
    if (!analysis) return '';
    
    return `Project Flowchart
==================

Goals:
${analysis.goals.map(goal => `• ${goal}`).join('\n')}

Key Features:
${analysis.features.map(feature => `• ${feature}`).join('\n')}

Tech Stack:
${analysis.techStack.map(stack => `${stack.category}: ${stack.technologies.join(', ')}`).join('\n')}

Timeline: ${analysis.timeline}
Complexity: ${analysis.complexity}
Team Size: ${analysis.teamSize}
`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">BrainstormBuddy</h1>
            <div className="px-3 py-1 bg-yellow-500/20 rounded-full">
              <span className="text-yellow-300 text-sm font-medium">AI-Powered</span>
            </div>
          </div>
          <p className="text-cyan-200 mt-2">Transform your raw ideas into structured project plans</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'input' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                What's your project idea?
              </h2>
              <p className="text-xl text-cyan-200">
                Describe your concept and let AI help you refine it into an actionable plan
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="mb-6">
                <label htmlFor="idea" className="block text-sm font-medium text-cyan-200 mb-3">
                  Project Idea
                </label>
                <textarea
                  id="idea"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g., A social platform for book lovers to share reviews and recommendations..."
                  className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                  <Target className="h-6 w-6 text-cyan-400 mb-2" />
                  <h3 className="font-semibold text-white mb-1">Goals</h3>
                  <p className="text-sm text-cyan-200">Clear objectives and success metrics</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <Sparkles className="h-6 w-6 text-purple-400 mb-2" />
                  <h3 className="font-semibold text-white mb-1">Features</h3>
                  <p className="text-sm text-purple-200">Essential functionality and user stories</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/20">
                  <Code className="h-6 w-6 text-emerald-400 mb-2" />
                  <h3 className="font-semibold text-white mb-1">Tech Stack</h3>
                  <p className="text-sm text-emerald-200">Recommended technologies and tools</p>
                </div>
              </div>

              <button
                onClick={analyzeIdea}
                disabled={!idea.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Sparkles className="h-5 w-5" />
                <span>Analyze & Refine Idea</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 'analyzing' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
              <div className="animate-spin h-16 w-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-white mb-4">Analyzing Your Idea</h2>
              <p className="text-cyan-200 mb-8">
                Our AI is processing your concept and generating structured recommendations...
              </p>
              <div className="space-y-2">
                <div className="text-left">
                  <div className="flex items-center space-x-3 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-white">Identifying core objectives</span>
                  </div>
                  <div className="flex items-center space-x-3 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-white">Suggesting key features</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin h-5 w-5 border-2 border-cyan-500 border-t-transparent rounded-full"></div>
                    <span className="text-cyan-200">Recommending tech stack...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'results' && analysis && (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Your Refined Project Plan</h2>
              <p className="text-cyan-200 max-w-2xl mx-auto">
                Based on your idea, here's a comprehensive breakdown with goals, features, and technical recommendations.
              </p>
            </div>

            {/* Project Overview */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Target className="h-6 w-6 text-cyan-400 mr-3" />
                Project Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Clock className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{analysis.timeline}</div>
                  <div className="text-cyan-200">Timeline</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Workflow className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{analysis.complexity}</div>
                  <div className="text-purple-200">Complexity</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Users className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{analysis.teamSize}</div>
                  <div className="text-emerald-200">Team Size</div>
                </div>
              </div>
            </div>

            {/* Goals */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Target className="h-6 w-6 text-cyan-400 mr-3" />
                Project Goals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.goals.map((goal, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                    <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white">{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Sparkles className="h-6 w-6 text-purple-400 mr-3" />
                Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysis.features.map((feature, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Code className="h-6 w-6 text-emerald-400 mr-3" />
                Recommended Tech Stack
              </h3>
              <div className="space-y-6">
                {analysis.techStack.map((stack, index) => (
                  <div key={index} className="p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/20">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-emerald-400">{stack.category}</h4>
                      <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                        {stack.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="px-3 py-1 bg-emerald-500/20 text-emerald-200 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-emerald-200 text-sm">{stack.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            {/* Flowchart Section */}
            <FlowchartGenerator analysis={analysis} projectIdea={idea} />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={exportFlowchart}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200"
              >
                <Download className="h-5 w-5" />
                <span>Export Summary</span>
              </button>
              <button
                onClick={resetAnalysis}
                className="flex items-center justify-center space-x-2 bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                <Lightbulb className="h-5 w-5" />
                <span>Analyze New Idea</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;