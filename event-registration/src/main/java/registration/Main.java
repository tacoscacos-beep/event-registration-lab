package registration;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        RegistrationManager manager = new RegistrationManager();
        boolean running = true;

        System.out.println("=== EVENT REGISTRATION CONSOLE APP (JAVA OOP) ===");

        while (running) {
            System.out.println("\nChoose an option:");
            System.out.println("1. Add new registration");
            System.out.println("2. Show all registrations");
            System.out.println("3. Find registration by ID");
            System.out.println("4. Delete registration by ID");
            System.out.println("5. Show registrations for a specific event");
            System.out.println("0. Exit");
            System.out.print("Enter your choice: ");

            String input = scanner.nextLine();
            int choice;

            try {
                choice = Integer.parseInt(input);
            } catch (NumberFormatException e) {
                System.out.println("⚠️ Error: Please enter a valid number from the menu.");
                continue;
            }

            switch (choice) {
                case 1:
                    System.out.print("Enter full name: ");
                    String name = scanner.nextLine();

                    System.out.print("Enter email address: ");
                    String email = scanner.nextLine();

                    System.out.print("Enter student group (e.g. SE-231): ");
                    String group = scanner.nextLine();

                    System.out.println("Select an Event:");
                    System.out.println("1. Web Design Workshop");
                    System.out.println("2. JavaScript Quiz");
                    System.out.println("3. IT Career Talk");
                    System.out.print("Enter event choice (1-3): ");

                    try {
                        int eventChoice = Integer.parseInt(scanner.nextLine());
                        manager.addRegistration(name, email, group, eventChoice);
                    } catch (NumberFormatException e) {
                        System.out.println("⚠️ Error: Event choice must be a number.");
                    } catch (IllegalArgumentException e) {
                        System.out.println("❌ Validation Error: " + e.getMessage());
                    }
                    break;

                case 2:
                    manager.displayAll();
                    break;

                case 3:
                    System.out.print("Enter registration ID to find: ");
                    try {
                        int id = Integer.parseInt(scanner.nextLine());
                        manager.findById(id);
                    } catch (NumberFormatException e) {
                        System.out.println("⚠️ Error: ID must be a valid number.");
                    }
                    break;

                case 4:
                    System.out.print("Enter registration ID to delete: ");
                    try {
                        int id = Integer.parseInt(scanner.nextLine());
                        manager.deleteById(id);
                    } catch (NumberFormatException e) {
                        System.out.println("⚠️ Error: ID must be a valid number.");
                    }
                    break;

                case 5:
                    System.out.println("Select Event to filter:");
                    System.out.println("1. Web Design Workshop");
                    System.out.println("2. JavaScript Quiz");
                    System.out.println("3. IT Career Talk");
                    System.out.print("Enter event choice (1-3): ");
                    try {
                        int eventChoice = Integer.parseInt(scanner.nextLine());
                        manager.displayByEvent(eventChoice);
                    } catch (NumberFormatException e) {
                        System.out.println("⚠️ Error: Event choice must be a number.");
                    }
                    break;

                case 0:
                    running = false;
                    System.out.println("👋 Exiting application. Goodbye!");
                    break;

                default:
                    System.out.println("⚠️ Invalid menu option. Please choose between 0 and 5.");
            }
        }
        scanner.close();
    }
}