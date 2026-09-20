package com.example.roadmap.ui;

import com.example.roadmap.gantt.ui.RoadmapView;
import com.example.roadmap.gantt.ui.InformationView;
import com.example.roadmap.gantt.ui.TeamAvailabilityView;
import com.example.roadmap.gantt.ui.TaskPlanningView;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Header;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;

public class MainLayout extends AppLayout {

    public MainLayout() {
        addClassName("app-shell");
        setPrimarySection(Section.DRAWER);
        addToNavbar(header());
        addToDrawer(brand(), navigation());
    }

    private Header header() {
        H2 title = new H2("Team planning");
        title.addClassName("app-brand-title");
        Header header = new Header(new DrawerToggle(), title);
        header.addClassName("app-header");
        return header;
    }

    private Div brand() {
        Div mark = new Div(VaadinIcon.CALENDAR.create());
        mark.addClassName("app-brand-mark");
        Span name = new Span("Team Roadmap");
        Span caption = new Span("PLANNING AND CAPACITY");
        caption.addClassName("app-brand-caption");
        Div copy = new Div(name, caption);
        copy.addClassName("app-brand-copy");
        Div brand = new Div(mark, copy);
        brand.addClassName("app-drawer-brand");
        return brand;
    }

    private SideNav navigation() {
        SideNav navigation = new SideNav();
        navigation.addItem(new SideNavItem("Roadmap", RoadmapView.class, VaadinIcon.CALENDAR.create()));
        navigation.addItem(new SideNavItem("Plan tasks", TaskPlanningView.class, VaadinIcon.EDIT.create()));
        navigation.addItem(new SideNavItem("Information", InformationView.class, VaadinIcon.INFO_CIRCLE.create()));
        navigation.addItem(new SideNavItem(
                "Team availability", TeamAvailabilityView.class, VaadinIcon.USER_CLOCK.create()));
        navigation.addClassName("app-navigation");
        navigation.getElement().setAttribute("aria-label", "Main navigation");
        return navigation;
    }
}
