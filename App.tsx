import React, { useState, useEffect, useRef } from 'react';
import { Service, PortfolioItem, ChatMessage, IdeaResponse } from './types';
import { generateSaaSIdea, chatWithAssistant } from './services/gemini';
// import './index.css'
import "./index.css";


// --- Professional Icons ---

const StartFastIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aquamarine">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const ScaleSmartIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aquamarine">
    <path d="M12 20V10" />
    <path d="M18 20V4" />
    <path d="M6 20v-4" />
  </svg>
);

const ControlIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aquamarine">
    <circle cx="12" cy="12" r="3" />
    <path d="M3 12h6" />
    <path d="M15 12h6" />
    <path d="M12 3v6" />
    <path d="M12 15v6" />
  </svg>
);

// --- Agent Icons ---
const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aquamarine">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aquamarine">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z" />
  </svg>
);

const SocialIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aquamarine">
    <path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8Z" />
    <path d="M22 12h-4" />
    <path d="M2 12h4" />
    <path d="M10 2v4" />
    <path d="M10 18v4" />
  </svg>
);

const ResearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aquamarine">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const LeadGenIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aquamarine">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);

const CustomIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-aquamarine">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

// --- Components ---

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 glass-card mx-6 my-6 rounded-3xl border-white/10 shadow-2xl transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 bg-midnight rounded-xl flex items-center justify-center font-bold text-xl text-[#FFFFFF] shadow-lg shadow-midnight/40 border border-aquamarine/30">V</div>
      <span className="text-2xl font-bold tracking-tighter text-[#FFFFFF]">ValueCode<span className="text-aquamarine">.in</span></span>
    </div>
    
    <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-[#FFFFFF] uppercase tracking-[0.15em]">
      <a href="#solutions" className="hover:text-aquamarine transition-all duration-300 relative group">
        Solutions
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aquamarine transition-all duration-300 group-hover:w-full"></span>
      </a>
      <span className="text-white/20 font-light select-none">|</span>
      <a href="#agent-store" className="hover:text-aquamarine transition-all duration-300 relative group">
        Agent Store
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aquamarine transition-all duration-300 group-hover:w-full"></span>
      </a>
      <span className="text-white/20 font-light select-none">|</span>
      <a href="#hybrid" className="hover:text-aquamarine transition-all duration-300 relative group">
        Hybrid Ai Apps
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-aquamarine transition-all duration-300 group-hover:w-full"></span>
      </a>
    </div>

    <button className="bg-midnight hover:bg-midnight/80 border border-aquamarine/30 text-[#FFFFFF] px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95">
      Login
    </button>
  </nav>
);

const Hero: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [idea, setIdea] = useState<IdeaResponse | null>(null);
  
  const [formData, setFormData] = useState({
    niche: '',
    companyName: '',
    digitalPresence: '',
    features: '',
    challenges: '',
    opportunities: '',
    email: ''
  });

  const steps = [
    { key: 'niche', question: 'Industry or Niche', placeholder: 'Tell us your industry or niche idea...' },
    { key: 'companyName', question: 'Your Company Name', placeholder: 'Enter your company name...' },
    { key: 'digitalPresence', question: 'Digital Presence', placeholder: 'Instagram, YouTube, Google account...' },
    { key: 'features', question: 'Top 5 Features', placeholder: 'Feature 1, Feature 2, Feature 3...' },
    { key: 'challenges', question: 'Top 5 Challenges', placeholder: 'Challenge 1, Challenge 2, Challenge 3...' },
    { key: 'opportunities', question: '3 Growth Opportunities', placeholder: 'Opportunity 1, Opportunity 2...' },
    { key: 'email', question: 'Email Address', placeholder: 'Enter email to get your free Blueprint...' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [steps[currentStep].key]: e.target.value });
  };

  const handleNext = async () => {
    const currentKey = steps[currentStep].key as keyof typeof formData;
    if (!formData[currentKey].trim()) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      try {
        const fullContext = `
          Niche: ${formData.niche}
          Company: ${formData.companyName}
          Digital Presence: ${formData.digitalPresence}
          Desired Features: ${formData.features}
          Current Challenges: ${formData.challenges}
          Growth Opportunities: ${formData.opportunities}
          Email: ${formData.email}
        `;
        const res = await generateSaaSIdea(fullContext);
        setIdea(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNext();
  };

  return (
    <section className="pt-56 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight/30 border border-aquamarine/20 text-aquamarine text-xs font-medium uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-aquamarine animate-pulse"></span>
          AI-Powered Micro SaaS Studio
        </div>
        <h1 className="text-5xl md:text-7xl font-medium leading-tight tracking-tight mb-6 text-sand">
          Transforming <span className="gradient-text">Ideas</span> into <span className="text-aquamarine underline decoration-sand/30 underline-offset-8">Efficiency</span>.
        </h1>
        <p className="text-lg text-sand/70 mb-8 max-w-xl font-normal leading-relaxed">
          Our AI system understands your requirements, challenges, and improvement areas to generate a blueprint. Enter the details below and watch the magic unfold..
        </p>
        
        {!idea && (
          <div className="space-y-4">
            <div className="flex justify-between items-end max-w-xl mb-1">
              <span className="text-aquamarine text-xs font-bold uppercase tracking-widest">{steps[currentStep].question}</span>
              <span className="text-sand/40 text-[10px] font-medium">STEP {currentStep + 1} OF {steps.length}</span>
            </div>
            <div className="relative max-w-xl group">
              <input 
                value={formData[steps[currentStep].key as keyof typeof formData]}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                type={steps[currentStep].key === 'email' ? 'email' : 'text'} 
                placeholder={steps[currentStep].placeholder}
                autoFocus
                className="w-full bg-midnight/20 border border-aquamarine/20 rounded-2xl px-6 py-4 focus:ring-1 focus:ring-aquamarine focus:border-transparent outline-none transition-all group-hover:border-aquamarine/40 pr-32 text-sand placeholder:text-sand/90"
              />
              <button 
                onClick={handleNext}
                disabled={loading || !formData[steps[currentStep].key as keyof typeof formData].trim()}
                className="absolute right-2 top-2 bottom-2 bg-midnight hover:bg-midnight/80 text-sand px-8 rounded-xl font-medium transition-all disabled:opacity-50 border border-aquamarine/20"
              >
                {loading ? 'Thinking...' : 'Next'}
              </button>
            </div>
          </div>
        )}
        
        {idea && (
          <div className="mt-8 p-8 glass-card rounded-3xl border-aquamarine/30 glow-shadow animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] text-aquamarine uppercase tracking-widest font-bold block mb-1">Generated Blueprint for {formData.companyName}</span>
                <h3 className="text-2xl font-medium text-sand tracking-tight">{idea.name}</h3>
              </div>
              <button onClick={() => {setIdea(null); setCurrentStep(0); setFormData({niche:'', companyName:'', digitalPresence:'', features:'', challenges:'', opportunities:'', email:''})}} className="text-sand/40 hover:text-sand text-xs underline">Start Over</button>
            </div>
            <p className="text-sm text-sand/80 mb-6 font-normal leading-relaxed">{idea.concept}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
               <div>
                  <h4 className="text-[10px] font-bold text-aquamarine uppercase tracking-widest mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {idea.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="text-xs text-sand/60 flex items-center gap-2">
                        <span className="w-1 h-1 bg-aquamarine rounded-full"></span> {f}
                      </li>
                    ))}
                  </ul>
               </div>
               <div>
                  <h4 className="text-[10px] font-bold text-aquamarine uppercase tracking-widest mb-2">Market Strategy</h4>
                  <p className="text-xs text-sand/60 leading-tight">{idea.marketFit.substring(0, 100)}...</p>
               </div>
            </div>
            <div className="bg-aquamarine/10 border border-aquamarine/20 p-4 rounded-xl text-center">
              <p className="text-xs text-aquamarine font-medium">A full PDF copy has been sent to <span className="underline">{formData.email}</span></p>
            </div>
          </div>
        )}
      </div>
      
      <div className="relative">
        <div className="absolute -inset-4 bg-midnight/20 blur-3xl rounded-full opacity-50"></div>
        <div className="relative glass-card p-4 rounded-3xl border-aquamarine/10 overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=1200" 
            alt="AI Workflow and Agentic Automation Visualization" 
            className="rounded-2xl w-full aspect-[4/3] object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 opacity-90"
          />
        </div>
      </div>
    </section>
  );
};

const Features: React.FC = () => {
  const expertiseItems = [
    { 
      id: '1', 
      title: 'Start Fast', 
      description: 'Our AI generated Blueprint gives you head start and gives us directions to assemble an AI team that can work for you. Filling out the lean canvas and value proposition canvas will put us on the same page.', 
      Icon: StartFastIcon 
    },
    { 
      id: '2', 
      title: 'Scale Smart', 
      description: 'Our workflows are very modular and our multi LLM stack helps to scale at your pace. You can add more agents that work as a team on demand and can choose to increase tokens for better performance.', 
      Icon: ScaleSmartIcon 
    },
    { 
      id: '3', 
      title: 'You are in Control', 
      description: 'Our tech will access the front and backend layers, while the data and the CRM will be in your control. This provides absolute control on your customer data and financials.', 
      Icon: ControlIcon 
    },
  ];

  return (
    <section id="solutions" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-32">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-[#FFFFFF] leading-tight md:whitespace-nowrap overflow-hidden text-ellipsis tracking-tight">
          Ai automation Suite for <span className="text-aquamarine">Entrepreneurs and Consultants</span>
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-sand/90 tracking-tight">
          Modular, Scalable and Customizable
        </h2>
        <h3 className="text-base md:text-lg lg:text-xl font-normal text-sand/60 max-w-4xl mx-auto tracking-tight">
          Built on lean six sigma framework for maximum efficiency
        </h3>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {expertiseItems.map(({ id, title, description, Icon }) => (
          <div key={id} className="p-8 glass-card rounded-3xl hover:border-aquamarine/40 transition-all group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-aquamarine/5 rounded-full blur-2xl group-hover:bg-aquamarine/10 transition-colors"></div>
            <div className="mb-6 p-3 bg-midnight/40 w-fit rounded-2xl group-hover:scale-105 transition-transform duration-300 border border-aquamarine/20">
              <Icon />
            </div>
            <h3 className="text-xl font-medium mb-3 text-sand tracking-tight">{title}</h3>
            <p className="text-sm text-sand/80 font-normal leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const AIAgents: React.FC = () => {
  const agents = [
    {
      title: 'Email Agent',
      desc: 'Automates high-quality email creation, personalization, and outreach.',
      features: ['Bulk & targeted email campaigns', 'Personalized copy generation', 'Follow-ups, reminders, and proposals'],
      Icon: EmailIcon
    },
    {
      title: 'WhatsApp Agent',
      desc: 'Handles customer conversations, lead nurturing, and automated replies on WhatsApp.',
      features: ['24/7 automated chat handling', 'Lead capture & qualification', 'Template-based messaging'],
      Icon: WhatsAppIcon
    },
    {
      title: 'Social Media Agent',
      desc: 'Creates, schedules, and optimizes posts across all major platforms.',
      features: ['AI-generated posts & captions', 'Scheduling & auto-publishing', 'Hashtag and trend optimization'],
      Icon: SocialIcon
    },
    {
      title: 'Research Agent',
      desc: 'Finds, summarizes, and organizes information from reliable sources.',
      features: ['Competitor & market research', 'Summaries and comparisons', 'Data extraction & insights'],
      Icon: ResearchIcon
    },
    {
      title: 'Lead Generation Agent',
      desc: 'Discovers potential customers and automates outreach workflows.',
      features: ['Prospect discovery', 'Qualification scoring', 'Multi-step outreach sequences'],
      Icon: LeadGenIcon
    },
    {
      title: 'Custom Agent',
      desc: 'Based on the client\'s requirement we can create custom agents.',
      features: ['Task assignment', 'Resume screening', 'Ai Agent manager'],
      Icon: CustomIcon
    }
  ];

  return (
    <section id="agent-store" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-32">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-medium text-sand tracking-tight">Meet Your <span className="gradient-text">AI Team</span></h1>
        <h3 className="text-lg md:text-xl text-sand/60 font-normal max-w-3xl mx-auto">
          Specialized agents ready to automate your workflows and 2x your productivity
        </h3>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agents.map((agent, i) => (
          <div key={i} className="p-8 glass-card rounded-3xl hover:border-aquamarine/40 transition-all group relative overflow-hidden flex flex-col h-full">
            <div className="mb-6 p-4 bg-midnight/40 w-fit rounded-2xl border border-aquamarine/20">
              <agent.Icon />
            </div>
            <h4 className="text-2xl font-medium text-sand tracking-tight mb-3">{agent.title}</h4>
            <p className="text-sm text-sand/80 font-normal leading-relaxed mb-6">{agent.desc}</p>
            <div className="mt-auto">
              <div className="h-px bg-aquamarine/10 w-full mb-6"></div>
              <ul className="space-y-3">
                {agent.features.map((feat, idx) => (
                  <li key={idx} className="text-xs text-sand/60 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-aquamarine mt-1 flex-shrink-0"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Portfolio: React.FC = () => {
  const items: PortfolioItem[] = [
    { 
      id: '1', 
      name: 'TRAiL', 
      category: 'Finance / Hybrid AI', 
      description: 'Chartered Accountant Co-pilot. Features a secure Local LLM for sensitive data parsing, with internet connectivity for real-time tax law updates.', 
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=500' 
    },
    { 
      id: '2', 
      name: 'ORDAiN', 
      category: 'HR Tech / Hybrid AI', 
      description: "Recruiter's Co-pilot. Optimized for data security with local candidate intelligence processing and internet-connected talent sourcing.", 
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=500' 
    },
    { 
      id: '3', 
      name: 'Split / Pay', 
      category: 'Fintech', 
      description: 'Escrow + Block Chain. Decentralized payment settlements featuring automated trust protocols and smart contract integration for complex fee splitting.', 
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=500' 
    },
  ];

  return (
    <section id="hybrid" className="py-24 bg-midnight/5 border-y border-aquamarine/5 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-medium mb-4 text-sand tracking-tight">The Studio <span className="text-aquamarine">Portfolio</span></h2>
            <p className="text-sand/60 font-normal">A showcase of specialized AI products engineered at ValueCode.</p>
          </div>
          <button className="text-aquamarine font-medium hover:text-sand transition-colors flex items-center gap-2 tracking-tight">
            View All Projects <span>→</span>
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-3xl mb-4 relative border border-aquamarine/10">
                <img src={item.image} alt={item.name} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[0.5] group-hover:grayscale-0" />
                <div className="absolute top-4 left-4 bg-midnight/90 backdrop-blur px-3 py-1.5 rounded-full text-[9px] font-normal uppercase tracking-[0.2em] border border-aquamarine/20 text-sand shadow-lg">
                  {item.category}
                </div>
              </div>
              <h3 className="text-xl font-medium mb-1 flex items-center gap-2 text-sand tracking-tight">
                {item.name}
                {item.category.includes('Hybrid') && (
                  <span className="text-[8px] bg-aquamarine/20 text-aquamarine border border-aquamarine/30 px-2 py-0.5 rounded-full uppercase font-medium tracking-wider">Hybrid AI</span>
                )}
              </h3>
              <p className="text-sand/70 text-sm font-normal leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process: React.FC = () => {
  const steps = [
    { title: 'Discovery', desc: 'We dive deep into the problem space and define the MVP scope.' },
    { title: 'AI Engineering', desc: 'Our team implements core AI capabilities using state-of-the-art models.' },
    { title: 'Launch', desc: 'Fast-track deployment to global infrastructure with edge delivery.' },
    { title: 'Optimization', desc: 'Data-driven iterative improvements to maximize user retention.' },
  ];

  return (
    <section id="process" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-32">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl font-medium mb-8 text-sand tracking-tight">Our <span className="gradient-text">Formula</span> for Success</h2>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-midnight/30 border border-aquamarine/30 flex items-center justify-center font-medium text-aquamarine">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-sand tracking-tight">{step.title}</h3>
                  <p className="text-sand/70 font-normal leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-midnight/40 to-aquamarine/10 rounded-[3rem] p-1 border border-aquamarine/20 shadow-2xl overflow-hidden group max-w-md w-full">
            <div className="bg-midnight/20 backdrop-blur rounded-[2.9rem] overflow-hidden aspect-[3/4] relative">
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200" 
                alt="AI Core Systems" 
                className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aquamarine/20 border border-aquamarine/30 text-aquamarine text-[10px] font-bold uppercase tracking-widest mb-4">
                  Core Engine
                </div>
                <h3 className="text-2xl font-bold text-sand tracking-tight mb-2">Built for Performance</h3>
                <p className="text-sand/60 text-xs font-medium leading-relaxed max-w-[240px]">Our system scales automatically with your business needs using optimized model inference.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I'm the ValueCode AI. Looking to build a micro SaaS or curious about our process? I'm here to help!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await chatWithAssistant([...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'assistant', content: responseText || "I'm sorry, I'm having trouble connecting." }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-midnight border border-aquamarine/30 rounded-full flex items-center justify-center shadow-2xl shadow-aquamarine/20 hover:scale-105 transition-transform active:scale-95"
        >
          <span className="text-2xl">💬</span>
        </button>
      ) : (
        <div className="w-[380px] h-[500px] glass-card rounded-3xl flex flex-col shadow-2xl border-aquamarine/20 animate-in fade-in zoom-in-95 duration-200 origin-bottom-right">
          <div className="p-4 border-b border-aquamarine/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-midnight flex items-center justify-center font-medium text-xs text-sand border border-aquamarine/20">V</div>
              <div>
                <p className="text-sm font-medium text-sand tracking-tight">ValueCode Assistant</p>
                <p className="text-[10px] text-aquamarine flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-aquamarine animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gunmetal hover:text-sand transition-colors">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-normal ${
                  m.role === 'user' ? 'bg-midnight border border-aquamarine/30 text-sand' : 'bg-midnight/40 text-sand/70'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-midnight/40 px-4 py-2.5 rounded-2xl flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-aquamarine animate-bounce"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-aquamarine animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-aquamarine animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-aquamarine/10">
            <div className="relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                type="text" 
                placeholder="Ask anything..."
                className="w-full bg-midnight/40 border border-aquamarine/20 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-aquamarine text-sand font-normal"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input}
                className="absolute right-2 top-2 text-aquamarine disabled:opacity-30"
              >
                ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-midnight/10 border-t border-aquamarine/5 py-20 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-midnight rounded-lg flex items-center justify-center font-medium shadow-lg shadow-midnight/30 text-sand border border-aquamarine/20">V</div>
          <span className="text-xl font-medium tracking-tight text-sand">ValueCode<span className="text-aquamarine">.in</span></span>
        </div>
        <p className="text-sand/60 max-sm mb-8 font-normal leading-relaxed">
          The premiere studio for AI-first micro software. Building the next generation of digital tools for the modern internet.
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full border border-aquamarine/20 flex items-center justify-center hover:bg-midnight transition-all text-sand">𝕏</a>
          <a href="#" className="w-10 h-10 rounded-full border border-aquamarine/20 flex items-center justify-center hover:bg-midnight transition-all text-sand">Li</a>
          <a href="#" className="w-10 h-10 rounded-full border border-aquamarine/20 flex items-center justify-center hover:bg-midnight transition-all text-sand">Gh</a>
        </div>
      </div>
      <div>
        <h4 className="font-medium mb-6 text-sand tracking-tight">Company</h4>
        <ul className="space-y-4 text-sm text-sand/60 font-normal">
          <li><a href="#" className="hover:text-aquamarine transition-colors">About</a></li>
          <li><a href="#" className="hover:text-aquamarine transition-colors">Our Works</a></li>
          <li><a href="#" className="hover:text-aquamarine transition-colors">Careers</a></li>
          <li><a href="#" className="hover:text-aquamarine transition-colors">Blog</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-medium mb-6 text-sand tracking-tight">Contact</h4>
        <ul className="space-y-4 text-sm text-sand/60 font-normal">
          <li><a href="mailto:hello@valuecode.in" className="hover:text-aquamarine transition-colors">hello@valuecode.in</a></li>
          <li><a href="#" className="hover:text-aquamarine transition-colors">Support</a></li>
          <li><a href="#" className="hover:text-aquamarine transition-colors">Schedule a call</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-aquamarine/5 text-center text-[10px] font-medium uppercase tracking-[0.3em] text-sand/40">
      © 2026 ValueCode Digital. All Rights Reserved. Engineered by Intelligence.
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1000px] pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-midnight/20 blur-[150px] rounded-full"></div>
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-aquamarine/10 blur-[120px] rounded-full"></div>
      </div>

      <Navbar />
      <main>
        <Hero />
        <Features />
        <AIAgents />
        <Portfolio />
        <Process />
        <section id="contact" className="py-24 px-6 text-center max-w-4xl mx-auto scroll-mt-32">
          <div className="glass-card rounded-[3rem] p-12 md:p-20 relative overflow-hidden group border border-aquamarine/20">
            <div className="absolute inset-0 bg-midnight/5 group-hover:bg-midnight/10 transition-colors"></div>
            <h2 className="text-4xl md:text-6xl font-medium mb-8 relative text-sand tracking-tight">Ready to <span className="gradient-text">Build?</span></h2>
            <p className="text-lg text-sand/70 mb-10 relative font-normal leading-relaxed">We are currently accepting new projects for Q1 2025. Secure your spot in our development cycle.</p>
            <button className="bg-sand text-midnight px-10 py-5 rounded-2xl font-medium text-lg hover:bg-aquamarine transition-all active:scale-95 shadow-xl relative border border-midnight/10 tracking-tight">
              Book Your Free Strategy Session
            </button>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
