package com.example.roadmap.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/** External AR1 roster encoded as username|display name|role entries separated by commas. */
@ConfigurationProperties("roadmap.team")
public record TeamRosterProperties(String members) {

    public static final String DEFAULT_MEMBERS = String.join(",",
            "bfestino|Bruno Festino|MOBILE",
            "dgillig|David Gillig|MOBILE",
            "agrigaliun|Agustin Grigaliunas|BACKEND",
            "mbazante|Mauro Bazante|FRONTEND",
            "tarteaga|Tony Arteaga|BACKEND",
            "sreza1|Juan Sebastian Reza|BACKEND",
            "mmendoza|Mateo Mendoza|BACKEND",
            "sbenalcaza|Sebastian Benalcazar|BACKEND",
            "rdente|Rodrigo Dente|DEVOPS");

    public TeamRosterProperties {
        members = members == null ? DEFAULT_MEMBERS : members.trim();
        if (members.isEmpty()) {
            throw new IllegalArgumentException("roadmap.team.members must contain at least one member");
        }
    }

    public static TeamRosterProperties defaults() {
        return new TeamRosterProperties(DEFAULT_MEMBERS);
    }
}
