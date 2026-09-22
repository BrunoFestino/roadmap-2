package com.example.roadmap.gantt.ui;

import com.example.roadmap.ui.MainLayout;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

/** Product help illustrated with examples matching the current planning rules. */
@Route(value = "information", layout = MainLayout.class)
@PageTitle("Information")
public class InformationView extends VerticalLayout {
    public InformationView() {
        addClassNames("app-page", "information-page");
        setPadding(true);
        setSpacing(true);
        add(hero(), fundamentals(), navigation(), estimates(), subtasks(), workload(), dates(), planning(), views());
    }

    private Component hero() {
        Span eyebrow = new Span("User guide");
        eyebrow.addClassName("information-eyebrow");
        H1 title = new H1("Roadmap information");
        title.addClassName("page-title");
        Div copy = new Div(eyebrow, title,
                text("Understand estimates, subtasks and capacity through practical examples. See what the workload numbers mean and where to update your plan."),
                text("A planning tool, not a historical time-audit report. Jira retains recorded work."));
        copy.addClassName("information-hero-copy");
        Div icon = new Div(VaadinIcon.INFO_CIRCLE.create());
        icon.addClassName("information-icon-badge");
        HorizontalLayout hero = new HorizontalLayout(icon, copy);
        hero.addClassNames("surface-card", "information-hero");
        hero.setWidthFull();
        return hero;
    }

    private Component fundamentals() {
        return columns("information-concepts",
                example("Effort", "1 MD = 8 h", "A unit of estimated work, not one calendar day."),
                example("Daily capacity", "6 h per person", "Weekends and recorded absences are excluded. Yellow above 6 h per available day; red above 8 h."),
                example("Workload horizon", "8 weeks", "From the current Monday. A full five-day week provides 30 h of capacity."));
    }

    private Component navigation() {
        Div nav = new Div();
        nav.addClassName("information-contents");
        nav.getElement().setAttribute("role", "navigation");
        nav.getElement().setAttribute("aria-label", "Information sections");
        String[][] links = {{"estimates", "Estimates"}, {"subtasks", "Parent & subtasks"},
                {"workload", "Workload & capacity"}, {"dates", "Dates & missing data"},
                {"planning", "Local planning"}, {"views", "Reading the views"}};
        for (String[] link : links) nav.add(new Anchor("#information-" + link[0], link[1]));
        return nav;
    }

    private Component estimates() {
        return section("estimates", "01", "Where effort comes from",
                "Tasks without subtasks and all subtasks use Jira Original Estimate. Epics use their Jira MD field.",
                columns("information-quick-grid",
                        example("Tasks", "Jira Original Estimate", "Example: enter 16 h in Jira Time Tracking. The task shows 2 MD. Custom Jira MD and local effort do not supply task estimates."),
                        example("Subtasks", "Jira Original Estimate", "Example: enter 12 h in the subtask's Jira Time Tracking for 1.5 MD. Previous local MD are no longer used. Without a positive Original Estimate, the subtask appears in Needs attention and adds no workload."),
                        example("Epics", "Jira MD field", "Example: enter 12.5 in the epic's MD field for 12.5 MD. Time Tracking and child estimates do not replace this value. Epic estimates describe the initiative and do not add person workload on top of its tasks.")),
                example("Recorded work", "24 h estimated, 6 h logged, 18 h left", "Jira worklogs reduce remaining work, not the original estimate. If 26 h have already been logged against a 24 h estimate, remaining work is zero. Actual worklogs are never overwritten."),
                note("Missing an estimate?", "A task or subtask without a positive Jira Original Estimate goes to Needs attention. An epic without a valid MD field displays no estimate; its dates can still be planned."));
    }

    private Component subtasks() {
        return section("subtasks", "02", "Only subtasks contribute effort",
                "A task with subtasks is excluded from the roadmap, workload and task planning. The total effort is the sum of the subtasks' own Jira Original Estimates.",
                columns("information-concepts",
                        example("Parent", "10 MD excluded", "The parent estimate is neither counted nor shared."),
                        example("Subtask A", "3 MD", "Jira Original Estimate of 24 h. It contributes its own 24 hours before worklogs."),
                        example("Subtasks B and C", "Needs attention", "No positive Jira Original Estimate. They contribute no workload until estimated.")),
                note("Total estimated workload: 3 MD.", "Only A is estimated. B and C still need estimates, so this total does not describe all remaining work."),
                disclosure("More parent and subtask examples",
                        example("All subtasks are estimated", "Subtasks 3 MD and 4 MD", "Total workload is 7 MD. The parent contributes nothing, regardless of its estimate."),
                        example("Subtasks exceed the parent estimate", "Subtasks 8 MD and 5 MD", "Total workload is 13 MD. Each Jira Original Estimate stands on its own; there is no parent budget warning."),
                        example("Standalone task", "Jira Original Estimate: 16 h", "Without subtasks, the task contributes its own 2 MD."),
                        text("A parent stays excluded when subtasks are closed, undated, unestimated or assigned outside the team. Closed subtasks add no future workload."),
                        text("Jira worklogs reduce each visible issue's remaining work. Parent estimates and parent worklogs never change a subtask estimate.")));
    }

    private Component workload() {
        Div green = example("Green", "30 h assigned", "A full five-day week fits within normal capacity.");
        Div yellow = example("Yellow", "36 h assigned", "Above the 30 h capacity, but not above 40 h.");
        Div red = example("Red", "44 h assigned", "Above 40 h for a full five-day week.");
        green.addClassName("information-signal-green");
        yellow.addClassName("information-signal-yellow");
        red.addClassName("information-signal-red");
        return section("workload", "03", "Workload, free hours and the traffic light",
                "Work is distributed across available days within the task's dates. Concurrent tasks are balanced together without moving committed dates.",
                columns("information-concepts", green, yellow, red),
                note("The boundary matters.", "Exactly 30 h is green. More than 30 h and up to 40 h is yellow. More than 40 h is red. With three available days, the weekly limits become 18 h and 24 h. The red threshold does not increase capacity available for new work."),
                columns("information-quick-grid",
                        example("How full is the weekly plan?", "16 h planned in a 30 h week", "Weekly utilization is 53.3%, displayed as 53%. The percentage describes the full weekly plan, even after some days have passed."),
                        example("What is still available on Wednesday?", "6 h available", "The same 16 h task has 4 h logged and 12 h left. Wednesday to Friday offers 18 h of capacity, leaving 6 h available. No absences in this example.")),
                rows("Total effort", "The complete effort for a task, read from Jira and converted to hours and MD. It does not belong to one particular week.",
                        "Assigned summary", "The person's weekly summary shows the committed plan and its capacity signal.",
                        "Remaining workload", "The expanded task detail shows only work still owed after Jira logged hours, placed where it can be completed from today onwards. A later week stays blank when the remaining work was placed earlier."),
                disclosure("Availability and team examples",
                        example("Two people, different loads", "A group total can hide an overloaded person", "One person has 44 h and another has 6 h assigned, each with 30 h capacity. The role is at 83%, but the first person is red. Expand people before committing more work."),
                        text("Free hours count today and future available days only. Today counts as a whole business day. Past unused hours cannot be reused; a full week of absence is unavailable, not free."),
                        text("Free from identifies the first available day below 80% remaining daily load, in a week with spare capacity. The person's total available hours start at that date and stop at the end of the eight-week horizon. This availability rule is separate from the traffic-light thresholds."),
                        text("Carried-over hours indicate remaining work concentrated into the days still ahead. They are already included in remaining work, not extra effort to add again.")));
    }

    private Component dates() {
        return section("dates", "04", "Dates, missing information and task states",
                "Effort and duration are independent. A longer window spreads the same work across more available days.",
                rows("Start dates", "Local Start takes precedence over Jira Target Start. First Time In Progress is used only for a task currently In Progress. Sprint and creation dates do not supply a start.",
                        "Missing start", "The task appears in Needs attention and is excluded from the Gantt and dated workload.",
                        "Missing local Target End", "The task appears in Needs attention and is excluded from the Gantt and workload. Jira dates never substitute for a local Target End.",
                        "Committed dates", "Local Start and End define the window, including both endpoints. Absences reduce usable days without moving End. Ordinary task due dates do not set this window; due dates position milestones and can supply an epic's end.",
                        "Final states", "Done, Cancelled, Resolved, Closed and Obsolete no longer add future task load. Blocked is not a final state."),
                note("Keep dates realistic.", "A task whose entire window is past, or has no available days, has nowhere to distribute remaining work. The app does not automatically move it into a new window. Review dates before interpreting free capacity as a new commitment."));
    }

    private Component planning() {
        return section("planning", "05", "Task planning and availability",
                "Local planning saves dates and stack. Estimates are read from Jira and displayed in MD. It does not update Jira assignees, statuses, estimates or worklogs.",
                rows("Choose an item", "Use Show to select Epic, Story, Task, Bug, Spike, Subtask, Other or All. Filter by Jira ID and person, then select a row. Stories are context only; Bugs and Spikes consume capacity like Tasks.",
                        "Set the window", "Start and End are required. End cannot precede Start. Tasks and subtasks need at least one available business day in the window.",
                        "Review effort", "The read-only estimate shows MD and its Jira source. For Tasks, Stories, Bugs, Spikes and subtasks, enter Original Estimate in Jira Time Tracking: 20 h displays as 2.5 MD. For epics, enter MD in the Jira MD field. Refresh after changing Jira.",
                        "Save and keep filters", "Saving reloads the list while preserving search and item type. The selected person is retained if still present in the refreshed list. Filters are local to this view, not saved across browser reloads or navigation away.",
                        "Choose a stack", "Local stack takes priority over recognized Jira labels, then the person's role. Conflicting recognized labels are shown as ambiguous. Changing stack does not reassign a task or create capacity.",
                        "Record absences", "Use Team availability to add, edit or remove absences. Return to Roadmap or use Refresh roadmap to rebuild the view with current planning and availability."));
    }

    private Component views() {
        return section("views", "06", "How to read each view",
                "The Gantt and workload show the same standalone tasks and subtasks estimated in Jira Time Tracking. Tasks with subtasks are excluded.",
                rows("Task planning", "Defines the inputs: the task's Start, End and optional local stack. The effort estimate is shown for reference and comes from Jira.",
                        "Team capacity & load", "Shows the calculated result: effort distributed across eight weekly buckets and compared with each person's available capacity. Expand a person to see total effort, weekly allocation and remaining work.",
                        "Workload histogram", "The same weekly allocated hours as Team capacity & load. A dotted line marks normal capacity. Excess is yellow up to 8 h per available day, then red. Each person has an independent chart scale; compare numeric values, not bar heights across people.",
                        "By role / By person", "Gantt views show date windows. By role groups tasks by effective stack; Team capacity & load groups people by roster role. Epics and Stories are context only. Bugs and Spikes are executable work. A long bar does not mean full-time dedication.",
                        "Needs attention", "Missing dates and missing estimates have separate lists. Their search and person filters narrow those lists only, not the workload totals or histogram."),
                note("Scope matters.", "Person workload covers the configured team roster. Unassigned issues and issues assigned outside that roster are not counted. This is not a project-wide backlog or a historical worklog report."));
    }

    private Component section(String id, String number, String title, String description, Component... content) {
        Div section = new Div();
        section.setId("information-" + id);
        section.addClassNames("surface-card", "information-guide-section");
        Span index = new Span(number);
        index.addClassName("information-guide-index");
        Div heading = new Div(index, new H2(title));
        heading.addClassName("information-guide-heading");
        section.add(heading, text(description));
        section.add(content);
        return section;
    }

    private Div columns(String className, Component... content) {
        Div columns = new Div(content);
        columns.addClassNames(className, "information-guide-columns");
        return columns;
    }

    private Div example(String title, String value, String description) {
        Span figure = new Span(value);
        figure.addClassName("information-example-value");
        Div example = new Div(new H3(title), figure, text(description));
        example.addClassNames("information-card", "information-example");
        return example;
    }

    private Div note(String title, String description) {
        Div note = new Div(new H3(title), text(description));
        note.addClassName("information-guide-note");
        return note;
    }

    private Details disclosure(String title, Component... content) {
        Div body = new Div(content);
        body.addClassName("information-disclosure-body");
        Details details = new Details(title, body);
        details.addClassName("information-guide-details");
        return details;
    }

    private Component rows(String... values) {
        Div rows = new Div();
        rows.addClassName("information-guide-rows");
        for (int i = 0; i < values.length; i += 2) {
            Div row = new Div(new H3(values[i]), text(values[i + 1]));
            row.addClassName("information-guide-row");
            rows.add(row);
        }
        return rows;
    }

    private Paragraph text(String value) {
        return new Paragraph(value);
    }
}
