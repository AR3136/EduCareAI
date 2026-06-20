import React, { useState, useEffect } from 'react';
import { Users, GraduationCap, FileText, Search, Sparkles } from 'lucide-react';
import { API_BASE } from '../config';
import { CartoonCard, CartoonButton } from './Reusables';
import StudentReportCard from './StudentReportCard';

export default function TeacherActivityAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/activity/teacher-analytics`);
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        } else {
          throw new Error('Failed to load teacher analytics');
        }
      } catch (err) {
        console.warn('API teacher analytics offline, loading mock data...');
        setMockAnalytics();
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  const setMockAnalytics = () => {
    setAnalytics({
      classParticipation: 85,
      overallLearningScore: 82,
      studentRoster: [
        { studentId: 'student_123', displayName: 'Sammy Sparks', grade: 'Grade 1', engagementScore: 90, learningScore: 88, badges: ['badge_sim_wizard', 'badge_circuit_master'] },
        { studentId: 'student_456', displayName: 'Alex Volt', grade: 'Grade 2', engagementScore: 80, learningScore: 85, badges: ['badge_junior_engineer'] },
        { studentId: 'student_789', displayName: 'Clara Circuit', grade: 'Grade 1', engagementScore: 66, learningScore: 78, badges: ['badge_stem_explorer'] },
        { studentId: 'student_abc', displayName: 'Leo Ohm', grade: 'Grade 3', engagementScore: 40, learningScore: 60, badges: [] },
        { studentId: 'student_xyz', displayName: 'Mia Math', grade: 'KG', engagementScore: 95, learningScore: 92, badges: ['badge_math_genius'] }
      ]
    });
  };

  const getEngagementBadge = (score) => {
    if (score >= 80) return { label: 'High 🔥', color: 'bg-emerald-100 border-emerald-300 text-emerald-800' };
    if (score >= 50) return { label: 'Medium ⚡', color: 'bg-amber-100 border-amber-300 text-amber-800' };
    return { label: 'Low 🥱', color: 'bg-rose-100 border-rose-300 text-rose-800' };
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="font-bold text-xs tracking-wider uppercase animate-pulse text-purple-600">Gathering Student Records...</span>
      </div>
    );
  }

  if (!analytics) return null;

  if (selectedStudent) {
    return <StudentReportCard student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
  }

  const filteredStudents = analytics.studentRoster.filter(s => 
    s.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-6 animate-fade-in">
      
      {/* Top Header Card */}
      <CartoonCard color="white" className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b-6 border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-600 text-white w-14 h-14 rounded-3xl flex items-center justify-center border-2 border-slate-800 shadow-cartoon">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-wide">Teacher Hub</h2>
              <p className="text-slate-500 text-xs font-extrabold uppercase tracking-widest mt-0.5">
                Student Learning Reports & Roster
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white border-2 border-slate-800 rounded-2xl p-3 shadow-cartoon text-center">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Class Avg Learning</span>
              <span className="text-xl font-black text-purple-600 flex items-center gap-1 justify-center">
                <Sparkles className="w-4 h-4" /> {analytics.overallLearningScore}%
              </span>
            </div>
          </div>
        </div>
      </CartoonCard>

      {/* Roster & Search */}
      <CartoonCard color="white" className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-500" /> Class Roster
          </h3>
          <div className="relative w-full md:w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-slate-100 text-xs font-black text-slate-400 uppercase tracking-widest">
                <th className="pb-3 px-2">Student</th>
                <th className="pb-3 px-2">Grade</th>
                <th className="pb-3 px-2 text-center">Learning Score</th>
                <th className="pb-3 px-2 text-center">Engagement</th>
                <th className="pb-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.map((student) => {
                const badge = getEngagementBadge(student.engagementScore);
                return (
                  <tr key={student.studentId} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-2">
                      <span className="text-slate-800 font-black text-base block">{student.displayName}</span>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase">ID: {student.studentId}</span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-1 rounded-lg text-xs">
                        {student.grade}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <span className="text-slate-800 font-black">{student.learningScore}%</span>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className="inline-flex items-center gap-1.5 bg-purple-100 hover:bg-purple-600 text-purple-700 hover:text-white font-black text-xs px-3 py-1.5 rounded-xl transition-colors border border-purple-200"
                      >
                        <FileText className="w-4 h-4" /> View Report
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-400 font-bold">
                    No students found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CartoonCard>

    </div>
  );
}
