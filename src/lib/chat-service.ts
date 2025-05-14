import { Message } from "@/types/chat";

const systemPrompt = `You are a highly knowledgeable and efficient assistant that converts natural language commands into syntactically correct and optimized SQL queries. 
Your sole function is to return valid SQL statements that accurately reflect the user's intent.
You must follow these rules: 
Only return SQL — no explanations, summaries, or additional text. 
Your SQL must strictly conform to the following schema:

Tables and their columns:
- Activities: ActivityId(INT PK), Description(NVARCHAR(MAX)), Date(DATETIME2), ClassRepresentativeStudentId(INT), ClassRepresentativeCourseId(INT)
- Attendances: AttendanceId(INT PK), StudentId(INT), CourseId(INT), DateMarked(DATETIME2), MarkedBy(INT), Status(INT)
- ClassRepresentatives: StudentId(INT PK), CourseId(INT PK), IsDeleted(INT), NominatedBy(INT), IsDisabled(BIT)
- Courses: CourseId(INT PK), Code(NVARCHAR(12)), Title(NVARCHAR(100)), Type(INT), Semester(INT), CreditHours(INT), CreditHoursPerWeek(INT), IsArchived(BIT), AssignedTo(INT)
- Departments: DepartmentId(INT PK), Name(NVARCHAR(100)), IsDeleted(BIT)
- Enrolments: EnrolmentId(INT PK), StudentId(INT), CourseId(INT)
- Menus: MenuId(INT PK), Label(NVARCHAR(MAX)), Url(NVARCHAR(MAX)), Role(INT)
- Students: StudentId(INT PK), CollegeRollNo(NVARCHAR(8)), UniversityRollNo(NVARCHAR(12)), RegistrationNo(NVARCHAR(24)), FirstName(NVARCHAR(100)), LastName(NVARCHAR(100)), Session(NVARCHAR(18)), Section(NVARCHAR(18)), IsDeleted(BIT), Email(NVARCHAR(MAX))
- Users: UserId(INT PK), FirstName(NVARCHAR(100)), LastName(NVARCHAR(100)), Email(NVARCHAR(200)), Password(NVARCHAR(200)), IsDeleted(BIT)`;

export async function generateChatResponse(messages: Message[]): Promise<string> {
    try {
        const formattedMessages = [
            {
                role: "system",
                content: systemPrompt
            },
            ...messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        ];

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },            body: JSON.stringify({ 
                messages: formattedMessages,
                temperature: 0, // Lower temperature for more precise SQL generation
                top_p: 1,      // Use greedy sampling for SQL
                frequency_penalty: 0,
                presence_penalty: 0,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate response');
        }

        const data = await response.json();
        // Return the raw SQL response without additional formatting
        return data.response || "SELECT 'Error: Could not generate SQL query' AS Error;";
    } catch (error) {
        console.error("Error generating chat response:", error);
        throw new Error("Failed to generate response");
    }
}
