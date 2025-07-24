import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Plus,
  MoreHorizontal,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Flag,
  Search,
  Filter,
  Star,
  Trash2,
  Edit,
  Eye,
  ArrowRight,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react";
import { ProjectAPI, DataUtils } from "@/utils/fetchData";

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  dueDate?: string;
  teamMembers: Array<{
    id: string;
    name: string;
    avatar: string;
    role: string;
  }>;
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
  };
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: {
    id: string;
    name: string;
    avatar: string;
  };
  dueDate?: string;
  createdAt: string;
}

export function ProjectBoard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchProjectTasks(selectedProject);
    }
  }, [selectedProject]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await ProjectAPI.getProjects();
      
      if (response.status === 'success') {
        setProjects(response.data.projects);
        if (response.data.projects.length > 0) {
          setSelectedProject(response.data.projects[0].id);
        }
      } else {
        // Fallback data for development
        const mockProjects: Project[] = [
          {
            id: '1',
            name: 'SaintVisionAI Platform',
            description: 'Building the next-generation AI platform',
            status: 'active',
            progress: 75,
            dueDate: '2025-02-15',
            teamMembers: [
              { id: '1', name: 'Sarah Johnson', avatar: '', role: 'Lead Developer' },
              { id: '2', name: 'Mike Chen', avatar: '', role: 'UI Designer' },
              { id: '3', name: 'Lisa Rodriguez', avatar: '', role: 'Product Manager' },
            ],
            tasks: { total: 24, completed: 18, inProgress: 4 },
          },
          {
            id: '2',
            name: 'GHL Integration',
            description: 'Complete GoHighLevel CRM integration',
            status: 'active',
            progress: 90,
            dueDate: '2025-01-30',
            teamMembers: [
              { id: '1', name: 'Sarah Johnson', avatar: '', role: 'Developer' },
              { id: '4', name: 'David Park', avatar: '', role: 'Backend Engineer' },
            ],
            tasks: { total: 12, completed: 11, inProgress: 1 },
          },
          {
            id: '3',
            name: 'Mobile App MVP',
            description: 'Launch mobile application beta',
            status: 'paused',
            progress: 35,
            dueDate: '2025-03-01',
            teamMembers: [
              { id: '2', name: 'Mike Chen', avatar: '', role: 'Mobile Developer' },
            ],
            tasks: { total: 16, completed: 6, inProgress: 2 },
          },
        ];
        setProjects(mockProjects);
        setSelectedProject(mockProjects[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectTasks = async (projectId: string) => {
    try {
      const response = await ProjectAPI.getProjectTasks(projectId);
      
      if (response.status === 'success') {
        setTasks(response.data.tasks);
      } else {
        // Fallback mock tasks
        const mockTasks: Task[] = [
          {
            id: '1',
            title: 'Design new chat interface',
            description: 'Create wireframes and mockups for the chat workspace',
            status: 'in_progress',
            priority: 'high',
            assignee: { id: '2', name: 'Mike Chen', avatar: '' },
            dueDate: '2025-01-28',
            createdAt: '2025-01-20T10:00:00Z',
          },
          {
            id: '2',
            title: 'Implement API endpoints',
            description: 'Build REST API for chat functionality',
            status: 'todo',
            priority: 'high',
            assignee: { id: '1', name: 'Sarah Johnson', avatar: '' },
            dueDate: '2025-01-30',
            createdAt: '2025-01-21T09:00:00Z',
          },
          {
            id: '3',
            title: 'Write documentation',
            description: 'Create API documentation and user guides',
            status: 'todo',
            priority: 'medium',
            assignee: { id: '3', name: 'Lisa Rodriguez', avatar: '' },
            dueDate: '2025-02-05',
            createdAt: '2025-01-22T14:00:00Z',
          },
          {
            id: '4',
            title: 'Setup CI/CD pipeline',
            description: 'Configure automated deployment process',
            status: 'done',
            priority: 'medium',
            assignee: { id: '4', name: 'David Park', avatar: '' },
            createdAt: '2025-01-15T11:00:00Z',
          },
          {
            id: '5',
            title: 'Performance optimization',
            description: 'Optimize API response times and database queries',
            status: 'review',
            priority: 'low',
            assignee: { id: '1', name: 'Sarah Johnson', avatar: '' },
            createdAt: '2025-01-18T16:00:00Z',
          },
        ];
        setTasks(mockTasks);
      }
    } catch (error) {
      console.error('Failed to fetch project tasks:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'border-l-gray-400 bg-gray-50';
      case 'in_progress':
        return 'border-l-blue-400 bg-blue-50';
      case 'review':
        return 'border-l-yellow-400 bg-yellow-50';
      case 'done':
        return 'border-l-green-400 bg-green-50';
      default:
        return 'border-l-gray-400 bg-gray-50';
    }
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const taskColumns = [
    { id: 'todo', title: 'To Do', status: 'todo' },
    { id: 'in_progress', title: 'In Progress', status: 'in_progress' },
    { id: 'review', title: 'Review', status: 'review' },
    { id: 'done', title: 'Done', status: 'done' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Project Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Project Board
              </CardTitle>
              <CardDescription>
                Manage projects and track progress with kanban-style boards
              </CardDescription>
            </div>
            <Button className="bg-gold-500 hover:bg-gold-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Project Selection */}
      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedProject === project.id ? 'border-2 border-blue-500' : 'border border-gray-200'
            }`}
            onClick={() => setSelectedProject(project.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-500">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{project.tasks.total}</p>
                    <p className="text-xs text-gray-600">Total</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-600">{project.tasks.completed}</p>
                    <p className="text-xs text-gray-600">Done</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-600">{project.tasks.inProgress}</p>
                    <p className="text-xs text-gray-600">Active</p>
                  </div>
                </div>

                {/* Team */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {project.teamMembers.slice(0, 3).map((member, index) => (
                      <Avatar key={member.id} className="w-6 h-6 border-2 border-white">
                        <AvatarFallback className="text-xs bg-gold-500 text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.teamMembers.length > 3 && (
                      <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{project.teamMembers.length - 3}</span>
                      </div>
                    )}
                  </div>
                  
                  {project.dueDate && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(project.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Task Board */}
      {selectedProjectData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{selectedProjectData.name}</CardTitle>
                <CardDescription>Task management board</CardDescription>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
                
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {taskColumns.map((column) => {
                const columnTasks = filteredTasks.filter(task => task.status === column.status);
                
                return (
                  <div key={column.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{column.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {columnTasks.length}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {columnTasks.map((task) => (
                        <div
                          key={task.id}
                          className={`p-4 rounded-lg border-l-4 ${getTaskStatusColor(task.status)} hover:shadow-sm transition-shadow cursor-pointer`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 text-sm leading-tight">
                              {task.title}
                            </h4>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                            {task.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <Badge className={`${getPriorityColor(task.priority)} text-xs`}>
                              {task.priority}
                            </Badge>
                            
                            {task.assignee && (
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs bg-blue-500 text-white">
                                  {task.assignee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                          
                          {task.dueDate && (
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {DataUtils.formatRelativeTime(task.dueDate)}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Add Task Button */}
                      <button className="w-full p-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-colors">
                        <Plus className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-xs">Add task</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
