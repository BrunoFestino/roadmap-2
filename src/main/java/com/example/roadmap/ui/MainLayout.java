package com.example.roadmap.ui;

import com.example.roadmap.gantt.ui.RoadmapView;
import com.example.roadmap.gantt.ui.TaskPlanningView;
import com.example.roadmap.gantt.ui.TeamAvailabilityView;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Header;
import com.vaadin.flow.component.html.Section;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;

public class MainLayout extends AppLayout {

    public MainLayout() {
        setPrimarySection(Section.DRAWER);
        addToNavbar(header());
        addToDrawer(navigation());
    }

    private Header header() {
        H2 title = new H2("Team Roadmap");
        title.getStyle().set("margin", "0").set("font-size", "1.25rem");
        Header header = new Header(new DrawerToggle(), title);
        header.getStyle().set("display", "flex").set("align-items", "center")
                .set("gap", "0.5rem").set("padding", "0.5rem 1rem").set("width", "100%");
        return header;
    }

    private SideNav navigation() {
        SideNav navigation = new SideNav();
        navigation.addItem(new SideNavItem("Roadmap", RoadmapView.class, VaadinIcon.CALENDAR.create()));
        navigation.addItem(new SideNavItem("Planificar tareas", TaskPlanningView.class, VaadinIcon.EDIT.create()));
        navigation.addItem(new SideNavItem(
                "Ausencias del equipo", TeamAvailabilityView.class, VaadinIcon.USER_CLOCK.create()));
        return navigation;
    }
}