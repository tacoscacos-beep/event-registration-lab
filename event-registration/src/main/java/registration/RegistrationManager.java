package registration;

import java.util.ArrayList;
import java.util.Iterator;

public class RegistrationManager {
    private ArrayList<Registration> registrations = new ArrayList<>();
    private int nextId = 1;

    public void addRegistration(String fullName, String email, String studentGroup, int eventChoice) {
        Registration reg = new Registration(nextId, fullName, email, studentGroup, eventChoice);
        registrations.add(reg);
        System.out.println("✅ Registration successfully created! Assigned ID: " + nextId);
        nextId++;
    }

    public void displayAll() {
        if (registrations.isEmpty()) {
            System.out.println("ℹ️ No registrations found.");
            return;
        }
        System.out.println("\n--- ALL REGISTRATIONS ---");
        for (Registration reg : registrations) {
            System.out.println(reg);
        }
    }

    public void findById(int id) {
        Registration found = null;
        for (Registration reg : registrations) {
            if (reg.getId() == id) {
                found = reg;
                break;
            }
        }
        if (found != null) {
            System.out.println("🔍 Found: " + found);
        } else {
            System.out.println("❌ Registration with ID " + id + " not found.");
        }
    }

    public void deleteById(int id) {
        boolean removed = false;
        Iterator<Registration> iterator = registrations.iterator();
        while (iterator.hasNext()) {
            Registration reg = iterator.next();
            if (reg.getId() == id) {
                iterator.remove();
                removed = true;
                break;
            }
        }
        if (removed) {
            System.out.println("🗑️ Registration with ID " + id + " successfully deleted.");
        } else {
            System.out.println("❌ Registration with ID " + id + " not found. Deletion failed.");
        }
    }

    public void displayByEvent(int eventChoice) {
        String targetEvent;
        switch (eventChoice) {
            case 1:
                targetEvent = "Web Design Workshop";
                break;
            case 2:
                targetEvent = "JavaScript Quiz";
                break;
            case 3:
                targetEvent = "IT Career Talk";
                break;
            default:
                System.out.println("❌ Invalid event choice.");
                return;
        }

        boolean found = false;
        System.out.println("\n--- REGISTRATIONS FOR: " + targetEvent + " ---");
        for (Registration reg : registrations) {
            if (reg.getEventTitle().equals(targetEvent)) {
                System.out.println(reg);
                found = true;
            }
        }
        if (!found) {
            System.out.println("ℹ️ No registrations found for this event.");
        }
    }
}