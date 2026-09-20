package com.example.roadmap.ui;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.component.dependency.Uses;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.theme.Theme;

@Theme("roadmap")
@Uses(NumberField.class)
public class AppShell implements AppShellConfigurator {
}
