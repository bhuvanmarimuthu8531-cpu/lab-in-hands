
import React, { useState } from 'react';
import Layout from './components/Layout';
import Compiler from './components/Compiler';
import ExamEngine from './components/ExamEngine';
import Dashboard from './components/Dashboard';
import QuestionGenerator from './components/QuestionGenerator';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import Projects from './components/Projects';
import Learn from './components/Learn';
import { User, UserRole, DocumentResource, UserStatus, Note, Theme } from './types';
import { Lock } from 'lucide-react';

const MOCK_DOCS: DocumentResource[] = [
  { id: 'd1', title: 'Python Cheat Sheet', type: 'PDF', url: '#', isDownloaded: true, tags: ['Python', 'Basics'], uploadDate: '2023-10-01' },
  { id: 'd2', title: 'System Design Interview Guide', type: 'PDF', url: '#', isDownloaded: true, tags: ['Backend', 'System Design'], uploadDate: '2023-10-05' },
  { id: 'd3', title: 'Data Structures 101', type: 'PPT', url: '#', isDownloaded: false, tags: ['DSA'], uploadDate: '2023-10-10' },
  { id: 'd4', title: 'React Performance Optimization', type: 'VIDEO', url: '#', isDownloaded: false, tags: ['Frontend', 'React'], uploadDate: '2023-10-15' },
];

const MOCK_NOTES: Note[] = [
    {
        id: 'n_python',
        title: 'Python Complete Guide',
        category: 'Programming',
        content: '# Python Programming Lab\n\n## 1. Introduction\nPython is a high-level, interpreted programming language known for its simplicity and readability.\n\n```python\n# Hello World Program\nprint("Hello, Lab In Hands!")\n```\n\n## 2. Variables & Data Types\nPython has dynamic typing.\n\n```python\nx = 10        # Integer\ny = 3.14      # Float\nname = "AI"   # String\nis_active = True # Boolean\n```\n\n## 3. Control Flow\n\n### If-Else\n```python\nif x > 5:\n    print("x is greater than 5")\nelse:\n    print("x is smaller")\n```\n\n### Loops\n```python\nfor i in range(5):\n    print(i)\n```\n\n## 4. Functions\n```python\ndef add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(result) # Output: 8\n```',
        author: 'System',
        lastUpdated: '2023-10-25'
    },
    {
        id: 'n_c',
        title: 'C Programming Manual',
        category: 'Core',
        content: '# C Programming Lab\n\n## 1. Structure of C Program\nEvery C program must have a main function.\n\n```c\n#include <stdio.h>\n\nint main() {\n    printf("Hello World");\n    return 0;\n}\n```\n\n## 2. Pointers\nA pointer is a variable that stores the memory address of another variable.\n\n```c\nint val = 20;\nint *ptr = &val;\nprintf("%d", *ptr); // Prints 20\n```\n\n## 3. Arrays\nArrays are used to store multiple values in a single variable.\n\n```c\nint myNumbers[] = {25, 50, 75, 100};\nprintf("%d", myNumbers[0]);\n```',
        author: 'System',
        lastUpdated: '2023-10-20'
    },
    {
        id: 'n_java',
        title: 'Java OOPs Concepts',
        category: 'Object Oriented',
        content: '# Java & OOPs\n\n## 1. Class and Object\nJava is object-oriented. Everything is associated with classes and objects.\n\n```java\npublic class Main {\n  int x = 5;\n\n  public static void main(String[] args) {\n    Main myObj = new Main();\n    System.out.println(myObj.x);\n  }\n}\n```\n\n## 2. Inheritance\nOne class can inherit methods and attributes from another class.\n\n```java\nclass Vehicle {\n  protected String brand = "Ford";\n  public void honk() {\n    System.out.println("Tuut, tuut!");\n  }\n}\n\nclass Car extends Vehicle {\n  private String modelName = "Mustang";\n  public static void main(String[] args) {\n    Car myCar = new Car();\n    myCar.honk();\n  }\n}\n```',
        author: 'System',
        lastUpdated: '2023-10-22'
    },
    {
        id: 'n_dsa',
        title: 'Data Structures: Linked Lists',
        category: 'DSA',
        content: '# Linked Lists\n\n## 1. Introduction\nA linked list is a linear data structure, in which the elements are not stored at contiguous memory locations.\n\n## 2. Node Structure (C++)\n```cpp\nstruct Node {\n    int data;\n    struct Node* next;\n};\n```\n\n## 3. Traversal\n```cpp\nvoid printList(Node* n) {\n    while (n != NULL) {\n        cout << n->data << " ";\n        n = n->next;\n    }\n}\n```\n\n## 4. Advantages\n- Dynamic size\n- Ease of insertion/deletion\n\n## 5. Types\n- Singly Linked List\n- Doubly Linked List\n- Circular Linked List',
        author: 'System',
        lastUpdated: '2023-11-01'
    },
    {
        id: 'n_algo',
        title: 'Algorithms: Sorting',
        category: 'DSA',
        content: '# Sorting Algorithms\n\n## 1. Bubble Sort\nRepeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.\n**Time Complexity**: O(n^2)\n\n## 2. Merge Sort\nDivide and Conquer algorithm. Divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.\n**Time Complexity**: O(n log n)\n\n```python\ndef mergeSort(arr):\n    if len(arr) > 1:\n        mid = len(arr)//2\n        L = arr[:mid]\n        R = arr[mid:]\n        mergeSort(L)\n        mergeSort(R)\n        # Merge logic here...\n```\n\n## 3. Quick Sort\nPicks an element as pivot and partitions the given array around the picked pivot.\n**Time Complexity**: O(n log n) average, O(n^2) worst case.',
        author: 'System',
        lastUpdated: '2023-11-02'
    },
    {
        id: 'n_react',
        title: 'React Hooks Deep Dive',
        category: 'Web Development',
        content: '# React Hooks\n\n## 1. useState\nAllows you to add React state to function components.\n```jsx\nconst [count, setCount] = useState(0);\n```\n\n## 2. useEffect\nData fetching, setting up a subscription, and manually changing the DOM in React components.\n```jsx\nuseEffect(() => {\n  document.title = `You clicked ${count} times`;\n}, [count]);\n```\n\n## 3. useContext\nAccepts a context object and returns the current context value.\n\n## 4. Custom Hooks\nBuilding your own hooks lets you extract component logic into reusable functions.',
        author: 'System',
        lastUpdated: '2023-11-03'
    },
    {
        id: 'n_sql',
        title: 'SQL & Database Basics',
        category: 'Backend',
        content: '# SQL Fundamentals\n\n## 1. DDL (Data Definition Language)\nCommands: CREATE, DROP, ALTER, TRUNCATE\n```sql\nCREATE TABLE Students (\n    ID int,\n    Name varchar(255),\n    Age int\n);\n```\n\n## 2. DML (Data Manipulation Language)\nCommands: INSERT, UPDATE, DELETE\n```sql\nINSERT INTO Students (ID, Name, Age) VALUES (1, \'John\', 20);\n```\n\n## 3. Joins\n- INNER JOIN\n- LEFT JOIN\n- RIGHT JOIN\n- FULL JOIN\n\n## 4. ACID Properties\n- **A**tomicity\n- **C**onsistency\n- **I**solation\n- **D**urability',
        author: 'System',
        lastUpdated: '2023-11-04'
    },
    // --- NEW CONTENT ---
    {
        id: 'n_cpp_stl',
        title: 'C++ Standard Template Library',
        category: 'Advanced Programming',
        content: '# C++ STL Guide\n\n## 1. Vectors\nVectors are dynamic arrays with the ability to resize automatically.\n```cpp\n#include <vector>\nvector<int> v;\nv.push_back(10);\nv.push_back(20);\n```\n\n## 2. Maps\nMaps are associative containers that store elements in a mapped fashion.\n```cpp\n#include <map>\nmap<string, int> m;\nm["Apple"] = 100;\n```\n\n## 3. Sets\nSets are containers that store unique elements following a specific order.\n\n## 4. Algorithms\nSTL provides algorithms like `sort()`, `binary_search()`, `reverse()`, etc.',
        author: 'System',
        lastUpdated: '2023-11-10'
    },
    {
        id: 'n_java_col',
        title: 'Java Collections Framework',
        category: 'Advanced Programming',
        content: '# Java Collections\n\n## 1. ArrayList\nResizable array implementation of the List interface.\n```java\nArrayList<String> cars = new ArrayList<String>();\ncars.add("Volvo");\n```\n\n## 2. HashMap\nStores items in "key/value" pairs.\n```java\nHashMap<String, String> capitalCities = new HashMap<String, String>();\ncapitalCities.put("England", "London");\n```\n\n## 3. HashSet\nA collection of items where every item is unique.\n\n## 4. Iterator\nUsed to loop through collections.',
        author: 'System',
        lastUpdated: '2023-11-12'
    },
    {
        id: 'n_os',
        title: 'Operating Systems: Process Scheduling',
        category: 'CS Core',
        content: '# Process Scheduling\n\n## 1. FCFS (First Come First Serve)\nThe process that requests the CPU first is allocated the CPU first.\n\n## 2. SJF (Shortest Job First)\nAssociates with each process the length of its next CPU burst.\n\n## 3. Round Robin\nEach process gets a small unit of CPU time (time quantum), usually 10-100 milliseconds.\n\n## 4. Priority Scheduling\nA priority number (integer) is associated with each process.',
        author: 'System',
        lastUpdated: '2023-11-15'
    },
    {
        id: 'n_net',
        title: 'Computer Networks: OSI Model',
        category: 'CS Core',
        content: '# OSI Model Layers\n\n1. **Physical Layer**: Bit transmission, cables, hubs.\n2. **Data Link Layer**: Frames, MAC addresses, switches.\n3. **Network Layer**: Packets, IP addresses, routers.\n4. **Transport Layer**: Segments, TCP/UDP.\n5. **Session Layer**: Session management.\n6. **Presentation Layer**: Encryption, compression.\n7. **Application Layer**: HTTP, FTP, SMTP.',
        author: 'System',
        lastUpdated: '2023-11-18'
    }
];

const INITIAL_USERS: User[] = [
    {
        id: 'admin-1',
        name: 'Super Admin',
        email: 'admin@labinhands.com',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        institution: 'Lab In Hands HQ',
        xp: 99999,
        streak: 100,
        streakFrozen: false,
        level: 99,
        badges: [],
        avatar: 'https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff'
    },
    {
        id: 'staff-1',
        name: 'Prof. Albus',
        email: 'staff@labinhands.com',
        role: UserRole.STAFF,
        status: UserStatus.ACTIVE,
        institution: 'K. Ramakrishnan College of Technology',
        xp: 5000,
        streak: 50,
        streakFrozen: false,
        level: 20,
        badges: [],
        avatar: 'https://ui-avatars.com/api/?name=Albus&background=8b5cf6&color=fff'
    },
    {
        id: 'student-1',
        name: 'Alex Coder',
        email: 'student@labinhands.com',
        role: UserRole.STUDENT,
        status: UserStatus.ACTIVE,
        institution: 'K. Ramakrishnan College of Technology',
        xp: 1250,
        streak: 29,
        streakFrozen: false,
        level: 12,
        badges: ['Night Owl'],
        avatar: 'https://ui-avatars.com/api/?name=Alex&background=6366f1&color=fff'
    }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [docs, setDocs] = useState<DocumentResource[]>(MOCK_DOCS);
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [isOfflineMode, setOfflineMode] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  // AUTH HANDLERS
  const handleLogin = (email: string, role: UserRole) => {
    const user = users.find(u => u.email === email && u.role === role);
    if (user) {
        setCurrentUser(user);
    } else {
        alert("Invalid credentials. Please double check email and role.");
    }
  };

  const handleSignUp = (name: string, email: string, role: UserRole, institution: string) => {
    if (users.find(u => u.email === email)) {
        alert("User with this email already exists!");
        return;
    }
    const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        institution,
        status: role === UserRole.STUDENT ? UserStatus.ACTIVE : UserStatus.PENDING,
        xp: 0,
        streak: 1,
        streakFrozen: false,
        level: 1,
        badges: [],
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`
    };
    
    // Add to list
    setUsers(prev => [...prev, newUser]);
    
    // Immediate Login or Pending Screen
    setCurrentUser(newUser); 
    
    if(role === UserRole.STUDENT) {
        // Auto redirect to dashboard
        setActiveTab('dashboard');
    }
  };

  const handleGoogleLogin = () => {
    // Simulate a successful Google Login
    const googleUser: User = {
        id: `google-${Date.now()}`,
        name: 'Google Student',
        email: `student${Date.now()}@gmail.com`,
        role: UserRole.STUDENT,
        status: UserStatus.ACTIVE,
        institution: 'K. Ramakrishnan College of Technology',
        xp: 100,
        streak: 1,
        streakFrozen: false,
        level: 1,
        badges: ['Google Verified'],
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff'
    };
    setUsers(prev => [...prev, googleUser]);
    setCurrentUser(googleUser);
    setActiveTab('dashboard');
  };

  // ADMIN HANDLERS
  const approveUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: UserStatus.ACTIVE } : u));
  };
  
  const rejectUser = (id: string) => {
      setUsers(users.filter(u => u.id !== id));
  };

  const toggleOfflineDoc = (id: string) => {
    const doc = docs.find(d => d.id === id);
    if(doc && doc.isDownloaded) {
        alert(`Opening ${doc.title} in secure offline viewer...`);
    } else {
        setDocs(prev => prev.map(d => d.id === id ? { ...d, isDownloaded: !d.isDownloaded } : d));
    }
  };

  const handleAddNote = (newNote: Note) => {
      setNotes([...notes, newNote]);
  };

  const handleDeleteNote = (id: string) => {
      if(confirm('Delete this note?')) {
          setNotes(notes.filter(n => n.id !== id));
      }
  };

  const handleFinishExam = (score: number) => {
    if (currentUser) {
        setCurrentUser({
            ...currentUser,
            xp: currentUser.xp + score,
            streak: currentUser.streak + 1 
        });
    }
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    if (!currentUser) return null;

    if (currentUser.role === UserRole.STAFF && currentUser.status === UserStatus.PENDING) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-slate-900">
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 max-w-md w-full shadow-2xl">
                    <div className="w-16 h-16 bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="text-orange-500" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-white">Access Pending</h2>
                    <p className="text-slate-400 mb-6">
                        Your Staff account is currently awaiting approval from an Administrator at 
                        <span className="text-white font-bold block mt-1">{currentUser.institution}</span>
                    </p>
                    <div className="p-4 bg-slate-900 rounded-lg mb-6 border border-slate-800">
                        <p className="text-xs text-slate-500">You will be able to access the Question Bank and Library Manager once verified.</p>
                    </div>
                    <button 
                        onClick={() => setCurrentUser(null)}
                        className="text-indigo-400 hover:text-indigo-300 text-sm font-bold hover:underline"
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        );
    }

    // Role-Based Routing
    switch (activeTab) {
      case 'dashboard':
        return (
            <Dashboard 
                user={currentUser} 
                docs={docs} 
                toggleOffline={toggleOfflineDoc}
                isOfflineMode={isOfflineMode}
                setOfflineMode={setOfflineMode}
                setActiveTab={setActiveTab}
            />
        );
      case 'admin':
        return currentUser.role === UserRole.ADMIN ? <AdminPanel users={users} approveUser={approveUser} rejectUser={rejectUser} /> : null;
      case 'compiler':
        return currentUser.role === UserRole.STUDENT ? <Compiler /> : null;
      case 'projects':
        return currentUser.role === UserRole.STUDENT ? <Projects /> : null;
      case 'exam':
        return currentUser.role === UserRole.STUDENT ? <ExamEngine finishExam={handleFinishExam} /> : null;
      case 'leaderboard':
        return currentUser.role === UserRole.STUDENT ? <Leaderboard /> : null;
      case 'learn':
      case 'library-manager':
        // Both Student and Admin/Staff use the Learn component but with different permissions
        return (
            <Learn 
                docs={docs} 
                notes={notes}
                toggleOffline={toggleOfflineDoc} 
                userRole={currentUser.role}
                onAddNote={handleAddNote}
                onDeleteNote={handleDeleteNote}
            />
        );
      case 'question-gen':
         return (currentUser.role === UserRole.STAFF || currentUser.role === UserRole.ADMIN) ? <QuestionGenerator /> : null;
      default:
        return <Dashboard user={currentUser} docs={docs} toggleOffline={toggleOfflineDoc} isOfflineMode={isOfflineMode} setOfflineMode={setOfflineMode} setActiveTab={setActiveTab} />;
    }
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} onSignUp={handleSignUp} onGoogleLogin={handleGoogleLogin} />;
  }

  return (
    <Layout 
        user={currentUser} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme}
        toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onLogout={() => setCurrentUser(null)}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
