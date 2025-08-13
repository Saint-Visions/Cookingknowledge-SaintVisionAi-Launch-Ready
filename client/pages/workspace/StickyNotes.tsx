import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/AppLayout";
import DualAIChat from "@/components/DualAIChat";
import {
  StickyNote,
  Plus,
  Search,
  Filter,
  Trash2,
  Pin,
  PinOff,
  Palette,
  Calendar,
  Tag,
  MoreVertical,
  Edit3,
  Save,
  X,
  Star,
  Clock,
  User,
  Sparkles,
  Brain,
  MessageSquare,
  Zap,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  pinned: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  favorite: boolean;
}

export default function StickyNotes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Lead Follow-up",
      content:
        "Remember to call John Smith about the enterprise package. He seemed very interested and mentioned budget approval next week.",
      color: "yellow",
      pinned: true,
      tags: ["sales", "follow-up"],
      createdAt: new Date("2024-01-15T10:30:00"),
      updatedAt: new Date("2024-01-15T14:20:00"),
      favorite: true,
    },
    {
      id: "2",
      title: "Product Idea",
      content:
        "AI-powered email sequence generator that adapts based on recipient engagement patterns. Could integrate with CRM data.",
      color: "blue",
      pinned: false,
      tags: ["product", "ai", "idea"],
      createdAt: new Date("2024-01-14T16:45:00"),
      updatedAt: new Date("2024-01-14T16:45:00"),
      favorite: false,
    },
    {
      id: "3",
      title: "Meeting Notes",
      content:
        "Team sync - Q1 goals discussed. Focus on customer acquisition and product improvements. Next review in 2 weeks.",
      color: "green",
      pinned: false,
      tags: ["meeting", "team"],
      createdAt: new Date("2024-01-12T09:00:00"),
      updatedAt: new Date("2024-01-12T09:15:00"),
      favorite: false,
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    color: "yellow",
    tags: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("all");
  const [editingNote, setEditingNote] = useState<string | null>(null);

  const colors = [
    {
      name: "yellow",
      bg: "bg-yellow-200",
      border: "border-yellow-300",
      text: "text-yellow-800",
    },
    {
      name: "blue",
      bg: "bg-blue-200",
      border: "border-blue-300",
      text: "text-blue-800",
    },
    {
      name: "green",
      bg: "bg-green-200",
      border: "border-green-300",
      text: "text-green-800",
    },
    {
      name: "pink",
      bg: "bg-pink-200",
      border: "border-pink-300",
      text: "text-pink-800",
    },
    {
      name: "purple",
      bg: "bg-purple-200",
      border: "border-purple-300",
      text: "text-purple-800",
    },
    {
      name: "orange",
      bg: "bg-orange-200",
      border: "border-orange-300",
      text: "text-orange-800",
    },
  ];

  const handleCreateNote = () => {
    if (!newNote.title.trim() && !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title || "Untitled",
      content: newNote.content,
      color: newNote.color,
      pinned: false,
      tags: newNote.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean),
      createdAt: new Date(),
      updatedAt: new Date(),
      favorite: false,
    };

    setNotes(prev => [note, ...prev]);
    setNewNote({ title: "", content: "", color: "yellow", tags: "" });
    setIsCreating(false);
  };

  const togglePin = (id: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, pinned: !note.pinned } : note,
      ),
    );
  };

  const toggleFavorite = (id: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, favorite: !note.favorite } : note,
      ),
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const getColorClasses = (colorName: string) => {
    const color = colors.find(c => c.name === colorName);
    return color || colors[0];
  };

  const filteredNotes = notes
    .filter(
      note =>
        (selectedColor === "all" || note.color === selectedColor) &&
        (searchTerm === "" ||
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.tags.some(tag =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          )),
    )
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  return (
    <AppLayout>
      <div className="flex h-full bg-charcoal-900 text-white overflow-hidden">
        {/* Sidebar - Quick Notes Access */}
        <div className="w-64 bg-charcoal-800 border-r border-white/10 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gold-500/20 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-gold-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Workspace</h3>
                <p className="text-xs text-white/60">Dual Intelligence</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 space-y-2">
            <Button
              onClick={() => setIsCreating(true)}
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Quick Note
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat History
            </Button>
          </div>

          {/* Recent Notes */}
          <div className="flex-1 overflow-y-auto p-4">
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
              Recent Notes
            </h4>
            <div className="space-y-2">
              {notes.slice(0, 5).map(note => (
                <div
                  key={note.id}
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                >
                  <h5 className="text-sm font-medium text-white truncate">
                    {note.title}
                  </h5>
                  <p className="text-xs text-white/60 truncate mt-1">
                    {note.content}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      {note.tags.slice(0, 2).map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-white/10 text-white/70 px-1 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {note.pinned && <Pin className="w-3 h-3 text-gold-300" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="p-4 border-t border-white/10">
            <div className="text-xs text-white/50 space-y-1">
              <div className="flex justify-between">
                <span>Notes</span>
                <span>{notes.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Pinned</span>
                <span>{notes.filter(n => n.pinned).length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-charcoal-800 border-b border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center saintvision-glow">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold saintvision-gradient-text">
                    Dual AI Workspace
                  </h1>
                  <p className="text-white/70 text-sm">
                    GPT-4o + Azure • HACP™ Technology
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  Both AI Active
                </Badge>
                <Button
                  onClick={() => setIsCreating(true)}
                  size="sm"
                  className="bg-gold-500 hover:bg-gold-600 text-charcoal-900"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Note
                </Button>
              </div>
            </div>
          </div>

          {/* Dual AI Chat Interface */}
          <div className="flex-1 overflow-hidden">
            <DualAIChat />
          </div>

          {/* Quick Note Creation Overlay */}
          {isCreating && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-charcoal-800 p-6 rounded-lg border border-white/20 w-96 max-w-[90vw]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Quick Note</h3>
                  <Button
                    onClick={() => setIsCreating(false)}
                    size="sm"
                    variant="ghost"
                    className="text-white/50 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Note title..."
                    value={newNote.title}
                    onChange={e =>
                      setNewNote({ ...newNote, title: e.target.value })
                    }
                    className="bg-white/5 border-white/20"
                  />

                  <Textarea
                    placeholder="What's on your mind?"
                    value={newNote.content}
                    onChange={e =>
                      setNewNote({ ...newNote, content: e.target.value })
                    }
                    className="bg-white/5 border-white/20 min-h-[100px]"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {colors.slice(0, 4).map(color => (
                        <button
                          key={color.name}
                          onClick={() =>
                            setNewNote({ ...newNote, color: color.name })
                          }
                          className={`w-6 h-6 rounded-full border-2 ${color.bg} ${
                            newNote.color === color.name
                              ? "border-white"
                              : "border-white/30"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => setIsCreating(false)}
                        variant="ghost"
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateNote}
                        size="sm"
                        className="bg-gold-500 hover:bg-gold-600 text-charcoal-900"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
