
package com.example.roadmap.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/** Configured Jira usernames, display names, and roles for the roadmap team. */
@ConfigurationProperties("roadmap.team")
public record TeamRosterProperties(String members) {

    private static final String DEFAULT_MEMBERS =
            "jdoe|John Doe|MOBILE,asmith|Alice Smith|MOBILE,"
                    + "bwilson|Bob Wilson|BACKEND,mjohnson|Maria Johnson|FRONTEND,"
                    + "dlee|Daniel Lee|BACKEND,sbrown|Sophie Brown|BACKEND,"
                    + "rgarcia|Robert Garcia|BACKEND,emartin|Emma Martin|BACKEND,"
                    + "tanderson|Tom Anderson|DEVOPS,lthomas|Laura Thomas|PO,"
                    + "hclark|Henry Clark|SQC";

    public TeamRosterProperties {
        members = members == null || members.isBlank() ? DEFAULT_MEMBERS : members.trim();
    }

    public static TeamRosterProperties defaults() {
        return new TeamRosterProperties(null);
    }
}
