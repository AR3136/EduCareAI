import React from 'react';
import { Download, Printer, Share2, ArrowLeft } from 'lucide-react';
import { CartoonButton } from './Reusables';

export default function StudentReportCard({ student, onBack }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert("To save as PDF, select 'Save as PDF' in the destination dropdown of the print window that opens next.");
    window.print();
  };

  const mockData = {
    overall: {
      learningScore: 85,
      engagementScore: 90,
      attendanceScore: 95
    },
    english: {
      completed: '15/20',
      readingSkill: 'Intermediate',
      vocabGrowth: 40,
      remark: 'Shows excellent progress in reading comprehension.'
    },
    math: {
      completed: '22/30',
      accuracy: 88,
      strong: ['Fractions', 'Addition'],
      needsImprovement: ['Time & Calendar'],
      remark: 'Strong foundational skills. Needs a bit more focus on calendar reading.'
    },
    stem: {
      completed: '8/10',
      understanding: 82,
      mistakes: ['Open Circuit', 'Wrong Connection'],
      remark: 'Very engaged in practical labs. Sometimes rushes connections.'
    },
    logic: {
      completed: '10/12',
      accuracy: 92,
      strong: ['Pattern Recognition'],
      needsImprovement: ['Spatial Reasoning'],
      remark: 'Quick to identify patterns. Needs practice with 3D logic puzzles.'
    },
    physical: {
      completed: '12/12',
      level: 'High',
      favorite: 'Jumping Jacks',
      remark: 'Very active and always participates with enthusiasm.'
    },
    behavior: {
      participation: 'Excellent',
      consistency: 'Good',
      motivation: 'High',
      focusArea: 'Listening instructions fully',
      remark: 'A bright student who leads by example, but occasionally interrupts.'
    },
    recommendations: [
      'Assign 15 minutes of Spatial Reasoning games twice a week.',
      'Review Time & Calendar concepts using real-world examples.',
      'Encourage patience during STEM circuitry tasks.'
    ],
    overallSummary: `${student.displayName} has had a wonderful term, showing strong improvement across all major subjects. Their enthusiasm for STEM and Logic is commendable. With slight improvements in following step-by-step instructions and calendar math, they will excel even further.`
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in print:w-full print:m-0 print:p-0">
      {/* Navigation & Actions (Hidden in Print) */}
      <div className="flex items-center justify-between mb-8 print:hidden">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-purple-600 font-bold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Class List
        </button>
        <div className="flex items-center gap-3">
          <CartoonButton onClick={handlePrint} color="white" className="flex items-center gap-2 text-sm !px-4">
            <Printer className="w-4 h-4" /> Print Report
          </CartoonButton>
          <CartoonButton onClick={handleDownloadPDF} color="white" className="flex items-center gap-2 text-sm !px-4">
            <Download className="w-4 h-4" /> Download PDF
          </CartoonButton>
          <CartoonButton onClick={() => alert('Share dialog mock')} color="purple" className="flex items-center gap-2 text-sm !px-4">
            <Share2 className="w-4 h-4" /> Share with Parent
          </CartoonButton>
        </div>
      </div>

      {/* Printable Report Content */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 md:p-12 shadow-cartoon print:shadow-none print:border-none print:rounded-none">
        
        {/* Header */}
        <div className="text-center mb-10 border-b-4 border-slate-800 pb-6">
          <h1 className="text-4xl font-black text-slate-800 tracking-wide mb-4 uppercase">Student Learning Report</h1>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-lg font-bold text-slate-600">
            <p>Student Name: <span className="text-purple-600">{student.displayName}</span></p>
            <p>Grade: <span className="text-purple-600">{student.grade || 'Grade 1'}</span></p>
            <p>Date: <span className="text-purple-600">{currentDate}</span></p>
          </div>
        </div>

        {/* Overall Progress */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase tracking-wider border-b-2 border-slate-100 pb-2">Overall Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200 text-center">
              <span className="block text-sm font-extrabold text-slate-500 uppercase tracking-widest mb-1">Learning Score</span>
              <span className="text-3xl font-black text-indigo-600">{mockData.overall.learningScore}%</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200 text-center">
              <span className="block text-sm font-extrabold text-slate-500 uppercase tracking-widest mb-1">Engagement Score</span>
              <span className="text-3xl font-black text-emerald-600">{mockData.overall.engagementScore}%</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200 text-center">
              <span className="block text-sm font-extrabold text-slate-500 uppercase tracking-widest mb-1">Attendance Score</span>
              <span className="text-3xl font-black text-amber-600">{mockData.overall.attendanceScore}%</span>
            </div>
          </div>
        </section>

        {/* Subject Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          {/* English */}
          <section className="bg-blue-50 border-2 border-blue-200 p-6 rounded-2xl">
            <h3 className="text-xl font-black text-blue-800 mb-4 border-b-2 border-blue-200 pb-2">English Learning</h3>
            <ul className="space-y-3 text-sm font-bold text-slate-700">
              <li>Lessons Completed: <span className="text-blue-600">{mockData.english.completed}</span></li>
              <li>Reading Skill: <span className="text-blue-600">{mockData.english.readingSkill}</span></li>
              <li>Vocabulary Growth: <span className="text-blue-600">{mockData.english.vocabGrowth}%</span></li>
              <li className="pt-2">
                <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Teacher Remark:</span>
                <span className="italic text-slate-600">"{mockData.english.remark}"</span>
              </li>
            </ul>
          </section>

          {/* Mathematics */}
          <section className="bg-purple-50 border-2 border-purple-200 p-6 rounded-2xl">
            <h3 className="text-xl font-black text-purple-800 mb-4 border-b-2 border-purple-200 pb-2">Mathematics</h3>
            <ul className="space-y-3 text-sm font-bold text-slate-700">
              <li>Topics Completed: <span className="text-purple-600">{mockData.math.completed}</span></li>
              <li>Accuracy: <span className="text-purple-600">{mockData.math.accuracy}%</span></li>
              <li>Strong Topics: <span className="text-purple-600">{mockData.math.strong.join(', ')}</span></li>
              <li>Needs Improvement: <span className="text-purple-600">{mockData.math.needsImprovement.join(', ')}</span></li>
              <li className="pt-2">
                <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Teacher Remark:</span>
                <span className="italic text-slate-600">"{mockData.math.remark}"</span>
              </li>
            </ul>
          </section>

          {/* STEM */}
          <section className="bg-emerald-50 border-2 border-emerald-200 p-6 rounded-2xl">
            <h3 className="text-xl font-black text-emerald-800 mb-4 border-b-2 border-emerald-200 pb-2">STEM & Circuit Simulator</h3>
            <ul className="space-y-3 text-sm font-bold text-slate-700">
              <li>Circuits Completed: <span className="text-emerald-600">{mockData.stem.completed}</span></li>
              <li>Understanding Score: <span className="text-emerald-600">{mockData.stem.understanding}%</span></li>
              <li>Common Mistakes:
                <ul className="list-disc pl-5 mt-1 text-emerald-700">
                  {mockData.stem.mistakes.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </li>
              <li className="pt-2">
                <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Teacher Remark:</span>
                <span className="italic text-slate-600">"{mockData.stem.remark}"</span>
              </li>
            </ul>
          </section>

          {/* Logic */}
          <section className="bg-teal-50 border-2 border-teal-200 p-6 rounded-2xl">
            <h3 className="text-xl font-black text-teal-800 mb-4 border-b-2 border-teal-200 pb-2">Logic Games</h3>
            <ul className="space-y-3 text-sm font-bold text-slate-700">
              <li>Games Completed: <span className="text-teal-600">{mockData.logic.completed}</span></li>
              <li>Accuracy: <span className="text-teal-600">{mockData.logic.accuracy}%</span></li>
              <li>Strong Skills: <span className="text-teal-600">{mockData.logic.strong.join(', ')}</span></li>
              <li>Needs Improvement: <span className="text-teal-600">{mockData.logic.needsImprovement.join(', ')}</span></li>
              <li className="pt-2">
                <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Teacher Remark:</span>
                <span className="italic text-slate-600">"{mockData.logic.remark}"</span>
              </li>
            </ul>
          </section>

          {/* Physical Activity */}
          <section className="bg-orange-50 border-2 border-orange-200 p-6 rounded-2xl">
            <h3 className="text-xl font-black text-orange-800 mb-4 border-b-2 border-orange-200 pb-2">Physical Activity</h3>
            <ul className="space-y-3 text-sm font-bold text-slate-700">
              <li>Sessions Completed: <span className="text-orange-600">{mockData.physical.completed}</span></li>
              <li>Activity Level: <span className="text-orange-600">{mockData.physical.level}</span></li>
              <li>Favorite Exercise: <span className="text-orange-600">{mockData.physical.favorite}</span></li>
              <li className="pt-2">
                <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Teacher Remark:</span>
                <span className="italic text-slate-600">"{mockData.physical.remark}"</span>
              </li>
            </ul>
          </section>

          {/* Behavior */}
          <section className="bg-rose-50 border-2 border-rose-200 p-6 rounded-2xl">
            <h3 className="text-xl font-black text-rose-800 mb-4 border-b-2 border-rose-200 pb-2">Behavior & Engagement</h3>
            <ul className="space-y-3 text-sm font-bold text-slate-700">
              <li>Participation: <span className="text-rose-600">{mockData.behavior.participation}</span></li>
              <li>Consistency: <span className="text-rose-600">{mockData.behavior.consistency}</span></li>
              <li>Motivation Level: <span className="text-rose-600">{mockData.behavior.motivation}</span></li>
              <li>Focus Area: <span className="text-rose-600">{mockData.behavior.focusArea}</span></li>
              <li className="pt-2">
                <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Teacher Remark:</span>
                <span className="italic text-slate-600">"{mockData.behavior.remark}"</span>
              </li>
            </ul>
          </section>
        </div>

        {/* AI Recommendations */}
        <section className="mb-10 bg-slate-50 p-6 rounded-2xl border-2 border-slate-200">
          <h2 className="text-xl font-black text-slate-800 mb-4 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
            ✨ AI Recommendations
          </h2>
          <ul className="list-decimal pl-6 space-y-2 font-bold text-slate-700">
            {mockData.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </section>

        {/* Overall Teacher Summary */}
        <section className="bg-indigo-50 border-4 border-indigo-200 p-8 rounded-3xl text-center">
          <h2 className="text-2xl font-black text-indigo-900 mb-4 uppercase tracking-widest">Overall Teacher Summary</h2>
          <p className="text-lg font-bold text-indigo-800 leading-relaxed italic max-w-2xl mx-auto">
            "{mockData.overallSummary}"
          </p>
        </section>

      </div>
    </div>
  );
}
