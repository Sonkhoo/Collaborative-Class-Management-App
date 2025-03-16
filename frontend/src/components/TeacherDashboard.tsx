"use client"


import React, { useState } from 'react';
import { Bell, Book, Calendar, MessageCircle, Clock, File, Folder, Plus, Search, Users } from 'lucide-react';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data
  const courses = [
    { id: 1, name: 'Algebra II', students: 28, unread: 5 },
    { id: 2, name: 'Physics 101', students: 24, unread: 0 },
    { id: 3, name: 'Literature & Composition', students: 32, unread: 12 }
  ];
  
  const upcomingDeadlines = [
    { id: 1, title: 'Polynomial Functions Quiz', course: 'Algebra II', date: 'Mar 19, 2025', submissions: 14, total: 28 },
    { id: 2, title: 'Lab Report: Energy Conservation', course: 'Physics 101', date: 'Mar 21, 2025', submissions: 8, total: 24 },
    { id: 3, title: 'Essay: Character Analysis', course: 'Literature & Composition', date: 'Mar 25, 2025', submissions: 3, total: 32 }
  ];
  
  const recentMessages = [
    { id: 1, student: 'Alex Johnson', course: 'Algebra II', preview: 'Question about tomorrow\'s homework...', time: '10 mins ago' },
    { id: 2, student: 'Jamie Smith', course: 'Literature & Composition', preview: 'Can I submit my essay early?', time: '2 hrs ago' },
    { id: 3, student: 'Riley Parker', course: 'Physics 101', preview: 'Having trouble with problem #5...', time: '3 hrs ago' }
  ];

  const assignments = [
    { id: 1, title: 'Polynomial Functions Quiz', course: 'Algebra II', dueDate: 'Mar 19, 2025', status: 'Upcoming', submissions: 14, total: 28 },
    { id: 2, title: 'Lab Report: Energy Conservation', course: 'Physics 101', dueDate: 'Mar 21, 2025', status: 'Upcoming', submissions: 8, total: 24 },
    { id: 3, title: 'Essay: Character Analysis', course: 'Literature & Composition', dueDate: 'Mar 25, 2025', status: 'Upcoming', submissions: 3, total: 32 },
    { id: 4, title: 'Factoring Practice Worksheet', course: 'Algebra II', dueDate: 'Mar 12, 2025', status: 'Graded', submissions: 28, total: 28 },
    { id: 5, title: 'Physics Formulas Quiz', course: 'Physics 101', dueDate: 'Mar 10, 2025', status: 'Graded', submissions: 24, total: 24 }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center text-blue-600 mb-1">
                  <Users className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Active Classes</h3>
                </div>
                <p className="text-3xl font-bold">{courses.length}</p>
                <p className="text-sm text-gray-800">Total Students: {courses.reduce((sum, course) => sum + course.students, 0)}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center text-green-600 mb-1">
                  <File className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Active Assignments</h3>
                </div>
                <p className="text-3xl font-bold">{upcomingDeadlines.length}</p>
                <p className="text-sm text-gray-800">Upcoming This Week: {upcomingDeadlines.length}</p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex items-center text-amber-600 mb-1">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Unread Messages</h3>
                </div>
                <p className="text-3xl font-bold">{courses.reduce((sum, course) => sum + course.unread, 0)}</p>
                <p className="text-sm text-gray-800">Across {courses.filter(c => c.unread > 0).length} classes</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-zinc-800">Upcoming Deadlines</h2>
                    <button className="text-blue-600 text-sm flex items-center">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {upcomingDeadlines.map(deadline => (
                      <div key={deadline.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-stone-900">{deadline.title}</h4>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-800">{deadline.course}</p>
                            <p className="text-sm text-gray-800 flex items-center">
                              <Clock className="h-3 w-3 mr-1" /> {deadline.date}
                            </p>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-right text-sm">
                            <span className="font-medium">{deadline.submissions}/{deadline.total}</span>
                          </div>
                          <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                            <div 
                              className="h-2 bg-green-500 rounded-full" 
                              style={{ width: `${(deadline.submissions / deadline.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-zinc-800">Recent Messages</h2>
                    <button className="text-blue-600 text-sm flex items-center">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {recentMessages.map(message => (
                      <div key={message.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-stone-900 ">{message.student}</h4>
                          <span className="text-xs text-gray-800">{message.time}</span>
                        </div>
                        <p className="text-sm text-gray-800 mt-1">{message.preview}</p>
                        <p className="text-xs text-gray-800 mt-1">{message.course}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'classes':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Classes</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm">
                <Plus className="h-4 w-4 mr-1" /> Create New Class
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map(course => (
                <div key={course.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-lg">{course.name}</h3>
                    {course.unread > 0 && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                        {course.unread} new
                      </span>
                    )}
                  </div>
                  <p className="text-gray-800 mt-2">Students: {course.students}</p>
                  <div className="flex mt-4 pt-4 border-t border-gray-100">
                    <button className="text-blue-600 text-sm mr-4">View Details</button>
                    <button className="text-blue-600 text-sm">Manage</button>
                  </div>
                </div>
              ))}
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer">
                <Folder className="h-8 w-8 mb-2" />
                <p className="font-medium">Create New Class</p>
              </div>
            </div>
          </div>
        );
        
      case 'materials':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Course Materials</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm">
                <Plus className="h-4 w-4 mr-1" /> Upload Materials
              </button>
            </div>
            
            <div className="flex mb-4">
              <select className="border rounded-lg px-3 py-2 mr-2 bg-white">
                <option>All Classes</option>
                <option>Algebra II</option>
                <option>Physics 101</option>
                <option>Literature & Composition</option>
              </select>
              <select className="border rounded-lg px-3 py-2 mr-2 bg-white">
                <option>All Types</option>
                <option>Lectures</option>
                <option>Handouts</option>
                <option>Reference</option>
              </select>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-800" />
                <input type="text" placeholder="Search materials..." className="pl-9 pr-3 py-2 border rounded-lg w-full" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="flex items-center p-4 border-b border-gray-200 font-medium text-gray-800">
                <div className="w-6"></div>
                <div className="w-1/2 pl-2">Filename</div>
                <div className="w-1/4">Class</div>
                <div className="w-1/4">Uploaded</div>
                <div className="w-24"></div>
              </div>
              
              <div className="divide-y divide-gray-100">
                <div className="flex items-center p-4 hover:bg-gray-50">
                  <div className="w-6">📄</div>
                  <div className="w-1/2 pl-2">
                    <p className="font-medium">Introduction to Polynomials.pdf</p>
                    <p className="text-xs text-gray-800">2.4 MB</p>
                  </div>
                  <div className="w-1/4 text-sm">Algebra II</div>
                  <div className="w-1/4 text-sm text-gray-800">Mar 10, 2025</div>
                  <div className="w-24 flex justify-end">
                    <button className="text-blue-600 text-sm">Edit</button>
                  </div>
                </div>
                
                <div className="flex items-center p-4 hover:bg-gray-50">
                  <div className="w-6">📄</div>
                  <div className="w-1/2 pl-2">
                    <p className="font-medium">Newton's Laws of Motion.pdf</p>
                    <p className="text-xs text-gray-800">3.8 MB</p>
                  </div>
                  <div className="w-1/4 text-sm">Physics 101</div>
                  <div className="w-1/4 text-sm text-gray-800">Mar 8, 2025</div>
                  <div className="w-24 flex justify-end">
                    <button className="text-blue-600 text-sm">Edit</button>
                  </div>
                </div>
                
                <div className="flex items-center p-4 hover:bg-gray-50">
                  <div className="w-6">📊</div>
                  <div className="w-1/2 pl-2">
                    <p className="font-medium">Character Analysis Worksheet.pdf</p>
                    <p className="text-xs text-gray-800">1.2 MB</p>
                  </div>
                  <div className="w-1/4 text-sm">Literature & Composition</div>
                  <div className="w-1/4 text-sm text-gray-800">Mar 7, 2025</div>
                  <div className="w-24 flex justify-end">
                    <button className="text-blue-600 text-sm">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
        case 'assignments':
            return (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Assignments</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm">
                    <Plus className="h-4 w-4 mr-1" /> Create New Assignment
                  </button>
                </div>
    
                <div className="flex mb-4">
                  <select className="border rounded-lg px-3 py-2 mr-2 bg-white">
                    <option>All Classes</option>
                    {courses.map(course => (
                      <option key={course.id}>{course.name}</option>
                    ))}
                  </select>
                  <select className="border rounded-lg px-3 py-2 mr-2 bg-white">
                    <option>All Statuses</option>
                    <option>Upcoming</option>
                    <option>Graded</option>
                  </select>
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input type="text" placeholder="Search assignments..." className="pl-9 pr-3 py-2 border rounded-lg w-full" />
                  </div>
                </div>
    
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    {assignments.map(assignment => (
                      <div key={assignment.id} className="flex items-center p-3 hover:bg-gray-50 group">
                        <div className="w-1/2">
                          <h4 className="font-medium">{assignment.title}</h4>
                          <p className="text-sm text-gray-500">{assignment.course}</p>
                        </div>
                        <div className="w-1/4">
                          <p className="text-sm flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            {assignment.dueDate}
                          </p>
                        </div>
                        <div className="w-1/6">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            assignment.status === 'Upcoming' 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-green-100 text-green-600'
                          }`}>
                            {assignment.status}
                          </span>
                        </div>
                        <div className="w-1/6 text-right">
                          <div className="text-sm font-medium">
                            {assignment.submissions}/{assignment.total}
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                            <div 
                              className="h-2 bg-green-500 rounded-full" 
                              style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
    
          default:
            return null;
        }
      };
    
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 p-4">
              <div className="mb-8">
                <h1 className="text-xl font-bold text-gray-800">Teacher's Dashboard</h1>
                <p className="text-sm text-gray-800">Teacher Portal</p>
              </div>
              
              <nav className="space-y-1">
                {[
                  { id: 'overview', icon: Book, label: 'Overview' },
                  { id: 'classes', icon: Users, label: 'Classes' },
                  { id: 'assignments', icon: File, label: 'Assignments' },
                  { id: 'materials', icon: Folder, label: 'Materials' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
    
            {/* Main Content */}
            <div className="flex-1 p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-96">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students, assignments, or materials..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Bell className="h-6 w-6" />
                </button>
              </div>
    
              {renderContent()}
            </div>
          </div>
        </div>
      );
    };
    
    export default TeacherDashboard;