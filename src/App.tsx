import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ArrowRight, 
  ChevronDown, 
  Clipboard, 
  FileText, 
  FileCheck, 
  Menu, 
  X,
  Mail,
  MapPin,
  Phone,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  LogOut,
  LogIn,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { adminService, Insight } from './services/adminService';
import { auth, signInWithGoogle } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

// --- Types ---
type SiteSettings = {
  [key: string]: any;
};

const SiteSettingsContext = React.createContext<{
  settings: SiteSettings;
  getContent: (path: string, defaultValue: string) => string;
}>({
  settings: {},
  getContent: (p, d) => d,
});

type ViewPath = 
  | '/' 
  | '/property-real-estate' 
  | '/who-we-work-with/property-and-real-estate/'
  | '/strata-management' 
  | '/who-we-work-with/strata-management/'
  | '/legal-professional-services' 
  | '/who-we-work-with/legal-professional-services/'
  | '/who-we-work-with/marketing-and-growth-teams/'
  | '/who-we-work-with/smes-founders/'
  | '/property-inspection' 
  | '/what-we-do/property-inspection-reports/'
  | '/speech-content-data' 
  | '/what-we-do/speech-content-data-intelligence/'
  | '/remote-operations' 
  | '/what-we-do/managed-remote-operations/'
  | '/process-automation' 
  | '/what-we-do/process-automation/'
  | '/what-we-do/digital-marketing/'
  | '/about' 
  | '/contact' 
  | '/insights' 
  | '/admin'
  | string;

// --- Components ---

const MarketingGrowthView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => (
  <>
    {/* Block A — Hero */}
    <section className="relative bg-gradient-to-br from-[#0A192F] to-[#112240] text-white pt-32 pb-24 overflow-hidden">
      <div className="absolute top-10 right-10 text-[18vw] font-serif font-black text-white/[0.03] pointer-events-none select-none tracking-tighter">MKT</div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-xs uppercase tracking-[0.2em] font-bold text-blue-300/60 mb-6 font-sans">
          Who we work with / Marketing and Growth Teams
        </div>
        <div className="max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8">
            A capable offshore production team for marketing and branding agencies, and the growth teams inside other businesses.
          </h1>
          <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed max-w-4xl">
            OrbitSol works as a managed offshore production and execution desk for marketing agencies, branding agencies, and in-house growth teams. We can deliver work white-label under your brand, or we can sit inside your team as an embedded growth desk. Either way, you receive a project leader who owns the relationship, with a set of trained specialists working behind them, so production becomes a repeatable rhythm rather than a freelancer chase.
          </p>
        </div>
      </div>
    </section>

    {/* Block B — Who This Page Is For */}
    <section className="py-24 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              title: "Marketing and Branding Agencies",
              content: "If you run an agency, the production layer is usually where the margin gets squeezed and where service quality starts to wobble. OrbitSol works white-label behind your brand to take that production load off your senior team, so the studio can stay focused on strategy, creative direction, and the client relationship rather than on chasing freelancers and edits.",
              points: [
                "Web build production in WordPress, Webflow, and custom stacks.",
                "Long-form content writing, search engine optimisation production, and topical authority builds.",
                "Paid media campaign setup, creative production, and weekly optimisation.",
                "Video editing, motion graphics, and short-form social cuts.",
                "Brand identity production, deck design, sales collateral, and event assets.",
                "User-experience research, usability testing, and design system documentation.",
                "Training material, e-learning module production, and learner-journey assets."
              ]
            },
            {
              title: "In-house Marketing Teams",
              content: "If you sit inside the business, OrbitSol works as an embedded growth desk that joins your stand-ups, sits on your Slack, and owns a quarterly roadmap. You set the strategy and the priorities, and we handle the production rhythm, the publishing cadence, and the reporting back."
            },
            {
              title: "Growth and Founder-Led Teams",
              content: "Smaller teams that need a marketing function without building one in-house can engage OrbitSol as a fractional desk, scaled up or down based on the quarter's priorities. The same project leader, specialists, and reporting cadence apply, with a leaner footprint."
            }
          ].map((block, idx) => (
            <div key={idx} className="p-10 rounded-2xl border border-slate-100 h-full bg-[#F8FAFC] flex flex-col shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#0A192F] mb-6">{block.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">{block.content}</p>
              {block.points && (
                <div className="mt-auto pt-8 border-t border-slate-200">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Where we typically plug in:</h4>
                  <ul className="space-y-3">
                    {block.points.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3">
                        <Check className="mt-1 text-[#2368D6] flex-shrink-0" size={14} />
                        <span className="text-slate-600 text-xs leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block C — Why Agencies Choose to Work With Us */}
    <section className="py-24 bg-white font-sans">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
           <h2 className="font-serif text-3xl font-bold text-[#0A192F] mb-6">Why Agencies Choose to Work With Us</h2>
           <p className="text-slate-500 leading-relaxed">
             Most agency-to-agency offshore arrangements break down for one of three reasons: the work needs constant supervision, the quality varies between operators, or the relationship gets confused about who is the client and who is the agency. OrbitSol is structured to avoid all three.
           </p>
        </div>
        <div className="grid sm:grid-cols-1 gap-6">
          {[
            { t: "We are white-label by default", d: "We do not approach your clients, we do not appear on the deliverable, and we do not put our brand on anything we hand back to you." },
            { t: "Named Project Leader", d: "A named project leader sits between you and our specialists, so you brief once and the work flows." },
            { t: "In-house specialists", d: "We hire and train specialists in-house rather than maintaining a freelancer roster, which keeps the quality consistent across briefs." },
            { t: "Documented standards", d: "We document the way you like the work to be done, so the team gets faster on your account over time rather than re-learning every brief." }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6 p-8 bg-[#F8FAFC] rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-[#2368D6] font-serif text-2xl font-bold">0{idx + 1}</div>
              <div>
                <h4 className="text-[#0A192F] font-bold mb-2">{item.t}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block D — Engagement Models */}
    <section className="py-24 bg-slate-50 font-sans border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold text-[#0A192F] mb-16">Engagement Models</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { t: "Option 1 - Project basis", d: "A defined deliverable with a fixed scope and price. This works best for one-off work like a website rebuild, a brand refresh, or a launch campaign, where you have a clear brief and a deadline." },
            { t: "Option 2 - Retainer", d: "A monthly hours-bank for ongoing work. This works best for agencies and in-house teams that need consistent capacity but have variable work types from week to week." },
            { t: "Option 3 - Embedded growth desk", d: "A dedicated team allocated to your business or to a key account. They join your stand-ups, sit on your Slack, and own a quarterly roadmap. This works best for agencies scaling a single large account, and for in-house teams that want a marketing function without building one in-house." }
          ].map((model, idx) => (
            <div key={idx} className="p-10 rounded-2xl border border-slate-200 bg-white shadow-md flex flex-col h-full">
              <div className="text-[#2368D6] font-black text-2xl mb-6">0{idx + 1}</div>
              <h4 className="font-serif text-xl font-bold text-[#0A192F] mb-4">{model.t}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{model.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block E — FAQ */}
    <section className="py-24 bg-white font-sans border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-16">Marketing and Growth FAQ</h2>
        <div className="space-y-4">
          <FAQItem question="Do you work white-label for agencies?" answer="Yes. White-label is the default for agency engagements. We do not approach your clients, we do not appear on the deliverable, and we do not put our brand on the work we hand back to you." />
          <FAQItem question="What kinds of marketing work do you produce?" answer="Brand identity, web design and build, content, search engine optimisation, paid media campaign setup and optimisation, video and motion, design and collateral, user-experience research and testing, design systems, event and offline branding, and training and e-learning. The full capability menu is set out on the Digital Marketing and Creative service page." />
          <FAQItem question="Can you join our project management tool?" answer="Yes. We work in the tools you already use, including the major project management, design, content, and communication platforms. The named project leader is responsible for coordinating with your team inside those tools." />
          <FAQItem question="How do you protect our client information?" answer="We sign non-disclosure agreements at company and individual level, we use restricted-access infrastructure, and we follow security protocols that have been used with our legal and financial clients since 2017." />
          <FAQItem question="What does it cost?" answer="Pricing starts at $5 per hour. Project, retainer, and embedded-desk pricing is quoted on a discovery call once we understand the scope and the working pattern." />
        </div>
      </div>
    </section>

    {/* Block F — CTA */}
    <section className="bg-[#0A192F] py-16 px-6 text-center text-white border-t border-white/10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-10">Tired of chasing freelancers and managing edits? Send us the brief and we will scope the desk.</h2>
        <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 transition-colors px-10 py-4 rounded text-xs font-bold uppercase tracking-[0.2em] shadow-xl">
          Send a marketing enquiry
        </button>
      </div>
    </section>
  </>
);

const RemoteOperationsView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => (
  <>
    {/* Section 1 - Hero */}
    <section className="relative bg-gradient-to-br from-[#0A192F] to-[#112240] text-white pt-32 pb-24 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="text-blue-300/60 font-bold uppercase tracking-[0.2em] text-xs mb-6 font-sans">Global delivery.</div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            Managed remote operations and virtual assistants for repeatable business work.
          </h1>
          <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed max-w-3xl mb-10">
            OrbitSol helps you move repeatable work into a managed offshore team without asking you to recruit, train, and supervise every person yourself. Whether you need a dedicated virtual assistant, an industry-trained desk, an operations analyst, or a remote operations manager, we work as a staffing and operations partner, which means we hire the right people for the role, train them on your way of working, and manage them on your behalf, so you receive the output without taking on extra headcount. Pricing starts at $5 per hour.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => { document.getElementById('levels')?.scrollIntoView({ behavior: 'smooth' }); }} className="bg-[#2368D6] hover:bg-blue-500 text-white px-8 py-3.5 rounded font-bold uppercase tracking-widest text-xs shadow-lg transition-all">
              View the four levels
            </button>
            <button onClick={() => onNavigate('/contact')} className="border border-white/20 text-white hover:bg-white/10 px-8 py-3.5 rounded font-bold uppercase tracking-widest text-xs transition-all">
              Send staffing requirement
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Section 2 - The Four Levels */}
    <section id="levels" className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <p className="text-[#2368D6] font-bold tracking-widest uppercase text-xs mb-4">The four levels.</p>
          <h2 className="font-serif text-4xl font-bold text-[#0A192F] mb-6">Start where the work is, and move up as it scales.</h2>
          <p className="text-slate-500 leading-relaxed text-lg">
            We understand growth plans can be fluid and dynamic, and we tailor our solutions accordingly. Most engagements with us start at Level 01 or Level 02 and graduate to Level 03 or Level 04 once you have seen what the team can do, and the pricing is published so it is easy to plan against.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              level: "LEVEL 01",
              title: "Virtual Assistants",
              desc: "Our virtual assistants handle inbox triage, calendar management, data entry, listings, customer-relationship-management hygiene, document preparation, and the dozen other small tasks that quietly take up your team's day. Every virtual assistant is trained on your standard operating procedures before they touch your work, and a project leader supervises the output, so you are not managing a freelancer relationship.",
              typical: "10 to 40 hours per week, billed per hour or as a dedicated full-time virtual assistant."
            },
            {
              level: "LEVEL 02",
              title: "Industry-Trained Desks",
              desc: "Property condition reports, strata administration, lettings inventories, legal transcription, and financial document preparation. The operators on these desks already know the workflow, which means they are not learning the basics on your account. Each desk includes a virtual assistant or a small team of virtual assistants trained on your platform, plus a project leader.",
              typical: "per-report, per-audio-minute, or as a dedicated full-time virtual assistant team."
            },
            {
              level: "LEVEL 03",
              title: "Operations Analysts",
              desc: "Standard operating procedure documentation, dashboard build-outs, workflow audits, vendor accountability, key-performance-indicator tracking, and automation setup. Operations analysts sit between a virtual assistant and a business analyst, and they are fluent enough to run the analysis and hands-on enough to build the thing.",
              typical: "fractional or dedicated full-time equivalent."
            },
            {
              level: "LEVEL 04",
              title: "Remote Operations Managers",
              desc: "A remote operations manager owns a function for you, end to end. They manage the team of virtual assistants and operators, the tools, the service-level agreements, and the reporting, so you receive a weekly read-out instead of a daily task list. This is the closest thing to hiring a chief of staff without putting one on your payroll.",
              typical: "dedicated, long-horizon."
            }
          ].map((item, idx) => (
            <div key={idx} className="group p-8 rounded bg-[#F8FAFC] border border-slate-100 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full">
              <div className="text-[10px] font-bold text-[#2368D6] tracking-widest mb-4">{item.level}</div>
              <h3 className="font-serif text-xl font-bold text-[#0A192F] mb-4">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-8 flex-grow">{item.desc}</p>
              <div className="border-t border-slate-200 pt-6">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">TYPICAL ENGAGEMENT:</div>
                <p className="text-slate-600 text-[11px] leading-relaxed italic">{item.typical}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 3 - Where We Differ */}
    <section className="py-24 bg-[#F0F7FF] font-sans">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5">
          <p className="text-[#2368D6] font-bold tracking-widest uppercase text-xs mb-4">What sets us apart.</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0A192F] mb-8 leading-tight text-balance">Three things most virtual assistant providers do not do.</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            There are hundreds of offshore virtual assistant providers in our markets, and most of them are interchangeable. We are not, and these are the reasons why.
          </p>
        </div>
        <div className="lg:col-span-7 space-y-6">
          {[
            { t: "01 - We specialise before we generalise", d: "A decade of property reports, strata, transcription, and inventory work means our Level 02 desks rarely have to learn the workflow on your account. Where the workflow is new to us, we put a senior operator on it for a one-off learning sprint, and from then on it is hands-free for you." },
            { t: "02 - We can hire for any task, not just the standard ones", d: "We practically operate as a staffing solutions agency. We recruit, train, and manage virtual assistants and specialists on your behalf. So if a new role comes up that does not fit any of our standard desks, we will scope it, find the right person, and put them to work for you." },
            { t: "03 - We manage our own team", d: "Project leaders, quality control protocols, backups, training, and reporting all sit with OrbitSol, so you manage outcomes rather than a scattered freelancer or virtual assistant bench." }
          ].map((point, idx) => (
            <div key={idx} className="bg-white p-8 rounded border border-blue-100 shadow-sm">
              <h4 className="font-bold text-[#0A192F] mb-2 font-serif text-lg">{point.t}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{point.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 4 - How We Hire */}
    <section className="py-24 bg-white font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <p className="text-[#2368D6] font-bold tracking-widest uppercase text-xs mb-4">How we hire.</p>
        <h2 className="font-serif text-4xl font-bold text-[#0A192F]">The team is the work.</h2>
      </div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        <div>
          <h4 className="font-bold text-[#0A192F] mb-4 text-lg">We hire for English and analytical skills first</h4>
          <p className="text-slate-500 text-sm leading-relaxed">Every virtual assistant and operator on every desk has strong written and spoken English, and we test for it before we hire.</p>
        </div>
        <div>
          <h4 className="font-bold text-[#0A192F] mb-4 text-lg">We train before we deploy</h4>
          <p className="text-slate-500 text-sm leading-relaxed">Two to four weeks of industry-specific, platform-specific, and client-specific training is built in before any virtual assistant touches live work.</p>
        </div>
        <div>
          <h4 className="font-bold text-[#0A192F] mb-4 text-lg">We invest in retention</h4>
          <p className="text-slate-500 text-sm leading-relaxed">Average tenure on the core team is over four years, so the virtual assistant on your account is someone who plans to be here for the long run, and clients are not constantly retraining new people.</p>
        </div>
      </div>
    </section>

    {/* Section 5 - What You See */}
    <section className="py-20 bg-[#F8FAFC] font-sans">
       <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-lg leading-relaxed italic">
            "As a client, you will have a dedicated project leader, an agreed standard operating procedure, a task queue, access controls, backup virtual assistant coverage, a weekly delivery report, and improvement notes that show where the workflow can be made better over time."
          </p>
       </div>
    </section>

    {/* Section 6 - FAQ */}
    <section className="py-24 bg-white font-sans">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-16">Remote Operations FAQ</h2>
        <div className="space-y-4">
          <FAQItem 
            question="How is this different from hiring a virtual assistant agency?" 
            answer="Most virtual assistant agencies sell you a block of hours and leave you to manage the relationship and the quality. We work the way a staffing agency would, which means we recruit for the role, train the virtual assistant on your processes, and put a project leader in charge of the output. The cost is comparable to hiring a freelance virtual assistant, and the reliability is closer to having an in-house team." 
          />
          <FAQItem 
            question="Do you offer dedicated virtual assistants or shared ones?" 
            answer="Both. You can engage a dedicated virtual assistant for ongoing work, or you can buy a block of shared hours for occasional tasks. Most clients begin with a dedicated virtual assistant once the workload settles." 
          />
          <FAQItem 
            question="How quickly can we start?" 
            answer="Most engagements start with a two-week pilot, scoped on a discovery call. From the first call to active work is typically 10 to 14 business days." 
          />
          <FAQItem 
            question="What happens if my virtual assistant is sick or on leave?" 
            answer="Every dedicated engagement includes a trained backup virtual assistant at no additional cost. They sit alongside your primary virtual assistant and step in for leave, sickness, or peak load." 
          />
          <FAQItem 
            question="Do we have to manage your team?" 
            answer="No. We have project leaders who manage our virtual assistants and operators, and you manage the work, which means what needs to be done, by when, and to what standard. We handle everything else." 
          />
          <FAQItem 
            question="How do you handle data security?" 
            answer="We sign non-disclosure agreements at company and individual level, we use restricted-access infrastructure, and we follow security protocols that have stood up to audits from our legal and financial clients since 2017." 
          />
          <FAQItem 
            question="What does it cost?" 
            answer="Pricing starts at $5 per hour. Per-report and per-function pricing is quoted on a discovery call once we understand the scope." 
          />
        </div>
      </div>
    </section>

    {/* Section 7 - Closing CTA */}
    <section className="bg-[#0A192F] py-24 px-6 text-center text-white border-t border-white/10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Ready to move a recurring function into a managed offshore desk?</h2>
        <p className="text-blue-100/60 mb-12 text-lg">
          Send us the task list, the target hours, or the output you need, and we will suggest the leanest starting model, whether it is a single virtual assistant or a full operations desk.
        </p>
        <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 transition-colors px-10 py-4 rounded text-xs font-bold uppercase tracking-[0.2em] shadow-xl">
          Send staffing requirement
        </button>
      </div>
    </section>
  </>
);

const SMEsFoundersView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => (
  <>
    {/* Block A — Hero */}
    <section className="relative bg-gradient-to-br from-[#0A192F] to-[#112240] text-white pt-32 pb-24 overflow-hidden font-sans">
      <div className="absolute top-10 right-10 text-[18vw] font-serif font-black text-white/[0.03] pointer-events-none select-none tracking-tighter">SME</div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-xs uppercase tracking-[0.2em] font-bold text-blue-300/60 mb-6 underline decoration-[#2368D6] underline-offset-8">
          Who we work with / SMEs and Founders
        </div>
        <div className="max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8">
            Hire a virtual chief of staff.
          </h1>
          <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed max-w-4xl">
            We support business owners and managers who need an assistant who can also document a process, build a dashboard, manage a vendor, chase a renewal, schedule content, or keep a recurring workflow under control.
          </p>
        </div>
      </div>
    </section>

    {/* Block B — What We Handle */}
    <section className="py-24 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="bg-[#F8FAFC] p-10 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 border-b border-slate-200 pb-4">Scope of Support</h2>
            <ul className="space-y-4">
              {[
                "Inbox triage, calendar management, and travel coordination.",
                "Founder task management.",
                "Standard operating procedure and process documentation.",
                "Dashboard and key-performance-indicator reporting setup.",
                "Vendor accountability and renewal tracking.",
                "Customer relationship management hygiene and pipeline cleanup.",
                "Social media and content scheduling.",
                "Workflow automation setup and oversight.",
                "Recruiting and managing new role types where the task requires it."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <Check className="mt-1 text-[#2368D6] flex-shrink-0" size={14} />
                  <span className="text-slate-600 font-medium text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4 lg:pt-10">
            <div className="mb-16">
              <h3 className="text-[11px] font-bold text-[#2368D6] uppercase tracking-widest mb-6">Why this matters</h3>
              <p className="text-2xl text-[#0A192F] font-serif font-medium leading-snug">
                Many owner-led businesses have outgrown a basic virtual assistant but cannot yet justify a full-time chief of staff or operations manager.
              </p>
            </div>
            <div className="border-t border-slate-100 pt-10">
              <h3 className="font-serif text-2xl font-bold text-[#0A192F] mb-6">Our Delivery Model</h3>
              <p className="text-slate-500 leading-relaxed text-lg mb-6">
                Fractional or dedicated support, usually starting at twenty hours per week and scaling as the work becomes clearer.
              </p>
              <p className="text-slate-500 leading-relaxed">
                We document as we go, so the role becomes easier to manage, replace, or bring in-house later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Block C — How We Work */}
    <section className="py-24 bg-[#F8FAFC] font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-16">How We Work</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Discovery",
              desc: "We meet to understand the workflow, the volume, the platforms involved, and the service standards you need to maintain. We document what we hear and confirm scope before any work begins."
            },
            {
              step: "02",
              title: "Pilot",
              desc: "We run a short pilot engagement so you can see the team, the quality, and the turnaround in real conditions. The pilot is structured around a small but representative slice of your work."
            },
            {
              step: "03",
              title: "Scale",
              desc: "Once the pilot is approved, we scale the desk to your full requirement. An experienced project leader manages the relationship, and we report on output, turnaround, and improvement notes on an agreed cadence."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded border border-slate-100 shadow-sm relative group overflow-hidden">
              <div className="text-6xl font-serif font-black absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">{item.step}</div>
              <h4 className="font-serif text-xl font-bold text-[#0A192F] mb-4">{item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block D — Proof */}
    <section className="py-24 bg-white font-sans overflow-hidden">
       <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block p-1 bg-blue-50 rounded-full mb-8">
             <div className="px-4 py-1 bg-white border border-blue-100 rounded-full text-[10px] font-bold text-[#2368D6] uppercase tracking-widest">Client Proof</div>
          </div>
          <p className="text-2xl md:text-3xl font-serif text-[#0A192F] leading-snug italic mb-10">
             "The OrbitSol team have been instrumental in allowing us to scale our operations without the overhead of local hiring. Their ability to document processes while executing them is a game-changer for any growing business."
          </p>
          <div className="flex items-center justify-center gap-4">
             <div className="w-12 h-12 rounded-full bg-slate-200"></div>
             <div className="text-left">
                <div className="font-bold text-[#0A192F] text-sm">Managing Director</div>
                <div className="text-slate-400 text-xs tracking-widest uppercase">Property Technology Group</div>
             </div>
          </div>
       </div>
    </section>

    {/* Block E — FAQ */}
    <section className="py-24 bg-[#F8FAFC] font-sans border-y border-slate-100">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-16">Founder Support FAQ</h2>
        <div className="space-y-4">
          <FAQItem question="How do you handle data security?" answer="We sign non-disclosure agreements at company and individual level, we use restricted-access infrastructure, and our security protocols have been in place since 2017." />
          <FAQItem question="Which tools and platforms do you work in?" answer="We work in the tools you already use, including the major productivity, customer relationship management, project management, and dashboard platforms. Where a platform is new to us, we train before we touch live work." />
          <FAQItem question="How quickly can we start?" answer="Most engagements move from first call to active work in 10 to 14 business days, including discovery, scoping, and pilot setup." />
          <FAQItem question="How is the work managed?" answer="A project leader manages the operator and the workflow on your behalf. You communicate with the project leader and the assistant, and we handle quality control, training, and backup coverage." />
          <FAQItem question="What happens when the assistant is on leave?" answer="Every dedicated engagement includes a trained backup operator at no additional cost, who steps in for leave, sickness, or peak demand." />
          <FAQItem question="What does it cost?" answer="Pricing starts at $5 per hour. Pricing for fractional and dedicated arrangements is quoted on a discovery call." />
        </div>
      </div>
    </section>

    {/* Block F — Closing Call to Action */}
    <section className="bg-[#0A192F] py-24 px-6 text-center text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 italic">Send us the work you keep pushing to the end of the day.</h2>
        <div className="mt-12">
          <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 transition-colors px-12 py-4 rounded text-xs font-bold uppercase tracking-[0.2em] shadow-xl">
            Scope founder support
          </button>
        </div>
      </div>
    </section>
  </>
);

const DigitalMarketingView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => (
  <>
    {/* Section 1 - Hero */}
    <section className="relative bg-[#0A192F] text-white pt-32 pb-24 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-xs uppercase tracking-[0.2em] font-bold text-blue-300/60 mb-6 underline decoration-[#2368D6] underline-offset-8">Digital Marketing and Creative.</div>
        <div className="max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8">
            A growth desk you can actually rely on.
          </h1>
          <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed mb-10 max-w-4xl">
            OrbitSol helps businesses plan, build, and run the marketing work that is difficult to keep moving in-house, including brand identity, websites, content, search engine optimisation, generative engine optimisation, paid campaigns, conversion rate optimisation, dashboards, user-experience research, collateral, video, training, and e-learning. We can deliver a single project, a monthly retainer, or a managed offshore team. You receive a project leader who owns the relationship, with a set of specialists working behind them.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl transition-all">
              Send a marketing enquiry
            </button>
            <button onClick={() => window.location.href='mailto:info@orbitsol.com'} className="border border-white/20 text-white hover:bg-white/10 px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-sm">
              Email info@orbitsol.com
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Section 2 - Service Menu (Capability Sections) */}
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-x-20 gap-y-24">
          {[
            {
              id: "brand",
              title: "Brand and Identity",
              desc: "Logo systems, visual identity, brand guidelines, and sales collateral. Whether you are starting from scratch or refining a brand that has drifted, we build identity systems your team can apply consistently across channels.",
              items: ["Logo design and full identity systems.", "Brand guidelines and asset libraries.", "Sales collateral, proposal templates, and pitch decks.", "Stationery, signage, and print collateral."]
            },
            {
              id: "web",
              title: "Web Design and Build",
              desc: "WordPress, Webflow, and custom builds. We design and build sites that move buyers through the funnel, and we put as much thought into the structure as we do into the visual.",
              items: ["WordPress, Webflow, and custom development.", "Information architecture and content strategy.", "Conversion-focused landing pages.", "Ongoing maintenance, hosting management, and feature rollouts."]
            },
            {
              id: "content",
              title: "Content and Search Engine Optimisation",
              desc: "Long-form articles, newsletters, technical search engine optimisation, and topical authority building. Content is what makes the rest of the marketing work, and it is the most under-invested area for most businesses.",
              items: ["Long-form articles, case studies, and pillar pages.", "Email newsletters and audience nurture sequences.", "Technical search engine optimisation audits and on-page optimisation.", "Topical authority planning and content calendars."]
            },
            {
              id: "paid",
              title: "Paid Media",
              desc: "Meta, Google, and LinkedIn campaign setup, creative production, and ongoing optimisation. We build the funnel underneath the ads, so the spend produces results you can attribute.",
              items: ["Meta, Google, and LinkedIn campaign setup.", "Creative production, including static, video, and carousel formats.", "Conversion tracking and attribution setup.", "Weekly optimisation and reporting."]
            },
            {
              id: "video",
              title: "Video and Motion",
              desc: "Short-form social edits, explainers, interview cuts, and motion graphics. The hardest part of video is keeping a pipeline running every week, and that is what we are good at.",
              items: ["Short-form social video for Instagram, TikTok, and LinkedIn.", "Explainer videos and product demonstrations.", "Interview editing and podcast cuts.", "Motion graphics and brand-consistent templates."]
            },
            {
              id: "design",
              title: "Design and Collateral",
              desc: "Decks, reports, one-pagers, and sales enablement, the not-quite-marketing, not-quite-operations work that nobody owns. We own it for you.",
              items: ["Sales decks and pitch presentations.", "Annual reports and capability documents.", "One-pagers and product sheets.", "Event and trade-show assets."]
            },
            {
              id: "ux",
              title: "User-Experience Research and Testing",
              desc: "Research interviews, usability tests, and A/B testing, the work that keeps your product or website grounded in how people actually use it.",
              items: ["Personas and journey maps.", "Moderated and unmoderated usability testing.", "A/B test design and analysis.", "Insight reports your team can act on."]
            },
            {
              id: "design-systems",
              title: "Design Systems and Governance",
              desc: "Figma libraries, accessibility audits, and user-experience governance for product teams that want consistency across surfaces and shipping speed at the same time.",
              items: ["Figma component libraries and user-interface kits.", "Accessibility audits and remediation.", "Design system documentation.", "Governance models and review cadences."]
            },
            {
              id: "experience",
              title: "Experience Strategy and Service Design",
              desc: "Journey maps, service blueprints, and experience roadmaps, used where the design work needs to align with broader business goals before any pixel work begins.",
              items: ["Customer and employee journey mapping.", "Service blueprints across channels.", "Experience roadmaps and prioritisation.", "Workshop facilitation."]
            },
            {
              id: "offline",
              title: "Branding for Events and Offline",
              desc: "Exhibitions, stage design, marketing collateral, and event signage. The physical side of the brand, executed with the same care as the digital side.",
              items: ["Booth and exhibition design.", "Stage and event branding.", "Standees, brochures, and on-site collateral.", "Print-ready production files."]
            },
            {
              id: "training",
              title: "Training and E-learning",
              desc: "Workshops, e-learning modules, activity-based playbooks, and certification material. Useful where you are scaling a team and want the training built in. This sits inside our Digital Marketing and Creative service rather than as a separate service line.",
              items: ["Training material and workshop design.", "E-learning modules and SCORM packages.", "Activity-based playbooks and assessments.", "Certification frameworks and learner journeys."]
            },
            {
              id: "employee",
              title: "Employee Experience",
              desc: "Internal tools, employer branding, and onboarding experiences. The work that makes your team's day-to-day better, and your hiring story sharper.",
              items: ["Internal tool user-experience and design support.", "Employer branding and recruiting collateral.", "Onboarding journeys and assets.", "Internal campaigns and engagement programmes."]
            }
          ].map((service) => (
            <div key={service.id} id={service.id} className="scroll-mt-32 h-full flex flex-col">
              <h3 className="font-serif text-2xl font-bold text-[#0A192F] mb-4">{service.title}</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed mb-6">{service.desc}</p>
              <ul className="space-y-2 mt-auto">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="mt-1 text-[#2368D6] flex-shrink-0" size={14} />
                    <span className="text-slate-600 text-xs leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 3 - How We Engage */}
    <section className="py-24 bg-[#0A192F] text-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-300/80 font-bold tracking-widest uppercase text-xs mb-4">Engagement models.</p>
          <h2 className="font-serif text-4xl font-bold mb-4 text-white">Three ways to start with us.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { t: "Option 1 - Project basis", d: "A defined deliverable with a fixed scope and price. This works best for one-off work like a website rebuild, a brand refresh, or a launch campaign." },
            { t: "Option 2 - Retainer", d: "A monthly hours-bank for ongoing work. This works best for marketing teams that need consistent capacity but have variable work types from week to week." },
            { t: "Option 3 - Embedded growth desk", d: "A dedicated team allocated to your business. They join your stand-ups, sit on your Slack, and own a quarterly roadmap. This works best for businesses that want a marketing function without building one in-house." }
          ].map((item, idx) => (
            <div key={idx} className="p-10 rounded bg-[#112240] border border-white/5 flex flex-col h-full">
              <h4 className="font-serif text-xl font-bold mb-4">{item.t}</h4>
              <p className="text-blue-100/50 text-sm leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 4 - Pricing */}
    <section className="py-20 bg-slate-50 text-center font-sans">
       <div className="max-w-4xl mx-auto px-6">
          <p className="text-slate-600 text-lg">
            Pricing starts at $5 per hour. Project, retainer, and embedded-desk pricing is quoted on a discovery call once we understand the scope.
          </p>
       </div>
    </section>

    {/* Section 5 - Closing CTA */}
    <section className="py-24 bg-white text-center font-sans border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0A192F] mb-12">If you are running marketing on too many freelancers and not enough rhythm, let us fix that.</h2>
        <div className="flex flex-wrap justify-center gap-6 items-center">
           <button onClick={() => window.location.href='mailto:info@orbitsol.com'} className="bg-[#2368D6] hover:bg-blue-500 text-white px-10 py-4 rounded font-bold uppercase tracking-widest text-xs shadow-xl transition-all">
             Email us at info@orbitsol.com
           </button>
           <button onClick={() => onNavigate('/contact')} className="text-slate-400 font-bold uppercase tracking-widest text-xs hover:text-[#0A192F] transition-colors">
             Or send a note via /contact
           </button>
        </div>
      </div>
    </section>
  </>
);

const ProcessAutomationView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => (
  <>
    {/* Section 1 - Hero */}
    <section className="relative bg-gradient-to-br from-[#0A192F] to-[#112240] text-white pt-32 pb-24 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-3/5">
          <div className="text-blue-300/60 font-bold uppercase tracking-[0.2em] text-xs mb-6 underline decoration-[#2368D6] underline-offset-8">Process and Automation.</div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8">
            Make recurring work easier to run, easier to measure, and safer to scale.
          </h1>
          <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed mb-10 max-w-2xl">
            Many businesses rely on knowledge that lives in a few people's heads, which is fine until one of them takes a day off. OrbitSol helps turn that knowledge into clear standard operating procedures, dashboards, handover materials, and practical automations, so your team can run the work consistently and improve it over time. We document the work, automate the boring parts, and keep humans where they matter.
          </p>
          <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 text-white px-10 py-4 rounded font-bold uppercase tracking-widest text-xs shadow-xl transition-all">
            Send a workflow enquiry
          </button>
        </div>
        <div className="md:w-2/5 hidden md:block">
           <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"></div>
              <svg className="relative w-full h-auto text-blue-400/40" viewBox="0 0 200 200" fill="none">
                 <rect x="10" y="80" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
                 <path d="M50 100 H80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                 <circle cx="100" cy="100" r="24" stroke="currentColor" strokeWidth="2" />
                 <path d="M124 100 H150" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                 <rect x="150" y="80" width="40" height="40" rx="20" stroke="currentColor" strokeWidth="2" />
                 <path d="M100 76 V50 H150" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                 <circle cx="150" cy="50" r="10" stroke="currentColor" strokeWidth="1.5" />
              </svg>
           </div>
        </div>
      </div>
    </section>

    {/* Section 2 - What We Deliver */}
    <section className="py-24 bg-white font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { t: "Standard operating procedure documentation", d: "Written, screen-captured, and stored in a system your team can actually use." },
            { t: "Workflow audits", d: "We identify the slow steps, the duplicated effort, and the avoidable handoffs in your operation." },
            { t: "Dashboard build-out", d: "Key-performance-indicator dashboards in Notion, Google Sheets, Looker Studio, Power BI, or your existing business intelligence tool." },
            { t: "Automation setup", d: "Zapier, Make, n8n, and native integrations between the tools you already use." },
            { t: "AI-assisted tooling", d: "Practical AI workflows with sensible checks for security and accuracy." },
            { t: "Vendor accountability tracking", d: "Service-level tracking for the third parties your operation depends on." }
          ].map((card, idx) => (
            <div key={idx} className="p-10 rounded-2xl border border-slate-100 bg-[#F8FAFC] shadow-sm hover:border-blue-100 transition-all flex flex-col h-full hover:shadow-lg">
              <h4 className="font-serif text-xl font-bold text-[#0A192F] mb-6 tracking-tight uppercase">{card.t}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{card.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 3 - How the Workflow Runs */}
    <section className="py-24 bg-[#F8FAFC] font-sans border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-16">How the Workflow Runs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "1. We map the recurring work, the file sources, the tools, the templates, the access rules, and the approval points.",
            "2. We build the standard operating procedure and assign trained operators under a project leader.",
            "3. We process the work inside your required platform or template, with quality assurance checks before delivery.",
            "4. We report on output, turnaround, issues, and improvement opportunities, so the workflow becomes easier to manage over time."
          ].map((step, idx) => (
            <div key={idx} className="relative p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-slate-600 text-sm leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    
    {/* Section 4 - Pricing */}
    <section className="py-24 bg-white font-sans text-center">
       <div className="max-w-4xl mx-auto px-6">
          <p className="text-3xl md:text-4xl font-serif font-bold text-[#0A192F] mb-4 text-balance">Pricing starts at $5 per hour.</p>
          <p className="text-slate-500 italic">Engagement-specific pricing is quoted on a discovery call.</p>
       </div>
    </section>

    {/* Section 5 - Closing Call to Action */}
    <section className="bg-[#0A192F] py-24 px-6 text-center text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Tired of explaining the same workflow every week?</h2>
        <p className="text-xl text-blue-100/70 mb-12 max-w-2xl mx-auto">
          Send us the process, the people involved, and the output you need, and we will help turn it into something easier to run.
        </p>
        <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 transition-colors px-12 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl">
          Send a workflow enquiry
        </button>
      </div>
    </section>
  </>
);

const StrataManagementView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => (
  <>
    {/* Block A — Hero */}
    <section className="relative bg-gradient-to-br from-[#0A192F] to-[#112240] text-white pt-32 pb-24 overflow-hidden font-sans">
      <div className="absolute top-5 right-10 text-[18vw] font-serif font-black text-white/3 pointer-events-none select-none tracking-tighter">STR</div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-xs uppercase tracking-[0.2em] font-bold text-blue-300/60 mb-6 font-sans">
          Who we work with / Strata Management
        </div>
        <div className="max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8">
            A managed offshore strata desk that understands the daily pressure on portfolio teams.
          </h1>
          <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed max-w-4xl">
            OrbitSol supports strata firms with correspondence, meeting preparation, levy queries, insurance follow-ups, owner communications, and file management. The desk works inside your platform, follows your rules, and gives managers more time to focus on the work that needs local judgement.
          </p>
        </div>
      </div>
    </section>

    {/* Block B — What We Handle */}
    <section className="py-24 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-[11px] font-bold text-[#2368D6] uppercase tracking-widest mb-8">What We Handle</h2>
            <ul className="space-y-4">
              {[
                "Owner and committee correspondence.",
                "Meeting agendas, notices, minutes, and action tracking.",
                "Levy queries, arrears follow-up, and payment-plan administration.",
                "Insurance claim follow-up, renewals, and certificate requests.",
                "Maintenance and work-order coordination.",
                "Records, compliance documentation, and file management.",
                "Dashboard and key-performance-indicator reporting for portfolio health."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <Check className="mt-1 text-[#2368D6] flex-shrink-0" size={16} />
                  <span className="text-slate-600 font-medium text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4 lg:pt-10">
            <p className="text-xl text-[#0A192F] leading-relaxed mb-10">
              We understand that strata portfolios generate a constant flow of administration, queries, and documentation, and offshore support only helps when the team is trained, supervised, and embedded properly.
            </p>
            <div className="border-t border-slate-100 pt-10">
              <h3 className="font-serif text-2xl font-bold text-[#0A192F] mb-6">Our delivery model:</h3>
              <p className="text-slate-500 leading-relaxed mb-6">
                A dedicated project leader, trained strata associates, documented standard operating procedures, and weekly reporting. We log into your platform and work alongside your team rather than passing tasks back and forth through email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Block C — How We Work */}
    <section className="py-24 bg-[#F8FAFC] font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-16">How We Work</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Discovery",
              desc: "We meet to understand the workflow, the volume, the platforms involved, and the service standards you need to maintain. We document what we hear and confirm scope before any work begins."
            },
            {
              step: "02",
              title: "Pilot",
              desc: "We run a short pilot engagement so you can see the team, the quality, and the turnaround in real conditions. The pilot is structured around a small but representative slice of your work."
            },
            {
              step: "03",
              title: "Scale",
              desc: "Once the pilot is approved, we scale the desk to your full requirement. A dedicated project leader manages the relationship, and we report on output, turnaround, and improvement notes on an agreed cadence."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm relative group overflow-hidden hover:shadow-lg transition-all">
              <div className="text-6xl font-serif font-black absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">{item.step}</div>
              <h4 className="font-serif text-xl font-bold text-[#0A192F] mb-4">{item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block D — Proof */}
    <section className="py-24 bg-white font-sans overflow-hidden">
       <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block p-1 bg-blue-50 rounded-full mb-8">
             <div className="px-4 py-1 bg-white border border-blue-100 rounded-full text-[10px] font-bold text-[#2368D6] uppercase tracking-widest">Sector Capability</div>
          </div>
          <p className="text-2xl md:text-3xl font-serif text-[#0A192F] leading-snug italic mb-10">
             "OrbitSol's strata associates operate as an extension of our portfolio management team, working directly in our systems to handle the administrative volume that previously overwhelmed our strata managers."
          </p>
          <div className="flex items-center justify-center gap-4">
             <div className="w-12 h-12 rounded-full bg-slate-200"></div>
             <div className="text-left">
                <div className="font-bold text-[#0A192F] text-sm">Strata Principal</div>
                <div className="text-slate-400 text-xs tracking-widest uppercase">Strata Management Group</div>
             </div>
          </div>
       </div>
    </section>

    {/* Block E — FAQ */}
    <section className="py-24 bg-[#F8FAFC] font-sans border-y border-slate-100">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-16">Strata Management FAQ</h2>
        <div className="space-y-4">
          <FAQItem 
            question="How do you handle data security for owner records?" 
            answer="We sign non-disclosure agreements as standard, we work on your platform behind your access controls, and we follow restricted-access policies that we have used with our legal and financial clients since 2017." 
          />
          <FAQItem 
            question="Which strata platforms do you work in?" 
            answer="We are familiar with StrataMaster, Strataware, MYBOS, and several proprietary platforms. Where you use a system we have not yet trained on, we put a senior operator on it for a one-off learning sprint, and from then on the platform is hands-off for you." 
          />
          <FAQItem 
            question="Can you cover after-hours correspondence?" 
            answer="Yes. Our team operates across time zones, which means a request that lands in your inbox at 5 pm can be handled immediately and ready for review first thing in a few hours." 
          />
          <FAQItem 
            question="How quickly can we start?" 
            answer="Most engagements move from first call to active work in 10 to 14 business days, including discovery, scoping, and pilot setup." 
          />
          <FAQItem 
            question="What does it cost?" 
            answer="Pricing starts at $5 per hour. We can quote a precise number on a discovery call once we understand the scope and the volume." 
          />
        </div>
      </div>
    </section>

    {/* Block F — Closing CTA */}
    <section className="bg-[#0A192F] py-24 px-6 text-center text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-10">Losing hours to strata admin? Send us the function and we will scope the desk.</h2>
        <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 transition-colors px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl">
          Scope a strata desk
        </button>
      </div>
    </section>
  </>
);

const PropertyRealEstateView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => (
  <>
    {/* Block A — Hero */}
    <section className="relative bg-gradient-to-br from-[#0A192F] to-[#112240] text-white pt-32 pb-24 overflow-hidden font-sans">
      <div className="absolute top-5 right-10 text-[18vw] font-serif font-black text-white/3 pointer-events-none select-none tracking-tighter">PRP</div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-xs uppercase tracking-[0.2em] font-bold text-blue-300/60 mb-6">
          Who we work with / Property and Real Estate
        </div>
        <div className="max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-balance">
            An offshore production and admin layer for the businesses that run residential and commercial property.
          </h1>
          <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed max-w-4xl">
            OrbitSol supports lettings agencies, property inventory and inspection firms, and real estate agencies through a single managed offshore desk. Whether your work is producing property condition reports (PCRs) and checkin/checkout reports, keeping a sales and property management agency moving, or scaling a white-label inspection production line, the same delivery discipline applies. You will have a well-oiled engine of smart systems and trained operators on your platforms, your templates, and your service standards.
          </p>
        </div>
      </div>
    </section>

    {/* Block B — Who This Page Is For */}
    <section className="py-24 bg-white font-sans border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              title: "Lettings and Inventory Firms",
              desc: "OrbitSol has produced lettings and inventory reports for United Kingdom agencies since 2016, and our senior typists bring more than fifteen years of experience to the work. We support standard, express, and super-express turnarounds without changing your templates or platforms.",
              scope: [
                "Inventory and schedule of condition reports.",
                "Check-in reports with the tenant present or remote.",
                "Check-out comparison reports.",
                "Interim and mid-term inspections.",
                "Deposit schedule preparation.",
                "Photo embedding, tagging, and basic image cleanup.",
                "Landlord and tenant communications around inspections.",
                "Dispute documentation support for TDS, DPS, and MyDeposits."
              ]
            },
            {
              title: "Real Estate Agencies",
              desc: "We support sales and property management teams with listings, customer-relationship-management hygiene, landlord reporting, lease administration, inspection scheduling, and the repetitive work that stops agents from staying close to clients.",
              scope: [
                "Listing creation and portal upload.",
                "Website and social property updates.",
                "Customer relationship management hygiene and pipeline management.",
                "Routine inspection scheduling and report production.",
                "Landlord monthly and quarterly reporting.",
                "Maintenance triage and trade coordination.",
                "Lease preparation and renewal administration.",
                "Application processing and reference checks.",
                "Sales contract administration and settlement coordination."
              ]
            },
            {
              title: "Property Inspection Agencies",
              desc: "If property inspection is your business, then report production is usually the scaling constraint. OrbitSol handles that layer quietly, accurately, and in the format your clients already expect, white-label by default.",
              scope: [
                "Pre-tenancy inventories and schedules of condition.",
                "Mid-term and routine inspection reports.",
                "Check-in and check-out reports.",
                "Property condition reports (PCRs) for sales and rentals.",
                "Building inspection report typing.",
                "Photo embedding, tagging, and organisation.",
                "Quality control and audit grading.",
                "Peak-season capacity planning."
              ]
            }
          ].map((block, idx) => (
            <div key={idx} className="p-10 rounded border border-slate-100 bg-[#F8FAFC] flex flex-col h-full">
              <h3 className="font-serif text-2xl font-bold text-[#0A192F] mb-6">{block.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">{block.desc}</p>
              <div className="mt-auto pt-8 border-t border-slate-200/60">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Detailed Scope:</h4>
                <ul className="space-y-3">
                  {block.scope.map((s, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-3">
                      <Check className="mt-1 text-[#2368D6] flex-shrink-0" size={14} />
                      <span className="text-slate-600 text-xs leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block C — Why This Matters */}
    <section className="py-24 bg-[#F8FAFC] font-sans">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-2xl md:text-3xl font-serif text-[#0A192F] leading-snug text-center mb-16">
          Across all three buyer types, we understand that the work that grows an agency is the work that lives in front of clients, while the work that gets stuck is administrative, repeatable, and deadline-driven.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { t: "Inspectors", d: "Can only inspect as fast as the report layer keeps up." },
            { t: "Agents", d: "Can only sell or lease as fast as the listings, the contracts, and the landlord reports get done." },
            { t: "Inventory firms", d: "Can only quote new work when last week's reports are out the door." }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <h4 className="font-bold text-[#0A192F] mb-2">{item.t}</h4>
              <p className="text-slate-500 text-sm">{item.d}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-600 leading-relaxed max-w-2xl mx-auto">
          OrbitSol takes the production and admin layer off your team without changing your platforms, your templates, or your service standards.
        </p>
      </div>
    </section>

    {/* Block D — Our Delivery Model */}
    <section className="py-24 bg-white font-sans border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#0A192F] mb-8">Our Delivery Model</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            A dedicated project leader, trained operators, documented standard operating procedures, and quality control before delivery. We work in the platforms you already use, including InventoryBase, Inventory Hive, Kaptur, PropertyMe, Inspection Express, Rentfind, Microsoft Word templates, and a wide range of custom client platforms.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            Where the platform is new to us, we run a one-off learning sprint with a senior operator before any live work begins. 
          </p>
          <div className="grid grid-cols-2 gap-6 bg-slate-50 p-8 rounded border border-slate-100">
            <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Standard Turnaround</p>
               <p className="text-xl font-serif font-bold text-[#0A192F]">24 Hours</p>
            </div>
            <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Express Options</p>
               <p className="text-xl font-serif font-bold text-[#2368D6]">3 - 6 Hours</p>
            </div>
          </div>
        </div>
        <div className="bg-[#0A192F] p-10 rounded text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
           <h3 className="font-serif text-xl font-bold mb-6">Speed Benchmarks</h3>
           <ul className="space-y-4 text-sm text-blue-100/70">
              <li className="flex justify-between items-center pb-4 border-b border-white/10">
                 <span>Standard Inventory</span>
                 <span className="font-bold text-white">24h</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-white/10">
                 <span>Express Production</span>
                 <span className="font-bold text-white">6h</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-white/10">
                 <span>Super-Express</span>
                 <span className="font-bold text-white">3h</span>
              </li>
              <li className="flex justify-between items-center">
                 <span>Administrative Tasks</span>
                 <span className="font-bold text-white">Same Day</span>
              </li>
           </ul>
        </div>
      </div>
    </section>

    {/* Block E — How We Work */}
    <section className="py-24 bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-16">How We Work</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Discovery",
              desc: "We meet to understand the workflow, the volume, the platforms involved, and the service standards you need to maintain. We document what we hear and confirm scope before any work begins."
            },
            {
              step: "02",
              title: "Pilot",
              desc: "We run a short pilot engagement so you can see the team, the quality, and the turnaround in real conditions."
            },
            {
              step: "03",
              title: "Scale",
              desc: "Once the pilot is approved, we scale the desk to your full requirement, with one of our stellar project leaders managing the relationship and reporting on agreed metrics."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm relative group overflow-hidden hover:shadow-lg transition-all">
              <div className="text-6xl font-serif font-black absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">{item.step}</div>
              <h4 className="font-serif text-xl font-bold text-[#0A192F] mb-4">{item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block F — FAQ */}
    <section className="py-24 bg-white font-sans border-y border-slate-100">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-16">Property & Real Estate FAQ</h2>
        <div className="space-y-4">
          <FAQItem question="What turnaround times do you offer?" answer="Standard turnaround is 24 hours, express is 6 hours, and super-express is 3 hours where the scope allows it. Administrative tasks are typically same-day or next-business-day." />
          <FAQItem question="Which platforms do you work in?" answer="InventoryBase, Inventory Hive, Kaptur, PropertyMe, Inspection Express, Rentfind, the major customer-relationship-management and property management platforms used in Australia and the United Kingdom, Microsoft Word templates, and a wide range of custom client platforms. Where the platform is new to us, we train a senior operator before any live work." />
          <FAQItem question="Do you handle photo tagging?" answer="Yes. Photo tagging is included in the report price by default." />
          <FAQItem question="Can you handle a backlog?" answer="Yes. We regularly take on backlogs of several hundred reports and clear them inside a fortnight." />
          <FAQItem question="How do you handle dispute-grade documentation?" answer="With the level of detail you would want in front of an arbitrator. We can also flag items the inspector should photograph more thoroughly during the visit." />
          <FAQItem question="Can you generate reports from photos and videos?" answer="Yes, we can, and we do. We can work with you to design workflows that minimize time spent by inspectors without sacrificing accuracy." />
          <FAQItem question="How do you handle data security?" answer="We sign non-disclosure agreements at company and individual level, we use restricted-access infrastructure, and we follow security protocols that have been in place with our legal and financial clients since 2017." />
          <FAQItem question="What does it cost?" answer="Pricing starts at $5 per hour, with per-report pricing quoted on a discovery call once we understand the scope." />
        </div>
      </div>
    </section>

    {/* Block G — Closing Call to Action */}
    <section className="bg-[#0A192F] py-24 px-6 text-center text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Stop letting production and admin set your growth ceiling.</h2>
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 transition-colors px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl">
            Request a no-cost trial
          </button>
        </div>
      </div>
    </section>
  </>
);

const InsightsView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await adminService.getInsights();
        setInsights(data || []);
      } catch (error) {
        console.error("Failed to fetch insights", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  return (
    <>
      {/* Section 1 - Hero */}
      <section className="relative bg-[#0A192F] text-white pt-32 pb-24 overflow-hidden font-sans border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            Insights on managed operations, remote teams, and practical automation.
          </h1>
          <p className="text-lg md:text-xl text-blue-100/60 leading-relaxed max-w-3xl">
            Practical thinking for professional firms looking to build more scalable, resilient, and accurate operational layers.
          </p>
        </div>
      </section>

      {/* Section 2 - Feed */}
      <section className="py-24 bg-white font-sans min-h-[400px]">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2368D6]"></div>
            </div>
          ) : insights.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {insights.map((post) => (
                <div key={post.id} className="group cursor-pointer">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="aspect-[16/9] w-full object-cover rounded-2xl mb-6 border border-slate-100 group-hover:border-blue-200 transition-all shadow-sm group-hover:shadow-md"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="aspect-[16/9] bg-[#F8FAFC] rounded-2xl mb-6 border border-slate-100 group-hover:border-blue-200 transition-all shadow-sm group-hover:shadow-md"></div>
                  )}
                  <span className="text-[#2368D6] font-bold text-[10px] uppercase tracking-widest block mb-3">{post.tag}</span>
                  <h3 className="font-serif text-xl font-bold text-[#0A192F] mb-4 group-hover:text-[#2368D6] transition-colors leading-snug">{post.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{post.summary}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400">No insights published yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Section 3 - Newsletter */}
      <section className="bg-[#F8FAFC] py-20 px-6 font-sans border-y border-slate-200">
        <div className="max-w-3xl mx-auto text-center">
           <h2 className="font-serif text-3xl font-bold text-[#0A192F] mb-6">Brief monthly updates on operational excellence.</h2>
           <p className="text-slate-500 mb-10">Join 500+ professionals getting our latest thinking once a month. No spam.</p>
           <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email address" className="flex-grow p-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#2368D6] shadow-sm" required />
              <button type="submit" className="bg-[#0A192F] hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-md">
                 Subscribe
              </button>
           </form>
        </div>
      </section>

      {/* Section 4 - CTA */}
      <section className="bg-white py-24 text-center font-sans">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-serif text-3xl font-bold text-[#0A192F] mb-8">Have a specific workflow question?</h2>
            <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 text-white px-10 py-4 rounded font-bold uppercase tracking-widest text-xs shadow-xl transition-all">
               Ask our operations team
            </button>
         </div>
      </section>
    </>
  );
};

const Header = ({ currentPath, onNavigate }: { currentPath: ViewPath, onNavigate: (path: ViewPath) => void }) => {
  const { getContent } = React.useContext(SiteSettingsContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);

  const whoWeServe = [
    { label: 'Property and Real Estate', path: '/who-we-work-with/property-and-real-estate/' },
    { label: 'Strata Management', path: '/who-we-work-with/strata-management/' },
    { label: 'Legal & Professional Services', path: '/who-we-work-with/legal-professional-services/' },
    { label: 'Marketing and Growth Teams', path: '/who-we-work-with/marketing-and-growth-teams/' },
    { label: 'SMEs and Founders', path: '/who-we-work-with/smes-founders/' },
  ];

  const whatWeDo = [
    { label: 'Property Inspection Reports', path: '/what-we-do/property-inspection-reports/' },
    { label: 'Process and Automation', path: '/what-we-do/process-automation/' },
    { label: 'Digital Marketing and Creative', path: '/what-we-do/digital-marketing/' },
    { label: 'Speech, Content & Data', path: '/what-we-do/speech-content-data-intelligence/' },
    { label: 'Managed Remote Operations', path: '/what-we-do/managed-remote-operations/' },
  ];

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Who We Serve', dropdown: whoWeServe },
    { label: 'What We Do', dropdown: whatWeDo },
    { label: 'Insights', path: '/insights' },
    { label: 'About', path: '/about' },
  ];

  const logoUrl = getContent('global.logoUrl', '');

  return (
    <header 
      className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('/')}>
          {logoUrl && !logoError ? (
             <img 
               src={logoUrl} 
               alt={getContent('global.siteName', 'OrbitSol')} 
               className={`h-10 w-auto object-contain ${logoError ? 'hidden' : 'block'}`} 
               onError={() => setLogoError(true)}
             />
          ) : null}
          {(logoError || !logoUrl) && (
            <div className="flex flex-col">
              <div className="font-serif text-2xl font-black text-[#0A192F] leading-none tracking-tight">
                {getContent('global.siteName', 'OrbitSol')}
              </div>
              <div className="text-[9px] font-bold tracking-[0.25em] text-slate-400 uppercase mt-1.5">
                {getContent('global.tagline', 'BRINGING WORLDS TOGETHER')}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div 
              key={item.label} 
              className="relative py-8"
              onMouseEnter={() => item.dropdown ? setActiveDropdown(item.label) : setActiveDropdown(null)}
            >
              {item.path ? (
                <button
                  onClick={() => onNavigate(item.path as ViewPath)}
                  className={`text-xs uppercase tracking-widest font-bold transition-colors ${
                    currentPath === item.path ? 'text-[#2368D6]' : 'text-slate-500 hover:text-[#0A192F]'
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <button
                  className={`text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-1 ${
                    activeDropdown === item.label ? 'text-[#2368D6]' : 'text-slate-500 hover:text-[#0A192F]'
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} size={12} />
                </button>
              )}

              {/* Dropdown Menu */}
              {item.dropdown && (
                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden py-4"
                    >
                      {item.dropdown.map((subItem) => (
                        <button
                          key={subItem.label}
                          onClick={() => {
                            onNavigate(subItem.path as ViewPath);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-8 py-3 text-xs font-bold text-slate-500 hover:text-[#2368D6] hover:bg-slate-50 transition-all uppercase tracking-widest border-l-2 border-transparent hover:border-[#2368D6]"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          
          <button
            onClick={() => onNavigate('/contact')}
            className="bg-[#0A192F] hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-md ml-4"
          >
            Get a Quote
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl"
          >
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-slate-100 py-2">
                {item.path ? (
                  <button
                    onClick={() => {
                      onNavigate(item.path as ViewPath);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-lg font-serif font-medium text-[#081A33] w-full"
                  >
                    {item.label}
                  </button>
                ) : (
                  <div className="py-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">{item.label}</div>
                    <div className="flex flex-col gap-4 pl-4 border-l border-slate-100">
                      {item.dropdown?.map((sub) => (
                        <button
                          key={sub.path}
                          onClick={() => {
                            onNavigate(sub.path as ViewPath);
                            setIsMobileMenuOpen(false);
                          }}
                          className="text-left text-sm font-medium text-slate-600 hover:text-[#2368D6] transition-colors"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                onNavigate('/contact');
                setIsMobileMenuOpen(false);
              }}
              className="bg-[#2368D6] text-white hover:bg-blue-700 px-6 py-3 rounded-lg text-sm font-medium transition-colors mt-4 shadow-sm w-full"
            >
              Contact Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const AboutView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => {
  const { getContent } = React.useContext(SiteSettingsContext);
  return (
    <>
      {/* Section 1 - Hero */}
      <section className="relative bg-white pt-32 pb-24 overflow-hidden font-sans border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-[#0A192F]">
            {getContent('about.heroTitle', 'A decade as the behind-the-scenes engine for businesses around the world.')}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto">
            {getContent('about.heroDesc', 'OrbitSol began in 2015 with property report production and grew by solving adjacent workflow problems for the same kinds of clients. We use technology to support delivery, but accountability stays with people.')}
          </p>
        </div>
      </section>

    {/* Section 2 - Our Story */}
    <section className="py-24 bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#0A192F] mb-8">Our Story</h2>
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              OrbitSol was founded in <a href="https://www.keralatourism.org/topic/kochi" target="_blank" rel="noopener noreferrer" className="text-[#2368D6] hover:underline">Kochi</a>, on India's southwest coast in the state of Kerala, by a team with deep experience in transcription and business-process-outsourcing.
            </p>
            <p>
              The first OrbitSol clients were UK property inspection firms that needed accurate typing, and within two years the business had built relationships that would last more than a decade.
            </p>
            <p>
              We have grown without venture capital by focusing entirely on helping our clients build their businesses, and we continue to approach every new engagement with the same commitment.
            </p>
          </div>
        </div>
        <div className="bg-white p-10 rounded shadow-sm border border-slate-200">
           <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 border-b border-slate-200 pb-4">Milestones</h3>
           <div className="space-y-8 relative">
              <div className="absolute left-[30px] top-4 bottom-4 w-px bg-slate-100 z-0"></div>
              {[
                { year: "2015", event: "OrbitSol founded, first UK property inspection clients onboarded." },
                { year: "2016", event: "First Australian PCR and strata clients onboarded." },
                { year: "2017", event: "Legal transcription line launched." },
                { year: "2019", event: "Embedded operations work begins." },
                { year: "2024", event: "Ops analyst and remote ops manager tier launched." },
                { year: "2026", event: "Five service pillars and expanded Kochi office." }
              ].map((m, idx) => (
                <div key={idx} className="flex gap-6 items-start relative z-10">
                   <div className="bg-white py-1">
                      <span className="font-serif font-black text-[#2368D6] text-xl min-w-[60px] block">{m.year}</span>
                   </div>
                   <p className="text-slate-600 text-sm leading-relaxed pt-1">{m.event}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>

    {/* Section 3 - Team */}
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold text-[#0A192F] mb-16 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {[
            { n: "Ann Mary Jerin", r: "Founder and Managing Director" },
            { n: "Bijoy Verghese", r: "Chief Operating Officer" },
            { n: "Hermie H. Thomas", r: "Head - Client Success" },
            { n: "Nikita Thakar", r: "Senior Manager - Client Success" },
            { n: "Michelle Otway", r: "Client Success Manager (AU/NZ)" },
            { n: "Goutham Krishna", r: "Manager - Operations" },
            { n: "Aravind Subash", r: "Project Manager" },
            { n: "Ashley Bonson", r: "Project Manager" },
            { n: "Aswathy V. B.", r: "Project Manager" },
            { n: "Vibhija S.", r: "Senior Manager - Finance" }
          ].map((member, idx) => (
            <div key={idx} className="text-center group">
               <div className="w-full aspect-square bg-[#F8FAFC] rounded-full mb-4 border border-slate-100 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all overflow-hidden">
                  <span className="text-[#2368D6] opacity-10"><FileText size={48} /></span>
               </div>
               <h4 className="font-bold text-[#0A192F] text-sm mb-1">{member.n}</h4>
               <p className="text-slate-400 text-xs leading-tight">{member.r}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 4 - Principles */}
    <section className="py-24 bg-[#0A192F] text-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold mb-16 text-center">Five things we never compromise on.</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {[
            { t: "Intelligence & Critical Thinking", d: "Every operator is tested for these before hiring." },
            { t: "Train Before Deploy", d: "Role, platform, and client-specific training is standard." },
            { t: "Quality Control", d: "Deliverables are checked before they leave the desk." },
            { t: "Trusted Project Leaders", d: "A named person responsible for your account." },
            { t: "Confidentiality", d: "NDAs and named access are standard practice." }
          ].map((p, idx) => (
            <div key={idx} className="p-8 rounded bg-[#112240] border border-white/5">
               <div className="text-[#2368D6] font-black text-3xl mb-6 opacity-20">0{idx + 1}</div>
               <h4 className="font-bold mb-4 text-sm leading-tight group-hover:text-blue-300">{p.t}</h4>
               <p className="text-blue-100/50 text-xs leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
  );
};

const ContactView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => {
  const { getContent } = React.useContext(SiteSettingsContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactEmail = getContent('global.contactEmail', 'info@orbitsol.com');
  const contactPhone = getContent('global.phone', '+1-833-384-1500');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Form submission error:", error);
      // Fallback for non-Netlify environments (like GitHub Pages)
      const name = formData.get('name');
      const service = formData.get('service');
      const message = formData.get('message');
      const mailtoLink = `mailto:${contactEmail}?subject=Enquiry from ${name} regarding ${service}&body=${encodeURIComponent(message as string)}`;
      
      if (confirm("Notice: Automatic submission is only available on Netlify. Would you like to send this enquiry via email instead?")) {
        window.location.href = mailtoLink;
        setSubmitted(true);
      }
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-32 bg-white text-center font-sans h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Check size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#0A192F] mb-4">Enquiry Received</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for reaching out. Your enquiry has been sent to our team at <strong>{contactEmail}</strong>. We will get back to you shortly.
          </p>
          <button 
            onClick={() => onNavigate('/')}
            className="bg-[#0A192F] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all hover:bg-slate-800"
          >
            Return Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Section 1 - Hero */}
      <section className="relative bg-[#F8FAFC] pt-32 pb-24 overflow-hidden font-sans border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-8 text-[#0A192F]">
              Send us the workflow, sample file, or task list you want handled.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-12">
              Tell us what you need completed, where the input comes from, what the output should look like, and how often the work repeats.
            </p>
            <div className="space-y-6 pt-12 border-t border-slate-200">
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</p>
                  <a href={`mailto:${contactEmail}`} className="text-2xl font-serif font-bold text-[#2368D6] hover:underline">{contactEmail}</a>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Phone Number (Toll-free)</p>
                  <p className="text-2xl font-serif font-bold text-[#0A192F]">{contactPhone}</p>
                  <p className="text-xs text-slate-400 mt-1">Reachable from any country</p>
               </div>
            </div>
          </div>
          <div className="bg-white p-10 rounded shadow-2xl border border-slate-100">
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true"
              className="space-y-6" 
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="grid sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Name *</label>
                    <input name="name" type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded focus:border-[#2368D6] outline-none transition-colors" required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email *</label>
                    <input name="email" type="email" className="w-full p-3 bg-slate-50 border border-slate-200 rounded focus:border-[#2368D6] outline-none transition-colors" required />
                 </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Company</label>
                    <input name="company" type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded focus:border-[#2368D6] outline-none transition-colors" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Country</label>
                    <input name="country" type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded focus:border-[#2368D6] outline-none transition-colors" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Service Interest</label>
                 <select name="service" className="w-full p-3 bg-slate-50 border border-slate-200 rounded focus:border-[#2368D6] outline-none transition-colors text-sm">
                    <option>Property Inspection Reports</option>
                    <option>Managed Remote Operations</option>
                    <option>Digital Marketing & Creative</option>
                    <option>Process and Automation</option>
                    <option>Speech and Content Intelligence</option>
                    <option>General Enquiry</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">What do you want handled? *</label>
                 <textarea name="message" rows={4} className="w-full p-3 bg-slate-50 border border-slate-200 rounded focus:border-[#2368D6] outline-none transition-colors resize-none" required></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#2368D6] hover:bg-blue-500 text-white py-4 rounded font-bold uppercase tracking-widest text-xs shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : 'Send enquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => {
  const { getContent } = React.useContext(SiteSettingsContext);

  return (
    <footer className="bg-[#0A192F] text-blue-50/70 pt-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="font-serif text-2xl font-bold text-white mb-2">{getContent('global.siteName', 'OrbitSol')}</div>
            <div className="text-sm text-blue-300 mb-6">{getContent('global.tagline', 'Bringing Worlds Together.')}</div>
            <p className="text-sm leading-relaxed">
              {getContent('global.footerDesc', 'Managed offshore workflows for property, strata, transcription, remote operations, marketing production, and process automation.')}
            </p>
          </div>
          <div>
            <h4 className="font-serif text-white text-lg font-semibold mb-6">Who We Work With</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate('/strata-management')} className="hover:text-white transition-colors">Strata Management</button></li>
              <li><button onClick={() => onNavigate('/property-real-estate')} className="hover:text-white transition-colors">Property & Real Estate</button></li>
              <li><button onClick={() => onNavigate('/legal-professional-services')} className="hover:text-white transition-colors">Legal & Professional</button></li>
              <li><button onClick={() => onNavigate('/smes-founders')} className="hover:text-white transition-colors">SMEs and Founders</button></li>
              <li><button onClick={() => onNavigate('/marketing-growth')} className="hover:text-white transition-colors">Marketing & Growth</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-white text-lg font-semibold mb-6">What We Do</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate('/what-we-do/property-inspection-reports/')} className="hover:text-white transition-colors">Property Inspection Reports</button></li>
              <li><button onClick={() => onNavigate('/speech-content-data')} className="hover:text-white transition-colors">Speech & Content Data</button></li>
              <li><button onClick={() => onNavigate('/remote-operations')} className="hover:text-white transition-colors">Managed Remote Operations</button></li>
              <li><button className="hover:text-white transition-colors cursor-default">Digital Marketing & Creative</button></li>
              <li><button onClick={() => onNavigate('/process-automation')} className="hover:text-white transition-colors">Process and Automation</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-white text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">About</button></li>
              <li><button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">How we work</button></li>
              <li><button onClick={() => onNavigate('/insights')} className="hover:text-white transition-colors">Insights</button></li>
              <li><button className="hover:text-white transition-colors cursor-default">Careers</button></li>
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-white text-lg font-semibold mb-6">Offices</h4>
            <ul className="space-y-3 text-sm">
              <li>Headquarters: Kochi, India.</li>
              <li>Australia presence.</li>
              <li className="text-white pt-2 flex items-center gap-2">
                <Mail size={14} /> {getContent('global.contactEmail', 'info@orbitsol.com')}
              </li>
              <li className="text-white flex items-center gap-2">
                 <Phone size={14} /> {getContent('global.phone', '+1-833-384-1500')}
              </li>
              <li className="text-xs text-blue-50/50 mt-1 block pl-6">(reachable from any country)</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>© {new Date().getFullYear()} OrbitSol. All rights reserved.</div>
          <div className="flex gap-6">
            <button className="hover:text-white">Privacy policy</button>
            <button className="hover:text-white">Terms of service</button>
            <button className="hover:text-white">Cookie settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-4">
      <button
        className="w-full flex justify-between items-center text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-serif text-xl font-medium text-[#0A192F] pr-8">{question}</span>
        <ChevronDown 
          className={`text-[#2368D6] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={20} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-slate-600 leading-relaxed pb-4 pt-2">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Page Views ---

const HomeView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => {
  const { getContent } = React.useContext(SiteSettingsContext);

  return (
    <>
      <section className="relative bg-gradient-to-br from-[#0A192F] to-[#112240] text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current" preserveAspectRatio="none">
            <circle cx="80" cy="50" r="40" stroke="white" strokeWidth="0.5" fill="none" />
            <circle cx="80" cy="50" r="30" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
            <circle cx="80" cy="50" r="20" stroke="white" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <p className="text-blue-300/80 font-medium tracking-widest uppercase text-xs mb-6">
              {getContent('home.heroTag', 'Managed offshore operations / Powered by Practical AI')}
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-8">
              {getContent('home.heroTitle', 'Turn recurring work into managed workflows your team can rely on.')}
            </h1>
            <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed mb-12 max-w-3xl">
              {getContent('home.heroDesc', 'OrbitSol helps property, strata, lettings, legal, and professional services firms move reporting, transcription, and admin work into a managed offshore operating layer.')}
            </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 text-white px-8 py-3.5 rounded font-bold uppercase tracking-widest text-xs shadow-lg transition-all">
              Send a workflow enquiry
            </button>
            <button onClick={() => window.location.href='mailto:info@orbitsol.com'} className="border border-white/20 text-white hover:bg-white/10 px-8 py-3.5 rounded font-bold uppercase tracking-widest text-xs transition-all">
              Email info@orbitsol.com
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10 text-xs font-sans tracking-tight">
            <div><strong className="block text-3xl font-serif mb-1">2015</strong> Established</div>
            <div><strong className="block text-3xl font-serif mb-1">200k+</strong> Reports Processed</div>
            <div><strong className="block text-3xl font-serif mb-1">1M+</strong> Dedicated Hours</div>
            <div><strong className="block text-3xl font-serif mb-1">$5/hr</strong> Starting Rate</div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#F8FAFC] border-b border-slate-100 py-5">
      <div className="max-w-7xl mx-auto px-6 text-center text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
        Property report production <span className="mx-3 opacity-20">|</span> Strata administration <span className="mx-3 opacity-20">|</span> Lettings inventories <span className="mx-3 opacity-20">|</span> Legal transcription <span className="mx-3 opacity-20">|</span> Remote operations
      </div>
    </section>

    <section id="who-we-serve" className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <p className="text-[#2368D6] font-bold tracking-widest uppercase text-xs mb-4">Who we serve.</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-[#0A192F] mb-8 leading-[1.1] tracking-tight max-w-4xl">
            Built for teams whose work depends on accurate, repeatable operations.
          </h2>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-4xl">
            OrbitSol supports teams that need work completed consistently inside their existing tools, 
            templates, and service standards. The work is scoped, documented, assigned to trained 
            operators, and managed through handpicked project leads.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Strata Management', path: '/who-we-work-with/strata-management/' },
            { title: 'Property and Real Estate', path: '/who-we-work-with/property-and-real-estate/' },
            { title: 'Legal & Professional Services', path: '/who-we-work-with/legal-professional-services/' },
            { title: 'SMEs and Founder-Led Businesses', path: '/who-we-work-with/smes-founders/' },
            { title: 'Marketing & Growth Teams', path: '/who-we-work-with/marketing-and-growth-teams/' }
          ].map((service) => (
            <div
              key={service.path}
              onClick={() => onNavigate(service.path as ViewPath)}
              className="group cursor-pointer p-10 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all duration-300 bg-white flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl"
            >
              <div className="flex-grow">
                <h3 className="font-serif text-2xl font-bold text-[#0A192F] mb-6 group-hover:text-[#2368D6] transition-colors">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-10">Dedicated offshore support tailored to your industry's specific workflow requirements.</p>
              </div>
              <div className="flex items-center gap-2 text-[#2368D6] text-sm font-bold">
                <span>Explore services</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
          
          {/* Custom Desk Card */}
          <div className="bg-[#F8FAFC] p-10 rounded-2xl flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.01)] border border-slate-100/50">
             <h3 className="font-serif text-2xl font-bold text-[#0A192F] mb-4">Don't see your sector?</h3>
             <p className="text-slate-500 text-sm mb-10">We build custom desks for unique workflows.</p>
             <button 
               onClick={(e) => { e.stopPropagation(); onNavigate('/contact'); }}
               className="w-full bg-[#2368D6] hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-md"
             >
               Send an enquiry
             </button>
          </div>
        </div>
      </div>
    </section>

    <section id="what-we-do" className="py-24 bg-[#0A192F] text-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <div className="text-blue-400 font-bold tracking-widest uppercase text-[11px] mb-6 underline decoration-blue-500 underline-offset-8">What we do.</div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight max-w-4xl">
            Multiple managed workflow lines, one operating partner.
          </h2>
          <p className="text-lg md:text-xl text-blue-100/60 leading-relaxed max-w-3xl">
            Each OrbitSol service line follows the same delivery logic: scope the workflow, 
            document the process, and assign trained operators.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: '01', title: 'Property Inspection Reports', path: '/what-we-do/property-inspection-reports/', desc: 'Inspection reports, inventories, and routines produced from dictation or photos.' },
            { id: '02', title: 'Process and Automation', path: '/what-we-do/process-automation/', desc: 'SOP documentation, workflow audits, and custom dashboard build-outs.' },
            { id: '03', title: 'Digital Marketing & Creative', path: '/what-we-do/digital-marketing/', desc: 'Managed creative production including web, content, SEO, and paid media.' },
            { id: '04', title: 'Speech, Content, & Data', path: '/what-we-do/speech-content-data-intelligence/', desc: 'Audio transcription, video, and documents turned into workflow-ready outputs.' },
            { id: '05', title: 'Managed Remote Operations', path: '/what-we-do/managed-remote-operations/', desc: 'Virtual assistants and dedicated operational desks to handle your daily business admin.' }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(item.path as ViewPath)}
              className="cursor-pointer group p-10 rounded-2xl bg-[#112240] border border-white/5 hover:border-blue-500/50 hover:bg-[#162e52] transition-all duration-300 flex flex-col h-full shadow-2xl"
            >
              <div className="flex-grow">
                <div className="text-[#2368D6] font-serif text-5xl font-black mb-8 opacity-20 group-hover:opacity-40 transition-opacity">{item.id}</div>
                <h3 className="font-serif text-2xl font-bold mb-6 group-hover:text-blue-300 transition-colors uppercase tracking-tight">{item.title}</h3>
                <p className="text-blue-100/50 text-sm leading-relaxed mb-6">{item.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                <span>View Capability</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
  );
};

const SpeechContentDataView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => (
  <>
    {/* Section 1 - Hero */}
    <section className="relative bg-gradient-to-br from-[#0A192F] to-[#112240] text-white pt-32 pb-24 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="text-blue-300/60 font-bold uppercase tracking-[0.2em] text-xs mb-6">Speech, Content, and Data Intelligence.</div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8">
            Turn speech, video, documents, and raw content into structured, usable business intelligence.
          </h1>
          <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed mb-10 max-w-4xl">
            OrbitSol helps businesses convert audio, video, documents, notes, recordings, and unstructured content into accurate, searchable, and workflow-ready outputs. We support audio transcription, AI transcript correction, caption preparation, subtitling support, meeting summaries, metadata tagging, document indexing, content classification, and structured data extraction, with trained human review built into every workflow.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg transition-all">
              Send a sample file
            </button>
            <button onClick={() => onNavigate('/contact')} className="border border-white/20 text-white hover:bg-white/10 px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all">
              Scope a content workflow
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Section 2 - Opening Section */}
    <section className="py-24 bg-white font-sans border-b border-slate-100">
       <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif text-[#0A192F] font-bold mb-8 text-center">Your business already has the data. The problem is that much of it is trapped in unusable formats.</h2>
          <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
            <p>
              Calls, meetings, inspections, interviews, webinars, training videos, reports, forms, and document sets often hold valuable information, but they are difficult to search, analyse, share, or act on when they remain as raw recordings or as scattered files. OrbitSol turns that material into structured outputs your team can use inside daily operations, compliance, reporting, training, research, marketing, and client service workflows.
            </p>
            <p>
              We use technology where it improves speed and consistency, but we do not treat machine output as the final answer. Our operators review, correct, classify, format, and quality-check the work, so the final deliverable is accurate enough to file, publish, search, caption, summarise, or hand over to another team.
            </p>
          </div>
       </div>
    </section>

    {/* Capability Strip (Section 9 partial) */}
    <section className="py-8 bg-slate-50 border-b border-slate-100 overflow-hidden">
       <div className="max-w-7xl mx-auto px-6 whitespace-nowrap">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] opacity-60">
             <span>Audio transcription</span>
             <span className="text-slate-200">•</span>
             <span>Captions</span>
             <span className="text-slate-200">•</span>
             <span>Subtitles</span>
             <span className="text-slate-200">•</span>
             <span>Metadata</span>
             <span className="text-slate-200">•</span>
             <span>Summaries</span>
             <span className="text-slate-200">•</span>
             <span>Document intelligence</span>
             <span className="text-slate-200">•</span>
             <span>Content indexing</span>
          </div>
       </div>
    </section>

    {/* Section 3 - What We Handle */}
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold text-[#0A192F] mb-16">What we handle.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { t: "Audio Transcription", d: "Legal, financial, academic, business, property, sermon, interview, and general audio transcription, prepared with the right balance of accuracy, formatting, and turnaround. Audio transcription has been one of OrbitSol's core services since the business began." },
            { t: "AI Transcript Proofreading", d: "Machine-generated transcripts from tools such as Zoom, Teams, Otter, Fireflies, Whisper, or other automatic-speech-recognition systems are corrected against the source recording, with names, terminology, speaker labels, and context all checked properly." },
            { t: "Captioning and Accessibility Support", d: "Caption files and accessibility-ready text outputs prepared for videos, webinars, training modules, internal communications, and digital content libraries." },
            { t: "Subtitling and Localisation Support", d: "Subtitle preparation, timing support, and translation-ready workflows for teams that need content adapted for wider audiences. Where specialist language review is required, we can structure the workflow with the right review layer." },
            { t: "Meeting Summaries and Action Notes", d: "Clean meeting records with decisions, action owners, deadlines, open questions, and next steps extracted from recordings, transcripts, or AI-generated notes." },
            { t: "Metadata Tagging and Content Indexing", d: "Speaker labels, topic tags, content categories, timestamps, keywords, asset descriptions, and indexing fields that make content easier to search, retrieve, and reuse." },
            { t: "Document Intelligence Support", d: "Document indexing, data extraction, form review, file naming, classification, validation checks, structured summaries, and workflow preparation." },
            { t: "Property Report Production", d: "Property condition reports, inventories, check-ins, check-outs, inspection reports, and routine documentation produced from dictation, photos, video, and platform notes." },
            { t: "Content Library Cleanup", d: "Backlog cleanup for recordings, transcripts, training videos, archived webinars, research interviews, inspection files, document folders, and internal knowledge libraries." }
          ].map((card, idx) => (
            <div key={idx} className="p-10 rounded-2xl border border-slate-100 bg-[#F8FAFC] shadow-sm hover:shadow-md transition-all">
               <h4 className="font-serif text-xl font-bold text-[#0A192F] mb-4">{card.t}</h4>
               <p className="text-slate-500 text-sm leading-relaxed">{card.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 4 - How the Workflow Runs */}
    <section className="py-24 bg-[#0A192F] text-white font-sans overflow-hidden">
       <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-bold mb-16">How the workflow runs.</h2>
          <div className="grid md:grid-cols-5 gap-8 relative">
             {/* Step Connector (Visual) */}
             <div className="absolute top-4 left-0 w-full h-px bg-blue-500/10 hidden md:block z-0"></div>
             {[
               { s: "Intake", d: "You send the recording, video, document set, platform export, inspection file, or content library through the agreed channel. We confirm the required output, the turnaround, the format, the security rules, and the review standard before production begins." },
               { s: "Technology-Assisted First Pass", d: "Where appropriate, we use speech-to-text, optical character recognition, extraction, classification, or AI-assisted summarisation tools to create the first layer of output and reduce manual processing time." },
               { s: "Human Review and Enrichment", d: "Trained operators review the file, correct machine errors, verify names and terminology, apply formatting, tag content, classify sections, add timestamps, extract actions, and flag unclear items for review." },
               { s: "Quality Control", d: "A quality-control layer checks the output against the source or instruction set, especially where the work involves legal, financial, property, compliance, client-facing, or publication-ready material." },
               { s: "Delivery", d: "The final output is delivered in Word, Excel, PDF, plain text, SRT, VTT, CSV, structured summary format, platform upload, or any agreed client template." }
             ].map((step, idx) => (
               <div key={idx} className="space-y-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[#2368D6] text-white flex items-center justify-center font-black text-sm mb-4 border-4 border-[#0A192F]">0{idx + 1}</div>
                  <h4 className="font-bold text-lg leading-tight">{step.s}</h4>
                  <p className="text-blue-100/50 text-[11px] leading-relaxed">{step.d}</p>
               </div>
             ))}
          </div>
       </div>
    </section>

    {/* Section 5 - Use Cases */}
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
         <h2 className="font-serif text-3xl font-bold text-[#0A192F] mb-16 text-center">Use cases.</h2>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { t: "Make recordings searchable", d: "Convert audio and video libraries into transcripts, summaries, tags, and metadata, so teams can find the information they need without listening to entire files." },
              { t: "Prepare content for publication", d: "Turn webinars, podcasts, training videos, and interviews into transcripts, captions, summaries, article drafts, quote banks, and reusable content assets." },
              { t: "Support compliance and records", d: "Create accurate written records from legal, financial, property, board, human resources, research, and client-service recordings, where accuracy and confidentiality matter." },
              { t: "Improve meeting follow-through", d: "Convert meeting recordings into clear decisions, owners, deadlines, and action logs, so important items do not disappear into long transcripts or automated notes." },
              { t: "Clean up AI-generated output", d: "Review and correct AI transcripts, summaries, captions, or extracted content before they are shared, filed, sent to clients, or used in business decisions." },
              { t: "Structure document-heavy workflows", d: "Classify, index, extract, and validate information from forms, reports, contracts, inspection files, research documents, and operational records." },
              { t: "Prepare content for wider audiences", d: "Support captions, subtitles, translation-ready text, accessibility workflows, and training content, so information can be used by more people in more contexts." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-slate-50 border border-slate-100 rounded-2xl">
                 <h4 className="font-bold text-[#0A192F] text-sm mb-3">{item.t}</h4>
                 <p className="text-slate-500 text-xs leading-relaxed">{item.d}</p>
              </div>
            ))}
         </div>
      </div>
    </section>

    {/* Section 6 & 7 - Who We Support & Output Formats */}
    <section className="py-24 bg-slate-50 font-sans border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
         <div className="grid lg:grid-cols-2 gap-16">
            <div>
               <h3 className="font-serif text-2xl font-bold text-[#0A192F] mb-8">Who we support</h3>
               <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Property and Strata Teams",
                    "Lettings and Inventory Firms",
                    "Legal and Professional Services",
                    "Financial and Advisory Teams",
                    "Research and Academic Teams",
                    "Training and Learning Teams",
                    "Marketing and Content Teams",
                    "Founder-Led Businesses"
                  ].map((segment, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-3 border-b border-slate-200">
                       <Check size={16} className="text-[#2368D6]" />
                       <span className="text-slate-600 font-medium text-sm">{segment}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div>
               <h3 className="font-serif text-2xl font-bold text-[#0A192F] mb-4">We deliver in the format your workflow needs.</h3>
               <p className="text-slate-500 text-sm leading-relaxed mb-8">
                 OrbitSol can prepare outputs for review, publication, filing, platform entry, search, reporting, or handover. The deliverable can be simple text, a structured spreadsheet, a caption file, a report, a summary, a tagged content library, or a platform-ready upload.
               </p>
               <div className="flex flex-wrap gap-2">
                  {[
                    "Word transcripts", "PDF reports", "Excel or CSV data files", "Plain text files",
                    "SRT and VTT caption files", "Timestamped transcripts", "Speaker-labelled transcripts",
                    "Meeting summaries", "Action registers", "Metadata sheets", "Document indexes",
                    "Platform-ready uploads", "Client templates"
                  ].map((ext, idx) => (
                     <span key={idx} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 text-[10px] font-bold rounded-lg shadow-sm">{ext}</span>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </section>

    {/* Section 8 - Why OrbitSol */}
    <section className="py-24 bg-white font-sans">
       <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
             <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0A192F] mb-8">Because useful content intelligence needs more than automation.</h2>
             <p className="text-slate-600 leading-relaxed text-lg max-w-3xl mx-auto">
               Automated tools are useful for speed, but they still miss accents, names, context, industry terminology, speaker changes, formatting instructions, and judgement calls. That matters when the output is being used for legal records, property documentation, financial discussions, client reporting, accessibility, training, or decision-making.
             </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { t: "Human-reviewed accuracy", d: "Important outputs are checked by trained people before delivery." },
               { t: "Technology-assisted speed", d: "AI and automation are used where they reduce time without weakening quality." },
               { t: "Structured, searchable outputs", d: "Files are prepared so teams can find, reuse, and act on the information." },
               { t: "Flexible workflows", d: "We can support one-off projects, recurring files, high-volume backlogs, or embedded desks." },
               { t: "Confidential handling", d: "Access, permissions, non-disclosure agreements, and secure transfer methods are agreed before work begins." },
               { t: "Managed delivery", d: "A named project leader coordinates the workflow, the escalations, the quality assurance, and the reporting." }
             ].map((point, idx) => (
               <div key={idx} className="p-10 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-[#0A192F] mb-4 text-lg">{point.t}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{point.d}</p>
               </div>
             ))}
          </div>
       </div>
    </section>

    {/* Section 10 - FAQ */}
    <section className="py-24 bg-[#F8FAFC] font-sans border-y border-slate-200">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-16">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FAQItem question="Do you only provide audio transcription?" answer="No. Audio transcription is one part of the service, and it has been a core capability since OrbitSol began. We also support AI transcript review, captions, subtitles, summaries, metadata tagging, document indexing, content classification, structured data extraction, and platform-ready content workflows." />
          <FAQItem question="Can you correct transcripts generated by AI tools?" answer="Yes. You can send machine-generated transcripts from common AI tools, and our team can check them against the source file, correct errors, add speaker labels, clean up the formatting, and prepare the final version for use." />
          <FAQItem question="Can you create captions or subtitle files?" answer="Yes. We can prepare caption-ready and subtitle-ready files such as SubRip Subtitle (SRT) or Web Video Text Tracks (VTT), and we can support timing, formatting, and accessibility requirements. Translation or multilingual review should be scoped based on the language pair and the final use case." />
          <FAQItem question="Can you handle legal, financial, or confidential material?" answer="Yes. Confidential work is handled through agreed access controls, non-disclosure agreements, restricted permissions, and client-specific standard operating procedures. For sensitive files, the review standard and the delivery method should be agreed before production begins." />
          <FAQItem question="Can you work with video as well as audio?" answer="Yes. We can work with audio files, video files, meeting recordings, webinars, interviews, training videos, inspection videos, and platform exports." />
          <FAQItem question="Can you tag or index content for search?" answer="Yes. We can add timestamps, speaker labels, topic tags, keywords, summaries, categories, and other metadata fields, so content is easier to search, retrieve, and reuse." />
          <FAQItem question="Can you handle recurring work?" answer="Yes. The service can run as a one-off project, a weekly workflow, a monthly backlog cleanup, a dedicated support desk, or an embedded content operations function." />
          <FAQItem question="What should we send for a sample?" answer="Please send one representative file, the required output format, any template you use, and a short note explaining how the output will be used. We will use that to recommend the simplest workflow." />
          <FAQItem question="What does it cost?" answer="Pricing starts at $5 per hour, with per-audio-minute and per-task pricing quoted on a discovery call once we understand the scope." />
        </div>
      </div>
    </section>

    {/* Section 11 - Closing CTA */}
    <section className="bg-[#0A192F] py-24 px-6 text-center text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Send us one file and the output you need from it.</h2>
        <p className="text-blue-100/60 mb-10 text-lg">Whether it is a recording, a video, a transcript, a document set, an inspection file, or a content library, we will review the input and suggest a workflow that turns it into something structured, searchable, and useful.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 transition-colors px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl">
            Send a sample file
          </button>
          <button onClick={() => onNavigate('/contact')} className="border border-white/20 hover:bg-white/10 transition-colors px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em]">
            Scope a recurring workflow
          </button>
        </div>
      </div>
    </section>
  </>
);

const AdminView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [editingInsight, setEditingInsight] = useState<Insight | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'insights' | 'settings'>('insights');
  const [selectedPage, setSelectedPage] = useState('home');
  const [pageSettings, setPageSettings] = useState<any>({});
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    if (activeTab === 'settings') {
      loadPageSettings(selectedPage);
    }
  }, [selectedPage, activeTab]);

  const loadPageSettings = async (page: string) => {
    const data = await adminService.getSettings(page);
    setPageSettings(data || {});
  };

  const handleSettingChange = (field: string, value: string) => {
    setPageSettings((prev: any) => ({ ...prev, [field]: value }));
  };

  const saveAllSettings = async () => {
    setSavingSettings(true);
    try {
      await adminService.updateSettings(selectedPage, pageSettings);
      alert("Settings saved successfully!");
      // Ideally we'd trigger a refresh in the main app too.
      // For now, window.location.reload() or just state update is fine.
    } catch (e) {
      alert("Failed to save settings");
    } finally {
      setSavingSettings(false);
    }
  };

  const getFieldsForPage = (page: string) => {
    switch (page) {
      case 'home':
        return [
          { id: 'heroTag', label: 'Hero Tag', type: 'text' },
          { id: 'heroTitle', label: 'Hero Title', type: 'text' },
          { id: 'heroDesc', label: 'Hero Description', type: 'textarea' },
        ];
      case 'global':
        return [
          { id: 'siteName', label: 'Site Name', type: 'text' },
          { id: 'logoUrl', label: 'Logo Image URL', type: 'text' },
          { id: 'logoInfo', label: 'Setting up your Logo (Required for GitHub)', type: 'info', content: '1. Rename your logo file to "logo.png".\n2. Upload it to the "public" folder in your GitHub repository.\n3. Set the "Logo Image URL" above to "/logo.png".' },
          { id: 'tagline', label: 'Tagline / Slogan', type: 'text' },
          { id: 'footerDesc', label: 'Footer Description', type: 'textarea' },
          { id: 'contactEmail', label: 'Contact Email', type: 'text' },
          { id: 'phone', label: 'Phone Number', type: 'text' },
          { id: 'address', label: 'Office Address', type: 'textarea' },
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const adminStatus = await adminService.checkIfAdmin(u.uid);
        setIsAdmin(adminStatus || u.email === 'gouthamk@orbitsol.com');
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchInsights();
    }
  }, [isAdmin]);

  const fetchInsights = async () => {
    const data = await adminService.getInsights(true);
    setInsights(data || []);
  };

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSaveInsight = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const insightData: Omit<Insight, 'id'> = {
      title: formData.get('title') as string,
      summary: formData.get('summary') as string,
      content: formData.get('content') as string,
      author: formData.get('author') as string,
      date: formData.get('date') as string || new Date().toISOString(),
      image: formData.get('image') as string,
      tag: formData.get('tag') as string,
      status: formData.get('status') as 'draft' | 'published'
    };

    try {
      if (editingInsight?.id) {
        await adminService.updateInsight(editingInsight.id, insightData);
      } else {
        await adminService.createInsight(insightData);
      }
      setIsFormOpen(false);
      setEditingInsight(null);
      fetchInsights();
    } catch (error) {
      alert("Failed to save insight. Check console for details.");
    }
  };

  const handleDeleteInsight = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this insight?")) {
      await adminService.deleteInsight(id);
      fetchInsights();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2368D6]"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-6">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl text-center border border-slate-100">
           <Settings size={48} className="mx-auto text-slate-300 mb-6" />
           <h1 className="text-2xl font-serif font-bold text-[#0A192F] mb-4">Admin Access</h1>
           <p className="text-slate-500 mb-8">This area is restricted to administrators only. Please sign in with an authorized account.</p>
           {!user ? (
             <button 
               onClick={handleLogin}
               className="w-full bg-[#0A192F] hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-md flex items-center justify-center gap-3"
             >
               <LogIn size={16} /> Sign in with Google
             </button>
           ) : (
             <div className="space-y-4">
                <p className="text-red-500 text-sm font-medium">Account {user.email} is not authorized.</p>
                <button 
                  onClick={() => auth.signOut()}
                  className="text-slate-400 hover:text-[#0A192F] font-bold text-xs uppercase tracking-widest"
                >
                  Sign Out
                </button>
             </div>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-20">
      {/* Sidebar/Nav */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#0A192F]">OrbitSol Admin</h1>
            <p className="text-slate-500 text-sm">Manage website content and insights.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-xl p-1 border border-slate-100 shadow-sm mr-4">
              <button 
                onClick={() => setActiveTab('insights')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'insights' ? 'bg-[#0A192F] text-white shadow-md' : 'text-slate-400 hover:text-[#0A192F]'}`}
              >
                Insights
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'settings' ? 'bg-[#0A192F] text-white shadow-md' : 'text-slate-400 hover:text-[#0A192F]'}`}
              >
                Settings
              </button>
            </div>
            {activeTab === 'insights' && (
              <button 
                onClick={() => { setEditingInsight(null); setIsFormOpen(true); }}
                className="bg-[#2368D6] hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 text-xs uppercase tracking-widest shadow-lg transition-all"
              >
                <Plus size={16} /> New Insight
              </button>
            )}
            <button 
              onClick={() => auth.signOut()}
              className="text-slate-400 hover:text-red-500 transition-colors p-2"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {activeTab === 'insights' ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="border-b border-slate-100 bg-slate-50/50 px-8 py-4">
                <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent insights</h2>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="border-b border-slate-100 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                     <th className="px-8 py-4">Title</th>
                     <th className="px-8 py-4">Tag</th>
                     <th className="px-8 py-4">Status</th>
                     <th className="px-8 py-4">Date</th>
                     <th className="px-8 py-4 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {insights.map((insight) => (
                     <tr key={insight.id} className="hover:bg-slate-50/50 transition-colors">
                       <td className="px-8 py-5">
                         <div className="font-bold text-[#0A192F] text-sm">{insight.title}</div>
                         <div className="text-slate-400 text-[10px] mt-1 truncate max-w-[300px]">{insight.summary}</div>
                       </td>
                       <td className="px-8 py-5">
                         <span className="px-2 py-1 bg-blue-50 text-[#2368D6] text-[9px] font-bold rounded uppercase tracking-widest">{insight.tag}</span>
                       </td>
                       <td className="px-8 py-5">
                         <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest ${insight.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                           {insight.status}
                         </span>
                       </td>
                       <td className="px-8 py-5 text-slate-400 text-xs">
                         {new Date(insight.date).toLocaleDateString()}
                       </td>
                       <td className="px-8 py-5 text-right">
                         <div className="flex justify-end gap-2">
                           <button 
                              onClick={() => { setEditingInsight(insight); setIsFormOpen(true); }}
                              className="p-2 text-slate-400 hover:text-[#2368D6] transition-colors"
                           >
                             <Edit size={16} />
                           </button>
                           <button 
                              onClick={() => handleDeleteInsight(insight.id!)}
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                           >
                             <Trash2 size={16} />
                           </button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Select Page</h3>
                <div className="space-y-2">
                  {['global', 'home', 'about', 'contact', 'services'].map(p => (
                    <button
                      key={p}
                      onClick={() => setSelectedPage(p)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${selectedPage === p ? 'bg-[#0A192F] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-serif text-xl font-bold text-[#0A192F] capitalize">{selectedPage} Settings</h3>
                  <button 
                    onClick={saveAllSettings}
                    disabled={savingSettings}
                    className="bg-[#2368D6] hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest shadow-md disabled:opacity-50 flex items-center gap-2"
                  >
                    {savingSettings ? 'Saving...' : <><Save size={14} /> Save Page</>}
                  </button>
                </div>

                <div className="space-y-6">
                  {getFieldsForPage(selectedPage).map(field => (
                    <div key={field.id} className="space-y-2">
                      {field.type === 'info' ? (
                        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">{field.label}</p>
                          <p className="text-xs text-blue-700 whitespace-pre-line leading-relaxed">{field.content}</p>
                        </div>
                      ) : (
                        <>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{field.label}</label>
                          {field.type === 'textarea' ? (
                            <textarea 
                              rows={4}
                              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-[#2368D6] outline-none transition-all"
                              value={pageSettings[field.id] || ''}
                              onChange={(e) => handleSettingChange(field.id, e.target.value)}
                            />
                          ) : (
                            <input 
                              type="text"
                              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:border-[#2368D6] outline-none transition-all"
                              value={pageSettings[field.id] || ''}
                              onChange={(e) => handleSettingChange(field.id, e.target.value)}
                            />
                          )}
                        </>
                      )}
                    </div>
                  ))}
                  {getFieldsForPage(selectedPage).length === 0 && (
                    <p className="text-slate-400 text-sm italic">No settings defined for this page yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-[#0A192F]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <form onSubmit={handleSaveInsight} className="flex flex-col h-full">
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-serif text-xl font-bold text-[#0A192F]">
                    {editingInsight ? 'Edit Insight' : 'Create New Insight'}
                  </h3>
                  <button type="button" onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-[#0A192F] transition-colors">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="flex-grow overflow-y-auto p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Title</label>
                      <input 
                        name="title" 
                        defaultValue={editingInsight?.title} 
                        required 
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#2368D6] transition-all"
                        placeholder="Post title"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tag / Category</label>
                      <input 
                        name="tag" 
                        defaultValue={editingInsight?.tag} 
                        required 
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#2368D6] transition-all"
                        placeholder="e.g. Operations"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Summary</label>
                    <textarea 
                      name="summary" 
                      defaultValue={editingInsight?.summary} 
                      required 
                      rows={2}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#2368D6] transition-all"
                      placeholder="Brief overview for the feed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Content (Markdown)</label>
                    <textarea 
                      name="content" 
                      defaultValue={editingInsight?.content} 
                      required 
                      rows={10}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#2368D6] transition-all font-mono text-sm"
                      placeholder="Post body..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Author</label>
                      <input 
                        name="author" 
                        defaultValue={editingInsight?.author || 'OrbitSol Team'} 
                        required 
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#2368D6] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</label>
                      <select 
                        name="status" 
                        defaultValue={editingInsight?.status || 'draft'} 
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#2368D6] transition-all appearance-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Featured Image URL</label>
                    <input 
                      name="image" 
                      defaultValue={editingInsight?.image} 
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#2368D6] transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-4">
                  <button 
                    type="button" 
                    onClick={() => setIsFormOpen(false)}
                    className="px-6 py-3 text-slate-400 font-bold uppercase tracking-[0.1em] text-[10px] hover:text-[#0A192F] transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-[#0A192F] hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-[0.1em] text-[10px] shadow-lg transition-all flex items-center gap-2"
                  >
                    <Save size={14} /> Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PropertyInspectionView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => (
  <>
    {/* Section 1 - Hero */}
    <section className="relative bg-gradient-to-br from-[#0A192F] to-[#112240] text-white pt-32 pb-24 overflow-hidden font-sans">
      <div className="absolute right-[-5%] top-[10%] opacity-10 pointer-events-none hidden lg:block">
         <FileText size={400} className="text-blue-400" />
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="text-blue-300/60 font-bold uppercase tracking-[0.2em] text-xs mb-6 underline decoration-[#2368D6] underline-offset-8">Property Inspection Reports.</div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8">
            Turn inspection inputs into client-ready reports through a managed production workflow.
          </h1>
          <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed mb-10 max-w-4xl">
            Inspectors capture findings as audio, video, photos, forms, or platform notes, and OrbitSol turns those inputs into structured, formatted, quality-checked reports inside your template or system. The workflow is built for predictable turnaround, audit-ready documentation, white-label delivery, and scalable report capacity during peak periods. Standard turnaround is 24 hours, express is 6 hours, and super-express can be 3 hours or less.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg transition-all">
              Send a sample report request
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* Section 2 - What We Produce */}
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold text-[#0A192F] mb-16">What we produce.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">
          {[
            { t: "Property Condition Reports", d: "Entry, exit, routine, and interim inspections for Australia, New Zealand, and similar markets." },
            { t: "Inventory Reports", d: "Pre-tenancy inventories with photographic evidence for United Kingdom agencies and inventory clerks." },
            { t: "Check-in and Check-out Reports", d: "Including comparison reports for deposit assessment." },
            { t: "Schedule of Condition", d: "For commercial leases and pre-renovation documentation." },
            { t: "Building Inspection Reports", d: "Pre-purchase, pre-sale, and structural inspection report typing from surveyor dictation." },
            { t: "Mid-term Inspections", d: "Routine landlord reports with photos, observations, and recommended actions." }
          ].map((card, idx) => (
            <div key={idx} className="p-10 rounded-2xl border border-slate-100 bg-[#F8FAFC] shadow-sm hover:translate-y-[-4px] transition-all flex flex-col h-full items-center sm:items-start">
               <FileCheck size={24} className="text-[#2368D6] mb-6" />
               <h4 className="font-serif text-xl font-bold text-[#0A192F] mb-4">{card.t}</h4>
               <p className="text-slate-500 text-sm leading-relaxed">{card.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Section 3 - How We Work */}
    <section className="py-24 bg-slate-50 font-sans border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
         <h2 className="font-serif text-3xl font-bold text-[#0A192F] mb-16">How we work.</h2>
         <div className="grid md:grid-cols-3 gap-12">
            {[
               { s: "01", t: "You inspect", d: "An inspector visits the property and captures findings room by room, using audio, photo, video, or platform-native notes." },
               { s: "02", t: "We produce", d: "Our trained personnel transcribe the dictation, extract the relevant detail from photos and videos, embed the right images, format the reports, and send them through quality control." },
               { s: "03", t: "You review and deliver", d: "The final report lands in your platform or inbox, ready for your sign-off and client delivery." }
            ].map((p) => (
               <div key={p.s}>
                  <div className="text-[#2368D6] font-black text-4xl mb-6 opacity-20">{p.s}</div>
                  <h4 className="font-bold text-[#0A192F] mb-4 text-lg">{p.t}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.d}</p>
               </div>
            ))}
         </div>
      </div>
    </section>

    {/* Section 4 - Platforms and Templates */}
    <section className="py-24 bg-white font-sans border-b border-slate-100 overflow-hidden">
       <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-bold text-[#0A192F] mb-16 text-center">We adapt to your stack, rather than asking you to change it.</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40">
             {["InventoryBase", "Inspection Express", "Kaptur", "PropertyMe", "Rentfind", "Microsoft Word templates", "Custom client platforms"].map((logo) => (
                <span key={logo} className="font-black tracking-widest text-[#0A192F] text-xs uppercase">{logo}</span>
             ))}
          </div>
       </div>
    </section>

    {/* Section 5 - Why Agencies Outsource Production */}
    <section className="py-24 bg-white font-sans border-b border-slate-100">
       <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#0A192F] mb-8 leading-tight">Production is where many inspection businesses get stuck.</h2>
                <p className="text-slate-500 leading-relaxed text-lg mb-8">
                  Inspectors can only inspect as fast as the report layer keeps up. Once reports run behind, clients start chasing, bookings become harder to accept, and local staff are pulled into work that can be managed elsewhere. Outsourcing the production layer gives agencies more flexible capacity without adding fixed local overhead.
                </p>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {[
                  "Predictable turnaround.",
                  "Scalable capacity.",
                  "Quality you can audit.",
                  "Lower delivered cost."
                ].map((benefit, idx) => (
                  <div key={idx} className="p-8 border border-blue-100 rounded-2xl bg-[#F0F7FF] shadow-sm flex items-center justify-center text-center">
                     <p className="text-[#0A192F] font-bold text-sm">{benefit}</p>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </section>

    {/* Section 6 - FAQ */}
    <section className="py-24 bg-[#F8FAFC] font-sans">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-16">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FAQItem question="What is the smallest engagement you take on?" answer="There is no minimum. Some clients send us 200 reports a month, and others send us 20. We charge per report, so the cost moves with your volume." />
          <FAQItem question="Can you work in our existing template?" answer="Yes. We will train on your template before we start, and we will build a quick reference guide for the desk so the formatting holds consistently." />
          <FAQItem question="How do you handle dispute-grade reports?" answer="With the level of detail you would want in front of an arbitrator. We can also flag items the inspector should photograph more thoroughly during the visit." />
          <FAQItem question="How do you handle confidentiality?" answer="Non-disclosure agreements are signed at company and individual level, file access is restricted, and our security protocols have been in place with legal and financial clients since 2017." />
          <FAQItem question="Can you handle high-volume peak seasons?" answer="Yes. We plan for peak-season capacity in advance, and we maintain a trained backup pool that can be deployed when volume rises." />
          <FAQItem question="What does it cost?" answer="We charge per report, with hourly equivalents starting at $5 per hour where you prefer hourly billing. We publish a starting rate on a discovery call." />
        </div>
      </div>
    </section>

    {/* Section 7 - Closing CTA */}
    <section className="bg-[#0A192F] py-24 px-6 text-center text-white border-t border-white/10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Send us one sample dictation and template, and see what comes back.</h2>
        <p className="text-blue-100/60 mb-10 text-lg">No commitment is required for a sample. We will produce one report in your format, so you can judge the quality, the turnaround, and the fit.</p>
        <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 transition-colors px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl">
          Request a free sample
        </button>
      </div>
    </section>
  </>
);

const LegalProfessionalServicesView = ({ onNavigate }: { onNavigate: (path: ViewPath) => void }) => (
  <>
    {/* Block A — Hero */}
    <section className="relative bg-gradient-to-br from-[#0A192F] to-[#112240] text-white pt-32 pb-24 overflow-hidden">
      <div className="absolute top-5 right-10 text-[18vw] font-serif font-black text-white/3 pointer-events-none select-none tracking-tighter">LPS</div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-xs uppercase tracking-[0.2em] font-bold text-blue-300/60 mb-6 font-sans">
          Who we work with / Legal and Professional Services
        </div>
        <div className="max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            A reliable second pair of hands for professional services firms.
          </h1>
          <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed max-w-3xl">
            OrbitSol supports firms with transcription, file preparation, matter administration, data entry, and document support when they need capacity without adding salary, space, and daily supervision.
          </p>
        </div>
      </div>
    </section>

    {/* Block B — What We Handle */}
    <section className="py-24 bg-white border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Scope List */}
          <div className="lg:col-span-5 bg-[#F8FAFC] p-10 rounded shadow-sm border border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 border-b border-slate-200 pb-4">Scope of Services</h2>
            <ul className="space-y-4">
              {[
                "Legal transcription (hearings, interviews)",
                "Court bundle preparation & indexing",
                "Matter file admin & doc review",
                "Practice management data entry",
                "Diary & conflict-check support",
                "Billing & invoice administration",
                "Correspondence drafting (supervised)",
                "Research & case summary prep"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="text-[#2368D6] font-bold mt-1">&bull;</span>
                  <span className="text-slate-600 font-medium text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right: Context and Model */}
          <div className="lg:col-span-7 pt-4 lg:pt-10">
            <div className="mb-16">
              <h3 className="text-[11px] font-bold text-[#2368D6] uppercase tracking-widest mb-6">Strategic Context</h3>
              <p className="text-2xl text-[#0A192F] font-serif font-medium leading-snug">
                Professional services firms need confidentiality, accuracy, and reliable turnaround more than generic task completion.
              </p>
            </div>
            
            <div className="border-t border-slate-100 pt-10">
              <h3 className="font-serif text-2xl font-bold text-[#0A192F] mb-6">Our Delivery Model</h3>
              <p className="text-slate-500 leading-relaxed text-lg">
                Non-disclosure agreements at firm and individual level, restricted file access, and a dedicated project leader as the single point of contact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Block C — How We Work */}
    <section className="py-24 bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              id: '01',
              title: 'Discovery',
              desc: 'We meet to understand the workflow, the volume, the platforms involved, and the service standards you need to maintain.'
            },
            {
              id: '02',
              title: 'Pilot',
              desc: 'Run a short pilot engagement to see quality and turnaround in real conditions with a representative slice of your work.'
            },
            {
              id: '03',
              title: 'Scale',
              desc: 'Full requirement scaling with a named project leader managing output and agreed reporting cadence.'
            }
          ].map((card) => (
            <div key={card.id} className="bg-white p-8 rounded border-l-4 border-[#2368D6] shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                 <span className="text-[#2368D6] font-serif text-3xl font-bold">{card.id}</span>
                 <h4 className="font-serif text-xl font-bold text-[#0A192F]">{card.title}</h4>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Block D — Proof */}
    <section className="py-24 bg-white border-y border-slate-100 font-sans">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8 text-[#2368D6] opacity-10">
          <FileText size={64} className="mx-auto" />
        </div>
        <p className="font-serif text-2xl md:text-3xl text-slate-500 italic leading-relaxed mb-10">
          &ldquo;Professional services firms need confidentiality, accuracy, and reliable turnaround. Our model ensures dedicated project leadership since 2017.&rdquo;
        </p>
        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">Capability Statement</div>
      </div>
    </section>

    {/* Block E — Frequently Asked Questions */}
    <section className="py-24 bg-[#F8FAFC] font-sans">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center mb-16">Common Questions</h2>
        <div className="bg-white rounded shadow-sm border border-slate-200 p-10 overflow-hidden">
          <FAQItem question="How do you handle confidentiality?" answer="Non-disclosure agreements are signed at firm and individual level, file access is restricted, and our security protocols have been used with legal and financial clients since 2017." />
          <FAQItem question="Which platforms do you work in?" answer="We work in the major practice management systems and document management platforms. Where the platform is new to us, we run a learning sprint before live work." />
          <FAQItem question="What turnaround can we expect?" answer="Standard turnaround for transcription is 2 business days, express is 24 hours, and same-day is available where the audio is clear." />
          <FAQItem question="How is the team managed?" answer="A dedicated project leader is responsible for coordination, quality control, and escalation. You communicate with the project leader directly." />
          <FAQItem question="What happens if a member is unavailable?" answer="Every dedicated engagement includes a trained backup operator at no additional cost, ready to step in for leave or peak demand." />
          <FAQItem question="What does it cost?" answer="Pricing starts at $5 per hour, with per-audio-minute and per-task pricing quoted on a discovery call." />
        </div>
      </div>
    </section>

    {/* Block F — Closing Call to Action */}
    <section className="bg-[#0A192F] py-16 px-6 text-center text-white border-t border-white/10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-10">Give your local team more time for billable and client-facing work.</h2>
        <button onClick={() => onNavigate('/contact')} className="bg-[#2368D6] hover:bg-blue-500 transition-colors px-10 py-4 rounded text-xs font-bold uppercase tracking-[0.2em] shadow-xl">
          Discuss a confidential pilot
        </button>
      </div>
    </section>
  </>
);

// --- Main App ---

export default function App() {
  const getInitialPath = (): ViewPath => {
    // Use Vite's base URL (e.g. "/Orbitsol-Website/")
    const base = import.meta.env.BASE_URL || '/';
    let path = window.location.pathname;
    
    // Normalize: remove BASE_URL prefix if present
    if (path.toLowerCase().startsWith(base.toLowerCase())) {
      path = path.substring(base.length - (base.endsWith('/') ? 1 : 0));
    } else if (base.length > 1) {
      // Also check for base without trailing slash
      const baseNoTrail = base.endsWith('/') ? base.slice(0, -1) : base;
      if (path.toLowerCase().startsWith(baseNoTrail.toLowerCase())) {
        path = path.substring(baseNoTrail.length);
      }
    }
    
    // Clean up slashes
    if (!path.startsWith('/')) path = '/' + path;
    path = path.replace(/\/+/g, '/');
    
    // Remove trailing slash except for root
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    
    if (path === '' || path === '//') path = '/';
    
    return path as ViewPath;
  };

  const [currentPath, setCurrentPath] = useState<ViewPath>(getInitialPath());
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    // Sync state with URL changes (back/forward buttons)
    const handlePopState = () => {
      const newPath = getInitialPath();
      if (newPath !== currentPath) {
        setCurrentPath(newPath);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPath]);

  useEffect(() => {
    // Handle initial potentially deep path on load
    const initial = getInitialPath();
    if (initial !== currentPath) {
      setCurrentPath(initial);
    }
  }, []);

  useEffect(() => {
    const fetchAllSettings = async () => {
      try {
        const keys = ['global', 'home', 'about', 'contact', 'services'];
        const settingsMap: SiteSettings = {};
        for (const key of keys) {
          const data = await adminService.getSettings(key);
          if (data) {
            settingsMap[key] = data;
          }
        }
        setSettings(settingsMap);
      } catch (error) {
        console.error("Failed to fetch settings", error);
      }
    };
    fetchAllSettings();
  }, []);

  const getContent = (path: string, defaultValue: string): string => {
    const [page, field] = path.split('.');
    return settings[page]?.[field] || defaultValue;
  };


  const onNavigate = (path: ViewPath) => {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    
    if (path.startsWith('/#')) {
      // Internal scrolling
      const id = path.replace('/#', '');
      if (currentPath !== '/') {
        setCurrentPath('/');
        window.history.pushState({}, '', `${base}/#${id}`);
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Normalize target path for state
      let targetPath = path as string;
      if (targetPath.length > 1 && targetPath.endsWith('/')) {
        targetPath = targetPath.slice(0, -1);
      }
      if (targetPath === '') targetPath = '/';

      setCurrentPath(targetPath as ViewPath);
      window.scrollTo(0, 0);
      
      // Update URL for refreshes to work on GitHub Pages
      const cleanTargetPath = targetPath.startsWith('/') ? targetPath : '/' + targetPath;
      const fullPath = cleanTargetPath === '/' ? `${base}/` : `${base}${cleanTargetPath}`;
      window.history.pushState({}, '', fullPath);
    }
  };

  const renderView = () => {
    // Determine the path to use for lookup in the switch statement
    const base = import.meta.env.BASE_URL || '/';
    let lookupPath = (currentPath as string) || '/';
    
    // Strip base if it's still present in the state (case-insensitive)
    const baseNoTrail = base.endsWith('/') ? base.slice(0, -1) : base;
    if (lookupPath.toLowerCase().startsWith(baseNoTrail.toLowerCase())) {
      lookupPath = lookupPath.substring(baseNoTrail.length);
    }
    
    // Clean slashes for matching
    if (!lookupPath.startsWith('/')) lookupPath = '/' + lookupPath;
    lookupPath = lookupPath.replace(/\/+/g, '/');
    if (lookupPath.length > 1 && lookupPath.endsWith('/')) {
      lookupPath = lookupPath.slice(0, -1);
    }
    if (lookupPath === '' || lookupPath === '//') lookupPath = '/';

    switch (lookupPath) {
      case '/':
      case '/index.html':
        return <HomeView onNavigate={onNavigate} />;
      case '/legal-professional-services':
      case '/who-we-work-with/legal-professional-services':
        return <LegalProfessionalServicesView onNavigate={onNavigate} />;
      case '/marketing-growth':
      case '/who-we-work-with/marketing-and-growth-teams':
        return <MarketingGrowthView onNavigate={onNavigate} />;
      case '/strata-management':
      case '/who-we-work-with/strata-management':
        return <StrataManagementView onNavigate={onNavigate} />;
      case '/property-real-estate':
      case '/who-we-work-with/property-and-real-estate':
        return <PropertyRealEstateView onNavigate={onNavigate} />;
      case '/smes-founders':
      case '/who-we-work-with/smes-founders':
        return <SMEsFoundersView onNavigate={onNavigate} />;
      case '/property-inspection':
      case '/what-we-do/property-inspection-reports':
        return <PropertyInspectionView onNavigate={onNavigate} />;
      case '/speech-content-data':
      case '/what-we-do/speech-content-data-intelligence':
        return <SpeechContentDataView onNavigate={onNavigate} />;
      case '/remote-operations':
      case '/what-we-do/managed-remote-operations':
        return <RemoteOperationsView onNavigate={onNavigate} />;
      case '/process-automation':
      case '/what-we-do/process-automation':
        return <ProcessAutomationView onNavigate={onNavigate} />;
      case '/digital-marketing':
      case '/what-we-do/digital-marketing':
        return <DigitalMarketingView onNavigate={onNavigate} />;
      case '/about':
        return <AboutView onNavigate={onNavigate} />;
      case '/insights':
        return <InsightsView onNavigate={onNavigate} />;
      case '/admin':
        return <AdminView onNavigate={onNavigate} />;
      case '/contact':
        return <ContactView onNavigate={onNavigate} />;
      default:
        return (
          <div className="py-32 text-center max-w-2xl mx-auto min-h-[60vh]">
            <h2 className="text-4xl font-serif text-[#0A192F] mb-4">Page Currently in Build</h2>
            <p className="text-slate-600">The layout for <strong>{currentPath}</strong> is being processed.</p>
            <button onClick={() => onNavigate('/')} className="mt-8 bg-[#2368D6] text-white px-6 py-2 rounded-lg">Return Home</button>
          </div>
        );
    }
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, getContent }}>
      <div className="bg-white selection:bg-[#2368D6] selection:text-white flex flex-col min-h-screen font-sans">
        <Header currentPath={currentPath} onNavigate={onNavigate} />
        
        <main className="flex-grow pt-20">
          <motion.div
             key={currentPath}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.4 }}
          >
            {renderView()}
          </motion.div>
        </main>

        <Footer onNavigate={onNavigate} />
      </div>
    </SiteSettingsContext.Provider>
  );
}
