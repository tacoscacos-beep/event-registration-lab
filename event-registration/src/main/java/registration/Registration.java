package registration;

public class Registration {
    private int id;
    private String fullName;
    private String email;
    private String studentGroup;
    private String eventTitle;

    public Registration(int id, String fullName, String email, String studentGroup, int eventChoice) {
        if (id <= 0) {
            throw new IllegalArgumentException("ID must be a positive number.");
        }
        this.id = id;

        if (fullName == null || fullName.trim().length() < 3) {
            throw new IllegalArgumentException("Full name must be at least 3 characters long.");
        }
        this.fullName = fullName.trim();

        if (email == null || !email.contains("@") || !email.contains(".")) {
            throw new IllegalArgumentException("Email must contain '@' and '.' characters.");
        }
        String[] parts = email.split("@", -1);
        if (parts.length != 2 || parts[0].trim().isEmpty() || parts[1].trim().isEmpty()) {
            throw new IllegalArgumentException("Email format is invalid.");
        }
        this.email = email.trim();

        if (studentGroup == null || studentGroup.trim().isEmpty()) {
            throw new IllegalArgumentException("Student group cannot be blank.");
        }
        this.studentGroup = studentGroup.trim();

        switch (eventChoice) {
            case 1:
                this.eventTitle = "Web Design Workshop";
                break;
            case 2:
                this.eventTitle = "JavaScript Quiz";
                break;
            case 3:
                this.eventTitle = "IT Career Talk";
                break;
            default:
                throw new IllegalArgumentException("Invalid event choice. Please select between 1 and 3.");
        }
    }

    public int getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getStudentGroup() {
        return studentGroup;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    @Override
    public String toString() {
        return "[ID: " + id + "] " + fullName + " (" + studentGroup + ") — Event: " + eventTitle + " | Email: " + email;
    }
}
