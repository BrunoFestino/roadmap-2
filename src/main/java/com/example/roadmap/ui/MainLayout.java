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
        addClassName("app-shell");
        setPrimarySection(Section.DRAWER);
        addToNavbar(header());
        addToDrawer(navigation());
    }

    private Header header() {
        H2 title = new H2("Team Roadmap");
        title.addClassName("app-brand-title");
        Header header = new Header(new DrawerToggle(), title);
        header.addClassName("app-header");
        return header;
    }

    private SideNav navigation() {
        SideNav navigation = new SideNav();
        navigation.addItem(new SideNavItem("Roadmap", RoadmapView.class, VaadinIcon.CALENDAR.create()));
        navigation.addItem(new SideNavItem("Planificar tareas", TaskPlanningView.class, VaadinIcon.EDIT.create()));
        navigation.addItem(new SideNavItem(
                "Ausencias del equipo", TeamAvailabilityView.class, VaadinIcon.USER_CLOCK.create()));
        navigation.addClassName("app-navigation");
        return navigation;
    }
}
