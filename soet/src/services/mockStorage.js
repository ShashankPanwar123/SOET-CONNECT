// ==========================================
// Mock Storage Fallback for SOET Connect
// ==========================================

const DEFAULT_USERS = [
  { id: "1", name: "Rahul Sharma", email: "student@soet.com", password: "student123", role: "student" },
  { id: "2", name: "Dr. Alok Kumar", email: "faculty@soet.com", password: "faculty123", role: "faculty" },
  { id: "3", name: "Admin Administrator", email: "admin@soet.com", password: "admin123", role: "admin" }
];

const DEFAULT_NOTICES = [
  {
    id: "1",
    title: "End Semester Exams Schedule",
    category: "Exam",
    content: "The end semester exams will commence on July 10th. Detailed date sheet is uploaded on the college portal. Please make sure to clear your academic dues by July 5th.",
    created_by: "faculty@soet.com",
    created_by_name: "Dr. Alok Kumar",
    created_at: "2026-06-25T10:00:00Z"
  },
  {
    id: "2",
    title: "Microsoft Recruitment Drive 2026",
    category: "Placement",
    content: "Microsoft is conducting a pool campus recruitment drive for final year B.Tech students on July 15th. Package offered is 44 LPA. Register on the CDC placement portal by June 30th.",
    created_by: "faculty@soet.com",
    created_by_name: "Prof. Rita Sen",
    created_at: "2026-06-24T09:00:00Z"
  },
  {
    id: "3",
    title: "Annual Cultural Fest - SOET Aura 2026",
    category: "Event",
    content: "Get ready for the biggest event of the year! SOET Aura 2026 will be held from July 20th to July 22nd. Registrar office invitations have been sent to celebrity guests.",
    created_by: "faculty@soet.com",
    created_by_name: "Dr. Alok Kumar",
    created_at: "2026-06-23T14:30:00Z"
  },
  {
    id: "4",
    title: "Academic Registration for Odd Semesters",
    category: "Academic",
    content: "Registration for the upcoming odd semesters begins on July 1st. Students must select their elective courses online and submit physical printouts to their respective departments.",
    created_by: "faculty@soet.com",
    created_by_name: "Prof. Rita Sen",
    created_at: "2026-06-22T11:15:00Z"
  }
];

export const getMockUsers = () => {
  const users = localStorage.getItem("mock_users");
  if (!users) {
    localStorage.setItem("mock_users", JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  return JSON.parse(users);
};

export const setMockUsers = (users) => {
  localStorage.setItem("mock_users", JSON.stringify(users));
};

export const getMockNotices = () => {
  const notices = localStorage.getItem("mock_notices");
  if (!notices) {
    localStorage.setItem("mock_notices", JSON.stringify(DEFAULT_NOTICES));
    return DEFAULT_NOTICES;
  }
  return JSON.parse(notices);
};

export const setMockNotices = (notices) => {
  localStorage.setItem("mock_notices", JSON.stringify(notices));
};

export const mockClassify = (content) => {
  const text = content.toLowerCase();
  if (text.includes("exam") || text.includes("test") || text.includes("schedule") || text.includes("quiz") || text.includes("date sheet")) {
    return "Exam";
  }
  if (text.includes("placement") || text.includes("recruit") || text.includes("job") || text.includes("career") || text.includes("cdc") || text.includes("package")) {
    return "Placement";
  }
  if (text.includes("event") || text.includes("fest") || text.includes("aura") || text.includes("celebration") || text.includes("cultural")) {
    return "Event";
  }
  return "Academic";
};

export const mockChatReply = (message) => {
  const text = message.toLowerCase();
  if (text.includes("exam") || text.includes("schedule") || text.includes("date sheet")) {
    return "The End Semester Exams commence on July 10th. Detailed schedules are posted on the notice board. Make sure to clear your dues!";
  }
  if (text.includes("placement") || text.includes("job") || text.includes("microsoft") || text.includes("cdc")) {
    return "Microsoft's recruitment drive is scheduled for July 15th for final year students. Register on the CDC placement portal by June 30th.";
  }
  if (text.includes("fest") || text.includes("aura") || text.includes("event")) {
    return "SOET Aura 2026 (Annual Cultural Fest) runs from July 20th to 22nd. Celebrity guest invitations have been finalized.";
  }
  if (text.includes("registration") || text.includes("register") || text.includes("academic")) {
    return "Odd Semester academic registration starts online on July 1st. Please submit physical departmental course cards after registering.";
  }
  return "I am the SOET Connect AI Assistant. You can ask me about exam dates, placement recruitment, the Aura fest, or academic course registration!";
};
